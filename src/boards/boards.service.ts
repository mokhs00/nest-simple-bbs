import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './boards.repository';
import { Board } from './entity/boards.entity';
import { BoardStatus } from './model/board-status.enum';
import { CreateBoardRequest } from './model/create-board.request';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async createBoard(createBoardRequest: CreateBoardRequest): Promise<Board> {
    const board = await this.boardRepository.createBoard(createBoardRequest);
    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Can't find Board with id : ${id}`);
    }
    return found;
  }

  async deleteBoardById(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Can't found Board with id : ${id}`);
    }
  }

  async updateBoardStatusById(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    this.boardRepository.save(board);
    return board;
  }
}
