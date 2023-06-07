CREATE DATABASE IF NOT EXISTS express_blog DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_general_ci;

DROP TABLE IF EXISTS `article_tag`;
DROP TABLE IF EXISTS `article`;
DROP TABLE IF EXISTS `tag`;

CREATE TABLE `tag` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT '标签名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='标签管理';

CREATE TABLE `article` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL COMMENT '文章标题',
  `description` varchar(255) DEFAULT '' COMMENT '文章简述',
  `cover_image_url` varchar(255) DEFAULT '' COMMENT '封面图片地址',
  `content` longtext COMMENT '文章内容',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modified_on` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `published`  BOOLEAN NOT NULL DEFAULT false COMMENT '是否发布',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文章管理';

-- CREATE TABLE `article_tag` (
--   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
--   `article_id` int(10) unsigned NOT NULL COMMENT '文章 ID',
--   `tag_id` int(10) unsigned NOT NULL COMMENT '标签 ID',
--   PRIMARY KEY (`id`),
--   FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE CASCADE,
--   FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文章标签关联';

CREATE TABLE `article_tag` (
  `article_id` int(10) unsigned NOT NULL,
  `tag_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`article_id`, `tag_id`),
  FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文章标签关联';

