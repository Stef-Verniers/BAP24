<script lang="ts">
    import Header from "../../../../../components/Header.svelte";
    import AnsweredSurvey from "../../../../../components/AnsweredSurvey.svelte";
    import Toasts from "../../../../../components/Toasts.svelte";
    import type { PageServerLoad } from "./$types";
    export let data: PageServerLoad;
</script>

<Header {data} />

<Toasts />

<main>
    <AnsweredSurvey {data} disable=true/>
    <div class="button">
        <button class=".button" on:click={() => window.history.back()}>Terug naar antwoordoverzicht</button> 
    </div>
</main>

<style>
    main {
        overflow: hidden;    
        background-color: hsl(167, 46, 98);
        height: auto;
    }
    .button {
        height: 2.2rem;
        display: flex;
        align-items: end;
        border-radius: 8px;
        display: flex;
        flex-direction: row;
        gap: 2rem;
        width: calc(100% - 50px);
        margin-inline: 25px;
        margin-bottom: 2rem;
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
    @media screen and (min-width: 768px) {
        main {
            margin-bottom: 5rem;
        }
    }
    @media screen and (min-width: 1025px) {
        .button {
            width: 500px;
            margin: auto;
        }
        button {
            margin-inline: auto;
        }
    }
</style>