-- CreateEnum
CREATE TYPE "public"."ReviewType" AS ENUM ('TENANT_TO_LANDLORD', 'LANDLORD_TO_TENANT');

-- AlterTable
ALTER TABLE "public"."Review" ADD COLUMN     "type" "public"."ReviewType";
