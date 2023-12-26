<script lang="ts">
    import Header from "../../../components/Header.svelte";
    import Footer from "../../../components/Footer.svelte";
    import { onMount } from "svelte";
    import { addToast, makeDateReadable } from "../../../stores";
    import Toasts from "../../../components/Toasts.svelte";
    import type { PageServerLoad } from "./$types";
    import ProductForm from "../../../components/ProductForm.svelte";
    export let data: PageServerLoad;
    export let selectedItem;
    

    let showForm = false;
    let showModal = false;
    let products = [];
    let results = [];
    $: products = data.products;
    let searchValue = '';   
    let activeForm = '' ;
    let productForm;
    let slider;

    // We halen de data op van de server tijdens het renderen van de pagina
    onMount(async () => {
        
        // We kijken voor eventuele toasts
        const toast = JSON.parse(localStorage.getItem("toast") as string);
        if (toast) {
            addToast(toast);
            localStorage.removeItem("toast");
        }

        productForm = document.getElementById("productForm");
    })

    // We openen het formulier voor een product toe te voegen
    function showProductForm() {
        showForm = true;
    }

    // We vangen de data op van de productform uit de component
    function productFormSubmit(res) {
        const response = res.detail;
        activeForm = '';
        searchValue = '';
        showForm = false;
        products = [...response.body]
        addToast({ message: 'Met succes toegevoegd!', type: 'success', timeout: 5000 });
    }

    // We sluiten het formulier
    function closeForm() {
        activeForm = '';
        productForm.style.background = 'hsl(167 46% 38% / 1)';
    }

    // We openen een modal
    function openModal(result) {
        selectedItem = result;
        showModal = true;
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
                products = products.filter(product => product.id !== selectedItem.id);
                addToast({ message: 'Met succes verwijderd!', type: 'success', timeout: 5000 });
                // products = res.body;
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

    // We sluiten een modal
    function closeModal() {
        showModal = false
        selectedItem = '';
    }

    // We gebruiken Sveltekits reactive declaration om het huidig gekozen item te vinden in alle items
    $: results = products.filter(item => (item?.username || item?.name || item?.title).toLowerCase().includes(searchValue.toLowerCase()));
    $: products = data.products;


</script>

<Header {data} />
<Toasts />
<main>
    {#if showModal}
    <div class="modal">
        <div class="modal__container">
            <div class="modal__content">
                <h2>Bent u zeker dat u <strong>{selectedItem?.username || selectedItem?.name || selectedItem?.product.name }</strong> wilt verwijderen?</h2>
                <div id="slider-container">
                    <h4 class="slider__label">Sleep om te verwijderen</h4>
                    <input type="range" min="1" max="100" value="0" class="slider" id="myRange"
                    on:change={slideToDelete} on:mouseup={resetSlider} on:touchend={resetSlider}>
                </div>
                <button class="button delete" on:click={closeModal}>Annuleren</button>
            </div>
        </div>
    </div>
    {/if}
    {#if showForm}
        <div class="form__modal">
            <ProductForm {data} on:productFormSubmitted={productFormSubmit} on:productFormCancelled={closeForm} />
        </div>
    {/if}
    <div class="container">
        <div class="intro">
            <h1>Welkom {data.username}</h1>
        </div>
        <div class="mobile-container">
            <div class="form__content">
                <h4 class="product__label">Mijn Producten</h4>
                <div class="results">
                    {#each products as product}
                        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                        <div class="result">
                            <h3>{product.name}</h3>
                            <h3>{product.points}</h3>
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <h3 class="icon" on:click={() => openModal(product)}>🗑️</h3>
                        </div>
                    {/each}
                </div>
                <div class="button">
                    <button class="button product__button" on:click={showProductForm}>+ Voeg een nieuw product toe</button>
                </div>
            </div>
            <section class="form-container">
                <div class="form_content" id="productForm">
                    <h2>Voeg een nieuw product toe</h2>
                    <div class="form__surface">
                        <ProductForm {data} on:productFormSubmitted={productFormSubmit} on:productFormCancelled={closeForm} />
                    </div>    
                </div>
            </section> 
        </div>
        <h4 class="exchange">Verzilverde items</h4>
        <div class="results">
            {#each data?.exchangedProducts as reward}
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="list" on:touchend={() => openModal(reward)}>
                    <h3>{reward.product.name}</h3>
                    <h3>{reward.user.username}</h3>
                    <h3>{makeDateReadable(reward.createdAt)}</h3>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <h3 class="icon screen" on:click={() => openModal(reward)}>🗑️</h3>
                </div>
            {/each}
        </div>
    </div>
</main>
<Footer />

<style>
    main {
        overflow: hidden;    
        background-color: hsl(167, 46, 98);
        max-width: 100vw;
        height: auto;
        min-height: calc(90vh - 2.5rem - 5px);
    }
    .container {
        width: calc(100% - 50px);
        height: 100%;
        margin-inline: 25px;
        margin-bottom: 3rem;
    }
    h4 {
        font-size: 0.7rem;
        margin: 1vh 0;
        font-weight: 600;
    }
    .intro {
        height: auto;
        width: 100%;
        margin-bottom: 3rem;
    }
    .intro h1 {
        font-size: 1.3rem;
        color: Black;
        font-weight: bold;
        margin-bottom: 8px;
    }
    .results {
        height: auto;
    }
    .result, .list {
        display: grid;
        grid-template-columns: 55% 25% 20%;
        align-items: center;
        width: 100%;
        padding: 0.5rem 0;
        padding-bottom: 3px;
        margin: 0.5rem auto;
        background-color: rgb(218, 218, 218);
        min-height: 2.3rem;
        height: auto;
        border-radius: 5px;
        text-align: center;
    }
    .result h3, .list h3 {
        border-right: solid 1px gray;
        font-size: 0.7rem;
    }
    .list {
        grid-template-columns: 33% 33% 33%;
        font-size: 0.7rem !important;
        text-indent: 0.5rem;
        align-items: center;
    }
    .list h3 {
        font-size: 0.7rem;
    }
    .result h3:last-child, .list h3:last-child {
        border-right: none;
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
        margin-inline: auto;
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
        background-color: #ff6a4c;
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
    .slider__label {
        color:white;
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
    .form-container, .screen{
        display: none;
    }
    .icon {
        cursor: pointer;
    }
    @media screen and (min-width: 1025px) {
        main {
            min-height: calc(90vh - 4rem - 5px);
        }
        .container {
            width: calc(80% + 25px);
            margin-inline: auto;
        }
        .form-container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 50%;
            height: auto;
        }
        .form_content {
            width: 100%;
            height: fit-content;
            background-color: hsl(167 46% 38% / 1);
            border-radius: 20px;
            padding: 1rem;
            box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
        }
        .form_content h2, .product__label {
            font-size: 1.3rem;
            font-weight: bold;
            margin-top: 0.5rem;
            color: white;
            margin: 1rem 0;
        }
        .product__label {
            color: black;
            margin: 1rem 0 !important;
        }
        .form__content {
            width: 50%;
            background-color: #eeeeee;
            height: fit-content;
            border-radius: 20px;
            padding: 1rem;
            box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
        }
        .mobile-container {
            display: flex;
            flex-direction: row;
            gap: 3rem
        }
        .results {
            width: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
        }
        .product__button {
            display: none;
        }
        .result {
            grid-template-columns: 70% 15% 15%;
        }
        .list {
            grid-template-columns: 50% 25% 15% 10%;
        }
        .exchange {
            margin-top: 3rem;
        }
        .screen {
            display: block;
            grid-column: 4;
        }
    }
    @media (min-width: 1250px) {
        .container, .form-container, .form__modal {
            width: calc(70% - 25px);
        }
        .form__content {
            width: 100%;
        }
    }

</style>