import { auth } from "$lib/server/lucia";
import { LuciaError } from "lucia";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

let session;

export const load: PageServerLoad = async ({ locals }) => {
	// Validatie van de sessie
	const session = await locals.auth.validate();
	if (session) throw redirect(302, "/dashboard");
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		// We vragen de data op van de request
		const formData = await request.formData();
		const email = formData.get("email");
		const password = formData.get("password");
		// Formvalidatie op serverside niveau
		if (
			typeof email !== "string" ||
			email.length < 4 ||
			!email.includes('@')
		) {
			return fail(400, {
				message: "Uw gebruikersnaam en/of wachtwoord is verkeerd"
			});
		}
		if (
			typeof password !== "string" ||
			password.length < 4 ||
			password.length > 255
		) {
			return fail(400, {
				message: "Uw gebruikersnaam en/of wachtwoord is verkeerd"
			});
		}
		try {
			const key = await auth.useKey(
			  "email",
			  email.toLowerCase(),
			  password
			);
			session = await auth.createSession({
			  userId: key.userId,
			  attributes: {},
			});
			locals.auth.setSession(session);
		  } catch (e) {
			if (
			  e instanceof LuciaError &&
			  (e.message === "AUTH_INVALID_KEY_ID" ||
				e.message === "AUTH_INVALID_PASSWORD")
			) {
			  
			  return fail(400, {
				message: "Incorrect username or password",
				type: "error",
			  });
			} else {
			 
			  return fail(500, {
				message: "An unknown error occurred",
				type: "error",
			  });
			}
		}
	throw redirect(302, "/dashboard");
	}
};