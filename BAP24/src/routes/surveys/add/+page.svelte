<script lang="ts">
    // @ts-nocheck
    import Header from '/src/components/Header.svelte';
    import type { PageData } from '../new-survey/$types';
    import { enhance } from "$app/forms";
    export let data: PageData;
    export let form;
    import { addToast } from '../../../stores';
    import Toasts from '../../../components/Toasts.svelte';
    import { tick } from "svelte";
    import { onMount } from 'svelte';

    let theButton;
    let buttonText = ""
    let currentId = 1

    // Reactive state van de tekst van de button
    $: buttonText = currentId < 10 ? `Volgende (${currentId}/10)` : "Bevestigen"

    onMount(() => {
        
        // Hebben we eventueel een Toast?
        const toast = JSON.parse(localStorage.getItem("toast") as string);
        if (toast) {
            addToast(toast);
            localStorage.removeItem("toast");
        }

        theButton = document.querySelector("#progress")
    })

    // We verhinderen dat de gebruiker een datum in het verleden kan kiezen
    let today = new Date().toISOString().split('T')[0];
    function validateDate() {
        const enqueteDateInput = document.getElementById('enqueteDate');
        const selectedDate = new Date(enqueteDateInput.value);
        const today = new Date();

        if (selectedDate < today) {
            addToast({ message: "U kan geen datum kiezen die in het verleden ligt", type: "error", timeout: 5000 });
            enqueteDateInput.value = today.toISOString().split('T')[0]; // Reset naar de huidige datum
            return false;
        }

        return true;
    }

    // We maken een object aan zodat de gebruiker data kan opslaan
    let enquete = {
        school: 0,
        title: null,
        deadline: null,
        quota: 0,
        ageCategory: null,
        department: null,
        occupation: null,
        nationality: null,
        sex: null
    }

    // We spelen wat met de data omtrent filtering en sorteren
    let age = data.getAge
    let department = data.getDepartment
    let occupation = data.getJob
    let nationalityObject = data.getNationalities;
    let nationalities = nationalityObject.map(n => n.name.common)
    nationalities.sort((a, b) => a.localeCompare(b));    
    let school = data.getSchool
    let sex = data.getSex

    // We navigeren door de enquête
    const cycleQ = (e) => {
        console.log(enquete)
        let currentQ = document.querySelector(".active");
        let element = currentQ?.querySelector("input, textarea, select");
        let myForm = document.getElementById("myForm");
        if (theButton) {
            if (currentQ?.id === "5") {
                theButton.innerHTML = "Bevestigen";
            }
        }

        // Geen geldige element? Dan stoppen we meteen
        if (!element) {
            return;
        }

        // Zolang de huidige id niet 10 is, verhinderen we dat de gebruiker kan submitten
        if (currentQ?.id !== "10") {
            e.preventDefault();
        }

        // Als de huidige id 10 is, dan submitten we de form
        if (currentQ?.id === "10") {
            myForm.submit();
        }

        // Volgende vraag alsjeblieft
        function nextQuestion(currentId) {
            currentQ?.classList.remove('active');
            currentQ?.classList.add('hidden');
            let nextQId = parseInt(currentId) + 1;
            let nextQ = document.getElementById(nextQId.toString());
            currentId = nextQId;

            if (nextQ) {
                nextQ.classList.add('active');
                nextQ.classList.remove('hidden');
            }
            return currentId
    }
    
    // We nemen een switch case om onze data op te slaan
    let elementType = element.nodeName.toLowerCase(); // 'input', 'textarea', of 'select'
    let value;

    switch (elementType) {
        case 'input':
            value = element.value;
            if (value === "") {
                addToast({ message: "Gelieve een geldige waarde in te geven", type: "error", timeout: 5000 });
                return 
            }
            if (element.type === "date") {
                if (!validateDate()) {
                    return;
                }
            }
            enquete[element.name] = value;
            nextQuestion(currentQ?.id);
            break;
        case 'textarea':
            value = element.value;
            if (value === "") {
                addToast({ message: "Gelieve een geldige waarde in te geven", type: "error", timeout: 5000 });
                return 
            }
            enquete[element.name] = value;
            nextQuestion(currentQ?.id);
            break;
        case 'select':
            value = element.options[element.selectedIndex].value;
            if (value === "") {
                addToast({ message: "Gelieve een geldige optie te kiezen", type: "error", timeout: 5000 });
                return 
            }
            enquete[element.name] = value;
            nextQuestion(currentQ?.id);
            break;
    }
    currentId = nextQuestion(currentQ?.id);
    buttonText = currentId < 10 ? `Volgende (${currentId}/10)` : "Bevestigen"; 
    console.log(buttonText)

}

function previousQ() {
    let currentQ = document.querySelector(".active");
    if (!currentQ) return;

    let prevQId = parseInt(currentQ.id) - 1;
    if (prevQId < 1) return; // Voorkomt dat we voorbij de eerste vraag gaan

    let prevQ = document.getElementById(prevQId.toString());
    if (!prevQ) return;

    currentQ.classList.remove('active');
    currentQ.classList.add('hidden');
    prevQ.classList.add('active');
    prevQ.classList.remove('hidden');

    // Update de huidige vraag ID en de knoptekst
    currentId = prevQId;
    buttonText = currentId < 10 ? `Volgende (${currentId}/10)` : "Bevestigen";
}


</script>
    
<Header {data} />

<Toasts />

<main>
    <div class="wrapper">
        <section class="new">
            <h1>Een nieuwe enquete publiceren</h1>
        </section>
        <section class="container">
            <form method="post" id="myForm" use:enhance={() => async ({ update }) => {
                await update();
                await tick();
                if (form)
                localStorage.setItem("toast", JSON.stringify({ message: form?.message, type: form?.type, timeout: 5000 }));
            }}>
                <div class="form-container hidden active" id="1">
                    <label for="nationality">Onder welke schoolinstelling valt deze thesis?</label>
                    <select name="school" id="enq" required>
                        <option value="" selected disabled>Kies een optie</option>
                    {#each school as institute}
                        <option value={institute.id}>{institute.school}</option>
                    {/each}
                    </select>
                </div>
                <div class="form-container hidden" id="2">
                    <label for="title">Wat wordt de naam van je enquete?</label>
                        <input type="text" name="title" value="" required />
                </div>
                <div class="form-container hidden" id="3">
                    <label for="explain">Waar gaat je enquete zoal over?</label>
                        <textarea type="text" name="explain" value="" required />
                </div>
                <div class="form-container hidden" id="4">
                    <label for="deadline">Tot welke dag mag je enquete zichtbaar zijn?</label>
                        <input type="date" name="deadline" id="enqueteDate" value="" min="{today}" required />
                </div>
                <div class="form-container hidden" id="5">
                    <label for="quota">Hoeveel respondenten zou je willen bereiken?</label>
                        <input type="number" name="quota" value="" required />
                </div>
                <div class="form-container hidden" id="6">
                    <label for="ageCategory">Voor welke leeftijdscategorie is je enquête bedoeld?</label>
                    <select name="ageCategory" id="enq">
                        <option value="" disabled selected>Kies een optie</option>
                    {#each age as ageCategory}
                        <option value={ageCategory.id}>{ageCategory.category}</option>
                    {/each}
                    </select>
                    </div>
                <div class="form-container hidden" id="7">
                    <label for="department">Tot welk onderzoeksveld behoort je enquete?</label>
                    <select name="department" id="enq">
                        <option value="" disabled selected>Kies een optie</option>
                    {#each department as field}
                        <option value={field.id}>{field.department}</option>
                    {/each}
                    </select>
                </div>
                <div class="form-container hidden" id="8">
                    <label for="occupation">Welk werkstatuut moet jouw respondent dragen?</label>
                    <select name="occupation" id="enq">
                        <option value="" disabled selected>Kies een optie</option>
                    {#each occupation as job}
                        <option value={job.id}>{job.occupation}</option>
                    {/each}
                    </select>
                </div>
                <div class="form-container hidden" id="9">
                    <label for="nationality">Moet jouw respondent over een bepaalde nationaliteit beschikken?</label>
                    <select name="nationality" id="enq">
                        <option value="" disabled selected>Kies een optie</option>
                        <option value="onbepaald" >Niet belangrijk</option>
                    {#each nationalities as origin}
                        <option value={origin}>{origin}</option>
                    {/each}
                    </select>
                </div>
                <div class="form-container hidden" id="10">
                    <label for="sex">Welk geslacht / gender moet jouw respondent hebben?</label>
                    <select name="sex" id="enq">
                        <option value="" disabled selected>Kies een optie</option>
                    {#each sex as gender}
                        <option value={gender.id}>{gender.sex}</option>
                    {/each}
                    </select>
                </div>
            </form>
            <div class="button">
                <button class="prev__mobile" type="submit" id="previuous" on:click={previousQ}>&larr;</button> 
                <button type="submit" id="progress" on:click={cycleQ}>{buttonText}</button> 
            </div>
        </section>
    </div>
</main>

<style>
    main {
        overflow: hidden;    
        background-color: hsl(167, 46, 98);
        height: calc(90vh - 4.5rem);
        max-width: 100%;
    }
    .wrapper {
        height: auto;
        margin-inline: 25px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    section {
        width: 100%;
        /* margin-inline: 25px; */
        height: auto;
    }
    h1 {
        font-weight: 600;
        font-size: 1.6rem;
        line-height: calc(2rem * 1.2);
        text-align: left;
    }
    .new {
        height: auto;
        margin-bottom: 3rem;
    }
    .container {
        height: auto;
    }
    form {
        min-height: 55vh;
        height: auto;
        width: 100%;
        margin-inline: auto;
        display: flex;
        flex-direction: column;
        color: white;
    }
    label {
        color: black;
        font-weight: 500;
        margin-bottom: 50px;
    }
    input, textarea, select {
        margin-top: 0.5rem;
        padding: 0px;
        border-radius: 8px;
        width: 100%;
        height: 2.5rem;
        border: none;
        color: black;
        border: solid 2px black;
        text-indent: 0.5rem;
        font-size: 0.9rem;
        line-height: calc(0.9rem * 1.3);
        box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
    }
    input[type="date"] {
        text-indent: 0.35rem;
        font-family: 'poppins', sans-serif
    }
    textarea {
        height: 10rem;
        padding: 5px;
        width: calc(100% - 5%);
        text-indent: 0;
        font-family: 'poppins', sans-serif;
    }
    .button {
      height: 2.2rem;
      display: flex;
      align-items: end;
      border-radius: 8px;
      display: flex;
      flex-direction: row;
      gap: 2rem
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
        box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
    }
    button:hover {
        cursor: pointer;
    }
    .hidden {
        display: none;
    }
    .active {
        display: block;
    }
    .prev__mobile {
        width: 30%;
        background-color: transparent;
        border: solid 2px #ff6a4c;
        color: #ff6a4c
    }
    @media (min-width: 768px) {
        main {
            height: calc((90vh - 6px) - 4rem);
        }
        .new {
            height: auto;
        }
        .wrapper {
            width: 30rem;
            margin: auto;
            height: 100%;
            display: block;
        }
        form {
            min-height: calc(100vh - 18rem - (10vh + 6px));
            margin-bottom: 3rem;
        }
        section {
            margin-inline: 0px;
        }
        .container {
            height: auto;
        }
    }
</style>
