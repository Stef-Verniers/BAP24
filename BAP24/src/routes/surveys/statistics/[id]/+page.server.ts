import { auth } from "$lib/server/lucia";
import type { PageServerLoad,Actions } from './$types.js';
import { redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma.js";

let session;
let user;

export const load: PageServerLoad = async ({ locals, params }) => {
	session = await locals.auth.validate();
    if (!session) {
        throw redirect(302, "/");
    }
    if (params.id !== session?.user?.userId)  {
        throw redirect(302, "/dashboard");
    } 
    user = session ? await auth.getUser(session.user.userId) : null;
    if (user?.admin || user?.sponsor) {
        throw redirect(302, "/dashboard");
    }
    const survey = await prisma.enquete.findUnique({
        where: {
            userId: session?.user?.userId
        }
    })
    if (!survey) {
        throw redirect(302, '/surveys/add')
    }
    if (survey && !survey?.isCreated) {
        throw redirect(302, '/surveys/add/builder')
    }
    if (survey && survey?.isCreated && !survey?.isPaid) {
        throw redirect(302, '/surveys/add/payment')
    }

    const answers = await prisma.enqueteResponse.findMany({
        where: {
            enqueteId: survey.id
        },
        include: {
            enquete: {
                include: {
                    EnqueteQuestion: {
                        include: {
                            options: true, // Als je de opties van de vragen wilt ophalen
                            answers: {
                                where: {
                                    userId: session?.user?.userId
                                }
                            }
                        }
                    },
                    EnqueteAnswer: {
                        where: {
                            enqueteId: survey.id
                        }
                    }
                }
            }
        }
    });

    const users = await prisma.user.findMany({
        include: {
            Additional_Information: true,
        }
    })

    return {
        user,
        users,
        survey: survey,
        surveyId: survey?.id,
        userId: session?.user.userId,
        username: session?.user.username,
        email: session?.user.email,
        answers: answers
    };
}