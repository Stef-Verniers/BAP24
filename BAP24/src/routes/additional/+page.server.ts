import { goto } from "$app/navigation";
import { auth } from "$lib/server/lucia";
import type { PageServerLoad,Actions } from './$types.js';
import { redirect } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";
import { prisma } from "$lib/server/prisma.js";
import { generateKey } from "crypto";
import { parse } from "path";

// const prisma = new PrismaClient()


export const load: PageServerLoad = async ({ locals }) => {
    // if (!session) 
    //     throw redirect(302, '/')
	session = await locals.auth.validate();
    const user = await auth.getUser(session.user.userId)
    //  if (user.additional === true) 
    //       throw redirect(302, "/dashboard");
	return {};
};

let session;
let user;

export const actions: Actions = {
	default: async ({ request, locals }) => {
        const data = await request.formData();
        const userId = session.user.userId

        let age: number | null = null
        let getAge = data.get('age')
        age = Number(getAge)

        let birthplace = data.get('birthplace')
        let domestic = data.get('domestic')
        let religion = data.get('religion')
        let sex = data.get('sex')
        let study = data.get('study')
        try {
            await prisma.additional_Information.create({
                data: {
                    age,
                    birthplace,
                    domestic,
                    religion,
                    sex,
                    study,
                    userId
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
            console.log('great succes')
            throw redirect(308, '/dashboard')
        } catch (e) {
            console.log(e)
        }
	}
} satisfies Actions;