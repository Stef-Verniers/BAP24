<script lang="ts">
    import Header from "../../components/Header.svelte";
    import { navigateTo } from "../../stores";
    import type { PageData } from "../$types";
    export let data: PageData; 
    import { onMount } from "svelte";
    import { createMollieClient } from "@mollie/api-client";
    import { MOLLIE } from "$env/static/private";
    
    
    let paymentId;

    const mollieClient = createMollieClient({ apiKey: MOLLIE });

    onMount(async () => {
        paymentId = sessionStorage.getItem('paymentId');
    });

    $: paymentId

    const verifyPayment = async () => {
        const payment = await mollieClient.payments.get(paymentId);
        console.log(payment);
        if (payment.isPaid()) {
            localStorage.setItem("toast", JSON.stringify({ message: 'Uw betaling is met succes voltooid', type: 'success', timeout: 5000 }));
            navigateTo('/dashboard')
        } else {
            localStorage.setItem("toast", JSON.stringify({ message: 'Uw betaling is mislukt', type: 'error', timeout: 5000 }));
            navigateTo('/dashboard')
        }
    }

    $: if (paymentId !== undefined) {
      verifyPayment();
    }

    // async function checkPaymentStatus(paymentId) {

    // const response = await fetch(`/api/check-payment/${paymentId}`);
    // const data = await response.json();
    // console.log(data);

    // if (data.paymentStatus === 'paid') {
    //     localStorage.setItem("toast", JSON.stringify({ message: 'Uw betaling is met succes voltooid', type: 'success', timeout: 5000 }));
    //     navigateTo('/dashboard')
    // } else {
    //     localStorage.setItem("toast", JSON.stringify({ message: 'Uw betaling is mislukt', type: 'error', timeout: 5000 }));
    //     navigateTo('/dashboard')
    // }
    // }

    // $: if (paymentId !== undefined) {
    //   checkPaymentStatus(paymentId);
    // }

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
    p {
      font-size: 0.8rem;
      text-align: left;
    }

      @media (min-width: 768px) {

      }
      @media (min-width: 1025px) {
        .container{
          width: 500px;
            margin: auto;
        }
      }
      @media (min-width: 1250px) {}

    </style>