import { Module } from '@nestjs/common';
import { OrdersModule } from './order/orders.module';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './entities/User.entity';
// import { Profile } from './entities/Profile.entity';
// import { Order } from './entities/Order.entity';
import { ItemModule } from './item/item.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { Item } from './entities/Item.entity';
// import { PassportModule } from '@nestjs/passport';
// import { OrderItem } from './entities/OrderItem.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        database: configService.get('DB_DATABASE'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        // entities: [User, Profile, Order, Item, OrderItem],
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   database: 'nestv1',
    //   username: 'root',
    //   password: 'ichad',
    //   host: 'localhost',
    //   port: 3306,
    //   // entities: [User, Profile, Order, Item, OrderItem],
    //   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    //   synchronize: true,
    // }),
    OrdersModule,
    UsersModule,
    AuthModule,
    ProfileModule,
    ItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
