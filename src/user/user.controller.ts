import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { MyJwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
    constructor(){

    }
    // Khiên bảo vệ
    // phải có token mới được vào
    // @UseGuards(AuthGuard('jwt'))
    @UseGuards(MyJwtGuard)
    @Get('me')
    me(@GetUser() user: User): any{
        // Cái này nhận từ payload trong hàm validate => Nếu validate trả về gì thì nó nhận
        // giá trị đó
        // console.log(JSON.stringify(Object.keys(request)));
        
        // return "My detail information"
        // return request['user']
        return user
    }
}
