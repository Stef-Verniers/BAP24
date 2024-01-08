import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";

export const load: PageServerLoad = async ({ locals }) => {
	// Validatie van de sessie
	const session = await locals.auth.validate();
	if (!session) {
		throw redirect(302, "/");
	}
	// Haal de gebruiker op
	const user = await prisma.user.findUnique({
		where: {
			id: session?.user.userId
		}
	})
    
    // Ben je geen sponsor? Challas!
    if (!user?.sponsor) {
        throw redirect(302, "/dashboard");
    }

    // Bijkomende informatie nog niet ingevuld? niet met ons he makker..
    if (!user?.additional) {
        throw redirect(302, "/additional");
    }

    // We halen de sponsor informatie op van onze ingelogde gebruiker
    const sponsor = await prisma.sponsor.findUnique({
        where: {
            ownerId: user.id
        }
    })

    console.log(sponsor)

    // We zoeken de producten van deze sponsor
    const products = await prisma.product.findMany({
        where: {
            sponsorId: sponsor?.id
        }
    })

    const exchangedProducts = await prisma.exchangedReward.findMany({
        where: {
            exchanged: false
        },
        include: {
            user: true,
            product: {
                include: {
                    sponsor: true
                }
            }
        }
    });

    // We halen de verschillende productcategorieën op
    const rewards = await prisma.rewardCategories.findMany({});
    return {
        user,
        sponsor,
        products,
        exchangedProducts,
        rewards,
        userId: session?.user.userId,
        username: session?.user.username,
        email: session?.user.email,
    }
}