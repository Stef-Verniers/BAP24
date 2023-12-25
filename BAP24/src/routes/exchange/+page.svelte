<script lang="ts">
    import Header from "../../components/Header.svelte";
    import Coupon from "../../components/Coupon.svelte";
    import type { PageData } from './$types';
    import { onMount } from "svelte";
    import { addToast } from "../../stores";
    import Toasts from "../../components/Toasts.svelte";
    import { goto } from "$app/navigation";
    export let data: PageData;

    // We maken items aan om de data in op te slaan
    let filterBar: HTMLSelectElement;
    let allItems: Array<object> = [];
    let filtered: Array<object> = [];
    let myCategories: Array<object> = [];
    let showModal = false;
    let selectedCoupon;
    let couponCode = "";
    let isLoading = false;
    let completed = false;
    let exchangedProducts = data.exchangedRewards;

    // Reactive statements
    $: couponCode;
    $: completed;
    $: if (exchangedProducts.length > 0) {
        console.log(exchangedProducts)
    }

    // We maken een array aan met de ids van de reeds ingewisselde producten
    let exchangedIds = exchangedProducts.map(product => product.product.id);

    // We filteren en sorteren producten bij het renderen van de pagina
    onMount(() => {
        allItems = data.products;
        myCategories = data.category;
        filterBar = document.getElementById('filter') as HTMLSelectElement;
        filtered = allItems
            .filter(item => !exchangedIds.includes(item.id))
            .sort((a, b) => a.points - b.points);
    })
    
    // We filteren producten op basis van de categorie
    function filterByCategory(items, categoryId) {
    return categoryId === 'all' 
        ? items 
        : items.filter(item => item.category.id.toString() === categoryId);
    }

    // Met deze functie filteren we de reeds ingewisselde producten uit de lijst
    function excludeExchangedProducts(items, exchangedIds) {
        return items.filter(item => !exchangedIds.includes(item.id));
    }

    // De effectieve filterfunctie
    function filter() {
        let categoryFiltered = filterByCategory(allItems, filterBar.value);
        filtered = excludeExchangedProducts(categoryFiltered, exchangedIds);
    }

    // Openen van modal
    function openModal(coupon) {
        selectedCoupon = coupon;
        console.log(selectedCoupon)
        showModal = true;
        couponCode = "";
    }

    // We bevestigen dat we dit product willen verzilveren
    async function confirmSelection(selectedCoupon) {
        isLoading = true;
        console.log(selectedCoupon)
        const response = await fetch(`/exchange/${selectedCoupon}/redeem`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: selectedCoupon.id,
                userId: data.userId,
                credits: selectedCoupon.points
            })
        });
        const code = await response.json();
        couponCode = code.data;
        completed = true;
        if (!data) {
            addToast({ message: 'We hebben geen code kunnen aanmaken...', type: 'error', timeout: 5000 });
        } else {
            goto(`/exchange/${selectedCoupon.id}/redeemed`);
        }
        showModal = true;
    }

    // Sluiten van modal
    function closeModal() {
        showModal = false;
        couponCode = ""; // Reset de coupon code wanneer de modal gesloten wordt
        isLoading = false; // Zorg ervoor dat isLoading ook gereset wordt
    }

    // Functie om te kijken of de gebruiker voldoende credits heeft
    function isDisabled(item) {
        return item.points > data.credits;
    }

</script>


<Header {data} />

<Toasts />

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

{#if showModal}
    <div class="modal">
        <div class="modal-control">
            <section class="modal-section">
                <h2 class="label">Weet je zeker dat je deze beloning wilt?</h2>
                <div class="item">
                    <h4>{selectedCoupon.name}</h4>
                </div>
                <button class="getCodeButton" on:click={() => confirmSelection(selectedCoupon)} disabled={isLoading}>Ja, ik wil dit</button>
                <p class="closeModal" on:click={closeModal}>Annuleren</p>
            </section>
        </div>
    </div>
{/if}

<main>
    <div class="container">
        <div class="wrapper">
            <h1>Catalogus</h1>
            <p>Denk je dat je voldoende credits verzameld hebt voor een beloning?</p>
            <p>Kijk even in onderstaande lijsten en zie wat je kan gebruiken met je vergaarde credits</p>
        </div>
        <div class="wrapper">
            <div class="filter">
                <select name="filter" id="filter" on:change={filter}>
                        <option value="all">Alle categorieën</option>
                    {#each myCategories as category}
                        <option value={category.id}>{category.category}</option>
                    {/each}
                </select> 
            </div>
            <div class="list">
                {#if filtered.length > 0}
                {#each filtered as product, i}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div class="coupon {isDisabled(product) ? 'disabled' : ''}" on:click={() => openModal(product)}>
                        <Coupon title={product.name} sponsor={product.sponsor.name} points={product.points} />
                    </div>
                {/each}
                {:else}
                    <div class="no__results">
                        <p>Geen producten gevonden</p>
                    </div>
                {/if}
            </div>
        </div>
        <h3>Reeds ingewisselde coupons</h3>
        <div class="exchanged">
            {#if exchangedProducts.length > 0}
                {#each exchangedProducts as coupon, i}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div class="coupon no__teaser" on:click={() => openModal(coupon)}>
                        <Coupon title={coupon.product.name} sponsor={coupon.product.sponsor.name} points={coupon.product.points} />
                    </div>
                {/each}
            {:else}
                <div class="no__results">
                    <p>U heeft nog geen coupons verzilverd</p>
                </div>
            {/if}
    </div>
</main>

<style>
    .no__teaser {
        opacity: 0.4;
        pointer-events: none;
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
    .coupon {
        height: 90px;
        border-radius: 10px;
        background-color: rgb(248, 248, 248);
        box-shadow: 0px 2px 6px rgb(0, 0, 0, 0.23);
        transition: all 0.3s ease-in-out;
        margin-bottom: 1.5rem;
    }
    .coupon:hover {
        cursor: pointer;
        box-shadow: 0px 2px 10px rgb(0, 0, 0, 0.53);
        transition: all 0.3s ease-in-out;
    }
    .disabled {
        opacity: 0.4;
        filter: blur(3px);
        pointer-events: none;
    }
    main {
        overflow: hidden;    
        background-color: hsl(167, 46, 98);
        max-width: 100vw;
        height: auto;
        min-height: min-content;
    }
    .container {
        width: calc(100% - 50px);
        height: 100%;
        margin-inline: 25px;
        margin-bottom: 3rem;
    }
    .wrapper {
        height: auto;
        min-height: 70px;
        width: 100%;
        margin-bottom: 3rem;
    }
    .wrapper h1 {
        font-size: 2rem;
        color: Black;
        font-weight: bold;
        margin-bottom: 8px;
    }
    .wrapper p {
        width: auto;
        font-size: 1rem;
        line-height: calc(1.05rem * 1.3);
    }
    .filter {
        height: 3rem;
        margin-bottom: 1rem;
    }
    .filter > select {
        height: 2.5rem;
        width: 100%;
        border-radius: 5px;
        font-size: 1rem;
        color: black;
        background-color: #eeeeee;
        padding: 0 1rem;
        box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
        outline: none;
        border: 1px solid transparent;
        outline: #ff6a4c;
    }
    .list, .exchanged {
        display: flex;
        flex-wrap: wrap;
    }
    .modal-control {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    section {
        width: 40rem;
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: black;
        border-radius: 5px;
        box-shadow: 2px 4px 10px rgb(0, 0, 0, 0.23);
        padding: 1rem 0;
        background-color: hsl(167 46% 38% / 1);
        padding: 2rem 0;
    }
    section > * {
        margin-bottom: 2rem;
    }
    section > h2 {
        font-size: 1rem;
        width: 80%;
        font-weight: 600;
        color: #eeeeee;
    }
    .label {
      font-size: 0.6rem;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    .getCodeButton {
        background-color: #ff6a4c;
        color: white;
        border-radius: 5px;
        border: none;
        padding: 10px;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        width: 80%;
        box-shadow: 2px 4px 10px rgb(0, 0, 0, 0.23);
    }
    .closeModal {
        border-bottom: 1px white solid;
        font-size: 0.7rem !important;
        font-weight: bold;
        cursor: pointer;
        margin-bottom: 0;
        color: white
    }
    .item {
        background-color: #eeeeee;
        width: 80%;
        min-height: 6rem;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
        border-radius: 5px;
        font-size: 1rem;
        font-weight: bold;
        box-shadow: 2px 4px 10px rgb(0, 0, 0, 0.23);
    }
    h3, h4 {
        font-size: 1.1rem;
        font-weight: bold;
        width: fit-content;
        padding-bottom: 3px;
        border-bottom: 3px solid hsl(165, 56%, 40%);
    }
    h3 {
        margin-bottom: 1rem;
    }
    h4 {
        border-bottom: none;
        font-size: 1.4rem;
        padding-bottom: 0;
        padding-top: 5px;
    }
    .no__results {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 7rem;
        border-radius: 5px;
        border: dashed 3px #eeeeee;
    }
    @media (min-width: 1025px) {
        main {
            min-height: calc(90vh - 4rem);
        }
        .filter > select {
            width: calc(90% - ((100% - 40rem) / 3));
        }
        .list, .exchanged {
            display: flex;
            flex-wrap: wrap;
            gap: calc((100% - 40rem) / 3)
        }
        .container {
            width: calc(80% + 25px);
            margin-inline: auto;
        }
        .coupon {
            width: 20rem;
            margin-top: 2rem;
        }
        .label {
            font-size: 0.7rem;
            margin-bottom: 0.5rem;
            font-weight: 500;
        }
        .item {
            font-size: 1.6rem;
        }
    }
    @media (min-width: 1250px) {
        .container {
            width: calc(70% - 25px);
        }
        .list, .exchanged {
            gap: calc((100% - 40rem) / 4)
        }
        .filter > select {
            width: calc(100% - 25px);
        }
    }
</style>