import { auth } from "$lib/server/lucia";
import type { PageServerLoad,Actions } from './$types.js';
import { redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma.js";

export const load: PageServerLoad = async ({ locals }) => {
    // Validatie van de sessie
	session = await locals.auth.validate();
    if (!session) {
        throw redirect(302, "/");
    }
    // Haal de gebruiker op
    const user = await auth.getUser(session.user.userId)
    // Heeft de gebuiker al extra informatie gegeven? Dan redirecten we naar het dashboard
    if (user.additional) {
        throw redirect(302, "/dashboard");
    }
    // We halen alle informatie op die we nodig hebben
    const age = await prisma.ageCategory.findMany();
    const getDepartment = await prisma.department.findMany();
    const schools = await prisma.institute.findMany();
    const nationalitiesResponse = await fetch('https://restcountries.com/v3.1/all')
    const nationalities = await nationalitiesResponse.json();
    const occupied = await prisma.occupation.findMany();
    const sexGender = await prisma.sex.findMany();
    return {
        user,
        age: age,
        department: getDepartment,
        schools: schools,
        nationalities: nationalities,
        occupation: occupied,
        sex: sexGender,
    }
};

let session;
let user;

export const actions: Actions = {
    // We slaan de opgegegeven data op in de database
	default: async ({ request, locals }) => {
        const data = await request.formData();
        const userId = session.user.userId
        let audienceId = Number(data.get('age'))
        let nationality = data.get('nationality') as string
        let sexId = Number(data.get('sex'))
        let occupationId = Number(data.get('occupation'))
        let departmentId = Number(data.get('department'))
        try {
            await prisma.additional_Information.create({
                data: {
                    userId: session.user.userId,
                    audienceId,
                    nationality,
                    sexId,
                    occupationId,
                    departmentId,
                }
            })
            user = await auth.updateUserAttributes(session.user.userId, {
                additional: true
            });
            await auth.invalidateAllUserSessions(session.user.userId)
            session = await auth.createSession({
                userId: session.user.userId,
                attributes: {}
            });
        locals.auth.setSession(session);
        } catch (e) {
            console.error(e)
        }
	}
} satisfies Actions;