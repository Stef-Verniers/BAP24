import { json } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia.js";

// We maken een nieuwe gebruiker aan
export async function POST({ request, locals }) {
    let session = await locals.auth.validate();
    const { name, email, password } = await request.json();
    let username = name
    // Lucia maakt het aanmaken wel vrij ingewikkeld
    try {
        const user = await auth.createUser({
            key: {
                providerId: "email", 
                providerUserId: email.toLowerCase(), 
                password,
            },
            attributes: {
                username,
                email,
            }
        });
        session = await auth.createSession({
            userId: user.userId,
            attributes: {}
        });
        locals.auth.setSession(session);
        return json({ message: 'Data succesvol ontvangen', success: true });
    } catch (error) {
        console.log(error)
        if (error.code === 'P2002') {
            return json({ message: 'Er is al een account gemaakt met dit mailadres', success: false }, { status: 500 });
        }
        return json({ message: error, success: false }, { status: 500 });
    }
}