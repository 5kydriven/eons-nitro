// server/api/register.ts
import { prisma } from '~~/prisma/client';
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { name, email, password } = body;

	const existingUser = await prisma.user.findUnique({ where: { email } });
	if (existingUser) {
		throw createError({ statusCode: 409, message: 'Email already in use' });
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
			role: 'staff', // or 'ADMIN'
		},
	});

	return { message: 'User registered successfully', data: user };
});
