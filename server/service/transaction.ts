import { prisma } from '~~/prisma/client';

interface CreateTransactionItem {
	productId: string;
	quantity: number;
	discount: number;
}

export async function createTrasaction(
	staffId: string,
	items: CreateTransactionItem[],
) {
	const transaction = await prisma.$transaction(async (tx) => {
		const products = await tx.product.findMany({
			where: {
				id: { in: items.map((i) => i.productId) },
			},
		});

		const transactionItems = items.map((item) => {
			const product = products.find((p) => p.id === item.productId);
			if (!product) throw new Error('Product not found');
			if (product.stock < item.quantity) throw new Error('Insufficient stock');

			const price = product.price;
			const cost = product.cost;
			const total = (price - item.discount) * item.quantity;
			const profit = (price - item.discount - cost) * item.quantity;

			return {
				productId: item.productId,
				quantity: item.quantity,
				discount: item.discount,
				priceAtSale: price,
				costAtSale: cost, // NEW
				total,
				profit, // NEW
			};
		});

		const totalAmount = transactionItems.reduce((sum, i) => sum + i.total, 0);

		const createdTransaction = await tx.transaction.create({
			data: {
				staffId,
				totalAmount,
				items: {
					create: transactionItems,
				},
			},
			include: { items: true }, // Optional: return the items
		});

		for (const item of items) {
			await tx.product.update({
				where: { id: item.productId },
				data: {
					stock: { decrement: item.quantity },
				},
			});
		}

		return createdTransaction;
	});
}
