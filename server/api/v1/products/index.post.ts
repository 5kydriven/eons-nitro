import { createProduct } from '~/service/product';
import { sendResponse } from '~/utils/response';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	if (!body) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'body is required',
		});
	}

	const product = await createProduct(body);

	return sendResponse(event, {
		statusCode: 201,
		data: product,
		message: 'Product created successfully',
	});
});
