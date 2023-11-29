<script>
    // @ts-ignore
    import Logo from "/src/components/Logo.svelte";
    import { enhance } from "$app/forms";
    export let form;
    import Toasts from "../../components/Toasts.svelte";
    import { addToast } from "../../stores";
    import { tick } from "svelte";
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
        if (form)
          addToast({ message: form?.message, type: form?.type, timeout: 5000 });
    }}>
        <h1>Registreer je nu!</h1>
        
        <label for="name">Voor + achternaam</label>
            <input type="text" name="name" required />

        <label for="email">Email</label>
            <input type="email" name="email" required />

        <label for="password">Wachtwoord</label>
            <input type="password" name="password" required />

        <label for="password">Bevestig wachtwoord</label>
            <input type="password" name="requirePassword" required />
      
        <button type="submit">Register</button>

        <p>Heb je al een account?<a href="/login">Log je hier in!</a></p>
      </form>
    </div>
  </main>
  
  <style>
      :global(.touched:invalid) {
          border-color: #FF360D;
          outline-color: #FF360D;
      }
      .logo{
        height: calc(20%);
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
      }
      form > h1, form > input {
        margin-bottom: 30px;
        width: 100%;
      }
      form > h1 {
        font-size: 2rem;
        color: white;
        font-weight: bold;
        margin-bottom: 60px;
        text-align: center;
      }
      input {
        padding: 0px;
        border-radius: 25px;
        width: 15rem;
        height: 2.2rem;
        border: none;
        background-color: hsl(167 46% 38% / 1);
        color: white;
        text-indent: 1rem;
        font-size: 0.9rem;
      }
      label {
        font-size: 0.9rem;
        font-weight: 500;
        color: white;
        text-indent: 0.5rem;
        margin-bottom: 3px;
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
      p {
        font-size: 0.8rem;
        text-align: center;
        margin-top: 2rem;
      }
      p > a {
        text-decoration: none;
        color: #ce2c0b;
        margin-left: 0.3rem;
        font-weight: 500;
      }

      @media (min-width: 768px) {
        form > h1 {
          font-size: 2rem;
          color: white;
          font-weight: bold;
          margin-bottom: 7vh;
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
      @media (min-width: 1025px) {}
      @media (min-width: 1250px) {}


  </style>