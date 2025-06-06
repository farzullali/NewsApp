import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NewsService } from '../services/news.service';
import { NewsQueryDto } from '../dtos/news.dto';
import { NewsResponse, ErrorResponse } from '../models/news.model';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiOperation({ summary: 'Get news articles with pagination and filtering' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved news articles',
    type: NewsResponse
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ErrorResponse
  })
  async getNews(@Query() query: NewsQueryDto): Promise<NewsResponse> {
    return this.newsService.getNews(query);
  }
} 