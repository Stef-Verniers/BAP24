<script>
    import { useForm, validators, HintGroup, Hint, email, required } from "svelte-use-form";
    import Logo from "/src/components/Logo.svelte";
    const form = useForm();
  </script>
  
  <main>
    <div class="logo">
      <div class="image-container">
        <Logo width=200px/>
      </div>
    </div>
    <div class="container">
      <form use:form>
        <h1>Login</h1>
        <label for="email">Email</label>
        <div class="error">
          <HintGroup for="email">
            <Hint class="hint" on="required">This is a mandatory field</Hint>
            <Hint class="hint" on="email" hideWhenRequired>Email is not valid</Hint>
          </HintGroup>
        </div>
        <input type="email" name="email" use:validators={[required, email]} />
        
        <label for="password">Wachtwoord</label>
        <div class="error">
          <Hint class="hint" id="myPassword" for="password" on="required">This is a mandatory field</Hint>
        </div>
        <input type="password" name="password" use:validators={[required]} />
      
        <button disabled={!$form.valid}>Login</button>

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
        height: 30%;
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
        height: 70%;
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
      }
      form > h1, form > input {
        margin-bottom: 25px;
      }
      form > h1 {
        font-size: 2rem;
        color: white;
        font-weight: bold;
        padding-bottom: 1rem;
      }
      input {
        padding: 0cqmax;
        border-radius: 25px;
        width: 15rem;
        height: 2.5rem;
        border: none;
        background-color: hsl(167 46% 38% / 1);
        color: white;
        text-indent: 1rem;
        font-size: 0.9rem;
      }
      label {
        font-weight: 500;
        color: white;
        text-indent: 0.5rem;
        margin-bottom: 3px;
      }
      button {
        border-radius: 25px;
        width: 15rem;
        height: 2.5rem;
        border: none;
        background-color: #ff6a4c;
        color: white;
        padding: 0;
      }
      .error {
        margin: 5px 0 10px 0.5rem;
        color: rgb(202, 23, 23);
        font-weight: 800;
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
        .container {
          width: 100%;
        }
        .container > form {
          width: 100%;
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