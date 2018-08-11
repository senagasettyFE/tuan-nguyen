import { MarketShareOverTime } from './../../components/bubble-chart/bubble-chart.component';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FilterContainerComponent } from '../../components/filter-container/filter-container.component';
import { Subscription } from 'rxjs/Subscription';
import { GraphQLService } from '../../api/graphql.service';
import { ChartViewModel } from '../../viewmodels/chartviewmodel';


@Component({
  selector: 'cbre-mie-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {

  chartvm: ChartViewModel;
  gqlSubscription$: Subscription;
  @Input() widgetID: number;
  @Input() clientID: number;
  @Input() pageFilters: any; // filters coming from page
  filters: any;              // filters for each widget

  constructor(public dialog: MatDialog, private graphQLService: GraphQLService) { }

  public barChartdata = {
    chartOptions: {
      scaleShowVerticalLines: false,
      scaleShowValues: false,
      responsive: true,
      showScale: false,
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          categoryPercentage: 0.4,
          barPercentage: 2,
          gridLines: {
            display: false
          },
          ticks: {
            min: 10,
            steps: 10,
            stepValue: 10
          },
        }]
      },
      'hover': {
        'animationDuration': 0
      },
      tooltips: {
        'enabled': false
      },
      'animation': {
        'duration': 1,
        'onComplete': function () {
          const chartInstance = this.chart,
            ctx = chartInstance.ctx;
          this.data.datasets.forEach(function (dataset, i) {
            const meta: any = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach(function (bar, index) {
              const data: any = dataset.data[index];
              ctx.fillText(data, bar._model.x, bar._model.y - 3);
            });
          });
        }
      }
    },

    chartLabels: [],
    chartType: 'horizontalBar',
    chartData: [],
    chartLegend: false,
    chartColors: [{ backgroundColor: '#006a4d' }],
  };

  getMarketPosition() {
    if (this.gqlSubscription$) {
      this.gqlSubscription$.unsubscribe();
    }
    this.gqlSubscription$ = this.graphQLService
      .getMarketPositions()
      .subscribe(response => {
        const data: any = response.data;
        if (data && data.MarketPositions &&
          data.MarketPositions && data.MarketPositions.entities) {

            const entities = data.MarketPositions.entities.slice(0, 20);
            this.barChartdata.chartLabels = entities.map(e => e.companyName);
            console.log('the labels from backend are :==-->>', this.barChartdata.chartLabels);
            setTimeout(() => {
              this.barChartdata.chartData = entities.map(e => +e.positions.values[0].replace('%', ''));
            }, 0);

        }
      });
  }
  ngOnInit() {
    this.getMarketPosition();
    if (this.pageFilters) {
      this.filters = this.pageFilters;
    }
  }

  openFilterDialog(existingFilters: any) {
    this.filters = existingFilters;
    const dialogRef = this.dialog.open(FilterContainerComponent, {
      data: { filters: this.filters, widgetId: this.widgetID },
      width: '450px',
      height: '100%',
      position: {
        right: '0',
        top: '0'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.data) {
        const newFilters: any = {};
        Object.keys(result.data).forEach(key => {
          newFilters[key] = result.data[key];
        });
        this.filters = newFilters;
      }
    });
  }

}
