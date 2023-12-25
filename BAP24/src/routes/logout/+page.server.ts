import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { auth } from "$lib/server/lucia";
import { goto } from "$app/navigation";

export const actions: Actions = {
    // Functie voor uit te loggen
    logout: async ({ locals }) => {
        // Validatie van de sessie
        const session = await locals.auth.validate();
        if (!session) return fail(401);
        // Verwijder de sessie
        await auth.invalidateSession(session.sessionId);
        locals.auth.setSession(null);
        // Redirect naar de homepagina
        if (!session) goto("/");
    }
};