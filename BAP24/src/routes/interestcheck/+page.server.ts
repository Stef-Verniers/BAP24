import { goto } from "$app/navigation";
import { auth } from "$lib/server/lucia";
import type { PageServerLoad,Actions } from './$types.js';
import { redirect } from "@sveltejs/kit";


export const load: PageServerLoad = async ({ locals }) => {
	session = await locals.auth.validate();
     const user = await auth.getUser(session.user.userId)
     if (user.wizard == true) 
          throw redirect(302, "/additional");
	return {};
};

let session;
let user


export const actions: Actions = {
	default: async ({ request, locals }) => {
          Object.fromEntries(await request.formData())
          try {
               user = await auth.updateUserAttributes(session.user.userId, {
                    wizard: true
               });
               console.log('mijn user is: ' + session.user)
               await auth.invalidateAllUserSessions(session.user.userId)
               session = await auth.createSession({
				userId: session.user.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
          } catch (e) {
               console.log('is oke')
          }
	}
};