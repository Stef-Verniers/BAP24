<script>
    // @ts-ignore
    import Logo from "/src/components/Logo.svelte";
    import { enhance } from "$app/forms";
    export let form;
  </script>
  
  <main>
    <div class="logo">
      <div class="image-container">
        <Logo width=10rem/>
      </div>
    </div>
    <div class="container">
      <form method="POST" use:enhance>
        <h1>Registreer je nu!</h1>

        {#if form?.message}
            <div class="error">
                <p>{form.message}</p>
            </div>
        {/if}
        
        <label for="name">Voor + achternaam</label>
            <input type="text" name="name" required />

        <label for="email">Email</label>
            <input type="email" name="email" required />

        <label for="password">Wachtwoord</label>
            <input type="password" name="password" required />

        <label for="password">Bevestig wachtwoord</label>
            <input type="password" name="requirePassword" required />
      
        <button type="submit">Register</button>

        <p>Nog geen account?<a href="google.com">Registreer hier</a></p>
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
;
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
      .error {
        background: rgb(160, 10, 10);
        font-weight: 800;
        text-align: left;
        font-size: 0.7rem;
        min-height: 30px;
        height: auto;
        display: flex;
        align-items: center;
        margin-bottom: 3vh;
        width: 100%;
      }
      .error > p {
        width: 100%;
        font-size: 0.8rem;
        text-align: left;
        margin-inline: 10px;
        margin-top: 0;
        color: white;
        line-height: auto;
        max-width: 45ch;
        padding: 5px 0;
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
          font-size: 1.5rem;
          color: white;
          font-weight: bold;
          margin-bottom: 7vh;
      }
        .logo{
            height: 25%;
        }
        .container {
          width: 100%;
          height: 75%;
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
        .error {
            width: 100%;
        }
      }
      @media (min-width: 1025px) {}
      @media (min-width: 1250px) {}


  </style>