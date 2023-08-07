import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { MongooseModule } from "@nestjs/mongoose";
import { TokenMiddleware } from "./modules/auth/token.middleware";
import { PostsModule } from "./modules/posts/posts.module";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { CoreModule } from "./core.module";
import { envConfig } from "./env-config";

@Module({
  imports: [
    MongooseModule.forRoot(envConfig.db.uri),
    PostsModule,
    UserModule,
    AuthModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes("*");
  }
}
