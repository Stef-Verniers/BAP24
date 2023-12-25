import type { PageServerLoad } from "./$types";
export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	return {
		userId: session?.user.userId,
		username: session?.user.username,
        email: session?.user.email
	};
};