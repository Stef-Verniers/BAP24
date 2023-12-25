import type { PageServerLoad, Actions } from "./$types";
import { redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { auth } from "$lib/server/lucia";
import { timeDifference } from "../../../stores";

let user;
let survey;
let questions;


export const load: PageServerLoad = async ({ locals, params }) => {

    const page = Number(params.id);
    const session = await locals.auth.validate();
    if (!session) {
      throw redirect(302, "/");
    }
    user = session ? await auth.getUser(session.user.userId) : null;
    survey = await prisma.enquete.findUnique({
        where:{
            id: page
        },
        include: {
            department: true,
            user: true, 
            institute: true,
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

    const ownerSex = await prisma.user.findUnique({
        where: {
            id: survey.userId
        }, include : {
            Additional_Information: true
        }
    })

    const respondents = await prisma.enqueteResponse.findMany({
        where: {
            userId: user.userId,
            enqueteId: page
        }
    })

    return {
        user,
        survey,
        questions,
        ownerSex,
        respondents,
        owner: survey.user.username,
        school: survey.institute.school,
        department: survey.department.department,
        userId: session.user.userId,
        username: session.user.username,
    }
}

export const actions: Actions = {
    submitEnquete: async ({ request }) => {
        const formData = await request.formData();
        console.log(formData)
        const userId = user.userId; 
        const answers: { questionId: number; userId: string; response: string }[] = [];
        for (const [key, value] of formData.entries()) {
            if (key.startsWith('question-')) {
                const questionId = parseInt(key.split('-')[1]);
                answers.push({
                    questionId: questionId,
                    userId: userId,
                    response: value.toString()
                });
            }
        }
        
        const startDate = Number(formData.get('stopwatch'));
        let diftime = timeDifference(new Date(startDate).toISOString(), new Date().toISOString())

        try {
            for (const answer of answers) {
                await prisma.enqueteAnswer.create({ data: { ...answer, enqueteId: survey.id } });
            }
            await prisma.enqueteResponse.create({
                data: {
                    enqueteId: survey.id,
                    userId: userId,
                    completed: true,
                    startTime: new Date(startDate).toISOString(),
                    endTime: new Date().toISOString(),
                    time: diftime
                }
            });
            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    credits: {
                        increment: 1
                    }
                }
            });
            await prisma.enquete.update({ 
                where: {
                    id: survey.id
                },
                data: {
                    respondents: {
                        increment: 1
                    }
                }
            });
        } catch (e) {
            console.error(e);
        }
    }
};