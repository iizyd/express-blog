import { User } from '@prisma/client'
import userModel from '../models/user.model'

class UserService {
	public async getUserByName(username: string): Promise<User | null> {
		return await userModel.getByName(username)
	}

	public async getUserById(id: number): Promise<User | null> {
		return await userModel.getById(id)
	}
}

export default new UserService()
