export const MOLLIE = "test_HrRGzGPRh57QFeaD7Pkk7zqWuTze8f";
export const MOLLIE_ACCESS = "access_t83spjxCz92RSNQ6bzJAGa9QfuacPBKJcdw5xb2P";
export const PROFILE_ID = "pfl_8sgqcm3FJk";

import type { PageServerLoad } from "../../routes/$types";
import { redirect } from "@sveltejs/kit";
import { auth } from "./lucia";
let session;
let user;

export const load: PageServerLoad = async ({ locals }) => {
	session = await locals.auth.validate();
    if (!session) {
        throw redirect(302, "/");
    }
    user = await auth.getUser(session.user.userId)
}

export const loggedUser = user.userId;