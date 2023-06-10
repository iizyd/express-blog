#!/bin/bash  

# 打包后端镜像  
docker build -t express-backend -f Dockerfile.backend .  

# 打包前端镜像  
docker build -t vue-frontend -f Dockerfile.frontend .

docker build -t mysql-db -f Dockerfile.mysql .
