<script>
    import Logo from "./Logo.svelte";
</script>

<footer>
    <div class="footer-container">
        <div class="logo">
            <Logo width=180px />
        </div>
        <div class="navigation">
            <ul>
                <li><a href="google.com">Link 1</a></li>
                <li><a href="google.com">Link 2</a></li>
                <li><a href="google.com">Link 3</a></li>
            </ul>
        </div>
        <div class="disclaimer">
            <span>&copy; BAP24 | Arteveldehogeschool 2023 - 2024</span>
        </div>
    </div>
</footer>

<style>
    footer {
        width: calc(100vw - 50px);
        height: 30vh;
        padding: 50px 25px;
        background-color: rgb(111, 190, 173);
    }
    .footer-container > * {
        margin-bottom: 4vh;
    }
    .navigation > ul {
        display: flex;
        flex-direction: column;
        margin: 7vh 0;
    }
    .navigation > ul > li {
        margin-bottom: 16px;
    }
    .navigation > ul > li > a {
        color: white;
        text-decoration: none;
    }
    .disclaimer > span {
        font-size: 12px;
        color: rgb(233, 233, 233);
        margin-top: 3vh;
    }
    @media (min-width: 1025px) {
        footer {
            position: absolute;
            padding-top: 20vh;
            z-index: 1;
        }
        .footer-container {
            width: calc(90% - 80px );
            margin: auto;
            height: auto;
        }
    }
    @media (min-width: 1250px) {
        .footer-container {
            width: 70%;
            margin: auto;
        }
    }
</style>