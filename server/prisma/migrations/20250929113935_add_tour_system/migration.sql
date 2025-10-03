-- CreateEnum
CREATE TYPE "public"."TourStatus" AS ENUM ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."ApplicationStatus" ADD VALUE 'Tour_Scheduled';
ALTER TYPE "public"."ApplicationStatus" ADD VALUE 'Tour_Completed';
ALTER TYPE "public"."ApplicationStatus" ADD VALUE 'Active_Lease';

-- CreateTable
CREATE TABLE "public"."Tour" (
    "id" SERIAL NOT NULL,
    "applicationId" INTEGER NOT NULL,
    "scheduledDate" TIMESTAMP(3) NOT NULL,
    "status" "public"."TourStatus" NOT NULL DEFAULT 'SCHEDULED',
    "landlordNotes" TEXT,
    "tenantNotes" TEXT,
    "feedbackRating" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tour_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tour_applicationId_key" ON "public"."Tour"("applicationId");

-- AddForeignKey
ALTER TABLE "public"."Tour" ADD CONSTRAINT "Tour_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "public"."Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
