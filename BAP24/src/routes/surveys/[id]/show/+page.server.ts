import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";

let user;
let survey;
let questions;

export const load: PageServerLoad = async ({ locals, params }) => {

    const page = Number(params.id);
    const session = await locals.auth.validate();
    if (!session) {
      throw redirect(302, "/");
    }
    user = session.user;

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

    const ownerSex = await prisma.user.findUnique({
        where: {
            id: survey.userId
        }, include : {
            Additional_Information: true
        }
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
        user,
        survey,
        questions,
        ownerSex,
        owner: survey.user.username,
        school: survey.institute.school,
        department: survey.department.department,
        userId: session.user.userId,
        username: session.user.username,
    }
}