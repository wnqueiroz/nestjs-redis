import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NasaService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    const baseURL = this.configService.get<string>('NASA_API_URL');
    const apiKey = this.configService.get<string>('NASA_API_KEY');

    this.httpService.axiosRef.defaults.baseURL = baseURL;
    this.httpService.axiosRef.defaults.params = { api_key: apiKey };
  }

  async getApod(date: string): Promise<any> {
    return this.httpService
      .get('/planetary/apod', {
        params: {
          date,
        },
      })
      .toPromise()
      .then(({ data }) => data);
  }
}
