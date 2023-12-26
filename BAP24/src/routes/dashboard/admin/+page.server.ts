import { prisma } from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) {
		throw redirect(302, "/");
	}

    const user = await prisma.user.findUnique({
        where: {
            id: session?.user.userId
        }
    });

    if (!user?.admin) {
        throw redirect(302, "/dashboard");
    }

    const users = await prisma.user.findMany({});
    const products = await prisma.product.findMany({});
    const sponsors = await prisma.sponsor.findMany({});
    const rewards = await prisma.rewardCategories.findMany({});
    const surveys = await prisma.enquete.findMany({
        include: {
            user: true
        }
    });

    return {
        user,
        users,
        products,
        sponsors,
        rewards,
        surveys: surveys,
        userId: session?.user.userId,
        username: session?.user.username,
        email: session?.user.email,
        admin: user?.admin
    }

}