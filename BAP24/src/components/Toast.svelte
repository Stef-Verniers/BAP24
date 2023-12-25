<script>
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";
    import SuccessIcon from "./icons/SuccessIcon.svelte";
    import ErrorIcon from "./icons/ErrorIcon.svelte";
    import CloseIcon from "./icons/CloseIcon.svelte";
  
    const dispatch = createEventDispatcher();
  
    export let type = "error";
    export let dismissible = true;
  </script>
  
    <article class={type} role="alert" transition:fade>
      {#if type === "success"}
        <SuccessIcon width="1.1em" />
      {:else if type === "error"}
        <ErrorIcon width="1.1em" />
      {/if}
    
      <div class="text">
        <slot />
      </div>
    
      {#if dismissible}
        <button class="close" on:click={() => dispatch("dismiss")}>
          <CloseIcon width="0.8em" />
        </button>
      {/if}
    </article>
  
  <style lang="postcss">
    article {
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 0.2rem;
      display: flex;
      align-items: center;
      width: 100%;
      margin-inline: auto;
      font-size: 0.8rem;
      min-width: 15rem;
      box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
      transition: all 0.3s ease-in-out;
    }
    .error {
      background: IndianRed;
    }
    .success {
      background: MediumSeaGreen;
    }
    .text {
      margin-left: 1rem;
      width: 100%;
    }
    button {
      color: white;
      background: transparent;
      border: 0 none;
      padding: 0;
      margin-left: 1rem;
      margin-right: 0;
      line-height: 1;
      font-size: 1rem;
    }
    .close:hover {
      cursor: pointer;
    }
    @media (min-width: 768px) {
      article {
        font-size: 0.9rem;
        line-height: calc(0.9rem * 1.3);
        max-width: 25rem;
        height: auto;
        width: fit-content;
    }
    }

  </style>
  