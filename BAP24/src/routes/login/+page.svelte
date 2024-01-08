<script lang="ts">
    // @ts-ignore
    import Logo from "/src/components/Logo.svelte";
    import { enhance } from "$app/forms";
    import Toasts from "../../components/Toasts.svelte";
    import { addToast } from "../../stores";
    import type { ActionData } from "./$types.js";
    import { tick } from "svelte";
    export let form: ActionData;

    // Regex voor email
    const regex = /^\w+@[a-zA-Z_\d]+?\.[a-zA-Z]{2,3}$/;

    function submitForm() {
        let form = document.getElementById("myForm");
        let email = (form?.querySelector('[name="email"]') as HTMLInputElement)?.value;
        let password = (form?.querySelector('[name="password"]') as HTMLInputElement)?.value;

        if (!email || !password) {
            // Toon een toastbericht als email of wachtwoord niet is ingevuld
            addToast({ message: "Éen of meerdere velden zijn niet ingevuld", type: "error", timeout: 5000 });
            return;
        }

        if (!regex.test(email)) {
            // Toon een toastbericht als email niet geldig is
            addToast({ message: "Email heeft geen geldig email-formaat", type: "error", timeout: 5000 });
            return;
        }

        // Dien het formulier in
        form?.dispatchEvent(new Event('submit'));
    }
  </script>

  <Toasts />

  <main>
    <div class="logo">
      <div class="image-container">
        <Logo width=10rem />
      </div>
    </div>
    <div class="container">
      <div class="wrapper">
        <div class="title">
          <h1>Login</h1>
        </div>
        <form id="myForm" method="post" use:enhance={() => async ({ update }) => {
          await update();
          await tick();
          if (form)
            addToast({ message: form?.message, type: form?.['type'], timeout: 5000 });
      }}>
          <label for="email">Email</label>
              <input type="email" name="email" required />

          <label for="password">Wachtwoord</label>
              <input type="password" name="password" required />
        </form>
        <div class="button">
          <button type="submit" on:click={submitForm}>Login</button>
          <p>Nog geen account?<a href="/register">Registreer hier</a></p>
        </div>
      </div>
    </div>
  </main>
  
  <style>
      :global(.touched:invalid) {
          border-color: #FF360D;
          outline-color: #FF360D;
      }
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
    .wrapper {
        width: 80%;
        height: calc(100% - 4rem);
        margin: 2rem auto;
    }
    .title {
        color: white;
        height: 20%;
        text-align: center;
    }
    .title > h1 {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 8px;
        padding-top: 1rem;
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
        align-items: start;
        background-color: hsl(167 46% 38% / 1);
    }
    form {
        height: auto;
        display: flex;
        flex-direction: column;
        width: 100%;
        color: white;
        margin: auto;
        margin-left: 2px;
    }
    input {
        padding: 0px;
        border-radius: 8px;
        width: 100%;
        height: 2.2rem;
        border: none;
        background-color: #eeeeee;
        color: black;
        text-indent: 1rem;
        font-size: 0.9rem;
        margin-bottom: 3vh;
        box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
    }
    label {
        color: white;
        font-weight: 500;
        margin-bottom: 1vh;
        font-size: 0.8rem;
    }
    .button {
        height: auto;
    }
    button {
        border-radius: 8px;
        width: 100%;
        height: 2.2rem;
        border: none;
        background-color: #ff6a4c;
        color: white;
        padding: 0;
        font-weight: 600;
        box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
    }
    button:hover {
        cursor: pointer;
    }
    p {
      font-size: 0.7rem !important;
      text-align: center;
      margin-top: 1rem;
      color: white
    }
    p > a {
      text-decoration: none;
      color: rgb(255, 240, 237);
      margin-left: 0.3rem;
      font-weight: 500;
      text-decoration: underline;
    }
      @media (min-width: 768px) {
        .wrapper {
          width: 500px;
        }
        input,label, button {
          width: 25rem;
        }
        form {
          margin: auto;
          align-items: center;
          height: fit-content;
        }
        form > input {
          margin-bottom: 2rem;
        }
        .button {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: auto;
          margin-top: 2vh;
        }
        button {
          margin-top: 1rem;
        }
        button:hover {
          cursor: pointer;
        }
        .button > p {
          width: 25rem;
        }
        .title > h1 {
          padding-top: 3rem 
        }
      }
      @media (min-width: 1025px) {}
      @media (min-width: 1250px) {}


  </style>