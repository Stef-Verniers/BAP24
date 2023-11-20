import { auth } from "$lib/server/lucia";
import { LuciaError } from "lucia";
import { fail, redirect } from "@sveltejs/kit";

import type { Actions } from "./$types";

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get("email");
		const password = formData.get("password");
		// basic check
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
			// find user by key
			// and validate password
			const key = await auth.useKey(
				"email",
				email.toLowerCase(),
				password
			);
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});
			locals.auth.setSession(session); // set session cookie
		} catch (e) {
			if (
				e instanceof LuciaError &&
				(e.message === "AUTH_INVALID_KEY_ID" ||
					e.message === "AUTH_INVALID_PASSWORD")
			) {
				// user does not exist
				// or invalid password
				return fail(400, {
					message: "Incorrect username or password"
				});
			}
			return fail(500, {
				message: "An unknown error occurred"
			});
		}
		// redirect to
		// make sure you don't throw inside a try/catch block!
		throw redirect(302, "/");
	}
};