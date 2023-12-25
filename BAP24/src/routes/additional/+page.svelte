<script lang="ts">
    // @ts-nocheck
    import Logo from "../../components/Logo.svelte";
    import { enhance } from "$app/forms";
    import Toasts from "../../components/Toasts.svelte";
    import { addToast } from "../../stores";
    import { tick } from "svelte";
    import type { ActionData, PageData } from "./$types.js";
    import { SyncLoader } from "svelte-loading-spinners";
    import { onMount } from "svelte";
    export let data: PageData;
    export const form: ActionData = null;

    // Kijkt voor toasts in de localstorage en showt deze in de frontend
    onMount(() => {
        const toast = JSON.parse(localStorage.getItem("toast"));
        if (toast) {
            addToast(toast);
            localStorage.removeItem("toast");
        }
    });

    // We maken een leeg object aan
    export let info = {
        age: '',
        nationality: '',
        sex: 0,
        occupation: '',
        department: ''
    }

    // Enkele variabelen worden aangemaakt
    let buttonText;
    let currentQuestionId = 1;

    // De tekst van de knop wordt aangepast aan de huidige vraag
    $: buttonText = currentQuestionId < 5 ? `Volgende (${currentQuestionId}/5)` : `Bevestigen (${currentQuestionId}/5)` 

    // We gaan de data wat manipuleren voor het de gebruiker wat makkelijker te maken
    // Verder wijzen we nog waarden toe aan enkele variabelen
    let age = data.age.filter(s => s.id !== 1);
    let nationalityObject = data.nationalities;
    let nationalities = nationalityObject.filter(n => n.name.common !== "Belgium").map(n => n.name.common)
    nationalities.sort((a, b) => a.localeCompare(b));
    let sex = data.sex.filter(s => s.id !== 1);
    let occupation = data.occupation.filter(s => s.id !== 1);
    let department = data.department;
    
    // De functie die ons door de vragen zal guiden
    const cycleQ = (e) => {
        let currentQ = document.querySelector(".active");
        let element = currentQ?.querySelector("input, select");
        let myForm = document.getElementById("myForm");
        let elementType = element.nodeName.toLowerCase(); // 'input', 'textarea', of 'select'
        let isValid = true;
        let value;

        // Als er geen input of select element kan gevonden worden, stoppen we de functie
        if (!element) {
            return;
        }

        // Met de switch case gaan we naar het type element zodat we de data ingegeven data kunnen toekennen aan ons object
        switch (elementType) {
            case 'input':
            if (element.type === 'radio') {
                    const selectedRadio = document.querySelector('input[name="sex"]:checked');
                    if (selectedRadio) {
                        info.sex = selectedRadio.value;
                    } else {
                        if (!info.sex) { // Voorkom het overschrijven als het al is ingesteld
                            addToast({ message: "Selecteer een geslacht", type: "error", timeout: 5000 });
                            isValid = false;
                        }
                    }
                } else {
                    info[element.name] = value;
                }
                break;
            case 'select':
                value = element.options[element.selectedIndex].value;
                if (!value) {
                    addToast({ message: "Gelieve een keuze te maken", type: "error", timeout: 5000 });
                    isValid = false;
                    break
                } else {
                    info[element.name] = value;
                }
                break;
        }

        // Validatie om door te gaan naar de volgende vraag
        if (isValid) {
            let nextId = nextQuestion(currentQ.id);
        if (nextId <= 5) {
            e.preventDefault();
            currentQuestionId = nextId;
            buttonText = currentQuestionId < 5 ? `Volgende (${currentQuestionId}/5)` : "Bevestigen";
        } else if (nextId > 5) {
            <SyncLoader size="60" color="#FF3E00" unit="px" duration="1s" />
            myForm.submit();
        }
        } else {
            currentQuestionId = parseInt(currentQ.id);
        }
    }

    // Functie om de volgende vraag aan te roepen
    function nextQuestion(currentId) {
        let currentQ = document.getElementById(currentId);
        currentQ?.classList.remove('active');
        currentQ?.classList.add('hidden');
        let nextQId = parseInt(currentId) + 1;
        let nextQ = document.getElementById(nextQId.toString());

        if (nextQ) {
            nextQ.classList.add('active');
            nextQ.classList.remove('hidden');
        }

        return nextQId;
    }

</script>

<Toasts />

<main>
    <div class="logo">
      <div class="image-container">
        <Logo width=10rem/>
      </div>
    </div>
    <div class="container">
        <div class="wrapper">
            <div class="title">
                <h1>We zijn er bijna</h1>
                <p>We hebben nog wat bijkomende informatie nodig van je.</p>
            </div>
            <form id="myForm" method="post" use:enhance={() => async ({ update }) => {
                await update();
                await tick();
                if (data)
                    addToast({ message: 'Jouw gegevens werden met succes opgeslagen', type: 'success', timeout: 5000 });
                }}>
                <div class="question active" id="1">
                    <h2>Tot welke leeftijdcategorie behoor je?</h2>
                    <select name="age" id="enq">
                        <option value="" disabled selected>Kies een optie</option>
                    {#each age as ageCategory}
                        <option value="{ageCategory.id}">{ageCategory.category}</option>
                    {/each}
                    </select>
                    </div>
                <div class="question hidden" id="2">
                    <h2>Welke nationaliteit heb je?</h2>
                    <select name="nationality" id="enq">
                        <option value="België" selected>België</option>
                    {#each nationalities as country}
                        <option value={country}>{country}</option>
                    {/each}
                    </select>
                    </div>
                    <div class="question hidden" id="3">
                        <h2>Wat is je geslacht / gender?</h2>
                        {#each sex as gender}
                            <input type="radio" id={`gender-${gender.id}`} name="sex" value={gender.id} required>
                            <label for={`gender-${gender.id}`}>{gender.sex}</label>
                        {/each}
                    </div>
                <div class="question hidden" id="4">
                    <h2>Wat is je huidig werkstatuut?</h2>
                    <select name="occupation" id="enq">
                        <option value="" disabled selected>Kies een optie</option>
                    {#each occupation as job}
                        <option value={job.id}>{job.occupation}</option>
                    {/each}
                    </select>
                    </div>
                <div class="question hidden" id="5">
                    <h2>Wat studeer je? / Wat is je kennisveld?</h2>
                    <select name="department" id="enq">
                        <option value="" disabled selected>Kies een optie</option>
                    {#each department as field}
                        <option value={field.id}>{field.department}</option>
                    {/each}
                    </select>
                    </div>
            </form>
            <div class="button">
                <button type="submit" id="button" on:click={cycleQ}>{buttonText}</button> 
            </div>
        </div>
    </div>
</main>

<style>
    .logo{
        height: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    main {
        width: 100vw;
        height: 100vh;
        background-color: rgb(240, 249, 247);
        position: relative;
    }
    .wrapper {
        width: 80%;
        height: calc(100% - 4rem);
        margin: 2rem auto;
    }
    .title {
      color: white;
      height: 20%;
      text-align: left;
    }
    .title > h1 {
        font-size: 2rem;
        color: white;
        font-weight: bold;
        margin-bottom: 8px;
    }
    .title > p {
        line-height: calc(0.9rem * 1.2);
        font-size: 0.9rem;
    }
    .container {
        position: absolute;
        bottom: 0;
        border-radius: 20px 20px 0 0;
        width: 100%;
        height: 80%;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: start;
        background-color: hsl(167 46% 38% / 1);
    }
    form {
        height: 70%;
        display: flex;
        flex-direction: column;
        width: 100%;
        color: white;
        margin: auto;
        margin-left: 2px;
    }
    .button {
        height: 2.2rem;
        display: flex;
        align-items: end;
        border-radius: 8px;
        outline: 3px solid #ff6a4c;
        position: relative;
    }
    button {
        border-radius: 8px;
        width: 100%;
        height: 2.2rem;
        border: none;
        background-color: #ff6a4c;
        color: white;
        padding: 0;
        position: absolute;
        z-index: 234;
        font-weight: 600;
        box-shadow: 0px 2px 6px rgb(0, 0, 0, 0.43);
    }
    button:hover {
        cursor: pointer;
    }
    .question {
        height: fit-content;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: left;
        margin: 3vh auto;
        width: 100%;
    }
    .question > h2 {
        margin: 1vh auto;
        margin-left: 10px;
        text-align: left;
    }
    select {
        padding: 0px;
        border-radius: 8px;
        width: 100%;
        height: 2.5rem;
        border: none;
        background-color: #eeeeee;
        color: rgb(0, 0, 0);
        text-indent: 0.5rem;
        font-size: 0.9rem;
        box-shadow: 0px 2px 6px rgb(0, 0, 0, 0.43);
    }
    .hidden {
        display: none;
    }
    option {
        background-color: hsl(166, 100%, 17%);
        color: white;
    }
    input[type="radio"] {
        display: none;
    }
    input[type="radio"] + label {
        cursor: pointer;
        padding: 10px;
        border: 2px solid white;
        border-radius: 4px;
        transition: background-color 0.3s ease;
        margin-top: 0.3rem;
    }
    input[type="radio"]:checked + label {
        background-color: rgb(205, 255, 227);
        border: 2px solid rgb(108, 202, 133);
        color: rgb(11, 124, 41)
    }
    @media (min-width: 768px) {
        .logo{
            height: 20%;
        }
        .container {
          width: 100%;
          height: 80%;
        }
        .wrapper {
          width: 500px;
        }
        .title {
          height: 20%;
          text-align: center;
          display: flex;
          justify-content: center;
          flex-direction: column;
        }
        .title > h1 {
          font-size: 3rem;
          color: white;
          font-weight: bold;
          margin-bottom: 8px;
        }
        form {
          width: 100%;
          margin: auto;
          align-items: center;
          height: fit-content;
          margin-top: 5vh;
        }
        .question, .button {
          width: 25rem;
        }
        .question {
            height: 200px;
            justify-content: start;
        }
        .button {
          margin-top: 2vh;
          margin: auto;
        }
        button {
          margin-top: 1rem;
          transition: all 0.3s ease-in-out;
        }
        button:hover {
          cursor: pointer;
          transition: all 0.3s ease-in-out;
          box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.344);    
        }
      }
</style>