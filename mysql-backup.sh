#!/bin/bash

# 备份导出数据库的数据

# 设置数据库相关的变量
DB_HOST="localhost"
DB_PORT="3306"
DB_NAME="express_blog"
DB_USER="root"
DB_PASSWORD="12345678"

# 设置备份相关的变量
BACKUP_DIR="/path/to/backup"  # 备份文件保存的目录

CURRENT_DATE=$(date +%Y-%m-%d_%H-%M-%S)  # 当前日期作为备份文件名的一部分

# 创建备份目录
mkdir -p $BACKUP_DIR

# 备份数据库结构和数据
mysqldump -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASSWORD --single-transaction --routines --triggers --databases $DB_NAME > $BACKUP_DIR/$DB_NAME-$CURRENT_DATE.sql

echo "Database backup created: $BACKUP_DIR/$DB_NAME-$CURRENT_DATE.sql"
