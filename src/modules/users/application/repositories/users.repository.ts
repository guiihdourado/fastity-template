import { User } from '@modules/users/application/entities'
import { ICreateUser } from '@modules/users/application/types'

interface IUsersRepository {
  create(data: ICreateUser): Promise<User>
  findByEmail(email: string): Promise<User | null>
}

export { IUsersRepository }
