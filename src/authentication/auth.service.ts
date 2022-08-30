import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SafeUser, User } from '../users/users.entity';
import { Repository } from 'typeorm';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthHelper, AuthValidated } from './auth.helper';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<SafeUser | never> {
    const { username, email, password }: RegisterDto = body;
    let user: User = await this.repository.findOne({ where: { email } });

    if (user)
      throw new HttpException(
        'Conflict, a user with that email already exists',
        HttpStatus.CONFLICT,
      );

    user = await this.repository.findOne({ where: { username } });
    if (user)
      throw new HttpException(
        'Conflict, a user with that username already exists',
        HttpStatus.CONFLICT,
      );

    user = new User();
    user.email = email;
    user.username = username;
    user.password = this.helper.hashPassword(password);
    user.createdAt = new Date();

    return this.repository.save(user);
  }

  public async login(body: LoginDto): Promise<AuthValidated | never> {
    const { email, username, password }: LoginDto = body;

    if (!email && !username)
      throw new HttpException(
        'Bad credentials, neither an email or a username were provided',
        HttpStatus.UNAUTHORIZED,
      );

    const user: User = email
      ? await this.repository.findOne({ where: { email } })
      : await this.repository.findOne({ where: { username } });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password,
    );

    if (!isPasswordValid)
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);

    return this.refresh(user);
  }

  public async refresh(user: User): Promise<AuthValidated> {
    // update last time logged in
    this.repository.update(user.id, { lastLoginAt: new Date() });

    return {
      token: this.helper.generateToken(user),
    };
  }
}
