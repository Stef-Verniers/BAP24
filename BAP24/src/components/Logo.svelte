<script>
    export let width = '';
    export let bg = '';
    import logo from '$lib/images/BAP24.svg'
</script>

<div class="image-container" style="background-color: {bg}; width:{width}">
    <img src={logo} alt="Logo BAP24" />
</div>

<style>
    .image-container > img {
        width: 100%;
        height: 100%;
    }
</style>