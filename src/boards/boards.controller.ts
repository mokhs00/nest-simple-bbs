import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './model/boards.model';
import { CreateBoardRequest } from './model/create-board.request';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoards(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post()
  createBoard(@Body() body: CreateBoardRequest): Board {
    return this.boardsService.createBoard(body);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id);
  }
}
