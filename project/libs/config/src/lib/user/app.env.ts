import { IsNumber, IsString, Max, Min, IsEnum } from 'class-validator';
import { Environment } from '@project/libs/shared-types';

const MIN_PORT = 0;
const MAX_PORT = 65535;

export class AppEnv {
  @IsString({
    message: `Environment is required and value should be ${Object.values(
      Environment
    ).join(', ')}`,
  })
  @IsEnum(Environment)
  public environment: Environment;

  @IsNumber(
    {},
    {
      message: 'App port is required',
    }
  )
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public port: number;
}
