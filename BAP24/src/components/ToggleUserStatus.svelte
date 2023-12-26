<script lang="ts">
import { enhance } from "$app/forms";
import { onMount, tick } from "svelte";
import { createEventDispatcher } from "svelte";
import type { PageData } from "../routes/$types";
export let selectedItem: PageData & { sponsors: any[], rewards: any[], admin }
export let data: PageData

    const dispatch = createEventDispatcher();

    let myForm;
    onMount(() => {
        myForm = document.getElementById('myForm');
    });

    // Functie om de rol van de gebruiker aan te passen
    async function changeRole() {
        const response = await fetch(`/dashboard/admin/edit/role`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: selectedItem,
                role: myForm.role.value,
            })
        });

        const res = await response.json();
        dispatch('userFormSubmitted', res);
    }

    function cancel() {
        dispatch('userFormCancelled');
    }

</script>


<form method="POST" on:change={changeRole} id="myForm" action="/dashboard/admin/edit/role" use:enhance={() => async ({ update }) => {
    await update({ reset: true });
    await tick();
}}>

<div class="roles">
    <label class="switch" for="role">Gebruikersrol voor {selectedItem.username}</label>
    <select class="role__select" name="role">
        <option value="user">Algemene gebruiker</option>
        {#if selectedItem.sponsor}
            <option value="sponsor" selected>Sponsor</option>
        {:else }
        <option value="sponsor">Sponsor</option>
        {/if}
        {#if selectedItem.admin}
            <option value="admin" selected>Administrator</option>
        {:else }
            <option value="admin">Administrator</option>
        {/if}
    </select>
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <p class="cancel" on:click={cancel}>Annuleren</p>
</div>
</form>

<style>
    .roles {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    label {
        color: white;
        font-weight: 500;
        font-size: 0.7rem;
        margin-bottom: 1vh;
    }
    select {
        padding: 0px;
        border-radius: 8px;
        width: 100%;
        height: 2.5rem;
        text-indent: 0.5rem;
        font-size: 0.9rem;
        box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
    }
    select:hover {
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
        margin-inline: auto;
        width: fit-content;
    }

    @media (min-width: 1025px) {
        /* label {
            color: whit
        }
        .cancel {
            color: black;
        } */
    }
</style>