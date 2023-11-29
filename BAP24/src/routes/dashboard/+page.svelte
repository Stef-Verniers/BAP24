<script lang="ts">
    import Header from "../../components/Header.svelte";
    import Footer from "../../components/Footer.svelte";
    import type { PageData } from './$types';
    export let data: PageData;
</script>

<Header {data} />

<main>
    <section class="welcome">
        <h1>Welkom {data.username}</h1>
    </section>
    <section class="points">
        <span>U heeft op dit moment <strong>0 </strong>credits</span>
        <button class="enq">Enquetes invullen</button>
        <button class="pnt">Punten inwisselen</button>
    </section>
    <section class="surveys">
        <span>U heeft op dit moment geen enquete lopen</span>
        <button class="enq">Enquete publiceren</button>
    </section>
    <section class="data">
        <span>Hier komt er informatie over de ingelogde gebruiker</span>
    </section>
</main>

<Footer />

<style>
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
        text-align: center;
        font-size: 1.3rem;
        font-weight: 500;
        margin-top: 1vh;
    }
    .points, .surveys, .data {
        height: 100%;
        background-color: #f1f1f1;
        box-shadow: 2px 4px 10px rgb(0, 0, 0, 0.23);
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        border-radius: 8px;
    }
    section > * {
        margin-top: 25px;
    }
    .points > button:nth-last-child(1) {
        margin-top: 0;
        margin-bottom: 25px;
    }
    .data > span {
        text-align: center;
        width: 35ch;
        margin-bottom: 25px;
        font-weight: 500;
        color: gray
    }

    button {
        border-radius: 10px;
        width: 15rem;
        height: 2.5rem;
        border: none;
        color: white;
        padding: 0;
    }

    @media (min-width: 768px) {
        main {
            width: calc(100vw - 20%);
            min-height: calc(100vh - 10vh);
            margin: auto;
            display: grid;
            grid-template-columns: repeat(2, auto);  
            grid-template-rows: repeat(3, min-content);  
            row-gap: 2rem;
            column-gap: 2rem;
            margin-bottom: 2rem;
        }
        section {
            width: 100%;
            margin: auto;
            height: fit-content;
        }
        .points, .surveys, .data {
            height: 100%;
        }
        .welcome {
            grid-column: 1;
            grid-row: 1/2;
        }
        .points {
            grid-row: 2;
            grid-column: 1;
        }
        .surveys {
            grid-row: 2;
            grid-column: 2;
        }
        .data {
            grid-row: 3;
            grid-column: 1/3;
        }
    }
    @media (min-width: 1025px) {
        main {
            width: calc(100vw - 20%);
        }
        section {
            width: 100%;
        }
    }
    @media (min-width: 1250px) {
        main {
            width: calc(100vw - 30%);
        }
        section {
            width: 100%;
        }
    }
</style>