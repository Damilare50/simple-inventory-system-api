import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'node-config-ts';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      signOptions: {
        expiresIn: config.JWT_EXPIRY,
        issuer: 'baron',
      },
      secret: config.JWT_SECRET,
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class GeneralModule {}
