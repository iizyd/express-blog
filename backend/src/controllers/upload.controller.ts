import { Request, Response } from 'express'
import { successResponse } from '../common/response'

class UploadController {
	public async upload(req: Request, res: Response) {
		const fileUrl = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename
		successResponse(res, { url: fileUrl })
	}
}

export default UploadController
