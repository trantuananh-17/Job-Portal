/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Company" ADD COLUMN     "avatarUrl" TEXT;

-- CreateTable
CREATE TABLE "public"."Requirement" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Requirement_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "public"."JobRequirement" (
    "jobId" INTEGER NOT NULL,
    "requirementName" TEXT NOT NULL,

    CONSTRAINT "JobRequirement_pkey" PRIMARY KEY ("jobId","requirementName")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_userId_key" ON "public"."Company"("userId");

-- AddForeignKey
ALTER TABLE "public"."JobRequirement" ADD CONSTRAINT "JobRequirement_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "public"."Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."JobRequirement" ADD CONSTRAINT "JobRequirement_requirementName_fkey" FOREIGN KEY ("requirementName") REFERENCES "public"."Requirement"("name") ON DELETE CASCADE ON UPDATE CASCADE;
