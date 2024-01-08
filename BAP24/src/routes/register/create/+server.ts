import { json } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia.js";

// We maken een nieuwe gebruiker aan
export async function POST({ request, locals }) {
    let session = await locals.auth.validate();
    const formdata = await request.formData();

    let name = formdata.get('name');
    let email = formdata.get('email');
    let password = formdata.get('password');
    let username = String(name);
    email = String(email).toLowerCase();
    // Lucia maakt het aanmaken wel vrij ingewikkeld
    try {
        const user = await auth.createUser({
            key: {
                providerId: "email", 
                providerUserId: email, 
                password: String(password),
            },
            attributes: {
                username,
                email: String(email),
                additional: false,
                credits: 0
            }
        });
        session = await auth.createSession({
            userId: user.userId,
            attributes: {}
        });
        locals.auth.setSession(session);
        return json({ message: 'Data succesvol ontvangen', success: true });
    } catch (error) {
        console.log(error);
        if ((error as { code: string }).code === 'P2002') {
            return json({ message: 'Er is al een account gemaakt met dit mailadres', success: false }, { status: 500 });
        }
        return json({ message: error, success: false }, { status: 500 });
    }
}