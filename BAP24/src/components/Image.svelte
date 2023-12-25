<script>
    export let name = '';
    export let radius = '';
    export let shadow = true

    if (shadow == true) {
        shadow = '0px 4px 8px rgb(0, 0, 0, 0.23)'
    } else {
        shadow = 'none'
    }

</script>

<img src="/images/{name}" alt="" style=" border-radius: {radius}; box-shadow: {shadow};">

<style>
    img {
        width: 100%;
        height: 100%;
    }
</style>