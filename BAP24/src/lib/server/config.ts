import type { PageServerLoad } from "../../routes/$types";
import { redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { auth } from "$lib/server/lucia";

let user;
let surveyName;

// Haal data op uit de database
export const load: PageServerLoad = async ({ locals }) => {
  // Validatie van de sessie
  const session = await locals.auth.validate();
  if (!session) {
    throw redirect(302, "/");
  }

  user = session ? await auth.getUser(session.user.userId) : null;
  const survey = await prisma.enquete.findUnique({
    where: {
        id: user.surveyId
        }
  })

    surveyName = survey?.title;
}

export const MOLLIE = "test_HrRGzGPRh57QFeaD7Pkk7zqWuTze8f";
export const MOLLIE_ACCESS = "access_t83spjxCz92RSNQ6bzJAGa9QfuacPBKJcdw5xb2P";
export const PROFILE_ID = "pfl_8sgqcm3FJk";
export const SURVEY_NAME = surveyName;

