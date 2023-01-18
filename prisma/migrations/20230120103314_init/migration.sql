-- CreateTable
CREATE TABLE "Garbage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "Garbage_pkey" PRIMARY KEY ("id")
);
