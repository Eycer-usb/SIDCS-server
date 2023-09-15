import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import { jwtConstants } from "./constants";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(JwtStrategy.name);

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        });
    }

    async validate(payload: any) {
        this.logger.log(`Validating payload: ${JSON.stringify(payload)}`);
        return {
            id: payload.sub,
            email: payload.email,
            name: payload.name,
            lastname: payload.lastname,
            role: payload.role
        };
    }
}