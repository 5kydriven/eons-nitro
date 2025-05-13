import { getUsers } from '~/service/user';

export default defineEventHandler(async (event) => {
	const query = getQuery(event);

	const page = Number(query.page) || 1;
	const limit = Number(query.limit) || 10;
	const search = query.q?.toString();

	const result = await getUsers({
		page,
		limit,
		query: search,
	});

	return sendResponse(event, { data: result.data, meta: result.meta });
});
