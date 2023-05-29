# express 项目

## 技术栈

- 请求体解析
- 响应json
- 日志：winston、winston-daily-rotate-file
- orm：prisma 
- 数据库：mysql
- 参数校验：joi
- 配置读取：config
- 鉴权
- 跨域

## 基础配置

### 路由

- 路由为独立模块，模块化
- 统一全局前缀
- handler -> controller 中做参数校验，并获取请求体参数

### 中间件

- 异常捕获：errorCatch
    - 自定义 HttpException
    - 捕获 HttpException 后记录日志，并返回错误响应
    - 鉴权异常
- 其他：解析请求体、响应头等

### 日志记录封装

- 文件日志划分
- 控制台自定义输出

### 参数校验

- 定义 DTO
- 校验后返回数据
- 失败后响应错误

### 自定义响应

- 定义通用成功和错误响应方法
- 错误响应自动抛出异常至异常捕获中间件