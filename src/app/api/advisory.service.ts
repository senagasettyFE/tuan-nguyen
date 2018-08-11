import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { ChartViewModel } from '../viewmodels/chartviewmodel';

@Injectable({
  providedIn: 'root'
})
export class AdvisoryService {
  constructor(private api: ApiService) {
  }
  getBubbleChartData() {

  }
  getDoughnutChartData() {
    return new ChartViewModel(
      [10, 40.6,
        10.5, 19.6, 30, 50.6,
        10.5, 29.6],
      [
        'Calliers International',
        'HFF', 'Marcus & Millichap',
        'NKE Capital Market',
        'Other', 'JLL', 'Eastdil Secured',
        'CBRE'],
      'doughnut',
      {
        zoomOutPercentage: 55,
        plugins: {
          legend: true,
          outlabels: {
            text: '%l %p',
            color: 'white',
            stretch: 45,
            font: {
              resizable: true,
              minSize: 12,
              maxSize: 18
            }
          }
        },
        pieceLabel: {
          // render: 'label',
          render: function (args) {
            const label = args.label,
              value = args.value;
            return label + ':' + value + '%';
          },
          fontColor: '#000',
          position: 'outside',
          segment: true,
        },
        legend: {
          position: 'right',
          display: true
        },
      }, true, null);

  }
}
