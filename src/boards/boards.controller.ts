import { Body, Controller, Get, Post } from '@nestjs/common';

import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './model/boards.model';
import { CreateBoardRequest } from './model/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post()
  createBoard(@Body() body: CreateBoardRequest): Board {
    return this.boardsService.createBoard(body.title, body.description);
  }
}
