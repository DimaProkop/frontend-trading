import {Injectable} from '@angular/core';
import {Constraints} from '../../constraints';
import {Observable} from 'rxjs/Observable';
import {catchError, map, retry, tap} from 'rxjs/operators';
import {CandleModel} from '../../models/candle.model';
import {HelpersService} from '../helpers.service';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class CandleService {

  private candleURL: string;

  constructor(private http: HttpClient) {
    this.candleURL = Constraints.baseUrl + 'exchanges/bitfinex/markets/btcusd/candles';
  }

  getCandles(period: string): Observable<CandleModel[]> {
    return this.http
      .get<CandleModel[]>(this.candleURL, {
        headers: HelpersService.prepareHeaders(),
        params: {
          period: period,
          limit: '100'
        }
      }).pipe(
        retry(3),
        tap(candles => console.log('fetch candles: length - ', candles.length)),
        catchError(HelpersService.handleError('getCandles', []))
      );
  }
}


