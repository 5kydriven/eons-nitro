/*
  Warnings:

  - Added the required column `costAtSale` to the `TransactionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profit` to the `TransactionItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionItem" ADD COLUMN     "costAtSale" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "profit" DOUBLE PRECISION NOT NULL;
