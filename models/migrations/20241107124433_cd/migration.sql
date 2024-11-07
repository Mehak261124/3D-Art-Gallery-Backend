/*
  Warnings:

  - Added the required column `role` to the `Voter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Voter" ADD COLUMN     "role" TEXT NOT NULL;
