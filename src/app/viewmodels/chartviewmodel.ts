export class ChartViewModel {
  chartData: Array<any>;
  chartLabels: Array<any>;
  chartOptions: any;
  chartDownloadOptions: any;
  chartLegend: boolean;
  chartType: string;
  chartColors: Array<any>;
  chartDownloadColors: Array<any>;
  constructor(
    _chartData: Array<any>,
    _chartLabels: Array<any>,
    _chartType?: string,
    _chartOptions?: any,
    _chartLegend?: boolean,
    _chartColors?: Array<any>,
  ) {
    this.chartData = _chartData;
    this.chartLabels = _chartLabels;
    this.chartOptions = _chartOptions;
    this.chartLegend = _chartLegend;
    this.chartType = _chartType;
    this.chartColors = _chartColors;
  }
}
