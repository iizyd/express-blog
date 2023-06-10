import { Router } from 'express'
import TagController from '../controllers/tag.controller'
import { CreateTagDto } from '../dto/tag.dto'
import validMiddleware from '../middleware/validate.middleware'
import authMiddleware from '../middleware/auth.middleware'

const router = Router()
const tagController = new TagController()

router.get('/', tagController.getAllTags)
router.get('/:id', tagController.getTagById)

router.post('/', authMiddleware, validMiddleware(CreateTagDto, 'body'), tagController.createTag)
router.delete('/:id', authMiddleware, tagController.deleteTag)
router.put('/:id', authMiddleware, validMiddleware(CreateTagDto, 'body'), tagController.updateTag)

export default router
