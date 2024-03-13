import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { NoteService } from './note.service';
import { GetUser } from 'src/auth/decorator';
import { NoteDTO } from './dto/insert.note.dto';
import { UpdateNoteDTO } from './dto/update.note.dto';

@UseGuards(MyJwtGuard)
@Controller('notes')
export class NoteController {
    constructor(private noteService : NoteService ){
    }
    @Get()
    getNotes(@GetUser('id') userId : number){
        this.noteService.getNotes(userId)
    }

    @Get(':id')
    getNoteById(@Param('id') noteId : number){
      return  this.noteService.getNoteById(noteId)
    }

    @Post()
    insertNote(
        @GetUser('id') userId : number,
        @Body() insertDTO : NoteDTO
    ){
        return  this.insertNote(userId, insertDTO)
    }

    @Patch(':id')
    updateNoteById(
        @Param('id',ParseIntPipe) noteId : number, // nghĩa là id phải là số nguyên 
        @Body() updateNoteDTO : UpdateNoteDTO
    ){
        return  this.noteService.updateNoteById(noteId, updateNoteDTO)
    }

    @Delete()
    deleteNoteById(@Query('id',ParseIntPipe) noteId :  number){
        return this.noteService.deleteNoteById(noteId)
    }
}
