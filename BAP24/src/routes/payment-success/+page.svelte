<script lang="ts">
    import Header from "../../components/Header.svelte";
    import { navigateTo } from "../../stores";
    import type { PageData } from "../$types";
    export let data: PageData; 
    import { onMount } from "svelte";
    import { writable } from "svelte/store";

    // Functie om door te verwijzen naar een andere pagina met live counter 
    const countdown = writable(5);
    function startCountdown() {
        const interval = setInterval(() => {
            countdown.update(n => {
                if (n === 1) {
                    clearInterval(interval);
                    // navigateTo("/dashboard");
                  }
                return n - 1;
            });
        }, 1000);
    }

    onMount(() => {
        startCountdown();
    });

</script>

<Header {data} />

<main>
    <div class="container">
      <div class="title">
          <h1>Gelukt! ✅</h1>
      </div>
      <div class="redirect">
        <p>Uw betaling is succesvol verwerkt!</p>
        <p>U wordt automatisch doorverwezen naar de homepagina ({$countdown})</p>
    </div>
    </div>
</main>
  
  <style>
      main {
        width: 100%;
        height: calc(90vh - 4rem - 5px);
        position: relative;
    }
    .title {
        color: black;
        height: 4rem;
    }
    .title > h1 {
        font-size: 2rem;
        font-weight: bold;
        text-align: center;
    }
    .container {
        width: calc(100% - 50px);
        height: 100%;
        margin-inline: 25px;
    }
    p {
      font-size: 0.7rem;
    }
    p:first-child {
      margin-bottom: 1rem;
      font-weight: 500;
    }
    .redirect {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: fit-content;
      width: fit-content;
      background-color: #eeeeee;
      padding: 2rem 2rem;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.43);
      min-width: 70%;
      text-align: center;
    }

      @media (min-width: 768px) {

      }
      @media (min-width: 1025px) {
        .container{
          width: 500px;
            margin: auto;
        }
      }
      @media (min-width: 1250px) {}

    </style>