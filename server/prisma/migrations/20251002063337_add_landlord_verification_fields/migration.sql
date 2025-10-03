-- AlterTable
ALTER TABLE "public"."Landlord" ADD COLUMN     "address" TEXT,
ADD COLUMN     "addressProofUrl" TEXT,
ADD COLUMN     "adminNotes" TEXT,
ADD COLUMN     "nidDocumentUrl" TEXT,
ADD COLUMN     "nidNumber" TEXT,
ADD COLUMN     "rejectedAt" TIMESTAMP(3),
ADD COLUMN     "verifiedAt" TIMESTAMP(3);
