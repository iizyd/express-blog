#!/bin/bash

# 定义路径变量
data_path="/Users/zyd/Documents/code/mine/docker-data-test"

# 删除已存在的容器
docker rm -f mysql-container backend-container frontend-container


# 启动容器
docker run -d --name mysql-container -p 3306:3306 -v "$data_path"/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=12345678 mysql-db

# 等待 MySQL 容器启动和准备好接受连接
echo "Waiting for MySQL container to start..."
until docker exec mysql-container mysqladmin ping -uroot -p12345678 --silent; do
    sleep 10
done

docker run -d --name backend-container -p 9000:9000 -v "$data_path"/storage:/app/src/storage --link mysql-container:mysql express-backend

docker run -d --name frontend-container -p 80:80 vue-frontend
