import { Router } from 'express'
import multer from 'multer'
import UploadController from '../controllers/upload.controller'
import path from 'path'
import authMiddleware from '../middleware/auth.middleware'

const router = Router()
const uploadController = new UploadController()

// 配置 multer 中间件
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		// 设置文件保存的目录
		cb(null, 'src/storage/uploads/')
	},
	filename: (req, file, cb) => {
		// 设置文件保存时的文件名
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
		const fileExtension = path.extname(file.originalname)
		cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension)
	}
})

const upload = multer({ storage })

router.post('/', authMiddleware, upload.single('file'), uploadController.upload)

export default router
