<script lang="ts">
    import Logo from "../../components/Logo.svelte";
    import { enhance } from "$app/forms";
    import Toasts from "../../components/Toasts.svelte";
    import { addToast } from "../../stores";
    import { redirect } from "@sveltejs/kit";
    import { tick } from "svelte";
    import type { ActionData, PageData } from "./$types.js";
    export let data: PageData;
    export let form: ActionData;
    console.log(data)
</script>

<Toasts />

<main>
    <div class="logo">
      <div class="image-container">
        <Logo width=10rem/>
      </div>
    </div>
    <div class="container">
        <form method="post" use:enhance={() => async ({ update }) => {
            await update();
            await tick();
            if (data)
                addToast({ message: form?.message, type: form?.type, timeout: 5000 });
            }}>
            <h1>Welkom bij BAP24</h1>
            <p>We willen je snel even iets vragen.</p>

            <h2>Waarvoor wil je BAP24 gebruiken?</h2>
                <input type="radio" name="doel" value="1" id="enq">
                <label for="enq">Enquetes publiceren voor thesis?</label>
                
                <input type="radio" name="doel" value="2" id="pnt" />
                <label for="pnt">Enquetes invullen voor credits?</label>

                <input type="radio" name="doel" value="3" id="all" />
                <label for="all">Ik kies voor beide opties</label>

            <button type="submit">Bevestigen</button>
        </form>
    </div>
</main>

<style>
    .logo{
        height: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    main {
        width: 100vw;
        height: 100vh;
        background-color: rgb(240, 249, 247);
        position: relative;
    }
    .container {
        position: absolute;
        bottom: 0;
        border-radius: 20px 20px 0 0;
        width: 100%;
        height: 80%;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(91, 194, 172);
    }
    form {
        min-height: 30%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        padding-bottom: 2vh;
        width: 70%;
        color: white
    }
    form > h1 {
        font-size: 2rem;
        color: white;
        font-weight: bold;
        margin-bottom: 8px;
        text-align: left;
    }
    form > p {
        line-height: calc(1rem * 1.3);
    }
    form > h2 {
        margin: 3rem 0px 1rem 0px
    }
    label {
        display: block;
        margin-bottom: 10px;
        font-size: 16px;
        color: white;
    }

    input[type="radio"] {
        display: none;
    }

    input[type="radio"] + label {
        width: calc(100% - 20px);
        cursor: pointer;
        padding: 10px;
        border: 2px solid #ffffff;
        border-radius: 4px;
        transition: background-color 0.3s ease;
        margin-top: 0.3rem;
    }
    input[type="radio"]:checked + label {
        background-color: rgb(79, 179, 121);
        color: #fff;
        border-color: rgb(79, 179, 121);
    }
    button {
        border-radius: 25px;
        width: 100%;
        height: 2.5rem;
        border: none;
        background-color: #ff6a4c;
        color: white;
        padding: 0;
        margin-top: 15px;
    }
    button:hover {
        cursor: pointer;
    }
    @media (min-width: 768px) {
        form > h1 {
          font-size: 2rem;
          color: white;
          font-weight: bold;
      }
        .logo{
            height: 20%;
        }
        .container {
          width: 100%;
          height: 80%;
        }
        .container > form {
          width: fit-content;
          margin: auto;
          align-items: center;
        }
        input,label, button {
          width: 25rem;
        }
        form > input {
          margin-bottom: 2rem;
        }
        button {
          margin-top: 1rem;
        }
      }
</style>