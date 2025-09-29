-- CreateTable
CREATE TABLE "Package" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "jobPostLimit" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecruiterPackage" (
    "id" SERIAL NOT NULL,
    "recruiterId" INTEGER NOT NULL,
    "packageId" INTEGER NOT NULL,
    "startDate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecruiterPackage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecruiterPackage" ADD CONSTRAINT "RecruiterPackage_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecruiterPackage" ADD CONSTRAINT "RecruiterPackage_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
