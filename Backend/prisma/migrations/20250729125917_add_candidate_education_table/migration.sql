-- CreateEnum
CREATE TYPE "Degree" AS ENUM ('BACHELOR', 'MASTER', 'ENGINEER');

-- CreateTable
CREATE TABLE "CandidateEducation" (
    "candidateProfileId" INTEGER NOT NULL,
    "educationId" INTEGER NOT NULL,
    "major" TEXT NOT NULL,
    "degree" "Degree" NOT NULL DEFAULT 'BACHELOR',
    "yearStart" INTEGER NOT NULL,
    "endStart" INTEGER NOT NULL,

    CONSTRAINT "CandidateEducation_pkey" PRIMARY KEY ("candidateProfileId","educationId")
);

-- AddForeignKey
ALTER TABLE "CandidateEducation" ADD CONSTRAINT "CandidateEducation_candidateProfileId_fkey" FOREIGN KEY ("candidateProfileId") REFERENCES "CandidateProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateEducation" ADD CONSTRAINT "CandidateEducation_educationId_fkey" FOREIGN KEY ("educationId") REFERENCES "Education"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
