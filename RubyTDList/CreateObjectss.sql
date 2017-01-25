/* Создание базы данных */
CREATE DATABASE tododb;

/* Создание таблицы */
CREATE TABLE `usertbl` (
`id` int(11) NOT NULL auto_increment,
`full_name` varchar(32) collate utf8_unicode_ci NOT NULL default '',
`email` varchar(32) collate utf8_unicode_ci NOT NULL default '',
`username` varchar(20) collate utf8_unicode_ci NOT NULL default '',
`password` varchar(32) collate utf8_unicode_ci NOT NULL default '',
`state` longtext collate utf8_unicode_ci NOT NULL default '',
`projectId` int(255) collate utf8_unicode_ci NOT NULL default 0,
`taskId` int(255) collate utf8_unicode_ci NOT NULL default 0,
PRIMARY KEY  (`id`),
UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;