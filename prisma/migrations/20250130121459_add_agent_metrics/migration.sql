-- CreateTable
CREATE TABLE "AgentMetrics" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "callsPerDay" INTEGER NOT NULL,
    "talkTime" DOUBLE PRECISION NOT NULL,
    "revenue" DOUBLE PRECISION NOT NULL,
    "conversionRate" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgentMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AgentMetrics_userId_idx" ON "AgentMetrics"("userId");

-- CreateIndex
CREATE INDEX "AgentMetrics_date_idx" ON "AgentMetrics"("date");

-- AddForeignKey
ALTER TABLE "AgentMetrics" ADD CONSTRAINT "AgentMetrics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
