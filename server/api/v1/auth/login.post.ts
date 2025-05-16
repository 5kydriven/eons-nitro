// server/api/login.ts
import { prisma } from '~~/prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { email, password } = body;

	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) {
		throw createError({ statusCode: 404, message: 'User not found' });
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw createError({ statusCode: 401, message: 'Invalid credentials' });
	}

	const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
		expiresIn: '7d',
	});

	return { token };
});
