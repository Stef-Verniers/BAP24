// @ts-nocheck
import { fail } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad,Actions } from './$types.js';
import { auth } from '$lib/server/lucia.js';

let session;

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
				message: "U hebt uw naam verkeerd ingevoerd. Probeer het opnieuw!",
				type: 'error'
			});
		}
		if (
			typeof email !== "string" ||
			email.length < 4 ||
			!email.includes('@')
		) {
			return fail(400, {
				message: "Uw email-adres werd niet juist ingevoerd",
				type: 'error'
			});
		}
		if (
			typeof password !== "string" ||
			password.length < 4 ||
			password.length > 255
		) {
			return fail(400, {
				message: "U hebt geen geldig wachtwoord gekozen. Probeer het opnieuw!",
				type: 'error'
			});
		}
        if (
            typeof confirmed !== "string" ||
            password.length !== confirmed.length ||
            !password.match(confirmed)
        ) {
			return fail(400, {
				message: "De opgegeven wachtwoorden komen niet met elkaar overeen",
				type: 'error'
			});
		}
		try {
			const user = await auth.createUser({
				key: {
					providerId: "email", // auth method
					providerUserId: email.toLowerCase(), // unique id when using "email" auth method
					password, // hashed by Lucia
					wizard: false
				},
				attributes: {
					username,
                    email,
					wizard: false
				}
			});
			session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});
			locals.auth.setSession(session); // set session cookie
		} catch (e) {
			// this part depends on the database you're using
			// check for unique constraint error in user table   
			if (
				e.code === 'P2002'
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
		throw redirect(302, "/interestcheck")
    }
}