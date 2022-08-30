import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './users.dto';
import { SafeUser, User } from './users.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  /**
   * Update user's name
   * @return {User}
   */
  public async update(body: UpdateUserDto, uuid: string): Promise<void> {
    this.repository.findOneBy({ id: uuid }).then((user) => {
      user.address = body.address;
      user.birthDate = body.birthDate;
      user.department = body.department;
      user.emergencyPhone = body.emergencyPhone;
      user.faculty = body.faculty;
      user.forename = body.forename;
      user.gender = body.gender;
      user.name = body.name;
      user.nickname = body.nickname;
      user.parentsAddress = body.parentAddress;
      user.phone = body.phone;
      user.promotion = body.promotion;
      user.pronouns = body.pronouns;

      this.repository.save(user);
    });
  }

  /**
   * Get authenticated user
   * @return {SafeUser}
   */
  public async getUser(uuid: string): Promise<SafeUser> {
    return this.repository.findOneBy({ id: uuid });
  }

  /**
   * Delete user
   * @return {void}
   */
  public async delete(uuid: string): Promise<void> {
    this.repository.delete({ id: uuid });
  }
}
