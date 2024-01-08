<script lang="ts">
    // @ts-nocheck
    import Header from '../../../../../components/Header.svelte';
    import type { PageData } from '../$types';
    export let data: PageData;
    import { addToast } from '../../../../../stores';
    import Toasts from '../../../../../components/Toasts.svelte';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    onMount(() => {
        // Hebben we eventueel een Toast?
        const toast = JSON.parse(localStorage.getItem("toast") as string);
        if (toast) {
            addToast(toast);
            localStorage.removeItem("toast");
        }
    })

    // Functie die mollie aanroept
    async function mollie() {
        console.log('test')
        try {
            const response = await fetch('/api/mollie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    loggedUser: data.userId,
                    surveyTitle: data.surveyName
                })
            });
            const responseData = await response.json();
            sessionStorage.setItem('paymentId', responseData.paymentId);

            // Controleer of de operatie succesvol was en of er een checkout URL is
            if (response.ok && responseData.success && responseData.checkoutUrl) {
                // Omleiden naar de Mollie checkout URL
                window.location.href = responseData.checkoutUrl;
            } else {
                // Toon foutmelding of neem andere actie
                console.error('Fout bij het aanmaken van Mollie betaling:', responseData.message);
            }
        } catch (error) {
        // Vang netwerkfouten of andere fouten op
        console.error('Er is een fout opgetreden:', error);
    }
}

    // Als we niet betalen met echt geld, dan maar met credits
    async function credits() {
    try {
        const response = await fetch('/api/credits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: data.userId
            })
        });

        if (response.ok) {
            localStorage.setItem("toast", JSON.stringify({ message: 'Uw publicatie is succesvol', type: 'success', timeout: 5000 }));
            goto('/dashboard');
        } else {
            addToast({ message: 'U heeft niet voldoende credits om deze optie te kiezen. Vul enquêtes in om meer credits te verdienen', 
                type: 'error', timeout: 5000 });
        }
    } catch (error) {
        console.error(error);
        addToast({ message: 'Netwerkfout, controleer uw verbinding', type: 'error', timeout: 5000 });
    }
}

</script>

<Header {data} />

<Toasts />

<main>
    <div class="wrapper">
        <div class="title">
            <h1>We zijn er bijna!</h1>
            <p></p>
            <p>Om je publicatie: <strong>{data.surveyName}</strong> te finaliseren, hoef je enkel nog te betalen.</p>
        </div>
        <div class="item" class:yes={data.credits >= 25} class:no={data.credits < 25}>
            {#if data.credits >= 25}
                <p>Je hebt <strong>{data.credits}</strong> credits.</p>
                <p>Je kan deze gebruiken om je publicatie te finaliseren met creditpoints.</p>
            {:else}
                <p>Je hebt <strong>{data.credits}</strong> credits.</p>
                <p>Dit zijn er helaas te weinig voor je publicatie hiermee te finaliseren.</p>
                <p>Doe beroep op de alternatieve betaalmethode voor jouw publicatie.</p>
            {/if}
        </div>
        <div class="form" id="myForm">
            <button on:click={mollie}>Betaal €10</button>
            <p>of</p>
            <button on:click={credits}>Betaal 25 creditpoints</button>
        </div>
    </div>
</main>

<style>
    strong {
        font-weight: 600;
    }
    main {
        overflow: hidden;
        background-color: hsl(167, 46, 98);
        max-width: 100vw;
        height: auto;
    }
    .wrapper {
        height: 100%;
        width: calc(100% - 60px);
        margin-inline: 25px;
    }
    .wrapper h1 {
        font-size: 2rem;
        color: Black;
        font-weight: bold;
        margin-bottom: 8px;
    }
    .wrapper p {
        width: 35ch;
        font-size: 0.89rem;
        line-height: calc(1.05rem * 1.3);
    }
    .title {
        height: auto;
    }
    .form {
        height: 80%;
        width: 100%;
        margin-inline: auto;
        display: flex;
        flex-direction: column;
    }
    .form p {
        width: 100%;
        margin: 2vh auto;
        text-align: center;
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
        transition: all 0.3s ease-in-out;
    }
    button:nth-child(3) {
        background-color: rgb(91, 194, 172);
    }
    button:hover {
        cursor: pointer;
        box-shadow: 0px 2px 8px rgb(0, 0, 0, 0.23);
        transition: all 0.3s ease-in-out;
    }
    .item {
        height: auto;
        padding: 1rem 1rem;
        width: 100%;
        margin-top: 2rem;
        margin-bottom: 3rem;
        border-radius: 10px;
    }
    .item p {
        width: auto;
    }
    .item > p:nth-child(2) {
        margin-top: 1rem;
    }
    .no {
        background: #fab4b4;
        border: solid 2px #d16c6c;
        color: #b30000;

    }
    .yes {
        background-color: rgb(205, 255, 227);
        border: 2px solid rgb(108, 202, 133);
        color: rgb(11, 124, 41)
    }
    @media (min-width: 768px) {
        .wrapper {
            width: 500px;
            margin: auto;
        }
        .title > p {
            width: 44ch;
        }
    }
    </style>