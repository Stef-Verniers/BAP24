// @ts-nocheck
import { fail } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const actions = {
    create: async({ request }) => {
        const data = await request.formData();
        const username = data.get('name')
        const email = data.get('email')
        const password = data.get('password')
        const confirmed = data.get('requirePassword')
        console.log({username, email, password, confirmed})

        if (password !== confirmed) {
            return fail(422, {
                error: 'Wachtwoorden komen niet met elkaar overeen'
            });
        }

        try {
            // Use Prisma to create a new user in the database
            const newUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    password, // Note: Make sure to hash the password before storing it in production
                },
            });

            console.log('User created:', newUser);

            // Return a success response or redirect to a success page
            return {
                body: {
                    message: 'User created successfully',
                },
            };
        } catch (error) {
            console.error('Error creating user:', error);
            return fail(500, {
                error: 'Internal server error',
            });
        }


    }
}