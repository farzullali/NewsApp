import { Module } from '@nestjs/common';
import { NewsController } from './controllers/news.controller';
import { NewsService } from './services/news.service';

@Module({
  imports: [],
  controllers: [NewsController],
  providers: [NewsService],
})
export class AppModule {} 