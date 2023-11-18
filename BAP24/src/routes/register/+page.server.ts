// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad,Actions } from './$types.js';
import { LuciaError } from "lucia";
import { auth } from '$lib/server/lucia.js';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, "/");
	return {};
};

export const actions: Actions = {
    default: async({ request, locals }) => {
		const formData = await request.formData();
		const username = formData.get("name");
		const email = formData.get("email");
		const password = formData.get("password");
		const confirmed = formData.get("requirePassword");
		// basic check
		if (
			typeof username !== "string" ||
			username.length < 4 ||
			username.length > 31
		) {
			return fail(400, {
				message: "Onjuiste gebruikersnaam"
			});
		}
		if (
			typeof email !== "string" ||
			email.length < 4 ||
			!email.includes('@')
		) {
			return fail(400, {
				message: "Onjuist email-adres"
			});
		}
		if (
			typeof password !== "string" ||
			password.length < 4 ||
			password.length > 255
		) {
			return fail(400, {
				message: "Onjuist wachtwoord"
			});
		}
        if (
            typeof confirmed !== "string" ||
            password.length !== confirmed.length ||
            !password.match(confirmed)
        ) {
			return fail(400, {
				message: "De opgegeven wachtwoorden komen niet met elkaar overeen"
			});
		}
		try {
			const user = await auth.createUser({
				key: {
					providerId: "email", // auth method
					providerUserId: email.toLowerCase(), // unique id when using "username" auth method
					password // hashed by Lucia
				},
				attributes: {
					username,
                    email,
				}
			});
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});
			locals.auth.setSession(session); // set session cookie
            console.log(user)
		} catch (e) {
			// this part depends on the database you're using
			// check for unique constraint error in user table

    
			if (
				e instanceof LuciaError &&
				e.message === USER_TABLE_UNIQUE_CONSTRAINT_ERROR
			) {
				return fail(400, {
					message: "Er is reeds een account aangemaakt met dit email-adres"
				});
			}
            console.error(e)
			return fail(500, {
				message: "Een onverwachte error vond plaats"
			});
		}
		// redirect to
		// make sure you don't throw inside a try/catch block!
		throw redirect(302, "/");
    }
}