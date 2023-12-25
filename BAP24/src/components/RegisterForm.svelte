<script lang=ts>
    import { enhance } from "$app/forms";
    import { tick } from "svelte";
    import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";

let myForm;
onMount(() => { myForm = document.getElementById('myForm') });

// Regex voor email
const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const dispatch = createEventDispatcher();

async function handleSubmit(event) {
    event.preventDefault();

    let name = (myForm?.querySelector('[name="name"]') as HTMLInputElement)?.value;
    let email = (myForm?.querySelector('[name="email"]') as HTMLInputElement)?.value;
    let password = (myForm?.querySelector('[name="password"]') as HTMLInputElement)?.value;
    let confirmPassword = (myForm?.querySelector('[name="requirePassword"]') as HTMLInputElement)?.value;

    console.log(name, email, password, confirmPassword)

    // Controleer of alle velden zijn ingevuld
    if (!name || !email || !password || !confirmPassword) {
        dispatch('registerError', "Vul alle velden in");
        return;
    }

    // Controleer of het emailadres geldig is
    if (!emailRegex.test(email)) {
        dispatch('registerError', "Voer een geldig e-mailadres in");
        return;
    }

    // Controleer of het wachtwoord minimaal 8 tekens bevat
    if (password.length < 8) {
        dispatch('registerError', "Wachtwoord moet minimaal 8 tekens bevatten");
        return;
    }

    // Controleer of de wachtwoorden overeenkomen
    if (password !== confirmPassword) {
        dispatch('registerError', "Wachtwoorden komen niet overeen");
        return;
    }

    const response = await fetch('/register/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            requirePassword: confirmPassword,
        })
    });

    const res = await response.json();
    console.log(res)
    dispatch('registerFormSubmitted', res);
}

</script>

<form id="myForm" method="POST" action="/register/create" on:submit={handleSubmit} use:enhance={() => async ({ update }) => {
    await update()
    await tick();
    }}>
      <label for="name">Voor + achternaam</label>
          <input type="text" name="name" required />

      <label for="email">Email</label>
          <input type="email" name="email" required />

      <label for="password">Wachtwoord</label>
          <input type="password" name="password" required />

      <label for="password">Bevestig wachtwoord</label>
          <input type="password" name="requirePassword" required />
      <div class="button">
        <button type="submit">Bevestig je registratie</button>
        <p>Heb je al een account?<a href="/login">Log je hier in!</a></p>
      </div>
  </form>

  <style>
    form {
      height: 70%;
      display: flex;
      flex-direction: column;
      width: 100%;
      color: white;
      margin: auto;
      margin-left: 2px;
    }
    input {
        padding: 0px;
        border-radius: 8px;
        width: 100%;
        height: 2.2rem;
        border: none;
        background-color: #eeeeee;
        color: black;
        text-indent: 0.5rem;
        font-size: 0.9rem;
        margin-bottom: 3vh;
        box-shadow: 0px 2px 2px rgb(0, 0, 0, 0.23);
    }
    label {
        color: white;
        font-weight: 500;
        margin-bottom: 1vh;
        font-size: 0.7rem;
    }
    .button {
        height: auto;
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
    p {
        font-size: 0.8rem;
        text-align: center;
        margin-top: 1rem;
        color: white
    }
    p > a {
        text-decoration: none;
        color: rgb(255, 240, 237);
        margin-left: 0.3rem;
        font-weight: 500;
        text-decoration: underline;
    }

    @media (min-width: 768px) {
        input,label, button {
            width: 25rem;
        }
        form {
            margin: auto;
            align-items: center;
            height: fit-content;
        }
        form > input {
            margin-bottom: 2rem;
        }
        .button {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: auto;
            margin-top: 2vh;
        }
        button {
            margin-top: 1rem;
        }
        button:hover {
            cursor: pointer;
        }
        .button > p {
            width: 25rem;
        }
        }
  </style>