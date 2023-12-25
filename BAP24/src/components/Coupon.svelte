<script lang="ts">
    export let title;
    export let sponsor;
    export let points;
</script>

    <div class="container">
        <div class="titel">
            <h2>{title}</h2>
        </div>
        <div class="sponsor">
            <p>{sponsor}</p>
        </div>
        <div class="punten">
            <h2>{points}</h2>
            <p>punten</p>
        </div>
    </div>

<style>
    .container {
        width: fit-content;
        height: 100%;
        display: grid;
        grid-template-columns: 15rem 5rem;
        grid-template-rows: repeat(2, auto);
    }
    .titel{
        grid-column: 1;
        grid-row: 1;
        border-bottom: 1px solid rgb(233, 233, 233);
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 1.1rem;
        padding-left: 1rem;
    }
    .sponsor{
        grid-column: 1;
        grid-row: 2;
        display: flex;
        align-items: center;
        text-indent: 1rem;
        font-size: 0.9rem;
    }
    .punten{
        grid-column: 2;
        grid-row: 1/3;
        border-left: 1px solid rgb(233, 233, 233);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .punten h2 {
        font-size: 2rem;
        font-weight: bold;
        margin: 0;
    }

</style>