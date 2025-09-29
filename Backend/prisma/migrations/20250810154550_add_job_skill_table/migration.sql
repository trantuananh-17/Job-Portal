-- CreateTable
CREATE TABLE "JobSkill" (
    "jobId" INTEGER NOT NULL,
    "skillName" TEXT NOT NULL,

    CONSTRAINT "JobSkill_pkey" PRIMARY KEY ("jobId","skillName")
);

-- AddForeignKey
ALTER TABLE "JobSkill" ADD CONSTRAINT "JobSkill_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobSkill" ADD CONSTRAINT "JobSkill_skillName_fkey" FOREIGN KEY ("skillName") REFERENCES "Skill"("name") ON DELETE CASCADE ON UPDATE CASCADE;
