import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import { of, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { BffConfig } from '@project/libs/config';

const { microserviceConfig } = BffConfig;

@Injectable()
export class TransformCityInterceptor implements NestInterceptor {
  private cache: Record<string, string> = {};

  constructor(
    private httpService: HttpService,
    @Inject(microserviceConfig.KEY)
    private readonly serviceConfig: ConfigType<typeof microserviceConfig>
  ) {}

  public intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      switchMap((data) => {
        const { cityId, ...otherData } = data;

        if (cityId && !this.cache[cityId]) {
          return this.httpService
            .get(`${this.serviceConfig.taskServiceUrl}/v1/cities/${cityId}`)
            .pipe(
              map((response) => {
                const cityName = response.data.name;
                this.cache[cityId] = cityName;

                return {
                  ...otherData,
                  city: cityName,
                };
              }),
              catchError((error) => {
                Logger.error(`[Transform city id "${cityId}"]: ${error}`);
                return of(otherData);
              })
            );
        } else if (cityId && this.cache[cityId]) {
          return of({
            ...otherData,
            city: this.cache[data.cityId],
          });
        }

        return of(otherData);
      }),
      catchError((error) => {
        Logger.error(
          `[An error occurred when processing the request]: ${error}`
        );
        return throwError(error);
      })
    );
  }
}
