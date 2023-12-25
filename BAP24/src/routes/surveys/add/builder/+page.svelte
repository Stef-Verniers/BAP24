<script lang="ts">
// @ts-nocheck
    import Header from '/src/components/Header.svelte';
    import type { PageData } from '../new-survey/$types';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import Toasts from '../../../../components/Toasts.svelte';
    import { addToast } from '../../../../stores';
    import { goto } from '$app/navigation';
    export let data: PageData;

    let questionsList = [];
    let isInitialized = false;

    // We kijken of we de opbouw van een enquete in de localstorage hebben opgeslagen
    onMount(() => {
        if (browser) {
            const savedQuestions = localStorage.getItem('questionsList');
            if (savedQuestions) {
                questionsList = JSON.parse(savedQuestions);
            }
            isInitialized = true;
        }
    });

    // We maken een nieuwe vraag aan
    function createQuestion(type) {
        const newQuestion = {
        type: type,
        content: '', // Lege string voor de inhoud van de vraag
        options: type === 'select' ? [''] : [] // Lege strings voor opties
    };
        questionsList = [...questionsList, newQuestion]; // Voeg nieuwe vraag toe aan de lijst
    }

    // We kijken naar de input van de gebruiker en passen de inhoud van de vraag aan
    function handleInput(event, index, optionIndex = null) {
        const { value } = event.target;
        if (optionIndex === null) {
            questionsList[index].content = value;
        } else {
            questionsList[index].options[optionIndex] = value;
        }
    }

    // We voegen een nieuwe optie toe aan een meerkeuzevraag
    function addOption(index) {
        questionsList[index].options = [...questionsList[index].options, ''];
    }

    // We kijken naar het type van de vraag en geven een label terug
    function getQuestionTypeLabel(type) {
        switch (type) {
            case 'string':
                return 'Kort antwoord';
            case 'textarea':
                return 'Lang antwoord (Alinea)';
            case 'select':
                return 'Meerkeuze';
            default:
                return 'Onbekend type';
        }
    }

    // We verwijderen een vraag uit de lijst
    function deleteQuestion(index) {
        questionsList = questionsList.filter((_, i) => i !== index);
    }

    // We verwijderen een optie uit een meerkeuzevraag
    function deleteOption(questionIndex, optionIndex) {
        let question = questionsList[questionIndex];
        question.options = question.options.filter((_, idx) => idx !== optionIndex);
        questionsList[questionIndex] = question;
    }

    // We kijken of alle vragen zijn ingevuld
    function validateQuestions() {
    for (const question of questionsList) {
        if (question.content.trim() === '') {
            addToast({ message: 'Alle vragen moeten ingevuld worden', type: 'error', timeout: 5000 });
            return false;
        }
        if (question.type === 'select' && question.options.some(option => option.trim() === '')) {
            addToast({ message: 'Alle opties van meerkeuzevragen moeten ingevuld worden', type: 'error', timeout: 5000 });
            return false;
        }
    }
        return true;
    }

    // We slaan de enquete op
    async function submitEnquete() {
        if (!validateQuestions()) {
            return;
        }
        if (questionsList.length > 4) {
            try {
                const response = await fetch('/api/submit/survey', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        enqueteId: data.surveyId, // of een andere manier om enqueteId te verkrijgen
                        questions: questionsList 
                    })
                });
                if (response.ok) {
                    addToast({ message: 'Uw enquete werd met succes opgeslaan', type: 'success', timeout: 5000 });
                    localStorage.removeItem('questionsList');
                    setTimeout(() => {
                        goto(`/surveys/add/payment/${data.surveyId}`);
                    }, 2000);
                } else {
                    addToast({ message: 'Er ging iets mis, probeer het later opnieuw..', type: 'error', timeout: 5000 });                
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    // We kijken of de lijst van aangemaakt vragen het minimum aantal vragen heeft bereikt
    $: isSubmitDisabled = questionsList?.length <= 4;
    $: if (isInitialized && browser) {
        localStorage.setItem('questionsList', JSON.stringify(questionsList));
    }

    </script>
    
    <Header {data} />

    <Toasts />

    <main>
        <div class="container">
            <div class="wrapper">
                <h1>Enquête-factory</h1>
                <p>Welkom op onze buildtool om jouw enquête aan te maken.</p>
                <p>Klik aan wat voor soort vraag je wil, stel de vraag en ga door tot je klaar bent om ze te publiceren</p>
            </div>
            <div class="factory">
                <div class="questions" id="questionslist">
                    {#each questionsList as question, index}
                    <div class="question-container">
                        <label for="question">Vraag {index + 1} - {getQuestionTypeLabel(question.type)}</label>
                        {#if question.type === 'string' || question.type === 'textarea'}
                            <input type="text" placeholder="Stel je vraag" bind:value={question.content} class="question" on:input={(event) => handleInput(event, index)} />
                        {:else if question.type === 'select'}
                            <input type="text" placeholder="Stel je vraag" bind:value={question.content}  class="question" on:input={(event) => handleInput(event, index)} />
                            {#each question.options as option, optionIndex}
                                <div class="option__container">
                                    <input type="text" placeholder={`Optie ${optionIndex + 1}`} bind:value={question.options[optionIndex]} class="mco"
                                        on:input={(event) => handleInput(event, index, optionIndex)} />
                                    
                                    <button class="delete__icon" on:click={() => deleteOption(index, optionIndex)}>❌</button>
                                </div>
                            {/each}
                        <button class="mco" on:click={() => addOption(index)}>+ Nieuwe optie toevoegen</button>
                        {/if}
                        <button class="delete" on:click={() => deleteQuestion(index)}>Verwijder Vraag</button>
                    </div>
                {/each}
                </div>
                <div class="options-bar">
                    <button class="option" on:click={() => createQuestion('string')}>+ Kort antwoord</button>
                    <button class="option" on:click={() => createQuestion('textarea')}>+ Alinea</button>
                    <button class="option" on:click={() => createQuestion('select')}>+ Meerkeuze</button>
                </div>
                {#if !questionsList?.length}
                    <div class="no-questions">
                        <p>Je hebt nog geen vragen aangemaakt</p>
                    </div>
                {/if}
                <div class="submit">
                    {#if questionsList?.length <=4}
                        <button class:disabled={isSubmitDisabled} class="publish">Je moet nog minstens {5 - questionsList?.length} vragen aanmaken</button>
                    {:else}
                        <button class="publish" on:click={submitEnquete}>Enquête opslaan en betalen</button>
                    {/if}
                </div> 
            </div>
        </div>
    </main>

    <style>
    main {
        overflow: hidden;    
        background-color: hsl(167, 46, 98)    
    }
    .container {
        width: calc(100% - 50px);
        height: 100%;
        margin-inline: auto;
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
    button {
        border-radius: 5px;
        height: 2.5rem;
        border: none;
        color: white;
        padding: 0;
        transition: all 0.3s ease-in-out;
        background-color: #6D8C89;
    }
    .options-bar {
        display: flex;
        justify-content: space-between;
        width: calc(100% - 10px);
        flex-direction: row;
        flex-wrap: wrap;
        margin: 2vh 0;
        border: 1px solid #6D8C89;
        border-radius: 5px;
        align-items: center;
        padding: 5px;
    }
    .options-bar > button {
        width: 30%;
        font-size: 0.7rem;
    }
    .option__container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    button:hover {
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.344);    
    }
    .no-questions {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 2rem 0;
        font-size: 0.9rem;
    }
    .question-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: auto;
        margin-bottom: 2rem;
    }
    label {
        font-size: 0.7rem;
        margin: 1vh 0;
    }
    input[type='text'] {
        border-radius: 5px;
        height: 2.5rem;
        border: none;
        color: black;
        padding: 0 1rem;
        transition: all 0.3s ease-in-out;
        background-color: #eeeeee;
        box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
        position: relative;
    }
    .mco {
        margin-top: 2vh;
        background-color: transparent !important;
        border: 1.5px dashed #6D8C89 !important;
        box-shadow: none !important;
        color: black;
        width: 100%;
    }
    .delete {
        background: #fab4b4;
        border: solid 2px #d16c6c;
        color: #b30000;
        margin-top: 2vh;
        padding-inline: 5px;
    }
    .delete__icon {
        background: none;
        border: none;
        color: #b30000;
        margin-top: 2vh;
        margin-left: 15px;
        margin-right: 5px;
    }
    .submit {
        width: 100%;
        height: auto;
        margin: 2rem auto;
    }
    .submit > button {
        width: 100%;
        background-color: #ff3502;
        border: none;
        color: white;
        padding: 0;
        transition: all 0.3s ease-in-out;
    }
    .disabled {
        opacity: 0.5;
        pointer-events: none;
    }
    @media (min-width: 768px) {
        .container {
            width: 80%;
            margin-inline: auto;
        }
        .delete__icon:hover {
            cursor: pointer;
            transform: rotateZ(90deg);
            transition: all 0.3s ease-in-out;
            color: #ff3502;
            box-shadow: none;
        }
    }
    @media (min-width: 1025px) {
        .container {
            width: 60%;
        }
        .delete {
            width: 20%;
            margin-left: auto;
        }
        .submit {
            margin-top: 5rem;
        }
    }
    @media (min-width: 1250px) {
        .container {
            width: 40%;
        }
    }
    </style>