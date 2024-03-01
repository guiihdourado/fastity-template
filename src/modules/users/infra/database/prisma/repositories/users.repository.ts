import { User } from '@modules/users/application/entities'
import { ICreateUser } from '@modules/users/application/types'
import { IUsersRepository } from '@modules/users/application/repositories'

import { prisma } from '@shared/infra/database/prisma'

class UsersRepository implements IUsersRepository {
  private repository: typeof prisma.user

  constructor() {
    this.repository = prisma.user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findFirst({
      where: {
        email,
      },
    })

    return user
  }

  public async create({ email, name, password }: ICreateUser): Promise<User> {
    const user = await this.repository.create({
      data: {
        email,
        name,
        password,
      },
    })

    return user
  }
}

export { UsersRepository }
