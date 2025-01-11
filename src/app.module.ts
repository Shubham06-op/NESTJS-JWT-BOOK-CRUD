import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';  // Corrected the import path

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'T!mepass06',
      database: 'nestjs_crud',
      entities: [User, __dirname + '/**/*.entity{.ts,.js}'],  // Added User entity to entities
      synchronize: true,  // Ensures tables are automatically created/updated
    }),
    BookModule,
    AuthModule,
  ],
})
export class AppModule {}
