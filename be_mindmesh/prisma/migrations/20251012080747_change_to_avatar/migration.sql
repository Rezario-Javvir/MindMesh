/*
  Warnings:

  - You are about to drop the column `image` on the `profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `profile` DROP COLUMN `image`,
    ADD COLUMN `avatar` VARCHAR(191) NULL;
