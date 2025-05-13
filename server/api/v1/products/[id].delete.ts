import { deleteProduct } from '~/service/product';

export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, 'id');

	if (!id) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'ID is required',
		});
	}

	const product = await deleteProduct(id);

	return {
		message: 'Product deleted successfully',
		data: product,
	};
});
