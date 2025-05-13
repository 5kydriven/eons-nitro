import { updateProduct } from '~/service/product';
import { sendResponse } from '~/utils/response';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const id = getRouterParam(event, 'id');

	if (!id) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'ID is required',
		});
	}

	if (!body) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'body is required',
		});
	}

	const product = await updateProduct(id, body);

	return sendResponse(event, {
		message: 'Product updated successfully',
		data: product,
	});
});
