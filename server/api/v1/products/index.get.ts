import { getAllProducts } from '~/service/product';

export default defineEventHandler(async (event) => {
	const query = getQuery(event);

	const page = Number(query.page) || 1;
	const limit = Number(query.limit) || 10;
	const search = query.q?.toString();
	const category = query.category?.toString();
	const inStockOnly = query.inStock === 'true';

	const result = await getAllProducts({
		page,
		limit,
		query: search,
		category,
		inStockOnly,
	});

	return result;
});
