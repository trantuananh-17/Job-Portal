-- DropForeignKey
ALTER TABLE "public"."CandidateEducation" DROP CONSTRAINT "CandidateEducation_candidateProfileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CandidateEducation" DROP CONSTRAINT "CandidateEducation_educationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CandidateExperience" DROP CONSTRAINT "CandidateExperience_candidateProfileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CandidateLanguages" DROP CONSTRAINT "CandidateLanguages_candidateProfileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CandidateLanguages" DROP CONSTRAINT "CandidateLanguages_languageName_fkey";

-- DropForeignKey
ALTER TABLE "public"."CandidateSkill" DROP CONSTRAINT "CandidateSkill_candidateProfileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CandidateSkill" DROP CONSTRAINT "CandidateSkill_skillName_fkey";

-- AddForeignKey
ALTER TABLE "public"."CandidateLanguages" ADD CONSTRAINT "CandidateLanguages_candidateProfileId_fkey" FOREIGN KEY ("candidateProfileId") REFERENCES "public"."CandidateProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CandidateLanguages" ADD CONSTRAINT "CandidateLanguages_languageName_fkey" FOREIGN KEY ("languageName") REFERENCES "public"."Language"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CandidateEducation" ADD CONSTRAINT "CandidateEducation_candidateProfileId_fkey" FOREIGN KEY ("candidateProfileId") REFERENCES "public"."CandidateProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CandidateEducation" ADD CONSTRAINT "CandidateEducation_educationId_fkey" FOREIGN KEY ("educationId") REFERENCES "public"."Education"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CandidateSkill" ADD CONSTRAINT "CandidateSkill_candidateProfileId_fkey" FOREIGN KEY ("candidateProfileId") REFERENCES "public"."CandidateProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CandidateSkill" ADD CONSTRAINT "CandidateSkill_skillName_fkey" FOREIGN KEY ("skillName") REFERENCES "public"."Skill"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CandidateExperience" ADD CONSTRAINT "CandidateExperience_candidateProfileId_fkey" FOREIGN KEY ("candidateProfileId") REFERENCES "public"."CandidateProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
