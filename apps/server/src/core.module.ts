import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { envConfig } from "./env-config";


@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: envConfig.auth.secret
    })
  ],
  exports: [JwtModule]
})
export class CoreModule {}