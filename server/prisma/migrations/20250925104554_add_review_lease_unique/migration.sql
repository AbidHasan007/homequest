-- AlterTable
ALTER TABLE "public"."Review" ADD COLUMN     "leaseId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES "public"."Lease"("id") ON DELETE SET NULL ON UPDATE CASCADE;
