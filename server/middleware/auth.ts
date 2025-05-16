// server/middleware/auth.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default defineEventHandler(async (event) => {
	// const authHeader = getHeader(event, 'authorization');
	// if (!authHeader) {
	// 	throw createError({ statusCode: 401, message: 'Missing token' });
	// }
	// const token = authHeader.replace('Bearer ', '');
	// try {
	// 	const decoded = jwt.verify(token, JWT_SECRET);
	// 	event.context.auth = decoded; // Attach to context
	// } catch (err) {
	// 	throw createError({ statusCode: 401, message: 'Invalid token' });
	// }
});
