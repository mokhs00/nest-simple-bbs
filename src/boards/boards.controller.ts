import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './model/boards.model';
import { CreateBoardRequest } from './model/create-board.request';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) { }

  @Get('/')
  getAllBoards(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createBoard(@Body() body: CreateBoardRequest): Board {
    return this.boardsService.createBoard(body);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id);
  }


  @Delete('/:id')
  deleteBoardById(@Param('id') id: string): void {
    this.boardsService.deleteBoardById(id);
  }
}
