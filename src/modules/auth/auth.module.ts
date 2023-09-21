// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY', // Use a strong secret key or use environment variables
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
    // ... other imports
  ],
  // ...
})
export class AuthModule {}
