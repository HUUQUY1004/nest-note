import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NoteDTO } from './dto/insert.note.dto';
import { UpdateNoteDTO } from './dto/update.note.dto';

@Injectable()
export class NoteService {
    constructor(
        private prismaService : PrismaService,
    ){
    }
    getNotes(userId : number){
        return this.prismaService.note.findMany({
            where: {
                userId,
            }
        })
    }

    getNoteById( noteId : number){

    }
    
    async insertNote(
        userId : number,
        insertDTO : NoteDTO
    ){
        const note  = await this.prismaService.note.create({
            data:{
                title: insertDTO.title,
                description: insertDTO.description,
                url: insertDTO.url,
                userId
            }
        })
        return note
    }

   async updateNoteById(
        noteId : number,
        updateNoteDTO : UpdateNoteDTO
    ){
        const note = this.prismaService.note.findUnique({
            where:{
                id : noteId
            }
        })
         if(!note){
            return new ForbiddenException('Cna not found')
         }
         return this.prismaService.note.update({
            where: {
                id: noteId,
            },
            data:{
                ...updateNoteDTO
            }
         })
    }

    async deleteNoteById(noteId : number){
        const note = this.prismaService.note.findUnique({
            where:{
                id : noteId
            }
        })
         if(!note){
            return new ForbiddenException('Cna not found')
         }
         return this.prismaService.note.delete({
            where: {
                id: noteId,
            }
         })
    }

}
