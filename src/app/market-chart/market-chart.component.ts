import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import * as echarts from 'echarts';

export interface IMarketChart {
  location: string;
  item_id: string;
  quality: number;
  data: IMarketChartData[];
}

export interface IMarketChartData {
  item_count: number;
  avg_price: number;
  timestamp: string;
}

@Component({
  selector: 'app-market-chart',
  standalone: true,
  imports: [],
  templateUrl: './market-chart.component.html',
  styleUrl: './market-chart.component.scss',
})
export class MarketChartComponent implements AfterViewInit {
  @Input() data: IMarketChartData[] = [];
  @Input() chartId: string = '';

  ngAfterViewInit(): void {
    this.initChart();
  }

  private initChart(): void {
    const chartDom = document.getElementById(this.chartId)!;
    const myChart = echarts.init(chartDom);

    const data = this.data;
    const formatDate = this.formatDate;
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: function (params: any) {
          const item = data[params[0].dataIndex]!;
          return `Date: ${formatDate(item.timestamp)}<br/>Sold items: ${
            item.item_count
          }<br/>Avg Price: ${item.avg_price}`;
        },
      },
      xAxis: {
        type: 'category',
        data: data.map((item) =>
          new Date(item.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        ),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: data.map((item) => item.item_count),
          type: 'bar',
        },
      ],
    };

    myChart.setOption(option);
  }
  formatDate(inputDate: string) {
    const date = new Date(inputDate);

    return date.toLocaleString('pl-PL', {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
  }
}
