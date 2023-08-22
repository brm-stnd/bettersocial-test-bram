import { ApiProperty } from '@nestjs/swagger';

export class WebLoginResponse {
  @ApiProperty({ example: true })
  needmfa: boolean;
}
