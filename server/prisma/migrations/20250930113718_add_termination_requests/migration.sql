-- CreateEnum
CREATE TYPE "public"."TerminationStatus" AS ENUM ('PENDING', 'APPROVED', 'DENIED');

-- CreateTable
CREATE TABLE "public"."TerminationRequest" (
    "id" SERIAL NOT NULL,
    "leaseId" INTEGER NOT NULL,
    "reason" TEXT,
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "public"."TerminationStatus" NOT NULL DEFAULT 'PENDING',
    "landlordNotes" TEXT,
    "processedDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TerminationRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."TerminationRequest" ADD CONSTRAINT "TerminationRequest_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES "public"."Lease"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
