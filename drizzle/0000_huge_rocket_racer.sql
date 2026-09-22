CREATE TABLE `rounds` (
	`id` text PRIMARY KEY NOT NULL,
	`mode` text NOT NULL,
	`puzzle` text NOT NULL,
	`solution` text NOT NULL,
	`started` integer NOT NULL,
	`finished` integer,
	`name` text,
	`elapsed` integer
);
