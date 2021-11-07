import { Injectable } from '@nestjs/common';
import { Board } from './model/boards.model';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }
}
