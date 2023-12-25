<!-- svelte-ignore a11y-distracting-elements -->
<div class="sponsors">
    <div class="content scroll">
        <h2 class="sponsor">Frituur stefano's</h2>
        <h2 class="sponsor">Overpoort Bowl</h2>
        <h2 class="sponsor">Snack Deniz</h2>
        <h2 class="sponsor">'t Kofschip'</h2>
        <h2 class="sponsor">Papier & Co</h2>
        <h2 class="sponsor">Bocca</h2>
        <h2 class="sponsor">Frituur stefano's</h2>
        <h2 class="sponsor">Overpoort Bowl</h2>
        <h2 class="sponsor">Snack Deniz</h2>
        <h2 class="sponsor">'t Kofschip'</h2>
        <h2 class="sponsor">Papier & Co</h2>
        <h2 class="sponsor">Bocca</h2>
        <h2 class="sponsor">Frituur stefano's</h2>
        <h2 class="sponsor">Overpoort Bowl</h2>
        <h2 class="sponsor">Snack Deniz</h2>
        <h2 class="sponsor">'t Kofschip'</h2>
        <h2 class="sponsor">Papier & Co</h2>
        <h2 class="sponsor">Bocca</h2>
        <h2 class="sponsor">Frituur stefano's</h2>
        <h2 class="sponsor">Overpoort Bowl</h2>
        <h2 class="sponsor">Snack Deniz</h2>
        <h2 class="sponsor">'t Kofschip'</h2>
        <h2 class="sponsor">Papier & Co</h2>
        <h2 class="sponsor">Bocca</h2>
    </div>
</div>

<style>
    .sponsors {
        height: 5rem;
        background-color: rgb(255, 51, 0);
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        position: relative;
        user-select: none;
        margin-bottom: 4rem;
    }
    .content {
        flex-shrink: 0;
        display: flex;
        justify-content: space-around;
        min-width: 100%;
        gap: 5rem;
        color: white
    }
    .scroll {
        animation: scroll 120s linear infinite;
    }
    @keyframes scroll {
        from { transform: translateX(0); }
        to { transform: translateX(calc(-100% - 1rem)); }
    }


    @media (min-width: 1025px) {
        .sponsors {
            margin-top: 10vh;
            margin-bottom: 20vh;
        }
        .sponsor {
            height: 100%;
            margin-right: 290px;
            font-weight: 600;
            font-size: 1.4rem;
        }
    }
    @media (min-width: 1250px) {
        .sponsors {
            margin-top: 10vh;
            margin-bottom: 30vh;
        }
    }
</style>