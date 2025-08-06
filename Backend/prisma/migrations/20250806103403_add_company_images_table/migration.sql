-- CreateTable
CREATE TABLE "CompanyImage" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "CompanyImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompanyImage" ADD CONSTRAINT "CompanyImage_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
