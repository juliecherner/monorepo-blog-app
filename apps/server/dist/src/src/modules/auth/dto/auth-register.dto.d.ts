import { AuthLoginDto } from "./auth-login.dto";
declare enum Role {
    admin = "ADMIN",
    user = "USER"
}
export declare class AuthRegisterDto extends AuthLoginDto {
    role: Role;
}
export {};
//# sourceMappingURL=auth-register.dto.d.ts.map