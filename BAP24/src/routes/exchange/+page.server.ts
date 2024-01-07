import { redirect, fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
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
	});
	// We kijken of de gebruiker wel of geen credits heeft
	if (!user?.credits) {
		throw redirect(302, "/dashboard");
	}
	// We halen alle producten op met hun categorie en sponsor
	const products = await prisma.product.findMany({
		include: {
		  sponsor: true,
		  category: true,
		}
	});
	// We halen alle categorieën van producten op
	const categories = await prisma.rewardCategories.findMany();
	// We nemen de producten die de ingelogde gebruiker al heeft ingewisseld
	const exchangedRewards = await prisma.exchangedReward.findMany({
		where: {
			userId: session?.user.userId
		},
		include: {
			user: true,
			product: {
				include: {
					sponsor: true,
					category: true,
				},
			}
		}
	})
	return {
		products: products,
		category: categories,
		exchangedRewards: exchangedRewards,
		userId: session?.user.userId,
		username: session?.user.username,
        email: session?.user.email,
		credits: session?.user.credits
	};
};