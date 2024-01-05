import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { auth } from "$lib/server/lucia";

let user;

// Haal data op uit de database
export const load: PageServerLoad = async ({ locals }) => {
  // Validatie van de sessie
  const session = await locals.auth.validate();
  if (!session) {
    throw redirect(302, "/");
  }

  user = session ? await auth.getUser(session.user.userId) : null;
  // We halen de additionele informatie van de gebruiker op
  const userAdditionalInfo = await prisma.additional_Information.findUnique({
    where: {
      userId: user.userId
    }
  });

  // We halen alle enquetes op die matchen met de additionele informatie van de gebruiker
  const matchedSurveys = await prisma.enquete.findMany({
    where: {
      isPaid: true,
      isVisible: true,
      isCreated: true,
      OR: [
        {
          audienceId: userAdditionalInfo?.audienceId,
          sexId: userAdditionalInfo?.sexId,
          occupationId: userAdditionalInfo?.occupationId,
        },
        {
          audienceId: 1,
          sexId: 1,
          occupationId: 1,
        }
      ]
    },
    include: {
      department: true,
      user: true,
      institute: true
    }
  });

  // We halen alle enquetes op die reeds ingevuld zijn
  const respondents = await prisma.enqueteResponse.findMany({
    where: {
        userId: user.userId,
    }
  })

  return {
    userId: session?.user.userId,
    username: session?.user.username,
    email: session?.user.email,
    surveys: matchedSurveys,
    nationality: userAdditionalInfo?.nationality,
    respondents
  }
}