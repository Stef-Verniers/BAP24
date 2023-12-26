<script lang="ts">
    import Header from "../../../../components/Header.svelte";
    import Survey from "../../../../components/Survey.svelte";
    import { goto } from "$app/navigation";
    import { addToast } from "../../../../stores";
    import Toasts from "../../../../components/Toasts.svelte";
    import type { PageData } from "./$types";
    export let data: PageData;
        
    let gender;
    let userGender = ''
    let buttonText = ''

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

    $: buttonText = data.user.admin ? "←" : 'Terug naar dashboard'

    // Functie om de enquête te verwijderen
    async function destroy() {
        const surveyId = data.survey.id
        console.log(data.userId)
        const response = await fetch(`/surveys/${surveyId}/destroy`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: surveyId,
                userId: data.userId,
                owner: data.survey.userId
            })
        });
        if (response.status === 403) {
            addToast({ message: 'Er ging iets mis, probeer het later opnieuw..', type: 'error', timeout: 5000 });
        } else {
            localStorage.setItem("toast", JSON.stringify({ message: 'De enquête werd met succes verwijderd!', type: 'success', timeout: 5000 }));
            console.log('Enquête verwijderd');
            goto(`/dashboard`);
        }
    }

</script>

<Header {data} />

<Toasts />

<main>
    {#if !data.user.admin}
    <div class="intro">
        <h1>Je enquête bekijken</h1>
        <p>Je kunt hier je enquête bekijken en eventueel wijzigen.</p>
    </div>
    {/if}

    <div class="wrapper" id="preflight">
        <section class="container">
            <div class="preflight">
                <h1>{data.survey?.title}</h1>
                <p>{userGender} {data.owner} | 🏫 {data.school}</p>
                <p>📓 {data.department}</p>
            </div>
            <div class="about">
                <h2>Waar gaat deze enquete over?</h2>
                <p>{data.survey?.explanation}</p>
            </div>
        </section>
    </div>

    <Survey {data} disable=true/>

    <div class="button">
        <button class="{data.user.admin ? 'prev__mobile' : '.button'}" type="submit" id="previuous" on:click={() => goto(`/dashboard`)}>{buttonText}</button> 
        {#if data.user.admin}
        <button type="submit" class="delete" id="progress" on:click={destroy}>Verwijder deze enquête</button> 
        {/if}
    </div>

</main>

<style>
    main {
        overflow: hidden;    
        background-color: hsl(167, 46, 98);
        height: auto;
    }

    .intro > h1, .preflight > h1 {
        font-size: 1.6rem;
        font-weight: 700;
        line-height: calc(1.3rem * 1.3);
    }
    .intro > p, .preflight > p {
        font-size: 0.9rem;
        font-weight: 500;
        line-height: calc(0.9rem * 1.3);
        color: rgb(119, 119, 119);
        margin: 1vh 0;
    }
    .intro, button {
        width: calc(100% - 50px);
        margin-inline: 25px;
    }
    .about {
        margin-top: 2rem;
        margin-bottom: 2rem;
        margin-inline: 25px;
    }
    .about > h2 {
        font-size: 1.1rem;
        font-weight: 600;
        line-height: calc(1.1rem * 1.3);
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
    .prev__mobile {
        width: 30%;
        background-color: transparent;
        border: solid 2px #ff6a4c;
        color: #ff6a4c
    }
    .delete {
        background-color: #ac1111 !important;
    }
    button:hover {
        cursor: pointer;
    }
    @media screen and (min-width: 768px) {
        .intro {
            width: calc(80% + 25px);
            margin-inline: auto;
            margin-bottom: 3rem;
        }
        main {
            margin-bottom: 5rem;
        }
        .container {
            width: calc(80% + 25px);
            margin-inline: auto;
        }
    }
    @media screen and (min-width: 1025px) {
        .intro {
            width: calc(70% - 25px);
            margin-inline: auto;
        }
        .button, .preflight, .about {
            width: 500px;
            margin: auto;
        }
        .about {
            margin: 2rem;
            margin-inline: auto;
        }
        button {
            margin-inline: auto;
        }
        .container {
            width: calc(70% - 25px);
            margin-inline: auto;
        }
    }
</style>