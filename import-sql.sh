#!/bin/bash

# 导入备份出来的数据

# 设置数据库相关的变量
DB_HOST="localhost"
DB_PORT="3306"
DB_NAME="new_express_blog"
DB_USER="root"
DB_PASSWORD="12345678"

BACKUP_DIR="/path/to/backup"  # 备份文件保存的目录

# 设置备份文件路径
BACKUP_FILE="$BACKUP_DIR/express_blog-2023-06-11_12-30-00.sql"

# 导入备份数据到新数据库
mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASSWORD $DB_NAME < $BACKUP_FILE

echo "Database backup imported to $DB_NAME"
