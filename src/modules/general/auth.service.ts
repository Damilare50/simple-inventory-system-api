import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async sign(data: any): Promise<string> {
    const token = await this.jwtService.signAsync(data);

    return token;
  }

  async decode(token: string): Promise<{ isValid: boolean; jwt: any }> {
    try {
      const decodedJwt = await this.jwtService.decode(token);

      return {
        isValid: true,
        jwt: decodedJwt,
      };
    } catch (error) {
      return {
        isValid: false,
        jwt: null,
      };
    }
  }
}
