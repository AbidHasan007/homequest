-- CreateEnum
CREATE TYPE "public"."LeaseStatus" AS ENUM ('ACTIVE', 'TERMINATED', 'PENDING_START');

-- AlterTable
ALTER TABLE "public"."Lease" ADD COLUMN     "status" "public"."LeaseStatus" NOT NULL DEFAULT 'ACTIVE',
ALTER COLUMN "endDate" DROP NOT NULL;
