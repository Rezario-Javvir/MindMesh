/*
  Warnings:

  - You are about to drop the column `fullname` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `profile` DROP COLUMN `fullname`,
    ADD COLUMN `username` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `username`;
