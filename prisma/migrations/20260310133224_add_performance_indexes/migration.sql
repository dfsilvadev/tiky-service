-- CreateIndex
CREATE INDEX "redemption_requests_status_idx" ON "redemption_requests"("status");

-- CreateIndex
CREATE INDEX "redemption_requests_playerId_idx" ON "redemption_requests"("playerId");

-- CreateIndex
CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");

-- CreateIndex
CREATE INDEX "task_instances_playerId_date_idx" ON "task_instances"("playerId", "date");

-- CreateIndex
CREATE INDEX "task_instances_status_idx" ON "task_instances"("status");

-- CreateIndex
CREATE INDEX "task_templates_status_idx" ON "task_templates"("status");

-- CreateIndex
CREATE INDEX "task_templates_authorId_idx" ON "task_templates"("authorId");

-- CreateIndex
CREATE INDEX "transactions_playerId_createdAt_idx" ON "transactions"("playerId", "createdAt" DESC);
