import { auth } from "$lib/server/lucia";
import type { PageServerLoad,Actions } from './$types.js';
import { redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma.js";

let session;
let user;

export const load: PageServerLoad = async ({ locals }) => {
    
    // Validatie van de sessie
	session = await locals.auth.validate();
    if (!session) {
        throw redirect(302, "/");
    }
    // Haal de gebruiker op
    user = session ? await auth.getUser(session.user.userId) : null;
    if (user?.admin || user?.sponsor) {
        throw redirect(302, "/dashboard");
    }
    // Haal de enquete op
    const survey = await prisma.enquete.findUnique({
        where: {
            userId: session?.user.userId
        }
    })

    // Validatie van de enquete
    if (survey?.isVisible && !survey?.isCreated) {
        throw redirect(302, '/surveys/add/builder')
    }

    if (survey?.isVisible && survey?.isCreated && !survey?.isPaid) {
        throw redirect(302, '/surveys/add/payment')
    }

    // We hallen letterlijk alle informatie op
    const getAge = await prisma.ageCategory.findMany();
    const getDepartment = await prisma.department.findMany();
    const nationalitiesResponse = await fetch('https://restcountries.com/v3.1/all')
    const getNationalities = await nationalitiesResponse.json();
    const getSex =  await prisma.sex.findMany();
    const getJob = await prisma.occupation.findMany();
    const getSchool = await prisma.institute.findMany();

    return {
        user,
        userId: session.user.userId,
        username: session.user.username,
        getAge,
        getDepartment,
        getNationalities,
        getSex,
        getJob,
        getSchool,
    }
};

export const actions: Actions = {
    // We brengen alles in orde zodat we de data kunnen verwerken en opslaan in de database
	default: async ({ request, locals }) => {
        const data = await request.formData();
        const userId = user.userId
        let title = data.get('title') as string
        let explanation = data.get('explain') as string
        let deadline = new Date(data.get('deadline'))
        let quota = Number(data.get('quota'))
        let audienceId = Number(data.get('ageCategory'))
        let departmentId = Number(data.get('department'))
        let nationality = data.get('nationality') as string
        if (nationality === 'Belgium') {
           nationality = 'België'
        }
        let occupationId = Number(data.get('occupation'))
        let sexId = Number(data.get('sex'))
        let instituteId = Number(data.get('school'))

        // We maken de enquete aan
        try {
            await prisma.enquete.create({
                data: {
                    userId,
                    title,
                    explanation,
                    deadline,
                    quota,
                    audienceId,
                    departmentId,
                    occupationId,
                    sexId,
                    instituteId,
                    nationality,
                }
            })
            throw redirect(308, '/surveys/add/builder');
        } catch (e) {
            console.error(e)
        }
	}
} satisfies Actions;