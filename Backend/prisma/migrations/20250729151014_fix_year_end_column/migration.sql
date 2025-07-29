/*
  Warnings:

  - You are about to drop the column `endStart` on the `CandidateEducation` table. All the data in the column will be lost.
  - Added the required column `yearEnd` to the `CandidateEducation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CandidateEducation" DROP COLUMN "endStart",
ADD COLUMN     "yearEnd" INTEGER NOT NULL;
