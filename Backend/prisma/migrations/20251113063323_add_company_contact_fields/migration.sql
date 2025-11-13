/*
  Warnings:

  - Added the required column `emailCompany` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneCompany` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "emailCompany" TEXT NOT NULL,
ADD COLUMN     "phoneCompany" TEXT NOT NULL;
