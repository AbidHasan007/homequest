/*
  Warnings:

  - The values [Tinyhouse,Villa,Townhouse,Cottage] on the enum `PropertyType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `applicationFee` on the `Property` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."PropertyType_new" AS ENUM ('Rooms', 'Apartment', 'Mess', 'Sublet');
ALTER TABLE "public"."Property" ALTER COLUMN "propertyType" TYPE "public"."PropertyType_new" USING ("propertyType"::text::"public"."PropertyType_new");
ALTER TYPE "public"."PropertyType" RENAME TO "PropertyType_old";
ALTER TYPE "public"."PropertyType_new" RENAME TO "PropertyType";
DROP TYPE "public"."PropertyType_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."Property" DROP COLUMN "applicationFee";
