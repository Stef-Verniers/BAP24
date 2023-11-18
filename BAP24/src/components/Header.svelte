<script>
    import Logo from "./Logo.svelte";
</script>

<header>
    <div class="header-container">
        <Logo width=120px/>
        <div class="navigation">
            
        </div>
    </div>
</header>

<style>
    header {
        width: calc(100vw - 50px);
        border-bottom: solid 1px rgb(233, 233, 233);
        margin-bottom: 3vh;
        box-shadow: 0px 1px 5px rgb(228, 228, 228);
        padding-inline: 25px;
        padding-top: 5px;
    }
    .header-container {
        width: 100%;
        height: calc(10vh - 1px);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    @media (min-width: 768px) {}
    @media (min-width: 1025px) {
        .header-container {
            width: calc(80% + 50px);
            margin: auto;
        }
    }
    @media (min-width: 1200px) {
        .header-container {
            width: 70%;
            margin: auto;
        }
    }
</style>