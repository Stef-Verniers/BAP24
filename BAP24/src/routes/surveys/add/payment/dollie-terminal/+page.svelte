<script>
import Header from "../../../../../components/Header.svelte";
</script>

<main>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>Publicatie</h1>
                <p>Uw enquête is klaar om gepubliceerd te worden. Kies een betaalmethode om uw enquête te publiceren.</p>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h2>Betaal met echt geld</h2>
                <p>U kunt uw enquête publiceren door te betalen met echt geld. Uw enquête wordt dan direct gepubliceerd.</p>
                <button class="btn btn-primary" on:click={mollie}>Betaal met echt geld</button>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h2>Betaal met credits</h2>
                <p>U kunt uw enquête publiceren door te betalen met credits. Uw enquête wordt dan direct gepubliceerd.</p>
                <button class="btn btn-primary" on:click={credits}>Betaal met credits</button>
            </div>
        </div>
    </div>
</main>

<style>
    main {
        background-image: url(https://wallpapers.com/images/featured-full/dark-blue-gradient-bxh6p6ukqebibgda.jpg);
    }
</style>