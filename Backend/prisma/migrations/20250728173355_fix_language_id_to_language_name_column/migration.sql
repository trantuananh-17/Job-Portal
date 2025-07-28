/*
  Warnings:

  - You are about to drop the column `languageId` on the `CandidateLanguages` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[candidateProfileId,languageName]` on the table `CandidateLanguages` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `languageName` to the `CandidateLanguages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CandidateLanguages" DROP CONSTRAINT "CandidateLanguages_languageId_fkey";

-- DropIndex
DROP INDEX "CandidateLanguages_candidateProfileId_key";

-- AlterTable
ALTER TABLE "CandidateLanguages" DROP COLUMN "languageId",
ADD COLUMN     "languageName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CandidateLanguages_candidateProfileId_languageName_key" ON "CandidateLanguages"("candidateProfileId", "languageName");

-- AddForeignKey
ALTER TABLE "CandidateLanguages" ADD CONSTRAINT "CandidateLanguages_languageName_fkey" FOREIGN KEY ("languageName") REFERENCES "Language"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
