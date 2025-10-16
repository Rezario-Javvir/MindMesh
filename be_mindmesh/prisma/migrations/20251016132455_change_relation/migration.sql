/*
  Warnings:

  - You are about to drop the column `profile_id` on the `blog` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `blog` DROP FOREIGN KEY `Blog_profile_id_fkey`;

-- DropIndex
DROP INDEX `Blog_profile_id_fkey` ON `blog`;

-- AlterTable
ALTER TABLE `blog` DROP COLUMN `profile_id`;
