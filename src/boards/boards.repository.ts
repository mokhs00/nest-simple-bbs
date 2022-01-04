import { User } from 'src/auth/entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Board } from './entity/boards.entity';
import { BoardStatus } from './model/board-status.enum';
import { CreateBoardRequest } from './model/create-board.request';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(
    createBoardRequest: CreateBoardRequest,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardRequest;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    return this.save(board);
  }

  async getAllBoardsByUserId(userId: number) {
    const queryBuilder = this.createQueryBuilder();
    queryBuilder.where('board.userId = :userId', { userId });

    return await queryBuilder.getMany();
  }
}
