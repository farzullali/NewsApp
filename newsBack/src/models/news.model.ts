import { ApiProperty } from '@nestjs/swagger';

export class NewsSource {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
}

export class NewsArticle {
  @ApiProperty()
  article_id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  link: string;
  @ApiProperty({ nullable: true })
  description: string | null;
  @ApiProperty({ nullable: true })
  content: string | null;
  @ApiProperty()
  pubDate: string;
  @ApiProperty({ nullable: true })
  image_url: string | null;
  @ApiProperty()
  source_id: string;
  @ApiProperty({ nullable: true })
  source_url: string | null;
  @ApiProperty({ nullable: true })
  source_icon: string | null;
  @ApiProperty()
  source_priority: number;
  @ApiProperty()
  source_name: string;
  @ApiProperty({ nullable: true, type: [String] })
  creator: string[] | null;
  @ApiProperty({ nullable: true, type: [String] })
  keywords: string[] | null;
  @ApiProperty({ nullable: true })
  video_url: string | null;
  @ApiProperty({ type: [String] })
  country: string[];
  @ApiProperty({ type: [String] })
  category: string[];
  @ApiProperty()
  language: string;
}

export class NewsResponse {
  @ApiProperty()
  status: string;
  @ApiProperty()
  totalResults: number;
  @ApiProperty({ type: [NewsArticle] })
  results: NewsArticle[];
  @ApiProperty({ nullable: true })
  nextPage: string | null;
}

export class ErrorResponse {
  @ApiProperty()
  status: string;
  @ApiProperty({ required: false })
  code?: string;
  @ApiProperty()
  message: string;
}

export interface NewsQueryParams {
  q?: string;
  country?: string;
  category?: string;
  language?: string;
  page?: string;
  size?: number;
} 