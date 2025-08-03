-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "teamSize" INTEGER NOT NULL DEFAULT 50,
    "establishmentDate" DATE NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "websiteUrl" TEXT,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "mapLink" TEXT,
    "address" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
