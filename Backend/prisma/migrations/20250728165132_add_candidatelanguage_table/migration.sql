-- CreateEnum
CREATE TYPE "Level" AS ENUM ('NATIVE', 'FLUENT', 'BEGINNER');

-- CreateTable
CREATE TABLE "CandidateLanguages" (
    "candidateProfileId" INTEGER NOT NULL,
    "languageId" TEXT NOT NULL,
    "level" "Level" NOT NULL DEFAULT 'BEGINNER'
);

-- CreateIndex
CREATE UNIQUE INDEX "CandidateLanguages_candidateProfileId_key" ON "CandidateLanguages"("candidateProfileId");

-- AddForeignKey
ALTER TABLE "CandidateLanguages" ADD CONSTRAINT "CandidateLanguages_candidateProfileId_fkey" FOREIGN KEY ("candidateProfileId") REFERENCES "CandidateProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateLanguages" ADD CONSTRAINT "CandidateLanguages_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
