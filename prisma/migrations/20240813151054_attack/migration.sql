-- CreateTable
CREATE TABLE `attacks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ipv4_address` VARCHAR(191) NOT NULL,
    `ip_range` VARCHAR(191) NULL,
    `port` INTEGER NOT NULL,
    `attack_time` INTEGER NOT NULL,
    `protocol` VARCHAR(191) NOT NULL,
    `method` VARCHAR(191) NOT NULL,
    `concurrents` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `attacks` ADD CONSTRAINT `attacks_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
