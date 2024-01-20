import type { PageServerLoad } from "../../../$types";
import { redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { auth } from "$lib/server/lucia";

let user;
let survey;
let questions;

export const load: PageServerLoad = async ({ locals, params }) => {

    const page = Number(params.id);
    const userId = String(params.userId);
    const session = await locals.auth.validate();
    if (!session) {
        throw redirect(302, "/");
    }
    user = session ? await auth.getUser(session.user.userId) : null;

    survey = await prisma.enquete.findUnique({
        where:{
            id: page,
        },
        include: {
            department: true,
            user: true, 
            institute: true,
        }
    })

    if (survey.userId !== user.userId) {
        throw redirect(302, "/");
    }

    const getAnswers = await prisma.enqueteAnswer.findMany({
        where: {
            enqueteId: page,
            userId: userId,
        },
    })

    questions = await prisma.enqueteQuestion.findMany({
        where: {
            enqueteId: page
        },
        include: {
            options: true
        }
    })

    return {
        survey,
        questions,
        answers: getAnswers,
        userId: session?.user.userId,
        username: session?.user.username,
        email: session?.user.email,
    }
}