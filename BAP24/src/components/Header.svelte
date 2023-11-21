<script lang="ts">
    import Logo from "./Logo.svelte"
    import { enhance } from "$app/forms";
    import type { PageData } from "../routes/$types";
    export let data: PageData;
    console.log(data.userId)

    function toggleMob() {
        const mNav = document.getElementById('mobileNav');
        console.log(mNav)
        mNav?.classList.toggle('hidden');
    }
    function toggleNav() {
        const mNav = document.getElementById('screenNav');
        console.log(mNav)
        mNav?.classList.toggle('hidden');
    }
</script>

<header>
    <div class="header-container">
        <Logo width=120px/>
        <div class="navigation">
            {#if data.userId}
                <button id="icon-lg" on:click={toggleNav}>{ data.username }</button>
                <button id="icon" class="nav-icon" on:click={toggleMob}>
                    <div></div>
                    <div></div>
                    <div></div>
                </button>
            {:else}
                <div>
                    <a href="/login">Inloggen</a>
                    <a href="/register">Registreren</a>
                </div>
            {/if}
        </div>
    </div>
</header>

<div id="mobileNav" class="navigation-mobile-container hidden">
    <ul class="user-nav">
        <a href="/"><li>Mijn dashboard</li></a>
        <form method="post" action="?/logout" use:enhance>
            <input type="submit" value="Uitloggen" />
        </form>
        <button on:click={toggleMob}>Sluit venster</button>
    </ul>
</div>
<div id="screenNav" class="navigation-screen-container hidden">
    <ul class="user-nav">
        <a href="/"><li>Mijn dashboard</li></a>
        <form method="post" action="?/logout" use:enhance>
            <input type="submit" value="Uitloggen" />
        </form>
        <button on:click={toggleNav}>Sluit venster</button>
    </ul>
</div>

<style>
    header {
        width: calc(100vw - 50px);
        border-bottom: solid 1px rgb(233, 233, 233);
        margin-bottom: 3vh;
        box-shadow: 0px 1px 5px rgb(228, 228, 228);
        padding-inline: 25px;
        padding-top: 5px;
    }
    .header-container {
        width: 100%;
        height: calc(10vh - 1px);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .navigation {
        width: 40vw;
        position: relative;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

    }
    .navigation > p {
        font-weight: 600;
    }
    .nav-icon > div {
        width: 80%;
        height: 1px;
        background-color: rgb(179, 179, 179)
    }
    .navigation-mobile-container {
        position: absolute;
        top: 0;
        height: 100vh;
        width: 100vw;
        background-color: rgba(30,30,30,0.5);
        backdrop-filter: blur(5px);
        z-index: 345435;
        display: block;
        visibility: visible; /* Start by hiding the element */
        opacity: 1;
        transition: visibility 0s, opacity 0.3s ease;
    }
    .user-nav {
        width: 90%;
        height: auto;
        margin: 3vh auto;
        background-color: rgb(173, 243, 228);
        border-radius: 10px;
    }
    .user-nav > a, .user-nav > form {
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: black;
        font-weight: 500;
    }
    .user-nav > a > li, .user-nav > form > input {
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        border-bottom: 1px solid rgb(111, 190, 173);
    }
    .user-nav > form > input {
        border: none;
        background-color: rgb(173, 243, 228);
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
    }
    .user-nav > a:nth-last-child(2) > li {
        border-bottom: none;
    }
    button {
        width: 100%;
        border: none;
        height: 2.5rem;
        border-radius: 0px 0px 10px 10px;
        background-color: #e64222;
        color: white;
        font-weight: 600;
        cursor: pointer;
    }
    .nav-icon {
        width: 20px;
        height: 20px;
        border-radius: 5px;
        border: 1px rgb(206, 206, 206) solid;
        cursor: pointer; /* Add this to make it look clickable */
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        padding: 3px;
    }
    #icon {
        background-color: white;
    }
    #icon-lg {
        display: none;
    }
    .hidden {
        display: none;
        opacity: 0;
        transform: translateX(15vw);
    }
    @media (min-width: 768px) {}
    @media (min-width: 1025px) {
        .navigation-screen-container {
            position: fixed;
            top: 0;
            height: 100vh;
            width: 100vw;
            background-color: rgba(30,30,30,0.5);
            backdrop-filter: blur(5px);
            z-index: 345435;
            display: block;
            visibility: visible; /* Start by hiding the element */
            opacity: 1;
            transition: visibility 0s, opacity 0.3s ease;
            overflow-x: hidden;
        }
        #icon {
            display: none;
        }
        #icon-lg {
            display: block;
            border-radius: 10px;
            padding-inline: 15px;
        }
        .navigation {
            justify-content: flex-end;
            width: auto;
        }
        a {
            margin-left: 1rem;
            text-decoration: none;
            color: black;
            font-weight: 500;
        }
        .header-container {
            width: calc(80% + 50px);
            margin: auto;
        }
        #mobileNav {
            display: none;
        }
        #screenNav {
            right: 0;
            width: 12vw;
            padding-inline: 1vw;
        }
        .hidden {
            display: block;
            right: -15vw;
            opacity: 0;
            transition: visibility 0.1s, opacity 0.3s right 0.5s ease;
        }
    }
    @media (min-width: 1200px) {
        .header-container {
            width: 70%;
            margin: auto;
        }
    }
</style>