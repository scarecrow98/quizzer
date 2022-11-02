import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AnswerStatEntry } from '../models';
import { ChartOptions, ChartData } from 'chart.js';
import { BehaviorSubject } from 'rxjs';

const CHART_OPTIONS: ChartOptions = {
  responsive: true,
  plugins: {
    tooltip: {
      enabled: false
    },
    legend: {
      display: false,
      title: {
        display: false
      },
    }
  },
  layout: {
    padding: 15
  },
  indexAxis: 'y',
  scales: {
    xAxes: {
      ticks: {
        display: true
      }
    },
    yAxes: {
      ticks: {
        font: {
          size: 16           
        },
        color: '#fff',
      },
      type: 'category'
    }
  }
}

@Component({
  selector: 'app-answer-chart',
  templateUrl: './answer-chart.component.html',
  styleUrls: ['./answer-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswerChartComponent implements OnInit {

  chartData$ = new BehaviorSubject<
    ChartData<'bar', number[], string>
    |
    null
  >(null);

  _answerStats: AnswerStatEntry | null = null;

  @Input() set answerStats(value: AnswerStatEntry) {
    this._answerStats = value;
    this.createChartData();
  }

  chartOptions = CHART_OPTIONS;

  constructor() { }

  ngOnInit(): void {
  }

  private createChartData() {
    let labels, values;
    if ( ['text', 'numeric'].includes(this._answerStats!.questionType) ) {
      labels = Object.keys(this._answerStats!.answers);
      values = Object.values(this._answerStats!.answers);
    } else {
      labels = this._answerStats!.questionChoices;
      values = [];

      for (let choice of this._answerStats!.questionChoices) {
        values.push(this._answerStats!.answers[choice] || 0);
      }
    }

    this.chartData$.next({
      labels: labels,
      datasets: [
        {
          data: values
        }
      ]
    });
  }
}
