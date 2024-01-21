import { redirect } from '@sveltejs/kit';

export async function get({ query }) {
    const paymentId = query.get('paymentId');

    try {
        const payment = await mollieClient.payments.get(paymentId);

        if (payment.status === 'paid') {
            throw redirect(302, `/payment-success?paymentId=${paymentId}`);
        } else {
            throw redirect(302, `/payment-failed?paymentId=${paymentId}`);
        }
    } catch (error) {
        console.error(error);
        throw redirect(302, `/payment-error`);
    }
}
