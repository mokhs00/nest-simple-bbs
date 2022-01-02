import { EntityRepository, Repository } from 'typeorm';
import { Board } from './entity/boards.entity';
import { BoardStatus } from './model/board-status.enum';
import { CreateBoardRequest } from './model/create-board.request';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardRequest: CreateBoardRequest): Promise<Board> {
    const { title, description } = createBoardRequest;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    return this.save(board);
  }
}
