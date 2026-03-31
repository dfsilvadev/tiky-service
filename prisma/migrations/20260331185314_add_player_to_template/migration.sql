/*
  Warnings:

  - Added the required column `playerId` to the `task_templates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "task_templates" ADD COLUMN     "playerId" TEXT NOT NULL;
