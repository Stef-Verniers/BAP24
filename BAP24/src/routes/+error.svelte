<script>
import { page } from "$app/stores";
import Logo from "../components/Logo.svelte";
import { onMount } from "svelte";
import { writable } from 'svelte/store';
import { goto } from '$app/navigation';


// Functie om door te verwijzen naar een andere pagina met live counter 
const countdown = writable(5);
function startCountdown() {
    const interval = setInterval(() => {
        countdown.update(n => {
            if (n === 1) {
                clearInterval(interval);
                // window.history.back(); 
            }
            return n - 1;
        });
    }, 1000);
}

onMount(() => {
    startCountdown();
});

</script>

<main>
    <div class="logo">
        <Logo />
    </div>
    <div class="container">
        <h1>{$page.status} {$page.error.message}</h1>
        <p>U wordt automatisch doorverwezen ({$countdown})</p>
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100vw;
        background-color: hsl(167 46% 38% / 1);
    }
    .container {
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
    }
    .container > p {
        font-size: 0.8rem !important;
    }
    .logo {
        width: 10rem;
        margin-bottom: 3rem;
    }
    h1 {
        color: red;
        font-weight: bold;
        margin: 0.5rem;
        font-size: 1.3rem;
    }
    @media (min-width: 768px) {
        .container {
            padding: 4rem 0rem;
            max-width: 400px;
            min-width: 50%;
        }
        .logo {
            width: 15rem;
        }
        h1 {
            font-size: 2rem;
        }
    }
    @media (min-width: 1025px) {
        .container {
            padding: 4rem 0rem;
            max-width: 400px;
            min-width: 40%;
        }
        .logo {
            width: 15rem;
        }
        h1 {
            font-size: 2rem;
        }
    }
</style>