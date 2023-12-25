<script lang="ts">
    import { onMount } from "svelte";

    // Component voor de percentage cirkel

    export let quota;
    export let respondents;
    let percentage;
    let chart;
    let status;

    onMount(() => {
        chart = document.getElementById('chart');
    })

    $: percentage = (respondents / quota) * 100;
    $: if (chart && percentage >= 100) {
        status = 'done'
    } else if (chart && percentage >= 1) {
        status = 'progress'
    } else {
        status = 'none'
    }

</script>

<div class="single-chart">
    <svg id="chart" viewBox="0 0 36 36" class="circular-chart {status}">
      <path class="circle-bg"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path class="circle"
        
        stroke-dasharray={percentage + "," + 100}
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x="18" y="20.35" class="percentage">{respondents}/{quota}</text>
    </svg>
  </div>

  <style>
    .single-chart {
    width: 100%;
    justify-content: space-around ;
    margin-top: 1rem;
    }

    .circular-chart {
    display: block;
    margin: 10px auto;
    max-height: 250px;
    }

    .circle-bg {
    fill: none;
    stroke: #dddddd;
    stroke-width: 3.8;
    }

    .circle {
    fill: none;
    stroke-width: 2.8;
    stroke-linecap: round;
    animation: progress 1s ease-out forwards;
    }

    @keyframes progress {
    0% {
        stroke-dasharray: 0 100;
    }
    }

    .circular-chart.progress .circle {
    stroke: #ff6a4c;
    }

    .circular-chart.done .circle {
    stroke: hsl(167 46% 38% / 1);
    }

    .done {
        stroke: hsl(167 46% 38% / 1) !important;
    }

    .percentage {
        fill: #666;
        font-family: sans-serif;
        font-size: 0.5rem;
        text-anchor: middle;
        font-weight: bold;
    }
  </style>