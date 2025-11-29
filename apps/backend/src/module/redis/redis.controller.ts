import { Controller, Get, Query } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get('get')
  async get(@Query('key') key: string) {
    if (!key) {
      return {
        success: false,
        message: 'key 参数不能为空',
      };
    }
    const value = await this.redisService.get(key);
    return {
      key,
      value: value || null,
    };
  }
}
