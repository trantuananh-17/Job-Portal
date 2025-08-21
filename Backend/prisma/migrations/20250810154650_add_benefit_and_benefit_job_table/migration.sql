-- CreateTable
CREATE TABLE "Benefit" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Benefit_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "JobBenefit" (
    "jobId" INTEGER NOT NULL,
    "benefitName" TEXT NOT NULL,

    CONSTRAINT "JobBenefit_pkey" PRIMARY KEY ("jobId","benefitName")
);

-- AddForeignKey
ALTER TABLE "JobBenefit" ADD CONSTRAINT "JobBenefit_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobBenefit" ADD CONSTRAINT "JobBenefit_benefitName_fkey" FOREIGN KEY ("benefitName") REFERENCES "Benefit"("name") ON DELETE CASCADE ON UPDATE CASCADE;
