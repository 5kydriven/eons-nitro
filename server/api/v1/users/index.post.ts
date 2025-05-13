import { createUser } from '~/service/user';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	if (!body) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'body is required',
		});
	}

	const user = await createUser(body);

	return sendResponse(event, {
		message: 'User created successfully',
		data: user,
		statusCode: 201,
	});
});
