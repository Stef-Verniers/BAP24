<script>
  import Toasts from '../../components/Toasts.svelte';
  import { addToast, navigateTo } from '../../stores';
  import Logo from '../../components/Logo.svelte';
  import RegisterForm from '../../components/RegisterForm.svelte';

  // We wachten op onze component voor een response
  async function showError(response) {
    const message = await response.detail;
    addToast({message: message, type: 'error', timeout: 5000});
  }

  // Eens we een response hebben, gaan we kijken of het een succes was of niet
  async function handleResponse(response) {
    const message = await response.detail;
    if (!message.success) {
      addToast({message: message.message, type: 'error', timeout: 5000});
      return;      
    }
    localStorage.setItem("toast", JSON.stringify({ message: message.message, type: 'success', timeout: 5000 }));
    navigateTo('/additional');
  }

</script>

<Toasts />

<main>
  <div class="logo">
    <div class="image-container">
      <Logo width=10rem/>
    </div>
  </div>
  <div class="container">
    <div class="wrapper">
      <div class="title">
        <h1>Registreer je nu!</h1>
      </div>
        <RegisterForm  on:registerError={showError} on:registerFormSubmitted={handleResponse}/>
    </div>
  </div>
</main>

<style>
  .logo{
      height: 20vh;
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
      margin-inline: auto;
      padding-top: 4rem;
      height: 100%;
  }
  .title {
      color: white;
      text-align: center;
  }
  .title > h1 {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 4rem;
      padding-top: 1rem
  }
  .container {
      border-radius: 20px 20px 0 0;
      width: 100%;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: start;
      background-color: hsl(167 46% 38% / 1);
      height: 80vh;
  }
    @media (min-width: 1025px) {}
    @media (min-width: 1250px) {}


  </style>