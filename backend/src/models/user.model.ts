import { User } from '@prisma/client'
import db from '../common/db'

class UserModel {
	public async getByName(username: string): Promise<User | null> {
		return await db.user.findFirst({
			where: {
				username
			}
		})
	}

	public async getById(id: number): Promise<User | null> {
		return await db.user.findFirst({
			where: {
				id
			}
		})
	}
}

export default new UserModel()
