<script lang="ts">
// @ts-nocheck
    import Header from '/src/components/Header.svelte';
    import Footer from '/src/components/Footer.svelte';
    import Sponsors from '/src/components/Sponsors.svelte';
    import Image from '/src/components/Image.svelte';
    import type { PageData } from './$types';
    export let data: PageData;
</script>

<Header {data} />

<main>
    <section class="section hero">
        <div class="section-text">
            <h1>Een platform met een échte bijdrage</h1>
            <p>Welkom op BAP24, een platform gericht naar studenten die hulp nodig hebben bij het zoeken naar deelnemers van jouw thesis.</p>
            <button class="cta-button"><a href="/register">Registreer je meteen!</a></button>
        </div>
        <div class="section-image hero-image">
            <Image name='hero2.png' shadow=false/>
        </div>
    </section>

    <section class="section">
        <div class="section-text">
            <h2>Een springplank voor een succesvolle thesis</h2>
            <p>Gedaan met hopeloos zitten wachten op mensen die je enquête willen invullen. Publiceer je enquête en onze gebruikers doen de rest.</p>
        </div>
        <div class="section-image">
            <Image name='home1.png' radius=30px/>
        </div>
    </section>

    <section class="section">
        <div class="section-text">
            <h2>Dé academische oplossing tegen een lage prijs</h2>
            <p>Het publiceren van een enquête bedraagt slechts 10 euro. Met deze prijs worden onze kosten en uiteraard de sponsors vergoed die hun diensten aanbieden ten goede van ons product.</p>
        </div>
        <div class="section-image">
            <Image name='home3.png' radius=30px/>
        </div>
    </section>
    
    <section class="section">
        <div class="section-text">
            <h2>Eenvoudiger kan niet</h2>
            <p>Geregistreerde gebruikers kunnen alle enquêtes invullen die bij hun profiel past. Hoe meer enquêtes ingevuld worden, hoe meer credits er te rapen vallen. Met die credits kan je terecht bij erkende sponsors.</p>
        </div>
        <div class="section-image">
            <Image name='home2.png' radius=30px/>
        </div>
    </section>

    <Sponsors />

    <section class="section cta">
        <h3>Klaar voor de start?</h3>
        <h2><a href="/register">Registreer je hier of meld je aan &#x21C0;</a></h2>
    </section>

</main>

<Footer />

<style>
    main {
        overflow: hidden;    
        background-color: hsl(167, 46, 98);
        margin-top: -1rem;    
    }
    section {
        width: calc(100% - 50px);
        margin-inline: 25px;
        height: auto;
        padding-bottom: 50px;
    }
    h1 {
        font-size: 1.8rem;
        font-weight: bold;
        color: rgb(91, 194, 172);
        width: 100%;
        line-height: calc(1.8rem * 1.3);
    }
    h2 {
        font-size: 30px;
        font-weight: bold;
        color: rgb(91, 194, 172);
        margin-bottom: 16px;
    }
    h3 {
        font-size: 26px;
        font-weight: bold;
        color: rgb(111, 190, 173);
        margin-bottom: 8px;
    }
    p {
        font-size: 0.9rem;
        color: rgb(32, 32, 32);
        line-height: calc(0.9rem * 1.3);
    }
    .section-text {
        margin-bottom: 30px;
    }
    .section-image {
        margin-bottom: 30px;
        width: 90%;
        margin-inline: auto;
    }
    .hero {
        height: calc(100vh - 20vh);
        position: relative;
        margin-bottom: 12vh;
    }
    .hero-image {
        position: absolute;
        align-items: center;
        display: flex;
        justify-content: center;
        width: 64%;
        bottom: 0px;
        right: 2.5rem;
        margin-bottom: 0px;
        box-shadow: none;
    }
    .hero > .section-text {
        padding-top: 3vh;
    }
    .hero > .section-text > p {
        margin-top: 1vh;
        width: 90%;
    }
    .cta > h2 > a {
        color: #FF360D;
        line-height: calc(24px * 1.4);
        cursor: pointer;
        text-decoration: none;
    }
    .cta-button {
        width: 20rem;
        height: 3.5rem;
        border: none;
        background-color: #ff6a4c;
        color: white;
        padding: 0;
        font-weight: 600;
        border-radius: 8px;
        padding-inline: 1rem;
        margin-top: 1rem;
        box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
    }
    .cta-button > a {
        color: white;
        text-decoration: none;
        cursor: pointer;
        font-size: 1.3rem;
    }
    
    @media (min-width: 768px) {
        main {
            width: calc(100vw - 17px);
            margin-top: -4rem;
        }
        section {
            width: 90%;
            margin: 0 auto;
            padding: 20px;
        }

        h1 {
            margin-top: 3vh;
            font-size: 46px;
            width: 80%;
            line-height: 110%;
        }

        h2 {
            font-size: 28px;
            margin-bottom: 12px;
        }

        h3 {
            font-size: 24px;
            margin-bottom: 6px;
        }

        p {
            font-size: 18px;
            line-height: 140%;
            width: 90%;
        }

        .hero > .section-text > p {
            width: 90%;
            font-size: 18px;
            margin-top: 1vh;
            line-height: 160%;
        }

        .section-text {
            margin-bottom: 20px;
        }

        .section-image {
            margin-top: 40px;
            margin-bottom: 20px;
            width: 100%;
            margin-left: 0;
            height: fit-content;
        }

        .hero {
            height: calc(100vh - 16vh);
            margin-bottom: 5vh;
        }

        .hero-image {
            width: 59%;
            margin-left: auto;
            right: 0;
        }

        .cta > h2 {
            color: #FF360D;
        }

        section {
            margin-bottom: 50px;
        }
    }

    @media (min-width: 1025px) {
        section {
            width: 80%;
        }
        h2 {
            width: 80%;
        }
        .section-text {
            width: 50%;
            margin: 0;
        }
        .section-text > p {
            width: 100%;
        }
        .section-image {
            width: 80%;
        }
        .hero {
            flex-direction: column;
            width: 90%;
        }
        .hero > .section-text {
            width: inherit;
        }
        .hero > .section-text > h1 {
            width: 60%;
        }
        .hero > .section-text > p {
            width: 60%;
        }
        section {
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            justify-content: space-between;
        }
        section h2 {
            line-height: calc(1.6rem * 1.4);
        }
        section > .section-image {
            width: 40%;
        }
        section:nth-child(3) {
            flex-direction: row;
            justify-content: space-between;
        }
        section:nth-child(3) > .section-image {
            margin-right: 0;
        }
        .cta {
            flex-direction: column;
            justify-content: start;
            align-items: start;
            background-color: white;
            box-shadow: 0px 0px 20px rgb(111, 190, 173);
            padding: 5vh 35px;
            border-radius: 25px;
            transform: translate(-50%, -9vh);
            position: absolute;
            z-index: 333;
            width: 80%;
            left: 50%;
            height: fit-content;
        }
        .cta > * {
            margin-inline-start: 35px;
            margin-bottom: 0px;
            line-height: 140%;
        }

        @keyframes swing {
            0% {
                transform: translateX(0);
            }
            25% {
                transform: translateX(15px);
            }
            50% {
                transform: translateX(0px);
            }
            75% {
                transform: translateX(15px);
            }
            100% {
                transform: translateX(0px);
            }
            }

        .cta > h2 {
            animation: swing 4s infinite; /* 'swing' is de naam van de keyframes, 2s is de duur van de animatie, 'infinite' herhaalt de animatie continu */
        }
    }

    @media (min-width: 1250px) {
        section {
            width: 70%;
        }
        .hero {
            width: 100%;
        }
        .hero > .section-text {
            width: 70%;
        }
        .hero > .section-text > h1 {
            width: 40%;
            margin-top: 15vh;
        }
        .hero > .section-text > p {
            width: 50%;
        }
        .hero-image {
            right: 10%;
            width: 40%;
        }
        .cta {
            padding: 80px 10px;
            transform: translate(-50%, -13vh);
        }
        .cta > * {
            margin-inline-start: 115px;
        }
    }
</style>