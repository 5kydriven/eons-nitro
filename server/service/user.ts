import { Prisma, User, UserRole } from '@prisma/client';
import { prisma } from '~~/prisma/client';
import bcrypt from 'bcrypt';

interface GetUsersOptions {
	page?: number;
	limit?: number;
	query?: string;
}

export async function createUser(data: User) {
	const hashedPassword = await bcrypt.hash(data.password, 10);
	const userData = {
		...data,
		password: hashedPassword,
	};
	const user = await prisma.user.create({ data: userData });
	return user;
}

export async function getUsers(options: GetUsersOptions) {
	const { page = 1, limit = 10, query } = options;

	const where: Prisma.UserWhereInput = {
		role: UserRole.staff,
		...(query && {
			OR: [
				{
					name: { contains: query, mode: 'insensitive' as Prisma.QueryMode },
				},
				{
					email: { contains: query, mode: 'insensitive' as Prisma.QueryMode },
				},
			],
		}),
	};

	const [users, total] = await Promise.all([
		prisma.user.findMany({
			where,
			skip: (page - 1) * limit,
			take: limit,
			orderBy: { createdAt: 'desc' },
		}),
		prisma.user.count({ where }),
	]);

	return {
		data: users,
		meta: {
			page,
			limit,
			total,
			totalPages: Math.ceil(total / limit),
		},
	};
}

export async function getUser(id: string) {
	const user = await prisma.user.findUnique({
		where: { id, role: UserRole.staff },
	});

	return user;
}
