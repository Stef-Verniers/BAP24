<script lang="ts">
    import Header from "../../../components/Header.svelte";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import { addToast } from "../../../stores";
    import Toasts from "../../../components/Toasts.svelte";
    import SponsorForm from "../../../components/SponsorForm.svelte";
    import ProductForm from "../../../components/ProductForm.svelte";
    import ToggleUserStatus from "../../../components/ToggleUserStatus.svelte";
    export let data: PageData;
    export let selectedItem;


    // We maken heel wat variabelen aan voor data toe te kennen
    let users = [];
    let sponsors = [];
    let products = [];
    let allItems = [];
    let results = [];
    let slider;
    let search;
    let searchValue = '';
    let showModal = false;
    let activeForm = '';
    let showForm = true;
    let sponsorForm;
    let productForm;

    // We halen de data op van de server tijdens het renderen van de pagina
    onMount(async () => {
        search = document.getElementById("search");
        users = [...data.users];
        sponsors = [...data.sponsors];
        products = [...data.products];
        allItems = [...users, ...sponsors, ...products];
        sponsorForm = document.getElementById("sponsorForm");
        productForm = document.getElementById("productForm");
    });
    
    // We openen een modal
    function openModal(result) {
        selectedItem = result;
        showModal = true;
    }

    // We sluiten een modal
    function closeModal() {
        showModal = false
        selectedItem = '';
    }

    // We openen het formulier voor een sponsor toe te voegen
    function showSponsorForm() {
        showForm = true;
        activeForm = 'sponsor';
    }
    // We openen het formulier voor een product toe te voegen
    function showProductForm() {
        showForm = true;
        activeForm = 'product';
    }

    // We openen het formulier voor de rol van een gebruiker te wijzigen
    function showUserForm(result) {
        productForm.style.background = '#eeeeee';
        sponsorForm.style.background = '#eeeeee';
        selectedItem = result;
        activeForm = 'user';
        showForm = true;
    }

    // We sluiten het formulier
    function closeForm() {
        activeForm = '';
        productForm.style.background = 'hsl(167 46% 38% / 1)';
        sponsorForm.style.background = 'hsl(167 46% 38% / 1)';
    }

    // We verwijderen een item door de slider te verslepen
    async function slideToDelete() {
        slider = document.getElementById("myRange");

        let type;
        if (selectedItem.username) {
            type = 'user';
        } else if (selectedItem.name && selectedItem.owner) {
            type = 'sponsor';
        } else if (selectedItem.name && selectedItem.points) {
            type = 'product';
        }

        if (slider.value == 100) {
            const response = await fetch(`/dashboard/admin/destroy`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    item: selectedItem,
                    type: type
                })
            });
            const res = await response.json()
            if (!res) {
                showModal = false;
                addToast({ message: 'Verwijderen mislukt...', type: 'error', timeout: 5000 });
                } else {
                showModal = false;
                addToast({ message: 'Met succes verwijderd!', type: 'success', timeout: 5000 });
                allItems = res.body
                search.value = '';
            }
        }
    }

    // We resetten de slider
    function resetSlider() {
        slider = document.getElementById("myRange");
        if (slider.value < 100) {
            slider.value = 0;
        }
    }

    // We vangen de data op van de sponsorform uit de component
    function sponsorFormSubmit(res) {
        const response = res.detail;
        allItems = [...users, ...response.body, ...products];
        activeForm = '';
        searchValue = '';
        showForm = false;
        addToast({ message: 'Met succes toegevoegd!', type: 'success', timeout: 5000 });
    }

    // We vangen de data op van de productform uit de component
    function productFormSubmit(res) {
        const response = res.detail;
        allItems = [...users, ...sponsors, ...response.body];
        activeForm = '';
        searchValue = '';
        showForm = false;
        addToast({ message: 'Met succes toegevoegd!', type: 'success', timeout: 5000 });
    }

    // We vangen de data op van de userform uit de component
    function userFormSubmit(res) {
        const response = res.detail;
        allItems = [...response.body.users, ...sponsors, ...products];
        activeForm = '';
        searchValue = '';
        showForm = false;
        results = []
        addToast({ message: response.message, type: 'success', timeout: 5000 });
        goto(`/dashboard`);
    }

    // We gebruiken Sveltekits reactive declaration om de resultaten te filteren
    $: results = searchValue ? 
        allItems.filter(item => 
            (item.username || item.name || item.title).toLowerCase().includes(searchValue.toLowerCase())
        ) : [];

</script>

<Header {data} />

<Toasts />

<main>
    {#if showModal}
        <div class="modal">
            <div class="modal__container">
                <div class="modal__content">
                    <h2>Bent u zeker dat u <strong>{selectedItem.username || selectedItem.name }</strong> wilt verwijderen?</h2>
                    <div id="slider-container">
                        <label for="myRange">Sleep om te verwijderen</label>
                        <input type="range" min="1" max="100" value="0" class="slider" id="myRange"
                        on:change={slideToDelete} on:mouseup={resetSlider} on:touchend={resetSlider}>
                    </div>
                    <button class="button delete" on:click={closeModal}>Annuleren</button>
                </div>
            </div>
        </div>
    {/if}
    {#if showForm}
        {#if activeForm === 'sponsor'}
        <div class="form__modal">
            <SponsorForm on:sponsorformSubmitted={sponsorFormSubmit} on:sponsorformCancelled={closeForm} />
        </div>
        {:else if activeForm === 'product'}
        <div class="form__modal">
            <ProductForm {data} on:productFormSubmitted={productFormSubmit} on:productFormCancelled={closeForm} />
        </div>
        {:else if activeForm === 'user'}
        <div class="form__modal">
            <ToggleUserStatus {selectedItem} {data} on:userFormSubmitted={userFormSubmit} on:userFormCancelled={closeForm}/>
        </div> 
        {/if}
    {/if}
    <div class="container">
        <div class="title">
            <h1>Welkom {data.username}</h1>
        </div>
        <div class="buttons" id="Search">
            <button class="button" on:click={showSponsorForm}>+ Voeg een nieuwe sponsor toe</button>
            <button class="button" on:click={showProductForm}>+ Voeg een nieuw product toe</button>
        </div>
        <div class="search" id="generalSearch">
            <label for="search">Zoek gebruikers / sponsors / producten</label>
            <input type="text" id="search" bind:value={searchValue} name="search" placeholder="Suzanne Verspecht">
        </div>
        <div class="results" id="generalResults">
            {#if !searchValue}
            <div class="no-results">
                <h2>Maak uw zoekopdracht</h2>
            </div>
            {/if}
            {#if results.length > 0} 
                <div class="result__guidelines">
                    <p class="result__title">Naam</p>
                    <p class="result__type">Soort</p>
                    <p class="icon">Gebruikersrol</p>
                    <p class="icon">Verwijderen?</p>
                </div>
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                {#each results as result}
                <!-- <div>{result.username || result.name || result.title}</div> -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="result">
                    <p class="result__title">{result.username || result.name}</p>
                    {#if result.username}
                        <p class="result__type">Gebruiker</p>
                            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                            {#if result.admin}
                            <p class="result__role icon" on:click={showUserForm(result)}>🫅🏻</p>
                            {:else if result.sponsor}
                            <p class="result__role icon" on:click={showUserForm(result)}>💰</p>
                            {:else} 
                            <p class="result__role icon" on:click={showUserForm(result)}>🙍🏼‍♂️</p>
                            {/if}
                    {:else if result.name && result.owner}
                        <p class="result__type killMargin">Sponsor</p>
                    {:else if result.name && result.points}
                        <p class="result__type killMargin">Product</p>
                    {/if}
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <p class="result__delete icon" on:click={()=> openModal(result)}>❌</p>
                </div>
                {/each}
                {:else if !results.length && searchValue}
                <div class="no-results">
                    <h2>Er zijn geen resultaten gevonden</h2>
                </div>
            {/if}
        </div>
    </div>
    <section class="form-container">
        <div class="form_content" id="sponsorForm">
            <h2>Voeg een nieuwe sponsor toe</h2>
            <div class="form__content">
                <SponsorForm on:sponsorformSubmitted={sponsorFormSubmit} on:sponsorformCancelled={closeForm} />
            </div> 
        </div>
        <div class="form_content" id="productForm">
            <h2>Voeg een nieuw product toe</h2>
            <div class="form__content">
                <ProductForm {data} on:productFormSubmitted={productFormSubmit} on:productFormCancelled={closeForm} />
            </div>    
        </div>
    </section> 
</main>

<style>
    main {
        overflow: hidden;
        background-color: hsl(167, 46, 98);
        max-width: 100vw;
        height: auto;
    }
    .container {
        height: 100%;;
        margin-inline: 25px;
    }
    .container h1 {
        font-size: 1.6rem;
        color: Black;
        font-weight: bold;
        margin-bottom: 8px;
    }
    .title {
        height: auto;
    }
    .search, .results, .buttons {
        height: auto;
        width: 100%;
        margin: 2rem auto;
    }
    .search{
        margin-top: 0rem;
    }
    .results {
        height: auto;
    }.results h2 {
        font-size: 1rem;
        font-weight: bold;
        color: bold;
        text-indent: 1rem;
    }
    .result {
        display: grid;
        grid-template-columns: 50% 20% 15% 15%;
        align-items: center;
        width: 100%;
        padding: 0.5rem 0;
        padding-bottom: 3px;
        margin-bottom: 0.5rem;
        background-color: rgb(165, 165, 165);
        min-height: 4rem;
        height: auto;
        border-radius: 5px;
    }
    .result:nth-child(odd) {
        background-color: #e2e2e2;
    }
    .result__delete {
        font-size: 1rem;
        width: fit-content;
        text-align: center;
        font-weight: bold;
        grid-column: 4;
    }
    .result__role {
        font-size: 0.8rem !important;
        margin: 0;
        width: fit-content;
        text-align: center;
        font-weight: bold;
    }
    .icon {
        padding: 0.5rem;
        transition: all 0.3s ease-in-out;
        margin: auto;
        font-size: 0.7rem !important;
    }
    .icon:hover {
        cursor: pointer;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.432);
        transition: all 0.3s ease-in-out;
    }
    .result__title {
        font-size: 0.7rem !important;
        font-weight: bold;
        margin: 0;
        min-height: 20px;
        line-height: 20px;
        padding: 0 1rem;
    }
    .result__type {
        font-size: 0.6rem !important;
    }
    label {
        font-size: 0.8rem;
        margin: 2vh 0;
    }
    input[type='text'] {
        border-radius: 5px;
        height: 2.5rem;
        border: none;
        color: black;
        padding: 0 1rem;
        transition: all 0.3s ease-in-out;
        background-color: #eeeeee;
        box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
        position: relative;
        width: 100%;
        margin-top: 0.3rem;
    }
    button {
        border-radius: 5px;
        height: 2.5rem;
        width: 100%;
        border: none;
        color: white;
        padding: 0;
        transition: all 0.3s ease-in-out;
        background-color: #6D8C89;
        margin-bottom: 1rem;
        box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
    }
    button:hover {
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.344);    
    }
    .modal {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background-color: rgba(58, 58, 58, 0.89);
        padding: 20px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 1000;
    }
    .modal__container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    .modal__content {
        width: 100%;
        height: fit-content;
        max-width: 500px;
        max-height: 500px;
        background-color: hsl(167 46% 38% / 1);
        border-radius: 10px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: 2px 4px 10px rgb(0, 0, 0, 0.23);
    }
    .modal__content > * {
        margin-top: 2rem;
    }
    .modal__content > h2 {
        font-size: 1rem;
        margin-top: 0.5rem;
        color: white;
    }
    strong {
        font-weight: bold;
        color:#64ffb2;
        font-size: 1.3rem;
    }
    .modal__content> button {
        margin-bottom: 0.5rem;
    }
    #slider-container {
        width: 100%;
    }
    .slider {
        -webkit-appearance: none;
        width: 100%;
        height: 3rem;
        background: #fab4b4;
        outline: none;
        opacity: 1;
        -webkit-transition: .2s;
        transition: opacity .2s;
        border-radius: 5px;
        padding-inline: 0.25rem;
        border: solid 2px #d16c6c;
        transition: all 1.2s ease-out;
        box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
        margin-top: 0.3rem;
    }

    .slider:hover {
        opacity: 1;
    }

    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 5rem;
        height: 2.3rem;
        background: #a10909;
        margin: 1rem 0;
        cursor: pointer;
        border-radius: 3px;
    }
    .form__modal {
        position: fixed;
        width: 100vw;
        height: fit-content;
        bottom: 0;
        left: 0;
        background-color: hsl(167 46% 38% / 1);
        padding: 20px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        border-radius: 20px 20px 0 0;
    }
    .form-container {
        display: none
    }
    .result__guidelines {
        display: none;
    }
    #slider-container > label {
        font-size: 0.7rem;
        color: white;
        margin-bottom: 2rem !important;
    }
    .no-results {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 6rem;
        border-radius: 5px;
        border: 2.5px dashed #c2c2c2 !important;
        box-shadow: none !important;
    }
    .no-results h2 {
        font-size: 1rem;
        font-weight: bold;
        color: #8b8a8a;
        text-indent: 0;
    }
    .delete {
        background-color: #ff6a4c;
    }
    @media (min-width: 1025px) {
        main {
            min-height: calc(90vh - 4rem);
        }
        .container {
            width: calc(80% + 25px);
            margin-inline: auto;
        }
        .search{
            margin-top: 3rem;
        }
        .buttons {
            display: none;
        }
        .result, .result__guidelines {
            display: grid;
            grid-template-columns: 70% 10% 10% 10%;
            align-items: center;
            width: 100%;
            padding: 0.5rem 0;
            padding-bottom: 3px;
            margin-bottom: 0.5rem;
            background-color: rgb(165, 165, 165);
            min-height: 4rem;
            height: auto;
            border-radius: 5px;
        }
        .result__guidelines {
            background-color: #6D8C89;
            color: white;
            font-weight: bold;
            font-size: 0.8rem;
        }
        .result > * {
            font-size: 1rem !important;
        }
        .result__type {
            font-size: 0.8rem !important;
        }
        .form-container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: calc(80% + 25px);
            height: auto;
            margin: 5rem auto;
        }
        .form_content {
            width: 48%;
            height: fit-content;
            background-color: hsl(167 46% 38% / 1);
            border-radius: 20px;
            padding: 1rem;
            box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
        }
        .form_content h2 {
            font-size: 1.3rem;
            font-weight: bold;
            margin-top: 0.5rem;
            color: white;
            margin: 1rem 0;
        }
        .result__delete:hover {
            cursor: pointer;
        }
        .form__modal {
            margin-inline: auto;
            width: calc(80% + 25px);
            right: 0;
            background-color: hsl(167 46% 38% / 1);
            color: black;
        }
    }
    @media (min-width: 1250px) {
        .container, .form-container, .form__modal {
            width: calc(70% - 25px);
        }
    }

    
</style>