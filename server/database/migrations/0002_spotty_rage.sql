ALTER TABLE `clients` ADD `cnpj` text;--> statement-breakpoint
ALTER TABLE `clients` ADD `address` text;--> statement-breakpoint
ALTER TABLE `clients` ADD `phone` text;--> statement-breakpoint
ALTER TABLE `clients` ADD `email` text;--> statement-breakpoint
ALTER TABLE `clients` ADD `contact_name` text;--> statement-breakpoint
ALTER TABLE `clients` ADD `updated_at` integer;--> statement-breakpoint
CREATE UNIQUE INDEX `clients_cnpj_unique` ON `clients` (`cnpj`);