<script>
    export let message = ""
</script>

<ul>
    <li class="ping">
        <p>{message}</p>
    </li>
</ul>

<style>
    ul {
        position: fixed;
        bottom: 0px;
        height: 40vh;
    }
    ul > li {
        margin-bottom: 50px;
    }
    .ping {
        width: auto;
        max-width: 70vw;
        font-size: auto;
        min-height: 20px;
        height: auto;
        margin: 1rem 1rem;
        padding: 20px 20px 10px 20px;
        background-color: rgb(235, 235, 235);
        font-weight: 500;
        border-radius: 10px;
        border-bottom: 3px rgb(196, 196, 196) solid;
        border-width: 2px;
    }
</style>

{#if message}
  <ul>
    <li class="ping">
      <p>{message}</p>
    </li>
  </ul>
{/if}