/*
  Warnings:

  - You are about to drop the column `authorId` on the `task_templates` table. All the data in the column will be lost.
  - Added the required column `accountId` to the `task_templates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `familyId` to the `task_templates` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "task_templates" DROP CONSTRAINT "task_templates_authorId_fkey";

-- DropIndex
DROP INDEX "task_templates_authorId_idx";

-- AlterTable
ALTER TABLE "task_templates" DROP COLUMN "authorId",
ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "familyId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "task_templates_accountId_idx" ON "task_templates"("accountId");

-- CreateIndex
CREATE INDEX "task_templates_familyId_idx" ON "task_templates"("familyId");

-- AddForeignKey
ALTER TABLE "task_templates" ADD CONSTRAINT "task_templates_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_templates" ADD CONSTRAINT "task_templates_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "families"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
