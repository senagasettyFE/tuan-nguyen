import { Component, OnInit, Input } from '@angular/core';
import 'chart.piecelabel.js';
import 'chartjs-plugin-piechart-outlabels';

@Component({
  selector: 'cbre-mie-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.scss']
})
export class BubbleChartComponent implements OnInit {
  displayedColumns = [
    'competitor',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018'
  ];
  dataSource = ELEMENT_DATA;

  bubbleCounter: number;
  tooltip: string;
  tooltipOptions: any;

  @Input() chartvm;
  constructor() {}

  ngOnInit() {
    console.log('check bubble chartvm values', this.chartvm);
    this.bubbleCounter = 0;
    this.tooltipOptions = {
      'placement': 'top',
      'show-delay': 300,
      'hide-delay': 0
    };
  }

  populateBubbleChart() {}

  setBubbleCounter() {
    this.bubbleCounter = document.querySelectorAll('circle[id^=circle]').length;
  }

  setTooltip(config: any) {
    this.tooltip = 'CBRE Share' + config.cbreShare + '\n' +
                   'CBRE PY Share' + config.cbrePyShare + '\n' +
                   'Top Gain' + config.topGain.companyName;
  }

  setRadiusAndColor(id: string, radius: string) {
    const circle = document.getElementById(id);
    circle.setAttribute('r', radius);
    switch (radius) {
      case '2.5':
        circle.setAttribute('fill', 'black');
        break;
      case '5':
        circle.setAttribute('fill', 'green');
        break;
      case '10':
        circle.setAttribute('fill', 'yellowgreen');
        break;
      case '25':
        circle.setAttribute('fill', 'darkgreen');
        break;
      default:
        break;
    }
  }

}

export interface MarketShareOverTime {
  competitor: string;
  marketShare: string[];
  cbreShare: number[];
  cbrePyShare: number[];
  topGain: any;
  years: string[];
  radius: string[];
}

const ELEMENT_DATA: MarketShareOverTime[] = [
  {
    competitor: 'CBRE',
    marketShare: [
      '20.4%',
      '19.9%',
      '21.1%',
      '20.8%',
      '20.2%',
      '21.6%',
      '18.7%',
      '20.3%',
      '22.4%',
      '21.6%',
      '18.1%'
    ],
    cbreShare: [1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8],
    cbrePyShare: [1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8],
    topGain: { companyName: 'CBRE', percentage: '29%' },
    years: [
      '2008',
      '2009',
      '2010',
      '2011',
      '2012',
      '2013',
      '2014',
      '2015',
      '2016',
      '2017',
      '2018'
    ],
    radius: ['5', '5', '10', '5', '5', '10', '5', '5', '10', '10', '5']
  },
  {
    competitor: 'JLL',
    marketShare: [
      '20.4%',
      '19.9%',
      '21.1%',
      '20.8%',
      '20.2%',
      '21.6%',
      '18.7%',
      '20.3%',
      '22.4%',
      '21.6%',
      '18.1%'
    ],
    cbreShare: [1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8],
    cbrePyShare: [1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8],
    topGain: { companyName: 'CBRE', percentage: '29%' },
    years: [
      '2008',
      '2009',
      '2010',
      '2011',
      '2012',
      '2013',
      '2014',
      '2015',
      '2016',
      '2017',
      '2018'
    ],
    radius: ['2.5', '5', '2.5', '5', '5', '10', '5', '5', '10', '10', '5']
  },
  {
    competitor: 'BNP Paribas',
    marketShare: [
      '20.4%',
      '19.9%',
      '21.1%',
      '20.8%',
      '20.2%',
      '21.6%',
      '18.7%',
      '20.3%',
      '22.4%',
      '21.6%',
      '18.1%'
    ],
    cbreShare: [1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8],
    cbrePyShare: [1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8],
    topGain: { companyName: 'CBRE', percentage: '29%' },
    years: [
      '2008',
      '2009',
      '2010',
      '2011',
      '2012',
      '2013',
      '2014',
      '2015',
      '2016',
      '2017',
      '2018'
    ],
    radius: ['5', '5', '10', '5', '5', '10', '5', '5', '10', '10', '5']
  },
  {
    competitor: 'Colliers',
    marketShare: [
      '20.4%',
      '19.9%',
      '21.1%',
      '20.8%',
      '20.2%',
      '21.6%',
      '18.7%',
      '20.3%',
      '22.4%',
      '21.6%',
      '18.1%'
    ],
    cbreShare: [1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8],
    cbrePyShare: [1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8],
    topGain: { companyName: 'CBRE', percentage: '29%' },
    years: [
      '2008',
      '2009',
      '2010',
      '2011',
      '2012',
      '2013',
      '2014',
      '2015',
      '2016',
      '2017',
      '2018'
    ],
    radius: ['5', '5', '10', '5', '5', '10', '5', '5', '10', '10', '5']
  },
  {
    competitor: 'Cushman & Wakefield',
    marketShare: [
      '20.4%',
      '19.9%',
      '21.1%',
      '20.8%',
      '20.2%',
      '21.6%',
      '18.7%',
      '20.3%',
      '22.4%',
      '21.6%',
      '18.1%'
    ],
    cbreShare: [1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8],
    cbrePyShare: [1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8],
    topGain: { companyName: 'CBRE', percentage: '29%' },
    years: [
      '2008',
      '2009',
      '2010',
      '2011',
      '2012',
      '2013',
      '2014',
      '2015',
      '2016',
      '2017',
      '2018'
    ],
    radius: ['5', '5', '10', '5', '5', '10', '5', '5', '10', '10', '5']
  },
  {
    competitor: 'Eastdil Secured',
    marketShare: [
      '20.4%',
      '19.9%',
      '21.1%',
      '20.8%',
      '20.2%',
      '21.6%',
      '18.7%',
      '20.3%',
      '22.4%',
      '21.6%',
      '18.1%'
    ],
    cbreShare: [1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8],
    cbrePyShare: [1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8],
    topGain: { companyName: 'CBRE', percentage: '29%' },
    years: [
      '2008',
      '2009',
      '2010',
      '2011',
      '2012',
      '2013',
      '2014',
      '2015',
      '2016',
      '2017',
      '2018'
    ],
    radius: ['5', '5', '10', '5', '5', '10', '5', '5', '10', '10', '5']
  },
  {
    competitor: 'HFF',
    marketShare: [
      '20.4%',
      '19.9%',
      '21.1%',
      '20.8%',
      '20.2%',
      '21.6%',
      '18.7%',
      '20.3%',
      '22.4%',
      '21.6%',
      '18.1%'
    ],
    cbreShare: [1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8],
    cbrePyShare: [1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8],
    topGain: { companyName: 'CBRE', percentage: '29%' },
    years: [
      '2008',
      '2009',
      '2010',
      '2011',
      '2012',
      '2013',
      '2014',
      '2015',
      '2016',
      '2017',
      '2018'
    ],
    radius: ['5', '5', '10', '5', '5', '10', '5', '5', '10', '10', '5']
  },
  {
    competitor: 'Knight Frank',
    marketShare: [
      '20.4%',
      '19.9%',
      '21.1%',
      '20.8%',
      '20.2%',
      '21.6%',
      '18.7%',
      '20.3%',
      '22.4%',
      '21.6%',
      '18.1%'
    ],
    cbreShare: [1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8],
    cbrePyShare: [1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8],
    topGain: { companyName: 'CBRE', percentage: '29%' },
    years: [
      '2008',
      '2009',
      '2010',
      '2011',
      '2012',
      '2013',
      '2014',
      '2015',
      '2016',
      '2017',
      '2018'
    ],
    radius: ['5', '5', '10', '5', '5', '10', '5', '5', '10', '10', '5']
  },
  {
    competitor: 'Marcus & Millichap',
    marketShare: [
      '20.4%',
      '19.9%',
      '21.1%',
      '20.8%',
      '20.2%',
      '21.6%',
      '18.7%',
      '20.3%',
      '22.4%',
      '21.6%',
      '18.1%'
    ],
    cbreShare: [1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8],
    cbrePyShare: [1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8],
    topGain: { companyName: 'CBRE', percentage: '29%' },
    years: [
      '2008',
      '2009',
      '2010',
      '2011',
      '2012',
      '2013',
      '2014',
      '2015',
      '2016',
      '2017',
      '2018'
    ],
    radius: ['5', '5', '10', '5', '5', '10', '5', '5', '10', '10', '5']
  },
  {
    competitor: 'Savills',
    marketShare: [
      '20.4%',
      '19.9%',
      '21.1%',
      '20.8%',
      '20.2%',
      '21.6%',
      '18.7%',
      '20.3%',
      '22.4%',
      '21.6%',
      '18.1%'
    ],
    cbreShare: [1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8],
    cbrePyShare: [1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8],
    topGain: { companyName: 'CBRE', percentage: '29%' },
    years: [
      '2008',
      '2009',
      '2010',
      '2011',
      '2012',
      '2013',
      '2014',
      '2015',
      '2016',
      '2017',
      '2018'
    ],
    radius: ['5', '5', '10', '5', '5', '10', '5', '5', '10', '10', '5']
  }
];
