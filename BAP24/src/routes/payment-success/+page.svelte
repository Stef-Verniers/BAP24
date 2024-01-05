<script lang="ts">
    import Header from "../../components/Header.svelte";
    import { navigateTo } from "../../stores";
    import type { PageData } from "../$types";
    export let data: PageData; 

    // async function checkPaymentStatus(paymentId) {
    // // Verzoek naar je backend om de status van de betaling op te vragen
    // const response = await fetch(`/api/check-payment/${paymentId}`);
    // const data = await response.json();

    // if (data.paymentStatus === 'paid') {
    //     localStorage.setItem("toast", JSON.stringify({ message: 'Uw betaling is met succes voltooid', type: 'success', timeout: 5000 }));
    //     navigateTo('/dashboard')
    // } else {
    //     localStorage.setItem("toast", JSON.stringify({ message: 'Uw betaling is mislukt', type: 'error', timeout: 5000 }));
    //     navigateTo('/dashboard')
    // }
    // }

    // const params = new URLSearchParams(window.location.search);
    // const paymentId = params.get('paymentId'); 
    // if (paymentId) {
    //     checkPaymentStatus(paymentId);
    // }

    console.log('test')

</script>

<Header {data} />

<main>
    <div class="container">
      <div class="title">
          <h1>Gelukt! ✅</h1>
      </div>
      <p>Je wordt vanzelf teruggestuurd naar het dashboard</p>
    </div>
</main>
  
  <style>
      main {
        width: 100%;
        height: calc(90vh - 4rem - 5px);
        position: relative;
    }
    .title {
        color: black;
        height: 4rem;
    }
    .title > h1 {
        font-size: 2rem;
        font-weight: bold;
    }
    .container {
        width: calc(100% - 50px);
        height: 100%;
        margin-inline: 25px;
    }
    .wrapper {
        height: auto;
        margin-inline: auto;
        color: black;
        text-align: left;
        line-height: calc(0.9rem * 1.3);
        font-weight: 500;
        margin-bottom: 2rem;
    }
    .wrapper:nth-last-child(1) {
        margin-bottom: 0px;
        justify-content: flex-end;
        align-items: end;
    }
    .product {
      box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: hsl(167 46% 38% / 1);
      color: white;
      padding: 2rem 1rem;
    }
    .product > h1 {
      font-size: 1.5rem;
      padding-top: 5px;
      font-weight: bold;
    }
    .user {
      box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: hsl(0, 0%, 99%);
      color: rgb(0, 0, 0);
      padding: 2rem 1rem;
    }
    .user > h2 {
      font-size: 1.3rem;
      padding-top: 5px;
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
    }
    button:hover {
        cursor: pointer;
    }
    p {
      font-size: 0.8rem;
      text-align: left;
    }
    .caution {
        background-color: rgb(255, 190, 105);
        border: 2px solid rgb(231, 133, 4);
        border-radius: 5px;
        color: rgb(39, 39, 39);
        padding: 1rem 1rem
    }
    .label {
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
    }
      @media (min-width: 768px) {
        .wrapper {
          width: 500px;
        }
        button {
          margin-top: 1rem;
        }
        button:hover {
          cursor: pointer;
        }
      }
      @media (min-width: 1025px) {
        .container{
          width: 500px;
            margin: auto;
        }
      }
      @media (min-width: 1250px) {}

    </style>