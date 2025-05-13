import { prisma } from '~~/prisma/client';
import { Prisma, Product } from '@prisma/client';

interface GetProductsOptions {
	page?: number;
	limit?: number;
	query?: string;
	category?: string;
	inStockOnly?: boolean;
}

export async function getProducts(options: GetProductsOptions) {
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
		data: products,
		meta: {
			page,
			limit,
			total,
			totalPages: Math.ceil(total / limit),
		},
	};
}

export async function getProduct(id: string) {
	const product = await prisma.product.findUnique({
		where: { id },
	});
	return product;
}

export async function createProduct(data: Product) {
	const product = await prisma.product.create({
		data,
	});
	return product;
}

export async function deleteProduct(id: string) {
	const product = await prisma.product.delete({
		where: { id },
	});
	return product;
}

export async function updateProduct(id: string, data: Product) {
	const product = await prisma.product.update({
		where: { id },
		data,
	});
	return product;
}
