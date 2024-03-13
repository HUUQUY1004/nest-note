import { ForbiddenException, Injectable, Req } from "@nestjs/common";
import { User, Note, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDTO } from "./dto";
import * as argon from "argon2"
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
@Injectable({})
export class AuthService{
    constructor(
        private prismaService : PrismaService,
        private jwtService : JwtService,
        private configService  : ConfigService,
        ){

    }
    async register(authDTO : AuthDTO){
    const hashedPassword = await argon.hash(authDTO.password)
    try {
        const user = await this.prismaService.user.create({
            data: {
                email : authDTO.email,
                hashedPassword: hashedPassword,
                firstName: "",
                lastName:" "
                // Muốn ko yêu cầu nhập thì sử dụng dấu hỏi
            },
            // Muốn hiện ra những trường gì (select)
            select :{
                id: true,
                email: true,
                createdAt : true,
            }
        })
        
        return this.signJwtString(user.id, user.email)

    } catch (error) {
        if(error.code = "P202"){
            throw new ForbiddenException(error.message)
        }
        return {error}
    }
   }
   async login(authDTO : AuthDTO){
    const user= await  this.prismaService.user.findUnique({
        where :{
            email : authDTO.email
        }
    })
    if(!user){
        throw new ForbiddenException(
            "Email not found"
        )
    }
    const passwordMatched = await argon.verify(
        user.hashedPassword,
        authDTO.password
    )
    if(!passwordMatched) {
        throw new ForbiddenException("InCorrect Password")
    }
    // Phía font-end thì chả cần password làm gì
    delete user.hashedPassword
    return this.signJwtString(user.id, user.email)
   }
   async signJwtString(userId : number , email: string): Promise<{
    accessToken : string
   }> {
    const payload = {
        sub:userId ,
        email
    }
    const jwtString = await this.jwtService.signAsync(payload, {
        expiresIn: "10m",
        // Câu hỏi bảo mật
        secret: this.configService.get("JWT_SECRET")
    })
    return {
        accessToken : jwtString
    }
   }
}