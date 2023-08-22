import { Controller, Get, Res, VERSION_NEUTRAL } from '@nestjs/common';
import { AppService } from './app.service';
import * as version from './staticFile/version.json';

@Controller({
  version: VERSION_NEUTRAL,
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
