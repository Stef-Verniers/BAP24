<script lang='ts'>
  import Header from "../../../../components/Header.svelte";
  import Percentage from "../../../../components/Percentage.svelte";
  import Toasts from "../../../../components/Toasts.svelte";
  import { onMount } from "svelte";
  import type { PageServerLoad } from "./$types";
  import { addToast } from "../../../../stores";
  import { makeDateReadable } from "../../../../stores";
  import { howManyDaysLeft } from "../../../../stores";
  export let data: PageServerLoad;

    let answeredSurveys = [];

    let firstelement;
    let lastelement;

    // We vullen onze lege array op met data van de server omtrent respondenten van onze enquete
    $: answeredSurveys = data.answers;
    $: if (answeredSurveys) {
        firstelement = answeredSurveys[0];
        lastelement = answeredSurveys[answeredSurveys.length - 1];
        console.log(answeredSurveys)
    }


</script>

<Header {data} />

<Toasts />

<main>
    <div class="wrapper title">
        <h1>Jouw statistieken</h1>
        <p>Ben je benieuwd hoe goed jouw enquete het doet?
            Kijk dan eens even naar de statistieken hieronder!
        </p>
    </div>
    <div class="container">
        <section class="stats__screen">
            <h2>Algemene statistieken</h2>
            <div class="wrapper stats">
                <div class="flex-wrapper">
                    <Percentage quota={data.survey.quota} respondents={data.survey.respondents} />
                </div>
                <div class="item__group">
                    <div class="item">
                        <p>Hoeveel respondenten sinds {makeDateReadable(data.survey.createdAt)}</p>
                        <h3>{data.survey.respondents}</h3>
                    </div>
                    <div class="item">
                        <p>Wanneer is de laatste enquete ingevuld?</p>
                        <h3>{makeDateReadable(lastelement.endTime)}</h3>
                    </div>
                    <div class="item">
                        <p>Nog hoeveel dagen tot de deadline?</p>
                        <h3>{howManyDaysLeft(data.survey.deadline)}</h3>
                    </div>
                </div>
            </div>
        </section>
        <section class="respond__list">
            <h2>Recente antwoorden</h2>
            <div class="wrapper overview">
                <div class="mobile">
                    <div class="item head">
                        <p>#</p>
                        <p>Ingevuld op</p>
                        <p>Afgelegde tijd</p>
                    </div>
                    <div class="item item__list">
                        {#each answeredSurveys as answer}
                        <div class="list">
                            <p class="list__id">{answer.id}</p>
                            <p class="list__end">{makeDateReadable(answer.endTime)}</p>
                            <p class="list__duration">{answer.time}</p>
                        </div>
                        {/each}
                    </div>  
                </div>
            </div>
        </section>
    </div>
</main>

<style>
    main {
        overflow: hidden;    
        background-color: hsl(167, 46, 98);
        max-width: 100vw;
        height: auto;
        min-height: min-content;
    }
    .container {
        width: calc(100% - 50px);
        height: 100%;
        margin-inline: 25px;
    }
    .wrapper {
        height: auto;
        width: 100%;
        margin-bottom: 3rem;
        border-radius: 5px;
    }
    .item:nth-last-child(1) {
        padding-bottom: 1rem;
    }
    .wrapper h1 {
        font-size: 2rem;
        color: Black;
        font-weight: bold;
        margin-bottom: 8px;
    }
    h2 {
        font-size: 1.1rem;
        font-weight: bold;
        width: fit-content;
        margin-bottom: 1rem;
        padding-bottom: 3px;
        border-bottom: 3px solid hsl(165, 56%, 40%);
    }
    .item {
        margin-inline: 10px;
        margin-top: 1rem;
    }
    h3 {
        font-size: 1.3rem;
        font-weight: bold;
        color: black;
        text-indent: 1rem;
        margin-top: 5px;
    }
    .wrapper p {
        width: auto;
        font-size: 0.8rem !important;
        line-height: calc(1.05rem * 1.3);
    }
    .stats {
        width: 100%;
        background-color: #fafafa;
        box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
    }
    .flex-wrapper {
        display: flex;
        flex-flow: row nowrap;
    }
    .head, .list {
        display: grid;
        grid-template-columns: 20% 40% 40%;
        background-color: #eeeeee;
        margin: 0;
        height: 2.3rem;
        vertical-align: middle;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
    }
    .list {
        margin-bottom: 0.5rem;
    }
    .list:nth-last-child(1) {
        border-bottom: none;
    }
    .head > p {
        font-weight: bold;
        font-size: 0.8rem;
        text-indent: 1rem;
    }
    .item {
        margin-bottom: 1rem;
    }
    .item__list {
        margin: 0;
        text-indent: 1rem;
    }
    .list__id { 
        grid-column: 1;
    }
    .list__end {
        grid-column: 2;
    }
    .list__duration {
        grid-column: 3;
    }

    @media (min-width: 1025px) {
        main {
            min-height: calc(90vh - 4rem);
        }
        .container {
            width: calc(80% + 25px);
            margin-inline: auto;
            display: grid;
            grid-template-columns: 60% 40%;
            grid-column-gap: 3rem;
        }
        .title {
            width: calc(80% + 25px);
            margin-inline: auto;
        }
        .stats {
            padding: 3rem 0;
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            justify-content: center;
            grid-column: 1;
        }
        .flex-wrapper {
            /* height: 500px; */
            width: 50%;
            height: 100%;
        }
        .item__group > .item {
            width: 80% !important;
        }
        .item__group {
            margin: 0;
            width: 70%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            height: 15rem;
        }
        .item__group > .item {
            width: 100%;
            margin: 0;
            padding-bottom: 0;
        }
        .item__group > .item > p {
            font-size: 0.8rem !important;
        }
        .item__group > .item > h3 {
            width: fit-content;
            font-size: 1.5rem !important;
        }
        .overview {
            grid-column: 2;
            margin-top: 0;
        
        }

    }
    @media (min-width: 1250px) {
        .container {
            width: calc(70% - 25px);
        }
        .title {
            width: calc(70% - 25px);
            margin-inline: auto;
        }
        .item__group > .item > p {
            font-size: 0.9rem !important;
        }
    }
</style>