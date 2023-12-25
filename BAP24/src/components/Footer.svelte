<script>
    import Logo from "./Logo.svelte";
    import { onMount } from "svelte";

    let homepage;

    onMount(() => {
        homepage = window.location.pathname === "/";
    });

    $: homepage


</script>

{#if homepage}
    <footer class="homepage">
        <div class="footer-container">
            <div class="logo">
                <Logo width=180px />
            </div>
            <div class="disclaimer">
                <span>&copy; BAP24 | Arteveldehogeschool 2023 - 2024</span>
            </div>
        </div>
    </footer>	
{:else}
    <footer class="regularpage">
        <div class="footer-container">
            <div class="logo">
                <Logo width=180px />
            </div>
            <div class="disclaimer">
                <span>&copy; BAP24 | Arteveldehogeschool 2023 - 2024</span>
            </div>
        </div>
    </footer>
{/if}

<style>
    footer {
        height: auto;
        padding: 50px 25px;
        background-color: hsl(167 46% 38% / 1);
        overflow: hidden;
    }
    .regularpage {
        background-color: hsl(167 46% 38% / 1);
        padding: 3rem 25px;
    }
    .footer-container > * {
        padding: 0.5rem 0;
    }
    .disclaimer > span {
        font-size: 12px;
        color: rgb(233, 233, 233);
        margin-top: 2rem;
    }
    @media (min-width: 1025px) {
        footer {
            position: absolute;
            padding-top: 15vh;
            z-index: 1;
            width: 100%;
        }
        .disclaimer {
            margin-top: 2rem;
        }
        .footer-container {
            width: calc(90% - 80px );
            margin: auto;
            height: auto;
        }
    }
    @media (min-width: 1250px) {
        footer {
            padding-top: 20vh;
        }
        .footer-container {
            width: 70%;
            margin: auto;
        }
    }
</style>