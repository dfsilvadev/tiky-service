/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "redemption_requests" DROP CONSTRAINT "redemption_requests_playerId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- DropForeignKey
ALTER TABLE "task_instances" DROP CONSTRAINT "task_instances_playerId_fkey";

-- DropForeignKey
ALTER TABLE "task_templates" DROP CONSTRAINT "task_templates_authorId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_playerId_fkey";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "xpBalance" INTEGER NOT NULL DEFAULT 0,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_key" ON "accounts"("email");

-- AddForeignKey
ALTER TABLE "redemption_requests" ADD CONSTRAINT "redemption_requests_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_instances" ADD CONSTRAINT "task_instances_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_templates" ADD CONSTRAINT "task_templates_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
