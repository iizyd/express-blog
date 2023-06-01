import 'dotenv/config'

const CONFIG = {
	PORT: process.env.PORT,
	DEFAULT_PAGE_SIZE: process.env.DEFAULT_PAGE_SIZE,
	MAX_PAGE_SIZE: process.env.MAX_PAGE_SIZE,
	LOG_LEVEL: process.env.LOG_LEVEL,
	ENABLE_CONSOLE_LOG: process.env.ENABLE_CONSOLE_LOG
}

export default CONFIG
