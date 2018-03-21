import { StockTableService } from './../stock-table/stock-table.service';
import { Component, OnInit, Pipe, ViewChild, ElementRef } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import * as moment from 'moment';
declare var Chart: any;

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor(private service: StockTableService) { }

  ngOnInit() {
    this.getStats();
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  private labels_line = Array<any>();
  private chartOptions = {
    responsive: true
  };

  private datasets_lines: { label: string, fill: boolean, data: { x: string, y: number }[], borderColor: string }[] = [{
    label: "label",
    fill: false,
    data: [],
    borderColor: "#3e95cd"
  }
  ];

  private options = {
    responsive: true,
    elements: {
      line: {
        tension: 0
      }
    },
    title: {
      display: true,
      text: 'Indices'
    },
    scales: {
      yAxes: [{
        display: true
      }],
      xAxes: [{
        gridLines: {
          display: true
        },
        type: 'time',
        time: {
          displayFormats: {
            millisecond: 'DD/MM/YYYY HH:mm:ss',
            second: 'DD/MM/YYYY HH:mm:ss',
            minute: 'DD/MM/YYYY HH:mm:ss',
            hour: 'DD/MM/YYYY HH:mm:ss',
            day: 'DD/MM/YYYY HH:mm:ss',
            week: 'DD/MM/YYYY HH:mm:ss',
            month: 'DD/MM/YYYY HH:mm:ss',
            quarter: 'DD/MM/YYYY HH:mm:ss',
            year: 'DD/MM/YYYY HH:mm:ss'
          },
          tooltipFormat: 'DD/MM/YYYY HH:mm:ss'
        }
      }]
    }
  };

  onChartClick(event) {
    console.log(event);
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  //getting Stocks
  private getStats() {
    this.service.getIndices()
      .subscribe(
        res => {
          console.log('getStocks success');
          var temp = res.json();
          this.datasets_lines = [];
          temp.map(ele => {
            let arrdatasets_lines: any[];
            arrdatasets_lines = [];
            ele.indexValues.map(element => {
              arrdatasets_lines.push({ x: element.dateTime, y: element.indexValue });
            });

            arrdatasets_lines.sort(function (a, b) {
              return new Date(a.x).getTime() - new Date(b.x).getTime()
            });

            this.datasets_lines.push({
              label: ele.indexName,
              fill: false,
              data: arrdatasets_lines,
              borderColor: this.getRandomColor()
            });
          });
          this.refresh_chart();
        },
        err => {
          console.log("getStocks failed from component");
        },
        () => {
          console.log('getStocks finished');
        });
  }

  private refresh_chart() {
    setTimeout(() => {
      if (this.chart && this.chart.chart && this.chart.chart.config) {
        this.chart.chart.config.data.labels = this.labels_line;
        this.chart.chart.config.data.datasets = this.datasets_lines;
        this.chart.chart.update();
      }
    });
  }

  private getRandomColor() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
}
