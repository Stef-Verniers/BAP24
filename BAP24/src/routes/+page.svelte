<script>
    import Header from '../components/Header.svelte';
    import Footer from '../components/Footer.svelte';
    import Sponsors from '../components/Sponsors.svelte';
    import Image from '../components/Image.svelte';
</script>

<Header />

<main>
    <section class="section hero">
        <div class="section-text">
            <h1>Een platform met een échte bijdrage</h1>
            <p>Welkom op BAP24, een platform gericht naar studenten die hulp nodig hebben bij het zoeken naar deelnemers van jouw thesis.</p>
        </div>
        <div class="section-image">
            <Image id='hero' width=100% name='hero_sm.png'/>
        </div>
    </section>

    <section class="section">
        <div class="section-text">
            <h2>Een springplank voor een succesvolle thesis</h2>
            <p>Gedaan met hopeloos zitten wachten op mensen die je enquête willen invullen. Publiceer je enquête en onze gebruikers doen de rest.</p>
        </div>
        <div class="section-image">
            <Image width=100% name='home1.jpg' radius=30px/>
        </div>
    </section>
    
    <section class="section">
        <div class="section-text">
            <h2>Eenvoudiger kan niet</h2>
            <p>Geregistreerde gebruikers kunnen alle enquêtes invullen die bij hun profiel past. Hoe meer enquêtes ingevuld worden, hoe meer credits er te rapen vallen. Met die credits kan je terecht bij erkende sponsors.</p>
        </div>
        <div class="section-image">
            <Image width=100% name='home2.jpg' radius=30px/>
        </div>
    </section>
    
    <section class="section">
        <div class="section-text">
            <h2>Dé academische oplossing tegen een lage prijs</h2>
            <p>Het publiceren van een enquête bedraagt slechts 10 euro. Met deze prijs worden onze kosten en uiteraard de sponsors vergoed die hun diensten aanbieden ten goede van ons product.</p>
        </div>
        <div class="section-image">
            <Image width=100% name='home3.jpg' radius=30px/>
        </div>
    </section>

    <section class="section cta">
        <h3>Klaar voor de start?</h3>
        <h2>Registreer je hier of meld je aan &#x21C0;</h2>
    </section>

</main>

<Sponsors />

<Footer />

<style>
    main {
        width: 100vw;
    }
    section {
        width: calc(100vw - 50px);
        margin-inline: 25px;
        height: auto;
        padding-bottom: 50px;
    }
    h1 {
        font-size: 38px;
        font-weight: bold;
        color: rgb(91, 194, 172);
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
        font-size: 16px;
        color: rgb(111, 190, 173);
        line-height: 160%;
    }
    .section-text {
        margin-bottom: 30px;
    }
    .section-image {
        margin-bottom: 30px;
    }
    .hero {
        height: calc(100vh - 15vh);
        padding-top: 3vh;
        position: relative;
        margin-bottom: 3vh;
    }
    .cta > h2 {
        color: #FF360D;
    }
</style>