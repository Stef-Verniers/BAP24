<script>
  import Toasts from '../../components/Toasts.svelte';
  import { addToast, navigateTo } from '../../stores';
  import Logo from '../../components/Logo.svelte';
  import RegisterForm from '../../components/RegisterForm.svelte';

  // We wachten op onze component voor een response
  async function showError(response) {
    const message = await response.detail;
    console.log(message);
    addToast({message: message, type: 'error', timeout: 5000});
  }

  // Eens we een response hebben, gaan we kijken of het een succes was of niet
  async function handleResponse(response) {
    const message = await response.detail;
    console.log(message);
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
      padding-top: 1rem
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
    @media (min-width: 1025px) {}
    @media (min-width: 1250px) {}


  </style>