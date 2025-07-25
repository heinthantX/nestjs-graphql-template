import { Body, Controller, Patch, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';
import Protected from '../auth/decorators/protected.decorator';

@Controller('user')
@Protected()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('update')
  update(@Body() dto: UpdateUserDto, @Headers() headers: Headers) {
    return this.userService.update(dto, headers);
  }
}
