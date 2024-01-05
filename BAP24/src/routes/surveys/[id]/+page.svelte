<script>
    import Header from "../../../components/Header.svelte";
    import { tick } from "svelte";
    import { enhance } from "$app/forms";
    import { onMount } from "svelte";
    import { addToast } from "../../../stores";
    import Toasts from "../../../components/Toasts.svelte";
    import { goto } from "$app/navigation";
    export let data;

    // Variabelen staan klaar
    let preflight;
    let surveyScreen;
    let stopwatchValue;
    let questions;
    let surveyForm;
    let gender;
    let userGender = ''
    let duplicate;
    let complete = false;
    let inputs = [];

    // Kijkt naar het geslacht van de eigenaar van de enquête en past de emoji aan
    $: if (gender = data.ownerSex.Additional_Information[0].sexId) {
        if (gender === 2) {
            userGender = '👦🏻'
        } else if (gender === 3) {
            userGender = '👧🏼'
        } else {
            userGender = '🏳️‍🌈'
        }
    }

    // Kijkt of de gebruiker de enquête al heeft ingevuld
    $: if (data.respondents.length > 0) {
        duplicate = true
    }

    // Als de survey al in de localstorage staat, dan wordt de enquête gestart.
    // Er wordt tevens gecontroleerd of alle velden zijn ingevuld.
    onMount(() => {
        preflight = document.getElementById("preflight");
        surveyScreen = document.getElementById("survey");
        surveyForm = document.getElementById("surveyForm");
        const surveyStarted = JSON.parse(localStorage.getItem("surveyStarted"));
        if (surveyStarted) stopwatchValue = surveyStarted.stopwatch;
        if (surveyStarted && surveyStarted["started?"] === true) {
            startSurvey();
        }
        inputs = surveyForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', validateForm);
        });
    });

    // Formulier valideren
    function validateForm() {
        complete = true;
        inputs.forEach(input => {
            if (!input.value && input.hasAttribute('required')) {
                complete = false;
            }
        });
    }

    // Start de enquête
    const startSurvey = () => {
    if (duplicate) {
        localStorage.setItem("toast", JSON.stringify({ message: 'Je hebt deze enquête al ingevuld', type: 'error', timeout: 5000 }));
        goto(`/surveys`);
        return;
    }
    preflight.style.display = "none";
    surveyScreen.classList.remove("hidden");
    const stopwatchNow = Date.now();
    localStorage.setItem("surveyStarted", JSON.stringify({
        "started?" : true,
        "stopwatch" : stopwatchNow
    }));
    stopwatchValue = stopwatchNow;
};

    // Enquête inleveren
    const submitSurvey = () => {
        if (!complete) {
            addToast({ message: 'Vul alle velden in', type: 'error', timeout: 5000 });
        } else {
        surveyForm?.dispatchEvent(new Event('submit'));
    }}
    questions = data.questions;

</script>

<Header {data} />

<Toasts />

<main>
    <div class="wrapper" id="preflight">
        <section class="container">
            <div class="intro">
                <h1>{data.survey?.title}</h1>
                <p>{userGender} {data.owner} | 🏫 {data.school}</p>
                <p>📓 {data.department}</p>
            </div>
            <div class="about">
                <h2>Waar gaat deze enquete over?</h2>
                <p>{data.survey?.explanation}</p>
            </div>
            <div class="button">
                <button type="submit" id="progress" on:click={startSurvey}>Start de enquête!</button> 
            </div>
        </section>
    </div>
    <div class="wrapper-survey hidden" id="survey">
        <div class="survey-intro">
            <h1>{data.survey?.title}</h1>
        </div>
        <div class="survey">
            <form id="surveyForm" method="post" action="?/submitEnquete" use:enhance={() => async ({ update }) => {
                await update();
                await tick();
                if (data) {
                    localStorage.setItem("toast", JSON.stringify({ message: 'Jouw antwoorden werden met succes opgeslagen', type: 'success', timeout: 5000 }));
                    localStorage.removeItem('surveyStarted');
                    goto(`/surveys`);
                }
            }}>
                {#each questions as question}
                <div class="question-container">
                    <label for={question.id}>{question.text}</label>
                    {#if question.type === "string"}
                        <input type="text" id={question.id} name={`question-${question.id}`} placeholder="Typ hier je antwoord" required>
                    {:else if question.type === "textarea"}
                        <textarea id={question.id} name={`question-${question.id}`} placeholder="Typ hier je antwoord" required></textarea>
                    {:else if question.options && question.options.length <= 3}
                        {#each question.options as option}
                            {#if question.allowMultiple}
                                <label for={`option-${option.id}`}>
                                    <input required type="checkbox" id={`option-${option.id}`} name={`question-${question.id}[]`} value={option.text}>{option.text} 
                                </label>
                            {:else}
                                <input type="radio" id={`option-${option.id}`} name={`question-${question.id}`} value={option.text} required>
                                <label for={`option-${option.id}`}>{option.text}</label>
                            {/if}
                        {/each}
                    {:else}
                        {#if question.allowMultiple}
                            {#each question.options as option}
                                <label for={`option-${option.id}`}>
                                    <input required type="checkbox" id={`option-${option.id}`} name={`question-${question.id}[]`} value={option.text}>{option.text}
                                </label>
                            {/each}
                        {:else}
                            <select id={question.id} name={`question-${question.id}`} required>
                                <option selected disabled>Kies een optie</option>
                                {#each question.options as option}
                                    <option value={option.text}>{option.text}</option>
                                {/each}
                            </select>
                        {/if}
                    {/if}
                </div>
                {/each}
                <input type="hidden" name="stopwatch" bind:value={stopwatchValue}>
            </form>
            <div class="button">
                <button type="submit" id="progress" on:click={submitSurvey}>Inleveren</button>
            </div> 
        </div>
    </div>
</main>

<style>
    main {
        overflow: hidden;    
        background-color: hsl(167, 46, 98);
        height: auto;
        margin-bottom: 3rem;
    }
    .wrapper, .wrapper-survey {
        height: 100%;
        width: calc(100% - 50px);
        margin-inline: 25px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: start;
        margin-bottom: 2rem;
    }
    form {
        margin-top: 2rem;
    }
    section {
        width: 100%;
        height: auto;
    }
    h1 {
        font-weight: 600;
        font-size: 1.3rem;
        line-height: calc(2rem * 1.2);
        text-align: left;
    }
    .container {
        height: auto;
    }
    .intro > h1 {
        font-size: 1.6rem;
        font-weight: 700;
        line-height: calc(1.3rem * 1.3);
    }
    .survey-intro > h1 {
        font-size: 1.6rem;
        font-weight: 700;
        line-height: calc(1.3rem * 1.3);
    }
    .intro > p {
        font-size: 0.9rem;
        font-weight: 500;
        line-height: calc(0.9rem * 1.3);
        color: rgb(119, 119, 119);
        margin: 1vh 0;
    }
    .button {
      height: 2.2rem;
      display: flex;
      align-items: end;
      border-radius: 8px;
    }
    button {
        border-radius: 8px;
        width: 100%;
        height: 2.2rem;
        border: none;
        background-color: #ff6a4c;
        color: white;
        padding: 0;
        font-weight: 600;
    }
    button:hover {
        cursor: pointer;
    }
    .about {
        margin-top: 2rem;
        margin-bottom: 2rem;
    }
    .about > h2 {
        font-size: 1.1rem;
        font-weight: 600;
        line-height: calc(1.1rem * 1.3);
    }
    .hidden {
        display: none;
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
        font-weight: 600;
    }
    input[type='text'] {
        border-radius: 5px;
        height: 2.5rem;
        border: none;
        color: black;
        padding: 0 1rem;
        transition: all 0.3s ease-in-out;
        box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
        position: relative;
        border: solid 1px #202020;
    }
    input[type="radio"] {
        display: none;
    }

    input[type="radio"] + label {
        cursor: pointer;
        padding: 10px;
        border: 2px solid #bdbdbd;
        border-radius: 4px;
        transition: background-color 0.3s ease;
        margin-top: 0.3rem;
    }
    input[type="radio"]:checked + label {
        background-color: rgb(167, 235, 220);
        color: rgb(0, 0, 0);
        border-color: rgb(111, 190, 173);
    }
    select {
        padding: 0px;
        border-radius: 8px;
        width: 100%;
        height: 2.5rem;
        border: solid 1px #202020;
        text-indent: 0.5rem;
        font-size: 0.9rem;
        box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
    }
    option {
        background-color: hsl(166, 100%, 17%);
        color: white;
    }
    textarea {
        height: 10rem;
        padding: 1rem;
        font-family: 'poppins', sans-serif;
        box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
        border-radius: 5px;
        line-height: calc(0.9rem * 1.3);
    }
    input:focus, select:focus, textarea:focus {
        outline-color: rgb(111, 190, 173);
    }
    .survey {
        width: 100%;
    }
    @media (min-width: 768px) {
        .wrapper, .wrapper-survey {
            width: 500px;
            margin: auto;
        }
    }
</style>