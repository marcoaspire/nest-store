import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService

  ){}

  async login(loginUserDto: LoginUserDto){

    const { password, email } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: {email},
      select: {id: true, password: true, email: true }
    });
    if (!user)
      throw new UnauthorizedException(`No valid credentials `);

    if (!bcrypt.compareSync(password, user.password ))
      throw new UnauthorizedException(`No valid credentials password `);
    


    return {
      ...user, 
      token: this.getJwtToken({id: user.id})
    };

  }
  async create(createUserDto: CreateUserDto) {
    try {

      const { password, ...userData} = createUserDto

      const user = this.userRepository.create({
        password : bcrypt.hashSync(password, 10),
        ...userData
      });
      await this.userRepository.save(user);
      delete user.password;
      
      return {
        ...user, 
        token: this.getJwtToken({id: user.id})
      };


    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private getJwtToken(payload: JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }


  private handleDBExceptions( error:any): never{
    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException('Aiudaaa');
  }

}
