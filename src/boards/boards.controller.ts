import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/entity/user.entity';
import { GetUser } from 'src/auth/utils/get-user.decorator';
import { BoardsService } from './boards.service';
import { Board } from './entity/boards.entity';
import { BoardStatus } from './model/board-status.enum';
import { CreateBoardRequest } from './model/create-board.request';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Get('/user/:userId')
  getAllBoardsByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Board[]> {
    return this.boardsService.getAllBoardsByUserId(userId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() request: CreateBoardRequest,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardsService.createBoard(request, user);
  }

  @Get('/:id')
  async getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoardById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): object {
    return this.boardsService.deleteBoardById(id, user);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatusById(id, status);
  }
}
