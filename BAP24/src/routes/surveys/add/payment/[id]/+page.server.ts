import type { PageServerLoad } from './$types.js';
import { redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma.js";
import { auth } from "$lib/server/lucia";

let user;

export const load: PageServerLoad = async ({ locals }) => {

  // Validatie van de sessie
	const session = await locals.auth.validate();
  if (!session) {
    throw redirect(302, "/");
  }

  // Haal de gebruiker op
  user = session ? await auth.getUser(session.user.userId) : null;
  if (user?.admin || user?.sponsor) {
      throw redirect(302, "/dashboard");
  }
  
  // Haal de enquete op
  const survey = await prisma.enquete.findUnique({
      where: {
          userId: session.user.userId
      }
  });

  // Validatie van de enquete
  if (!survey) {
    throw redirect(302, '/surveys/add')
  }

  // Is er een survey geregistreerd maar nog niet aangemaakt, ga dan eerst naar de buildtool
  if (survey && !survey?.isCreated) {
    throw redirect(302, '/surveys/add/builder')
  }

  return {
    userId: session?.user.userId,
    username: session?.user.username,
    email: session?.user.email,
    credits: session?.user.credits,
    surveyName: survey?.title,
  }

};