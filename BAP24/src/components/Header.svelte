<script lang="ts">
    import Logo from "./Logo.svelte"
    import { enhance } from "$app/forms";
    import type { PageData } from "../routes/$types";
    export let data: PageData;

    // Onderstaamde functies kijken naar de schermbreedte
    // toggleMob bepaalt of het de mobiele of de desktop versie wordt getoond
    function toggleMob() {
        const mNav = document.getElementById('mobileNav');
        mNav?.classList.toggle('hidden');
    }
    // toggleNav toggled de navigatie op de full screen versie
    function toggleNav() {
        const mNav = document.getElementById('screenNav');
        mNav?.classList.toggle('hidden');
    }
    // Een extra functie zodat ik hem kan sluiten op onfocusout
    function closeNav() {
        const mNav = document.getElementById('screenNav');
        mNav?.classList.add('hidden');
    }
</script>

<header>
    <div class="header-container">
        <Logo width=120px/>
        <div class="navigation">
            {#if data.userId}
                <a class="header__a" href="/">🏚️ Home</a>
                <a class="header__a" href="/dashboard">📋 Mijn dashboard</a>
                <button id="icon-lg" on:click={toggleNav}>👤 &#11206;</button>
                <button id="icon" class="nav-icon" on:click={toggleMob}>
                    <div></div>
                    <div></div>
                    <div></div>
                </button>
            {:else}
                <div>
                    <a href="/login">🔐 Inloggen</a>
                </div>
            {/if}
        </div>
    </div>
</header>

{#if data.userId}
<!-- Het navigatie menu voor mobile -->
<div id="mobileNav" class="navigation-mobile-container hidden">
    <ul class="user-nav">
        <p class="mobile__item">{data.username}</p>
        <a class="" href="/">🏚️ Home</a>
        <a class="" href="/dashboard">📋 Mijn dashboard</a>
        <form method="post" action="/logout?/logout" use:enhance>
            <input type="submit" value="🔓 Uitloggen" />
        </form>
        <button class="safari__block" on:click={toggleMob}>Sluit venster</button>
    </ul>
</div>
<!-- Het navigatie menu voor de desktop versie -->
<div id="screenNav" class="navigation-screen-container hidden">
    <form method="post" action="/logout?/logout" use:enhance>
        <div class="loggedUser">{data.username}</div>
        <button type="submit" value="Uitloggen" class="button__user">🔓 Uitloggen</button>
    </form>
</div>
{/if}

<style>
    header {        
        border-bottom: solid 1px rgb(233, 233, 233);
        margin-bottom: 2.5rem;
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
        width: auto;
        position: relative;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
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
        background-color: #eeeeee;
        border-radius: 5px;
    }
    a {
        color: black;
        text-decoration: none;
        font-size: 0.9rem;
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
     .user-nav > form > input {
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        border-bottom: 1px solid rgb(111, 190, 173);
        font-size: 0.8rem;
    }
    .user-nav > a, .user-nav > form { height: 4rem; }
    .user-nav > a {
        border-bottom: 1px solid rgb(209, 209, 209) 
    }
    .user-nav > form > input {
        border: none;
        font-weight: 500;
        cursor: pointer;
        font-size: 0.8rem;
    }
    button {
        width: 100%;
        border: none;
        height: 3rem;
        border-radius: 0px 0px 5px 5px;
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
    .header__a {
        display: none;
    }
    .mobile__item {
        font-weight: 600;
        font-size: 1.2rem;
        background-color: hsl(167 46% 38% / 1);
        color: white;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .safari__block {
        background-color: #eeeeee !important;
    }
    @media (min-width: 768px) {
        header {
            margin-bottom: 4rem;
        }
        .header__a {
            font-size: 0.9rem;
            margin-right: 3rem;
            margin-left: 0;
            padding-top: 5px;
            width: fit-content;
            text-wrap: nowrap;
        }
        .navigation-screen-container {
            position: absolute;
            top: calc(10vh + 6px);
            right: 25px;
            height: auto;
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
            border-radius: 5px;
            padding-inline: 15px;
            box-shadow: 0px 2px 2px rgb(202, 202, 202);
            background-color: #eeeeee;
            color: black;
        }
        .navigation {
            width: fit-content;
            position: relative;
            display:flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
        a {
            text-decoration: none;
            color: black;
            font-weight: 500;
            margin-left: 25px;
        }
        a:hover {
            color: #e64222;
            transition: all 0.3s ease;
        }
        form input:hover {
            background-color: rgb(68, 136, 121);
            transition: all 0.3s ease;
            color: white
        }
        .header-container {
            width: calc(80% + 50px);
            margin: auto;
        }
        #mobileNav {
            display: none;
        }
        #screenNav {
            right: calc(10%);
            width: 20rem;
        }
        .hidden {
            display: none;
        }
        form {
            display: flex;
            height: 3rem;
            font-size: 0.9rem;
        }
        .button__user {
            background-color: #eeeeee;
            border-radius: 0px;
            color: rgb(238, 75, 0);
            width: fit-content;
            padding-inline: 1rem;
            height: 3rem;
            transition: all 0.3s ease;
            text-wrap: nowrap;
        }
        .button__user:hover {
            background-color: rgb(238, 75, 0);
            color: white;
            transition: all 0.3s ease;
        }
        .loggedUser {
            width: 70%;
            height: 3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: hsl(167 46% 38% / 1);
            color: white;
            font-weight: 600;
            padding-top: 5px;
        }
        .header__a {
            display: block;
        }
    }
    @media (min-width: 1250px) {
        .header-container {
            width: 70%;
            margin: auto;
        }
        #screenNav {
            right: calc(15% + 15px);
            width: 20rem;
        }
    }
</style>