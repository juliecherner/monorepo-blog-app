"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const saltOrRounds = 10;
let AuthService = exports.AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register({ username, password, role }) {
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const user = await this.userService.create({
            username,
            password: hashedPassword,
            role
        });
        return user;
    }
    async login({ username, password }) {
        const users = await this.userService.find({ username });
        if (!users) {
            throw new common_1.UnauthorizedException('Invalid username');
        }
        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const payload = { _id: user._id, username };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async me(user) {
        const dbUser = await this.userService.findOne(user._id);
        if (!dbUser)
            return null;
        return {
            _id: dbUser._id,
            username: dbUser.username
        };
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map