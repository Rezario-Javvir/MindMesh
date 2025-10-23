/*
  Warnings:

  - You are about to drop the column `blog_id` on the `comment` table. All the data in the column will be lost.
  - Added the required column `article_id` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_blog_id_fkey`;

-- DropIndex
DROP INDEX `Comment_blog_id_fkey` ON `comment`;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `blog_id`,
    ADD COLUMN `article_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
