<script lang="ts">
    import { goto } from "$app/navigation";
    export let title;
    export let department;
    export let onderzoeker;
    export let deadline;
    export let quota;
    export let school;
    export let destination;

    const navigateTo = (path: string) => {
        goto(path);
    }
</script>

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="container" on:click={() => navigateTo(destination)}>
        <div class="titel">
            <h2>{title}</h2>
        </div>
        <div class="department">
            <h2>{department}</h2>
        </div>
        <div class="info">
            <p>{onderzoeker}</p>
        </div>
        <div class="info">
            <p>{deadline}</p>
        </div>
        <div class="info">
            <p>{school}</p>
        </div>
        <div class="info">
            <p>{quota}</p>
        </div>
    </div>

<style>
    .container {
        width: 100%;
        height: fit-content;
        display: grid;
        grid-template-columns: 60% 40%;
        grid-template-rows: repeat(4, auto);
        background-color: rgb(248, 248, 248);
        box-shadow: 0px 2px 6px rgb(0, 0, 0, 0.23);
        border-radius: 5px;
        transition: all 0.3s ease-in-out;
        margin-bottom: 2rem;
    }
    .container:hover {
        cursor: pointer;
        box-shadow: 0px 2px 10px rgb(0, 0, 0, 0.53);
        transition: all 0.3s ease-in-out;
    }
    .titel {
        grid-column: 1/3;
        grid-row: 1;
        border-bottom: 1px solid rgb(202, 200, 200);
        background-color: rgb(91, 194, 172);
        color: white;
        display: flex;
        align-items: center;
        font-weight: 600;
        font-size: 1rem;
        text-align: left;
        border-radius: 5px 5px 0 0;
        height: auto;
        padding: 0.5rem 1rem;
        line-height: calc(1rem * 1.3);
    }
    .department {
        grid-column: 1/3;
        grid-row: 2;
        display: flex;
        align-items: center;
        font-size: 0.8rem;
        text-align: center;
        text-indent: 1rem;
        border-bottom: 1px solid rgb(202, 200, 200);
        height: 2.5rem;
    }
    .info {
        display: flex;
        height: 2.5rem;
        align-items: center;
        font-size: 0.8rem;
        text-align: center;
        text-indent: 1rem;
        border-bottom: 1px solid rgb(202, 200, 200);
        border-right: 1px solid rgb(202, 200, 200);
    }
    .info:nth-child(even) {
        border-right: none;
    }
    .info:nth-child(5), .info:nth-child(6) {
        border-bottom: none;
    }
    @media (min-width: 1025px) {
        .container {
            width: 23rem;
        }
    }


</style>