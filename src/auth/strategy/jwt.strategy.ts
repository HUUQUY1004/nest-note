import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { log } from "console";
import {Strategy,ExtractJwt} from "passport-jwt"
import { PrismaService } from "../../prisma/prisma.service";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt"){
    constructor( private configService : ConfigService,
        private prismaService : PrismaService
        ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : configService.get('JWT_SECRET')
        })
    }
    async validate(payload : {sub : number , email: string}){
        // console.log(JSON.stringify(payload))
        const user = await this.prismaService.user.findUnique({
            where: {
                id : payload.sub
            }
        })
        delete  user.hashedPassword
        // return payload
        return user
        
    }
}