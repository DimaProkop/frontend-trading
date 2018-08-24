import {Component, OnInit} from '@angular/core';
import {AmChart, AmChartsService} from '@amcharts/amcharts3-angular';
import {CandleService} from '../../services/candle/candle.service';
import {CandleModel, CandleResponseModel} from '../../models/candle.model';


@Component({
  selector: 'app-candlestick',
  templateUrl: './candlestick.component.html',
  styleUrls: ['./candlestick.component.css']
})
export class CandlestickComponent implements OnInit {

  chart: AmChart;
  candles: CandleResponseModel[];

  constructor(private AmCharts: AmChartsService,
              private candleService: CandleService) {
  }

  ngOnInit() {
    this.candles = [];
    this.fillCandles('1m');

    this.chart = this.AmCharts.makeChart('chartdiv', {
      type: 'stock',
      theme: 'light',

      // period
      'categoryAxesSettings': {
        'minPeriod': 'mm'
      },


      'listeners': [{
        'event': 'zoomed',
        'method': function (e) {
          console.log('FUNCKING GOD, HOW IT WORKS?????', e.chart.accessible);
        }
      }],

      // name of columns
      dataSets: [{
        fieldMappings: [{
          'fromField': 'open',
          'toField': 'open'
        }, {
          'fromField': 'close',
          'toField': 'close'
        }, {
          'fromField': 'high',
          'toField': 'high'
        }, {
          'fromField': 'low',
          'toField': 'low'
        }, {
          'fromField': 'volume',
          'toField': 'volume'
        }],


        // just color for first volume from part of pair (market)
        color: '#7f8da9',
        // set data which will displays
        dataProvider: this.candles,
        title: 'BTC',
        categoryField: 'date'
      }, {
        fieldMappings: [{
          fromField: 'value',
          toField: 'value'
        }],
        // color for second volume from part of pair (market)
        color: '#fac314',
        // set data which will displays
        dataProvider: this.candles,
        title: 'USD',
        // ????????
        categoryField: 'date'
      }],


      'panels': [{
        'title': 'Value',
        'showCategoryAxis': false,
        'percentHeight': 70,
        'valueAxes': [{
          'dashLength': 5
        }],

        'categoryAxis': {
          'dashLength': 5
        },

        'stockGraphs': [{
          'type': 'candlestick',
          'id': 'g1',
          'openField': 'open',
          'closeField': 'close',
          'highField': 'high',
          'lowField': 'low',
          'valueField': 'close',
          'fillColors': '#a9a508',
          'negativeFillColors': '#8615db',
          'fillAlphas': 1,
          'useDataSetColors': false,
          'comparable': true,
          'compareField': 'value',
          'showBalloon': true,
          'balloonText': 'Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>',
        }],

        'stockLegend': {
          'valueTextRegular': undefined,
          'periodValueTextComparing': '[[percents.value.close]]%'
        }
      },

        {
          'title': 'Volume',
          'percentHeight': 30,
          'marginTop': 1,
          'showCategoryAxis': true,
          'valueAxes': [{
            'dashLength': 5
          }],

          'categoryAxis': {
            'dashLength': 5
          },

          'stockGraphs': [{
            'valueField': 'volume',
            'type': 'column',
            'showBalloon': false,
            'fillAlphas': 1
          }],

          'stockLegend': {
            'markerType': 'none',
            'markerSize': 0,
            'labelText': '',
            'periodValueTextRegular': '[[value.close]]'
          }
        }
      ],

      'chartScrollbarSettings': {
        'graph': 'g1',
        'graphType': 'line',
        'usePeriod': 'mm'
      },

      'periodSelector': {
        'position': 'top',
        'dateFormat': 'YYYY-MM-DD JJ:NN',
        'inputFieldWidth': 150,
        'periods': [{
          'period': 'mm',
          'count': 1,
          'label': '1 minute'
        }, {
          'period': 'hh',
          'count': 1,
          'label': '1 hour'
        }, {
          'period': 'dd',
          'count': 1,
          'label': '1 day'
        }, {
          'period': 'MAX',
          'label': 'MAX',
          'selected': true
        }]
      }

    });


  }

  myfunc(): void {
    this.chart.this.fillCandles('1m');
  }

  fillCandles(period: string): void {
    this.candleService.getCandles(period)
      .subscribe(result => {
        result.forEach(value => {
          this.candles.push(
            new CandleResponseModel(value.time, value.open, value.high,
              value.low, value.close, value.volume)
          );
        });
      });
  }

}
