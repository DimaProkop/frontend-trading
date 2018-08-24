import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constraints} from '../../constraints';
import {Observable} from 'rxjs';
import {TradeModel} from '../../models/trade.model';
import {catchError, tap} from 'rxjs/operators';
import {HelpersService} from '../helpers.service';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  private tradeURL: string;

  constructor(private http: HttpClient) {
    this.tradeURL = Constraints.baseUrl + 'exchanges/bitfinex/markets/btcusd/trades';
  }

  getTrades(): Observable<TradeModel[]> {
    return this.http
      .get<TradeModel[]>(this.tradeURL, {
        headers: HelpersService.prepareHeaders(),
        params: {
          limit: '10'
        }
      }).pipe(
        tap(candles => console.log('fetch trade: length - ', candles.length)),
        catchError(HelpersService.handleError('getTrades', []))
      );
  }
}
