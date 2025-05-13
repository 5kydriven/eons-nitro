import { getUser } from '~/service/user';

export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, 'id');

	if (!id) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'ID is required',
		});
	}

	const user = await getUser(id);

	return sendResponse(event, { data: user });
});
