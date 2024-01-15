<script lang="ts">
    import Header from "../../components/Header.svelte";
    import Footer from "../../components/Footer.svelte";
    import type { PageData } from './$types';
    import { onMount } from "svelte";
    import { addToast } from "../../stores";
    import Toasts from "../../components/Toasts.svelte";
    import { makeDateReadable } from "../../stores";
    import { navigateTo } from "../../stores";
    import Percentage from "../../components/Percentage.svelte";
    export let data: PageData;

    let credits;

    // onMount om wat zaken in te laden als onze pagina wordt gerendered
    onMount(() => {

        // Hebben we eventueel een Toast?
        const toast = JSON.parse(localStorage.getItem("toast") as string);
        if (toast) {
            addToast(toast);
            localStorage.removeItem("toast"); // Vergeet niet de toast te verwijderen na het tonen
        }

        // We vragen de credits van de huidige gebruiker op
        credits = data.user?.credits;

        // We kijken of de gebruiker credits heeft, zo ja, dan kunnen we de knop om naar de exchange pagina te gaan activeren
        const exchange = document.querySelector('#exchange');
        if (credits) {
            exchange?.classList.remove('disabled');
        }

        // We kijken of de gebruiker een enquête heeft om al dan niet data te tonen
        const mySurvey = document.querySelector('.survey');

        // We kijken of de gebruiker een enquête heeft en of deze zichtbaar is zodat we deze kunnen verwijderen
        const bruteActions = document.querySelector('.remove-survey');
        if (!data.getSurvey?.isVisible) {
            mySurvey?.classList.add('disabled');
            bruteActions?.classList.remove('hidden');
        } else {
            mySurvey?.classList.remove('disabled');
            bruteActions?.classList.add('hidden');
        }
    });

    // Functie om de enquête te deactiveren
    async function deactivate() {
        const response = await fetch(`/surveys/${data.getSurvey?.id}/deactivate`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: data.getSurvey?.id,
                userId: data.userId
            })
        });
        if (response.status === 403) {
            addToast({ message: 'Er ging iets mis, probeer het later opnieuw..', type: 'error', timeout: 5000 });
        } else {
            localStorage.setItem("toast", JSON.stringify({ message: 'Uw enquête werd met succes gedeactiveerd!', type: 'success', timeout: 5000 }));
            window.location.reload();
        }
    }

    // Functie om de enquête te heractiveren
    async function reactivate() {
        const response = await fetch(`/surveys/${data.getSurvey?.id}/reactivate`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: data.getSurvey?.id,
                userId: data.userId
            })
        });
        if (response.status === 403) {
            addToast({ message: 'Er ging iets mis, probeer het later opnieuw..', type: 'error', timeout: 5000 });
        } else {
            localStorage.setItem("toast", JSON.stringify({ message: 'Uw enquête werd met succes geheractiveerd!', type: 'success', timeout: 5000 }));
            window.location.reload();
        }
    }
    // Functie om de enquête te verwijderen
    async function destroy() {
        const response = await fetch(`/surveys/${data.getSurvey?.id}/destroy`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: data.getSurvey?.id,
                userId: data.userId
            })
        });
        if (response.status === 403) {
            addToast({ message: 'Er ging iets mis, probeer het later opnieuw..', type: 'error', timeout: 5000 });
        } else {
            localStorage.setItem("toast", JSON.stringify({ message: 'Uw enquête werd met succes verwijderd!', type: 'success', timeout: 5000 }));
            window.location.reload();
        }
    }
</script>

<Header {data} />

<Toasts />

<main>
    <section class="welcome">
        <h1 class="welcome-title">Welkom {data.username}</h1>
    </section>
    <div class="container">
        <section class="points">
            <h2>Mijn punten</h2>
            <div class="item">
                <p>U heeft op dit moment <strong>{credits} </strong>credits</p>
            </div>
            <div class="item">
                <button class="enq" on:click={() => navigateTo('/surveys')}>Enquêtes invullen</button>
            </div>
            <div class="item">
                <button id="exchange" class="pnt disabled" on:click={() => navigateTo('/exchange')}>Punten inwisselen</button>
            </div>
        </section>
        {#if data?.getSurvey && data.getSurvey?.isVisible && data.getSurvey?.isPaid}
        <section class="survey">
            <h2>Mijn enquête:</h2>
            <div class="item">
                <p>Uw survey loopt nog tot:</p>
                <p class="info">{makeDateReadable(data.getSurvey?.deadline)}</p>
            </div>
            <div class="item">
                <p>Het aantal respondenten:</p>
                <div class="flex-wrapper">
                    <Percentage quota={data.getSurvey.quota} respondents={data.getSurvey.respondents} />
                </div>
            </div>
            <div class="item">
                <button class="enq" on:click={() => navigateTo(`/surveys/statistics/${data.userId}`)}>Bekijk antwoorden</button>
            </div>
            <div class="item">
                <button class="enq" on:click={() => navigateTo(`/surveys/${data.getSurvey?.id}/show`)}>Bekijk mijn enquête</button>
            </div>
            <div class="item">
                <button class="enq deact" on:click={deactivate}>Deactiveer mijn enquête</button>
            </div>
        </section>
        {:else if data?.getSurvey && data.getSurvey?.isVisible && !data.getSurvey?.isPaid}
        <section class="survey">
            <h2>Mijn enquête:</h2>
            <div class="item">
                <p>U hebt nog niet betaald</p>
            </div>
            <div class="item">
                <p>Klik op onderstaande link om uw publicatie te betalen</p>
            </div>
            <div class="item">
                <button class="enq payment" on:click={() => navigateTo(`/surveys/add/payment/${data.getSurvey?.id}`)}>Betaal uw publicatie</button>
            </div>
        </section>
        {:else if data?.user?.sponsor}
        <section class="no-survey">
            <h2>Mijn enquête:</h2>
            <div class="item">
                <p>Sponsors kunnen geen enquêtes aanmaken</p>
            </div>
        </section>
        {:else }
        <section class="no-survey">
            <h2>Mijn enquête:</h2>
            <div class="item">
                <p>U heeft op dit moment geen enquête lopen</p>
            </div>
            <div class="ns-button">
                {#if data.getSurvey?.isPaid && data.getSurvey?.isCreated && !data.getSurvey?.isVisible}
                    <button class="enq ns disabled" disabled>Verwijder eerst uw gedeactiveerde enquête</button>
                {:else}
                    <button class="enq ns" on:click={() => navigateTo('/surveys/add')}>enquête publiceren</button>
                {/if}
            </div>
        </section>
        {/if}
        {#if data?.getSurvey && !data.getSurvey?.isVisible}
            <section class="remove-survey hidden">
                <div class="item">
                    <p>U hebt uw enquête uitgeschakeld. U kan deze terug heractiveren of definitief verwijderen</p>
                </div>
                <div class="item">
                    <button class="enq" on:click={reactivate}>Heractiveer mijn enquête</button>
                </div>
                <div class="item">
                    <p class="warning">Een enquête verwijderen kan niet ongedaan gemaakt worden!</p>
                    <button class="enq delete" on:click={destroy}>Verwijder mijn enquête</button>
                </div>
            </section>
        {/if}
        <section class="data">
            <h2>Mijn gegevens</h2>
            <div class="data-container">
                <div class="data-item">
                    <p>🧠 Leeftijdscategorie</p>
                    <h3>{data.age?.category}</h3>
                </div>
                <div class="data-item">
                    <p>🌍 Nationaliteit</p>
                    <h3>{data.nationality}</h3>
                </div>
                <div class="data-item">
                    <p>⚧️ Geslacht / Gender</p>
                    <h3>{data.sex?.sex}</h3>
                </div>
                <div class="data-item">
                    <p>🛠️ Huidig beroepsstatuut</p>
                    <h3>{data.occupation?.occupation}</h3>
                </div>
                <div class="data-item">
                    <p>📓 Studieveld / Werkomgeving</p>
                    <h3>{data.department?.department}</h3>
                </div>
            </div>
        </section>
    </div>
</main>

<Footer />

<style>
    .hidden {
        display: none;
    }
    .deact {
        background-color: rgb(250, 142, 41) !important;
    }
    .delete {
        background-color: #ac1111 !important;
    }
    .disabled {
        opacity: 0.5;
        pointer-events: none;
    }
    .enq {
        background-color: #6D8C89;
        margin-bottom: 25px;
    }
    .pnt {
        background-color: #ff6a4c;
    }
    main { 
        background-color: hsl(167, 46, 98);
    }
    section {
        width: calc(100% - 50px);
        margin-inline: 25px;
        height: auto;
        margin-top: 2rem;
        margin-bottom: 2rem;
    }
    .welcome {
        text-align: left;
        font-size: 1.3rem;
    }
    .points, .no-survey, .survey, .data, .remove-survey {
        height: auto;
        background-color: #f1f1f1;
        display: flex;
        box-shadow: 2px 4px 10px rgb(0, 0, 0, 0.23);
        justify-content: center;
        flex-direction: column;
        align-items: center;
        border-radius: 8px;
    }
    .welcome-title {
        font-size: 1.3rem;
        font-weight: 600;
        margin: 0;
    }
    section > * {
        margin-top: 25px;
    }
    button {
        border-radius: 10px;
        width: 100%;
        height: 2.5rem;
        border: none;
        color: white;
        padding: 0;
        transition: all 0.3s ease-in-out;
        box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
    }
    h2 {
        font-weight: 600;
        text-align: left;
        width: 85%;
        padding-bottom: 1vh;
        border-bottom: #6D8C89 3px solid;
    }
    section > .item {
        padding-top: 25px;
        width: 85%;
        margin: auto;
    }
    .info {
        font-size: 1.1rem !important;
        font-weight: 600;
        margin-top: 0.6rem;
    }
    .item > button {
        margin-bottom: 0;
    }
    .item:nth-last-child(1) > button {
        margin-top: 0;
        margin-bottom: 25px;
    }
    .data-container {
        height: auto;
        width: 85%;
        display: grid;
        grid-template-rows: repeat(5, 65px);
    }
    .data-item > p {
        font-size: 0.8rem;
    }
    .data-item > h3 {
        font-weight: 600;
        margin-top: 0.6vh;
        font-size: 1.1rem;
    }
    .remove-survey {
        line-height: calc(1.1rem * 1.3);
    }
    .warning {
        color: #ac1111;
        font-weight: 600;
        font-size: 1.1rem;
        margin-top: 2vh;
        margin-bottom: 1vh;
    }
    button:hover {
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.344);    
    }
    .ns-button {
            width: 85%;
    }
    @media (min-width: 768px) {
        main {
            width: calc(100vw - 20%);
            min-height: calc(100vh - 10vh);
            margin: auto;
            height: auto;
        }
        .welcome {
            margin-bottom: 3rem;
        }
        .container {
            margin: auto;
            display: grid;
            grid-template-columns: 50% 46%;  
            grid-template-rows: repeat(12, 75px);  
            row-gap: 2rem;
            column-gap: 2rem;
            margin-bottom: 0rem;
            height: auto;
        }
        section {
            width: 100%;
            margin: auto;
            height: fit-content;
        }
        .points, .no-survey, .data {
            height: 100%;
        }
        .points {
            grid-row: 1/4;
            grid-column: 2;
        }
        .points > .item:nth-child(2) {
            padding-top: 25px;
            margin-top: 0px;
        }
        .points > .item:nth-child(3) {
            padding-top: 25px;
            margin: 0px;
        }
        .points > .item:nth-last-child(1) {
            padding-top: 25px;
            margin: 0px;
        }
        .item > button {
            margin-bottom: 0;
        }
        .no-survey {
            grid-row: 1/4;
            grid-column: 1;
        }
        .no-survey > .item:nth-child(2) {
            padding-top: 25px;
            margin-top: 0px;
        }
        .ns {
            width: 100%;
        }
        .no-survey button {
            width: 100%;
        }
        .survey {
            width: 100%;
            margin: auto;
            height: fit-content;
            grid-row: 1/4;
            grid-column: 1;
        }
        .data {
            margin-top: 2vh;
            grid-row: 4;
            grid-column: 2;
            width: 100%;
            margin: auto;
            height: fit-content;
            margin-top: 0;
        }
        .remove-survey {
            grid-row: 4;
            grid-column: 1;
            display: grid;
        }
        .remove-survey > .item {
            padding-top: 25px;
            margin-top: 0px;
        }
        .remove-survey > .item > button {
            margin: 0px;
        }
        .remove-survey > .item:nth-last-child(1) {
            margin-bottom: 25px;
        }
        .hidden {
            display: none;
        }
        button:hover {
            cursor: pointer;
        }
    }
    @media (min-width: 1250px) {
        main {
            width: calc(70% - 25px);
        }
        .container {
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(7, 85px);
            margin-bottom: 15vh;
            margin: auto;
        }
        section {
            width: 100%;
        }
        .survey {
            grid-column: 1;
        }
        .points {
            grid-column: 2;
        }
        .data {
            grid-column: 3;
            grid-row: 1;
        }
        .remove-survey {
            grid-row: 4;
            grid-column: 1;
        }
    }
</style>