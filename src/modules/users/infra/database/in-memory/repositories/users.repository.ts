import { randomUUID } from 'node:crypto'

import { User } from '@modules/users/application/entities'
import { ICreateUser } from '@modules/users/application/types'
import { IUsersRepository } from '@modules/users/application/repositories'

class UsersRepository implements IUsersRepository {
  private users: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)

    return user ?? null
  }

  public async create({ email, name, password }: ICreateUser): Promise<User> {
    const user = {
      id: randomUUID(),
      email,
      name,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.users.push(user)

    return user
  }
}

export { UsersRepository }
