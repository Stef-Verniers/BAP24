import { redirect, fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { auth } from "$lib/server/lucia";

export const actions: Actions = {
	logout: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId); // invalidate session
		locals.auth.setSession(null); // remove cookie
        if (!session) throw redirect(302, "/login");
	}
};

export const load: PageServerLoad = async ({ locals, url }) => {
	const session = await locals.auth.validate();
	if (!session && url.pathname !== "/") {
	  throw redirect(302, "/");
	}
	return {
		userId: session?.user.userId,
		username: session?.user.username,
        email: session?.user.email
	};
};