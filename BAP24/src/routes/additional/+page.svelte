<script lang="ts">
    import Logo from "../../components/Logo.svelte";
    import { enhance } from "$app/forms";
    import Toasts from "../../components/Toasts.svelte";
    import { addToast } from "../../stores";
    import { tick } from "svelte";
    import type { ActionData, PageData } from "./$types.js";
    export let data: PageData;
    export let form: ActionData;

    export let info = {
        age: 0,
        birthplace: '',
        domestic: '',
        religion: '',
        sex: '',
        study: ''
    }

    const cycleQ = (e) => {

    let currentQ = document.querySelector(".active");
    let input = currentQ?.querySelector("input");

    if (!input) {
        // Handle the case where the input element is not found
        return;
    }

    if (input.type === "radio" && !input.checked) {
            // If it's a radio input and not checked, do nothing
            return;
        }

    if (currentQ?.id !== "6") {
      e.preventDefault();
    }

    function nextQuestion(currentId) {
        currentQ?.classList.remove('active');
        currentQ?.classList.add('hidden');
        let nextQId = parseInt(currentId) + 1;
        let nextQ = document.getElementById(nextQId.toString());

        if (nextQ) {
            nextQ.classList.add('active');
            nextQ.classList.remove('hidden');
        }
    }

    switch (input.name) {
        case "age":
            if (info.age !== 0) {
                break;
            }
            let age = parseInt(input.value); // Parse the input value to a number
            info.age = age; // Update the info.age value
            console.log(typeof age)
            nextQuestion(currentQ?.id)
            break;
        case "birthplace":
            if (info.birthplace !== '') {
                break;
            }
            info.birthplace = input.value
            nextQuestion(currentQ?.id)
            break;
        case "domestic":
            if (info.domestic !== '') {
                break;
            }
            info.domestic = input.value
            nextQuestion(currentQ?.id)
            break;
        case "sex":
            if (info.sex !== '') {
                break;
            }
            console.log(input.value)
            info.sex = input.value
            nextQuestion(currentQ?.id)
            break;
        case "religion":
            if (info.religion !== '') {
                break;
            }
            info.religion = input.value
            nextQuestion(currentQ?.id)
            break;
        case "study":
            if (info.study !== '') {
                break;
            }
            info.study = input.value
            nextQuestion(currentQ?.id)
            break;
    }
};

console.log(info)

</script>

<Toasts />

<main>
    <div class="logo">
      <div class="image-container">
        <Logo width=10rem/>
      </div>
    </div>
    <div class="container">
        <form method="post" use:enhance={() => async ({ update }) => {
            await update();
            await tick();
            if (data)
                addToast({ message: form?.['message'], type: form?.['type'], timeout: 5000 });
            }}>
            <h1>We zijn er bijna</h1>
            <p>We hebben nog wat bijkomende informatie nodig van je.</p>

            <div class="question active" id="1">
                <h2>Hoe oud ben je?</h2>
                    <input type="text" name="age" value="" id="enq">
                    <button on:click={cycleQ}>Volgende</button>
            </div>
            <div class="question hidden" id="2">
                <h2>Waar ben je geboren?</h2>
                    <input type="text" name="birthplace" value="" id="enq">
                    <button on:click={cycleQ}>Volgende</button>
            </div>
            <div class="question hidden" id="3">
                <h2>Waar woon je nu?</h2>
                    <input type="text" name="domestic" value="" id="enq">
                    <button on:click={cycleQ}>Volgende</button>
            </div>
            <div class="question hidden" id="4">
                <h2>Wat is je geslacht?</h2>

                <input type="radio" name="sex" value="male" id="man">
                <label for="man">Man</label>
                <input type="radio" name="sex" value="female" id="vrouw">
                <label for="vrouw">Vrouw</label>
                <input type="radio" name="sex" value="other" id="andere">
                <label for="andere">Andere</label>

                <button on:click={cycleQ}>Volgende</button>
            </div>
            <div class="question hidden" id="5">
                <h2>Wat is je geloofsovertuiging?</h2>
                    <input type="text" name="religion" value="" id="enq">
                    <button on:click={cycleQ}>Volgende</button>
            </div>
            <div class="question hidden" id="6">
                <h2>Wat studeer je?</h2>
                    <input type="text" name="study" value="" id="enq">
                    <button on:click={cycleQ}>Afronden</button>
            </div>
        </form>
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
    .container {
        position: absolute;
        bottom: 0;
        border-radius: 20px 20px 0 0;
        width: 100%;
        height: 80%;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(91, 194, 172);
    }
    form {
        min-height: 30%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        padding-bottom: 2vh;
        width: 70%;
        color: white
    }
    form > h1 {
        font-size: 2rem;
        color: white;
        font-weight: bold;
        margin-bottom: 8px;
        text-align: left;
    }
    form > p {
        line-height: calc(1rem * 1.3);
    }
    button {
        border-radius: 25px;
        width: 100%;
        height: 2.5rem;
        border: none;
        background-color: #ff6a4c;
        color: white;
        padding: 0;
        margin-top: 15px;
    }
    button:hover {
        cursor: pointer;
    }

    .question {
        height: 40vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: left;
    }
    .question > h2 {
        margin: 1vh auto;
        margin-left: 10px;
        text-align: left;
    }
    input {
        padding: 0px;
        border-radius: 25px;
        width: 100%;
        height: 2.2rem;
        border: none;
        background-color: hsl(167 46% 38% / 1);
        color: white;
        text-indent: 1rem;
        font-size: 0.9rem;
    }
    .hidden {
        display: none;
    }
    input[type="radio"] {
        display: none;
    }

    input[type="radio"] + label {
        width: calc(100% - 20px);
        cursor: pointer;
        padding: 10px;
        border: 2px solid #ffffff;
        border-radius: 4px;
        transition: background-color 0.3s ease;
        margin-top: 0.3rem;
    }
    input[type="radio"]:checked + label {
        background-color: rgb(79, 179, 121);
        color: #fff;
        border-color: rgb(79, 179, 121);
    }
    @media (min-width: 768px) {
        form > h1 {
          font-size: 2rem;
          color: white;
          font-weight: bold;
      }
        .logo{
            height: 20%;
        }
        .container {
          width: 100%;
          height: 80%;
        }
        .container > form {
          width: fit-content;
          margin: auto;
          align-items: center;
        }
        button {
          margin-top: 1rem;
        }
      }
</style>