import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
    // const configService = new ConfigService();
    // return `Hello World! ${configService.get('TEXT')}`;
  }
}
