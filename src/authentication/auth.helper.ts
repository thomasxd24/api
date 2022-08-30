import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class AuthValidated {
  token: string;
}

@Injectable()
export class AuthHelper {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  constructor(private readonly jwt: JwtService) {}

  /**
   * Decode the JWT Token
   * @param {string} token - The JWT Token
   */
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  /**
   * Get User by User ID we get from decode()
   * @param {*} decoded
   */
  public async validateUser(decoded: any): Promise<User> {
    return this.repository.findOneBy({ id: decoded.id });
  }

  /**
   * Generate the JWT Token
   * @param {User} user - The User to generate the JWT Token for
   */
  public generateToken(user: User): string {
    return this.jwt.sign({ id: user.id, email: user.email });
  }

  /**
   * Validate User's password
   * @param {string} password - The password to validate
   * @param {string} userPassword - The password from the User
   */
  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  /**
   * Hash the User's password
   * @param {string} password - The password to hash
   */
  public hashPassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  /**
   * Validate the JWT Token
   * @param {string} token - The JWT Token
   * @returns {boolean} True if the token is valid
   * @throw {ForbiddenError} - If the JWT Token is invalid
   */
  public async validate(token: string): Promise<boolean | never> {
    const decoded: unknown = this.jwt.verify(token);

    if (!decoded) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    const user: User = await this.validateUser(decoded);

    if (!user) throw new UnauthorizedException();
    return true;
  }
}
