import { redirect, fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { auth } from "$lib/server/lucia";
import { prisma } from "$lib/server/prisma";

export const load: PageServerLoad = async ({ locals, params }) => {
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
	});
	// We kijken of de gebruiker wel of geen credits heeft
	if (!user?.credits) {
		throw redirect(302, "/dashboard");
	}
	// We halen de sponsors op
    const sponsorId = Number(params.id)
    const sponsors = await prisma.sponsor.findUnique({
        where: {
            id: sponsorId
        }
    })
		// We halen alle producten op met hun categorie en sponsor

	const products = await prisma.product.findUnique({
        where: {
            id: Number(params.id)
        },
		include: {
		  sponsor: true,
		  category: true,
		}
	  });

	// We halen alle categorieën van producten op
	const categories = await prisma.rewardCategories.findMany();
	
	return {
		products: products,
		category: categories,
        sponsor: sponsors,
		userId: session?.user.userId,
		username: session?.user.username,
        email: session?.user.email,
		credits: session?.user.credits
	};
};