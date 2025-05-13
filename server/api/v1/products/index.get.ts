import { getProducts } from '~/service/product';
import { sendResponse } from '~/utils/response';

export default defineEventHandler(async (event) => {
	const query = getQuery(event);

	const page = Number(query.page) || 1;
	const limit = Number(query.limit) || 10;
	const search = query.q?.toString();
	const category = query.category?.toString();
	const inStockOnly = query.inStock === 'true';

	const result = await getProducts({
		page,
		limit,
		query: search,
		category,
		inStockOnly,
	});

	return sendResponse(event, { data: result.data, meta: result.meta });
});
