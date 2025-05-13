import { getProduct } from '~/service/product';
import { sendResponse } from '~/utils/response';

export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, 'id');

	if (!id) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'ID is required',
		});
	}

	const product = await getProduct(id);

	if (!product) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Not Found',
			message: 'Product not found',
		});
	}

	return sendResponse(event, { data: product });
});
