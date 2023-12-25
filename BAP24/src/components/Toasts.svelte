<script>
    import Toast from "./Toast.svelte";
    import { dismissToast, toasts } from "../stores.js";
</script>
  
  {#if $toasts}
    <section>
      {#each $toasts as toast (toast.id)}
        <Toast
          type={toast.type}
          dismissible={toast.dismissible}
          on:dismiss={() => dismissToast(toast.id)}>{toast.message}</Toast
        >
      {/each}
    </section>
  {/if}
  
  <style lang="postcss">
    section {
        position: fixed;
        bottom: 2rem;
        left: 50%;
        width: 80vw;
        display: flex;
        justify-content: center;
        flex-direction: column;
        z-index: 1000;
        transform: translateX(-50%);
    }
    @media (min-width: 768px) {
      section {
        transform: translateX(0);
        position: fixed;
        bottom: 2rem;
        left: 2rem;
        width: fit-content;
        display: flex;
        justify-content: center;
        flex-direction: column;
        z-index: 1000;
    }
    }
  </style>
  