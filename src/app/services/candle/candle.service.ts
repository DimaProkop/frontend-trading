import {Injectable} from '@angular/core';
import {Constraints} from '../../constraints';
import {Observable} from 'rxjs/Observable';
import {catchError, map, tap} from 'rxjs/operators';
import {CandleModel} from '../../models/candle.model';
import {HeadersService} from '../headers.service';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class CandleService {

  private candleURL: string;

  constructor(private http: HttpClient) {
    this.candleURL = Constraints.baseUrl + 'exchanges/bitfinex/markets/btcusd/candles';
  }

  getCandles(period: string): Observable<CandleModel[]> {
    return this.http
      .get<CandleModel[]>(this.candleURL, {
        headers: HeadersService.prepareHeaders(),
        params: {
          period: period,
          limit: '10'
        }
      }).pipe(
        tap(candles => console.log('fetch candles: length - ', candles.length)),
        catchError(HeadersService.handleError('getCandles', []))
      );
  }
}


