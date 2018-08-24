import {OnInit} from '@angular/core';

export class ExchangeStore implements OnInit {
  exchanges: string[];

  ngOnInit() {
    this.exchanges.push('bitfinex', 'bitstamp');
  }

  public getExchanges(): string[] {
    return this.exchanges;
  }

}

export class PairStore implements OnInit {
  pairs: string[];

  ngOnInit() {
    this.pairs.push('btcusd', 'btceur', 'ethusd', 'btceth');
  }

  public getPairs(): string[] {
    return this.pairs;
  }

}
