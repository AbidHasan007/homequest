-- CreateEnum
CREATE TYPE "public"."NIDStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- AlterTable
ALTER TABLE "public"."Landlord" ADD COLUMN     "nidStatus" "public"."NIDStatus" NOT NULL DEFAULT 'PENDING';
