/*
  Warnings:

  - You are about to drop the column `isCompleted` on the `subtask_instances` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `subtask_instances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subtask_instances" DROP COLUMN "isCompleted",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "proofImageUrl" TEXT,
ADD COLUMN     "rejectedReason" TEXT,
ADD COLUMN     "status" "InstanceStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
