import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import CONFIG from '../config/config'

const transport: DailyRotateFile = new DailyRotateFile({
	filename: 'app-%DATE%.log' as string,
	dirname: 'src/storage/log/',
	datePattern: 'YYYY-MM-DD-HH',
	zippedArchive: true,
	maxSize: '20m',
	maxFiles: '14d',
	handleExceptions: true, // 记录异常
	json: true // 使用 JSON 格式记录异常
})

// 日志级别：优先级依次递增
// error < warn < info < verbose < debug < silly
const level = CONFIG.LOG_LEVEL || 'info'

const transports: any = [transport]

if (Number(CONFIG.ENABLE_CONSOLE_LOG)) {
	// 输出到控制台
	transports.push(new winston.transports.Console())
}

const logger = winston.createLogger({
	level,
	format: winston.format.combine(
		winston.format.timestamp(), // 添加时间戳
		winston.format.json(), // 输出 JSON 格式的日志
		winston.format.prettyPrint() // 格式化输出
	),
	transports,
	exceptionHandlers: [
		transport // 异常处理使用同一个 transport
	],
	rejectionHandlers: [transport] // Promise 异常
})

export default logger
