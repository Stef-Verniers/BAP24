<script>
  import { navigating } from "$app/stores";
  import "../app.pcss";
  console.log("Hello from %2Blayout.svelte");
  import { SyncLoader } from "svelte-loading-spinners";

</script>

<slot>
  {#if navigating}
    <SyncLoader size="60" color="#FF3E00" unit="px" duration="1s" />
  {/if}
  <h1>Default slot</h1>
</slot>
