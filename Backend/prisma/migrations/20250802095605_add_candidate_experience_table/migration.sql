-- CreateTable
CREATE TABLE "CandidateExperience" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE,
    "responsibilities" TEXT NOT NULL,
    "candidateProfileId" INTEGER NOT NULL,

    CONSTRAINT "CandidateExperience_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CandidateExperience" ADD CONSTRAINT "CandidateExperience_candidateProfileId_fkey" FOREIGN KEY ("candidateProfileId") REFERENCES "CandidateProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
