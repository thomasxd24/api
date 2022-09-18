import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SafeUser } from '../users/users.dto';
import { User } from '@prisma/client';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthHelper, AuthValidated } from './auth.helper';
import { PrismaService } from '../../prisma/prisma.service';
import { SENDER_EMAIL, transporter } from '../../email';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto, source: string): Promise<SafeUser | never> {
    const { username, email, password }: RegisterDto = body;

    let user: User = await this.prisma.user.findFirst({ where: { email } });
    if (user) throw new HttpException('Conflict, a user with that email already exists', HttpStatus.CONFLICT);

    user = await this.prisma.user.findFirst({ where: { username } });
    if (user) throw new HttpException('Conflict, a user with that username already exists', HttpStatus.CONFLICT);

    const hash = this.helper.hashPassword(body.password);
    const uuid = await this.helper.generateUUID();
    const verifyToken: string = await this.helper.generateUUID();
    
    try {
      await transporter.sendMail({
        from: SENDER_EMAIL,
        to: email,
        subject: 'Association des Étudiants - Email confirmation',
        html: `To verify your email, please click on the following link: <a href="${process.env.BASE_URL}:${process.env.PORT}/api/v1/auth/verify/${uuid}/${verifyToken}/${encodeURIComponent(source)}">verify</a>`,
      })
    } catch (err) {
      console.error(err);
      throw new HttpException('Error while sending email', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return await this.prisma.user.create({
      data: { ...body, uuid, password: hash, verifyToken },
    });
  }

  public async verify(uuid: string, token: string) {
    const user: User = await this.prisma.user.findFirst({ where: { uuid, verifyToken: token } });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    await this.prisma.user.update({ where: { uuid: user.uuid }, data: { verified: true } });
  }

  public async login(body: LoginDto): Promise<AuthValidated | never> {
    const { email, username, password }: LoginDto = body;
    if (!email && !username) throw new HttpException('Bad credentials, neither an email or a username were provided', HttpStatus.UNAUTHORIZED);

    const user: User = email ? await this.prisma.user.findFirst({ where: { email } }) : await this.prisma.user.findFirst({ where: { username } });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);
    if (!isPasswordValid) throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);

    return this.refresh(user);
  }

  public async refresh(user: User): Promise<AuthValidated> {
    // update last time logged in
    this.prisma.user.update({
      where: {
        uuid: user.uuid,
      },
      data: {
        lastLogin: user.lastLogin,
      },
    });

    return {
      token: this.helper.generateToken(user),
    };
  }
}
