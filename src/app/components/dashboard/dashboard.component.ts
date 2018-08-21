import {Component, OnInit} from '@angular/core';
import {CandleModel} from '../../models/candle.model';
import {Router} from '@angular/router';
import {CandleService} from '../../services/candle/candle.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'my FUCKING WORLD';
  period: string;
  candles: CandleModel[];
  avaible: boolean;

  constructor(private router: Router,
              private candleService: CandleService) {
  }

  ngOnInit() {
    this.candles = [];
    this.period = '';
    this.avaible = false;
  }

  getCandles(): void {
    if (this.period === '') {
      console.log('Period is NULL');
      return;
    }
    this.candleService.getCandles(this.period)
      .subscribe(result => {
        this.candles = result;
      });
    this.avaible = true;
  }

}
