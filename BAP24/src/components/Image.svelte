<script>
    export let width = '';
    export let name = '';
    export let id = '';
    export let radius = '';
</script>

<div id={id} class="image-container" style="width: {width};">
    <img src="/images/{name}" alt="" style=" border-radius: {radius}">
</div>

<style>
    .image-container > img {
        width: 100%;
        height: 100%;
    }
    .image-container#hero {
        margin: auto;
        width: 100%;
        height: auto;
        position: absolute;
        bottom: 50px;
        object-fit: contain;
    }
</style>