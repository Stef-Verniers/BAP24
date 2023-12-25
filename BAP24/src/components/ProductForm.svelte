<script lang="ts">
    import { enhance } from "$app/forms";
    import { onMount, tick } from "svelte";
    import { createEventDispatcher } from "svelte";
    import type { PageData } from "../routes/$types";
    export let data: PageData & { sponsors: any[], rewards: any[] };

    const { sponsors, rewards } = data;
    const dispatch = createEventDispatcher();

    let myForm;
    onMount(() => {
        myForm = document.getElementById('myForm');
    });
    
    // We voegen een nieuwe product toe aan de database
    async function handleSubmit(event) {

        event.preventDefault();

        const response = await fetch('/dashboard/admin/create/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: myForm.name.value,
                description: myForm.description.value,
                points: myForm.points.value,
                sponsor: myForm.sponsor.value,
                category: myForm.category.value
            })
        });

        const res = await response.json();
        dispatch('productFormSubmitted', res);
    }

    function cancel() {
        dispatch('productFormCancelled');
    }

</script>

<form method="post" on:submit={handleSubmit} id="myForm" action="/dashboard/admin/create/product" use:enhance={() => async ({ update }) => {
    await update();
    await tick();
}}>
    <label for="name">Naam van het product</label>
    <input type="text" id="name" name="name" placeholder="Kumpir mix" required />

    <label for="description">Beschrijving</label>
    <textarea id="description" name="description" placeholder="Een lekkere snack die je best zonder groentjes neemt!" required />

    <label for="points">Aantal punten</label>
    <input type="number" id="points" name="points" placeholder="20" required />

    <label for="sponsor">Voor welke sponsor?</label>
    <select name="sponsor" id="sponsor">
        <option disabled selected>Kies een sponsor</option>
        {#each sponsors as sponsor}
            <option value={sponsor.id}>{sponsor.name}</option>
        {/each}
    </select>

    <label for="category">Tot welke categorie behoort dit?</label>
    <select name="category" id="category">
        <option disabled selected>Kies een productcategorie</option>
        {#each rewards as prodcat}
            <option value={prodcat.id}>{prodcat.category}</option>
        {/each}
    </select>

    <button type="submit">Submit</button>
</form>

    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <p class="cancel" on:click={cancel}>Annuleren</p>

<style>
    form {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
    }

    label {
        color: white;
        font-weight: 500;
        margin-bottom: 1vh;
        font-size: 0.8rem;
    }

    input, select, option, textarea { 
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid #ccc;
        margin-bottom: 2rem;
        box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
    }
    textarea {
        height: 5rem;
        line-height: calc(0.8rem * 1.3);
    }
    option {
        height: 30px;
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid #ccc;
        margin-bottom: 2rem;
        box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
        background-color: white;
    }
    button {
        border-radius: 8px;
        width: 100%;
        height: 2.2rem;
        border: none;
        background-color: #ff6a4c;
        color: white;
        padding: 0;
        font-weight: 600;
        box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
    }
    button:hover {
        cursor: pointer;
    }
    .cancel {
        text-align: center;
        color: white;
        font-size: 0.7rem !important; 
        cursor: pointer;
        text-decoration: underline;
        padding-bottom: 1px;
        margin-top: 1rem;
    }
</style>