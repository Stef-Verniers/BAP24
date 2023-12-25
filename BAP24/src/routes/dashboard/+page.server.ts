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
	});

	// We kijken of de ingelogde gebruiker een admin is
	if (user?.admin) {
		throw redirect(302, "/dashboard/admin");
	}

	// We zoeken de enquete van de gebruiker
	const getSurvey = await prisma.enquete.findUnique({ 
		where: {
			userId: session?.user.userId
		}
	})

	// We halen de additionele informatie op van de gebruiker
	const adinfo = await prisma.additional_Information.findUnique({
		where: {
			userId: session?.user.userId
		}
	})

	// We halen de leeftijdscategorieën, onderwerpen, ... op die er zijn
	const age = await prisma.ageCategory.findUnique({
		where: {
			id: adinfo?.audienceId as number
		}
	});
	
	const department = await prisma.department.findUnique({
		where: {
			id: adinfo?.departmentId as number
		}
	});
	const occupation = await prisma.occupation.findUnique({
		where: {
			id: adinfo?.occupationId as number
		}
	});
	const sex = await prisma.sex.findUnique({
		where: {
			id: adinfo?.sexId as number
		}
	});

	return {
		user,
		adinfo,
		getSurvey,
		age,
		nationality: adinfo?.nationality,
		department,
		occupation,
		sex,
		userId: session?.user.userId,
		username: session?.user.username,
        email: session?.user.email
	};
};