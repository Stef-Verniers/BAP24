<script lang="ts">
// @ts-nocheck
    import Header from '/src/components/Header.svelte';
    import Footer from '/src/components/Footer.svelte';
    import SurveyCard from '../../components/SurveyCard.svelte';
    import { onMount } from 'svelte';
    import { addToast, makeDateReadable } from '../../stores';
    import Toasts from '../../components/Toasts.svelte';
    import type { PageData } from '../new-survey/$types';
    export let data: PageData;

    // Kijkt voor toasts in de localstorage en showt deze in de frontend
    onMount(() => {
        const toast = JSON.parse(localStorage.getItem("toast"));
        if (toast) {
            addToast(toast);
            localStorage.removeItem("toast"); // Vergeet niet de toast te verwijderen na het tonen
        }
    });

    // Ophalen van onze surveys en toekennen aan een variabele
    let surveys = data.surveys;

    // We navigeren door alle ingevulde enquêtes en filteren deze uit de lijst zodat we nooit een enquête 2 keer kunnen invullen
    let ingevuldeEnqueteIds = data.respondents.map(respondent => respondent.enqueteId);
    console.log(ingevuldeEnqueteIds)
    surveys = surveys.filter(survey => !ingevuldeEnqueteIds.includes(survey.id));
    //We sorteren op deadline zodat de enquêtes met de kortste deadline bovenaan komen te staan
    surveys.sort((a, b) => a.deadline - b.deadline);

    // We filteren de enquêtes op basis van de opgegeven details van de gebruiker
    const filteredSurveys = surveys.filter(survey => survey.userId !== data.userId)
    let fittedSurvey = filteredSurveys.filter(survey => survey.nationality == data.nationality)
    let dumpSurveys;
    if (fittedSurvey) {
        dumpSurveys = filteredSurveys.filter(survey => survey.nationality !== data.nationality)
    }
</script>
    
    <Header {data} />

    <Toasts />

    <main>
        <div class="container">
            <div class="wrapper">
                <h1>Enquête overzicht</h1>
                <p>Ben je klaar om studenten uit de nood te helpen?</p>
                <p>De onderstaande enquêtes passen het best bij jouw opgegeven details.</p>
                <br>
                <p>Veel invulplezier!</p>
            </div>
            <div class="enquetes">
                <h2>Deze passen het best bij jou:</h2>
                <div class="list">
                    {#if fittedSurvey.length > 0}
                    {#each fittedSurvey as survey}
                        <SurveyCard 
                            title={survey.title} 
                            department={survey.department.department} 
                            onderzoeker={survey.user.username} 
                            deadline={makeDateReadable(survey.deadline)}
                            quota={survey.quota}
                            school={survey.institute.school}
                            destination={`/surveys/${survey.id}`}
                        />
                    {/each}
                {:else}
                    <p class="message">Er zijn geen enquêtes die passen bij jouw opgegeven details.</p>
                {/if}
                </div>
            </div>
            <div class="enquetes">
                <h2>Deze kan je ook invullen:</h2>
                <div class="list">
                    {#if dumpSurveys.length > 0}
                    {#each dumpSurveys as survey}
                        <SurveyCard 
                            title={survey.title} 
                            department={survey.department.department} 
                            onderzoeker={survey.user.username} 
                            deadline={makeDateReadable(survey.deadline)}
                            quota={survey.quota}
                            school={survey.institute.school}
                            destination={`/surveys/${survey.id}`}
                        />
                    {/each}
                {:else}
                    <p class="message">Er zijn geen enquêtes die je op dit moment kan invullen. Kom later zeker eens terug</p>
                {/if}
                </div>
            </div>
        </div>
    </main>

    <Footer />

    <style>
        main {
            overflow: hidden;    
            background-color: hsl(167, 46, 98)    
        }
        .container {
            height: 100%;
            margin-inline: 25px;
        }
        .wrapper {
            height: auto;
            min-height: 70px;
            width: 100%;
            margin-bottom: 3rem;
        }
        .wrapper h1 {
            font-size: 2rem;
            color: Black;
            font-weight: bold;
            margin-bottom: 8px;
        }
        .wrapper p {
            width: auto;
            font-size: 1rem;
            line-height: calc(1.05rem * 1.3);
        }
        .enquetes {
            margin-bottom: 3rem;
        }
        .enquetes > h2 {
            font-size: 1.1rem;
            font-weight: bold;
            width: fit-content;
            margin-bottom: 2rem;
            padding-bottom: 3px;
            border-bottom: 3px solid hsl(165, 56%, 40%);
        }
        .message {
            font-size: 0.9rem;
            width: fit-content;
            line-height: calc(0.9rem * 1.3);
        }
    @media (min-width: 1025px) {
        main {
            min-height: calc(90vh - 4rem);
        }
        .list {
            display: flex;
            flex-wrap: wrap;
            gap: calc((100% - 69rem) / 2)
        }
        .container {
            width: calc(80% + 25px);
            margin-inline: auto;
        }
    }
    @media (min-width: 1250px) {
        .container {
            width: calc(70% - 25px);
        }
    }
    </style>