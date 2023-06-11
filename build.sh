#!/bin/bash  

# 用 M1 的 Mac 打包的时候需要指定平台类型，不然服务器无法运行容器  --platform=linux/amd64
# 打包后端镜像  
docker build --platform=linux/amd64 -t express-backend -f Dockerfile.backend .  

# 打包前端镜像  
# docker build -t vue-frontend -f Dockerfile.frontend .

docker build --platform=linux/amd64 -t mysql-db -f Dockerfile.mysql .
