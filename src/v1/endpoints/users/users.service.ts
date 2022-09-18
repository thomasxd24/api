import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './users.dto';
import { SafeUser } from './users.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  /**
   * Update user's name
   * @return {User}
   */
  public async update(body: UpdateUserDto, uuid: string): Promise<void> {
    this.prisma.user.update({
      where: {
        uuid: uuid,
      },
      data: body,
    });
  }

  /**
   * Get authenticated user
   * @return {SafeUser}
   */
  public async getUser(uuid: string): Promise<SafeUser> {
    return this.prisma.user.findUnique({ where: { uuid: uuid } });
  }

  /**
   * Delete user
   * @return {void}
   */
  public async delete(uuid: string): Promise<User> {
    return this.prisma.user.delete({ where: { uuid: uuid } });
  }
}
