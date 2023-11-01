<script>
    import Logo from "./Logo.svelte";
</script>

<header>
    <Logo width=120px/>
    <div class="navigation">
        <h1>X</h1>
    </div>
</header>

<style>
    header {
        width: calc(100vw - 50px);
        padding-inline: 25px;
        padding-top: 5px;
        height: calc(10vh - 1px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: solid 1px rgb(233, 233, 233);
        margin-bottom: 3vh;
        box-shadow: 0px 1px 5px rgb(228, 228, 228);
    }
</style>