import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";
import { AuthDTO } from "./dto";
@Controller('auth')
export class AuthController{
    // Khi controller được tạo ra thì service cũng sẽ được tao ra
    constructor(private authService :AuthService){
    }

    @Post("register") // method post from client{}
    register(@Body() body : AuthDTO){
      // có thể nhận @Body body: any mà không cần qua req: DTO: Data transfer object
      // console.log(request.body);
      console.log(body);
      
      
      return  this.authService.register( body )
    }


    @Post("login")
    login(@Body() body : AuthDTO){
     return  this.authService.login(body)
    }
}