/*
  Warnings:

  - Added the required column `imageKey` to the `CompanyImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompanyImage" ADD COLUMN     "imageKey" TEXT NOT NULL;
