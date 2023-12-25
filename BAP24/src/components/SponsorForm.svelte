<script>
    import { enhance } from "$app/forms";
    import { onMount, tick } from "svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let myForm;
    onMount(() => {
        myForm = document.getElementById('myForm');
    });

    // We voegen een nieuwe sponsor toe aan de database
    async function handleSubmit(event) {
        event.preventDefault();
        const response = await fetch('/dashboard/admin/create/sponsor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: myForm.name.value,
                address: myForm.address.value,
                city: myForm.city.value,
                owner: myForm.owner.value,
                link: myForm.link.value
            })
        });

        const res = await response.json();
        dispatch('sponsorformSubmitted', res);
    }

    function cancel() {
        dispatch('sponsorformCancelled', 'test');
    }



</script>

<form method="post" on:submit={handleSubmit} id="myForm" action="/dashboard/admin/create/sponsor" use:enhance={() => async ({ update }) => {
    await update();
    await tick();
}}>
    <label for="name">Naam van handelszaak</label>
    <input type="text" id="name" name="name" placeholder="De Vrolijke Viking" required />

    <label for="address">Straatnaam + huisnummer</label>
    <input type="text" id="address" name="address" placeholder="Voskenslaan 67" required />

    <label for="city">Stad</label>
    <input type="text" id="city" name="city" placeholder="Gent" required />

    <label for="owner">Eigenaar</label>
    <input type="text" id="owner" name="owner" placeholder="Niels Viaene" required />

    <label for="address">Link naar website/socials</label>
    <input type="url" id="link" name="link" placeholder="https://www.devrolijkeviking.be/" required />

    <button type="submit">Submit</button>
</form>

    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <p class="cancel" on:click={cancel}>Annuleren</p>

<style>
    form {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
    }

    label {
        color: white;
        font-weight: 500;
        margin-bottom: 1vh;
        font-size: 0.8rem;
    }

    input { 
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid #ccc;
        margin-bottom: 2rem;
        box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
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
    .cancel {
        text-align: center;
        color: white;
        font-size: 0.7rem !important; 
        cursor: pointer;
        text-decoration: underline;
        padding-bottom: 1px;
        margin-top: 1rem;
    }
</style>