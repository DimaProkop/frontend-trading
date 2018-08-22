export class CandleModel {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;

  constructor() {
  }
}

export class CandleTestModel {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;

  constructor(t: number, o: number, h: number, l: number, c: number, v: number) {
    this.date = new Date(t);
    this.open = o;
    this.high = h;
    this.low = l;
    this.close = c;
    this.volume = v;
  }
}
