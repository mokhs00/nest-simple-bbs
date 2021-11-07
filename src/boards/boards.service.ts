import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { Board, BoardStatus } from './model/boards.model';
import { CreateBoardRequest } from './model/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(requestBody: CreateBoardRequest): Board {
    const { title, description } = requestBody;

    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }
}
