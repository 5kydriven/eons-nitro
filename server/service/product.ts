import { prisma } from '~~/prisma/client';
import { Prisma } from '@prisma/client';

interface GetProductsOptions {
	page?: number;
	limit?: number;
	query?: string;
	category?: string;
	inStockOnly?: boolean;
}

export async function getAllProducts(options: GetProductsOptions) {
	const {
		page = 1,
		limit = 10,
		query,
		category,
		inStockOnly = false,
	} = options;

	const where: Prisma.ProductWhereInput = {
		...(query && {
			OR: [
				{
					name: { contains: query, mode: 'insensitive' as Prisma.QueryMode },
				},
				{
					brand: { contains: query, mode: 'insensitive' as Prisma.QueryMode },
				},
			],
		}),
		...(category && { category }),
		...(inStockOnly && { stock: { gt: 0 } }),
	};

	const [products, total] = await Promise.all([
		prisma.product.findMany({
			where,
			skip: (page - 1) * limit,
			take: limit,
			orderBy: { createdAt: 'desc' },
		}),
		prisma.product.count({ where }),
	]);

	return {
		products,
		pagination: {
			page,
			limit,
			total,
			totalPages: Math.ceil(total / limit),
		},
	};
}
