import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types.js';

// Reeds ingelogde gebruikers worden geredirect naar de dashboard pagina
export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
		if (session) throw redirect(302, "/dashboard");
	return {};
};

