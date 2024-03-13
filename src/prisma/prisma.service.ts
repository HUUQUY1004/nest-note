import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient{
    constructor(configService : ConfigService){
        super({
            datasources:{
                db: {
                    // url:"postgresql://postgres:Abc123456789@localhost:5432/testdb?schema=public"
                    // Bảo mật
                    url : configService.get("DATABASE_URL")
                }
            }
        })
        console.log(`db url: ${configService.get("DATABASE_URL")} `);
        
    }
    cleanDatabase(){
        return this.$transaction([
            this.user.deleteMany(),
            this.note.deleteMany(),
        ])
    }
}
