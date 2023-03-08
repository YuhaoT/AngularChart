import { Component, OnInit } from '@angular/core';
import  {EChartsOption} from 'echarts';
import * as d3 from 'd3';

interface StockData {
  index: number;
  name: string;
  open: number;
  close: number;
  high: number;
  low: number;
  date: string;
  ohlc: number;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{
  constructor() { }
  chartOption: EChartsOption = {};
  data: StockData[] = [];
  dates: string[] = [];
  opens: number[] = [];
  closes: number[] = [];
  highs: number[] = [];
  lows: number[] = [];
  ohlc_avg: number[] = [];

  ngOnInit(): void {
    //fetch data from the server
    d3.json('http://127.0.0.1:8000/api/stockHistory/').then((data:unknown) => {
      this.data = data as StockData[];
      this.parseData();
      this.drawChart();
    });
  }

  // parse data from the server
  parseData(): void {
    this.dates = this.data.map(d => d.date);
    this.opens = this.data.map(d => d.open);
    this.closes = this.data.map(d => d.close);
    this.highs = this.data.map(d => d.high);
    this.lows = this.data.map(d => d.low);
    this.ohlc_avg = this.data.map(d => d.ohlc);
  }

  // draw chart
  drawChart(): void {
    // construct charting data and reverse it to make it follow the order of dates
    const zippedData = this.opens.map((item, index) => [item, this.closes[index], this.lows[index], this.highs[index]]).reverse();
    // reverse the dates to make it follow the order of data
    this.dates = this.dates.reverse();
    
    this.chartOption = {
      legend: {
        data: ['Kline', 'MA50', 'MA200'],
        inactiveColor: '#777',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          animation: false,
          type: 'cross',
          lineStyle: {
            color: '#376df4',
            width: 2,
            opacity: 1,
          },
        },
      },
      xAxis: {
        type: 'category',
        data: this.dates, 
        axisLine:{lineStyle:{color:'#8392A5'}},
      },
      yAxis: {
        scale: true,
        axisLine:{lineStyle:{color:'#8392A5'}},
        splitLine: {show: false}
      },
      grid: {
        bottom: 80
      },
      dataZoom: [
        {
          textStyle: {
            color: '#8392A5'
          },
          handleIcon:
        'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        dataBackground: {
          areaStyle: {
            color: '#8392A5'
            },
          lineStyle: {
            opacity: 0.8,
            color: '#8392A5'
            }
          },
          brushSelect: true,
        },
        {type: 'inside'}
      ],
      series: [
        {
          type: 'candlestick',
          name: 'Day',
          data: zippedData,
          itemStyle: {
            color: '#FD1050',
            color0: '#0CF49B',
            borderColor: '#FD1050',
            borderColor0: '#0CF49B',
          },
        },
        {
          name: 'MA50',
          type: 'line',
          data: this.calculateMA(50, this.ohlc_avg),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 1,
          },
        },
        {
          name: 'MA200',
          type: 'line',
          data: this.calculateMA(200, this.ohlc_avg),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 1,
          },
        },
      ]
    }
  }
  
  // calculate moving average; mofiied based on https://echarts.apache.org/examples/en/editor.html?c=candlestick-sh-2015
  calculateMA(dayCount: number, data: number[]) {
    var result = [];
    for (var i = 0, len = data.length; i < len; i++) {
      if (i < dayCount) {
        result.push(NaN);
        continue;
      }
      var sum = 0;
      for (var j = 0; j < dayCount; j++) {
        sum += data[i - j];
      }
      result.push((sum / dayCount).toFixed(2));
    }
    return result;
  }

}
