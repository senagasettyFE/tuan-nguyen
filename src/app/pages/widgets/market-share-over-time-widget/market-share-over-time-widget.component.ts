import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { HeaderIcons } from '../../../viewmodels/widget';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { GraphQLService } from '../../../api/graphql.service';
import { MarketShareFilters } from '../../../viewmodels/filters';

@Component({
  selector: 'cbre-mie-market-share-over-time-widget',
  templateUrl: './market-share-over-time-widget.component.html',
  styleUrls: ['./market-share-over-time-widget.component.scss']
})
export class MarketShareOverTimeWidgetComponent implements OnInit, OnChanges, OnDestroy {

  mgtCbresf: number;
  mgtCbresfVal: number;
  mgtCbresfValues = [];
  mgtClientsf: number;
  mgtClientsfVal: number;
  mgtClientshare: number;
  leaseCbresf: number;
  leaseCbresfVal: number;
  leaseCbresfValues = [];
  leaseClientsf: number;
  leaseClientsfVal: number;
  leaseClientshare: number;
  mgtLeaseCbresf: number;
  mgtLeaseCbresfVal: number;
  mgtLeaseCbresfValues = [];
  mgtLeaseClientsf: number;
  widgetBody = [];
  widgetFooter = [];
  propertyTypes = 'all';
  // propertyTypesArray = ['all'];
  source: string;
  clientShareLastUpdate: string;
  dashboard: boolean;
  categoryTitle: string;
  title: string;
  headerIcons: HeaderIcons = {                                // header Icons Object to define what icons to display
    edit: false,                                                  // initially everyfield is fasle
    filter: true,
    customize: false,
    download: true
  };
  chart: any;
  dataReady = false;
  errorOccured = false;
  @Input() clientId: number;
  @Input() filters: MarketShareFilters = { viewBy: 'Stephen' };
  @Output() filterClick: EventEmitter<any> = new EventEmitter<any>();
  private subscription: Subscription;

  constructor(
    // private dashBoardService: DashboardService,
    // private sharedMethodsService: SharedMethodsService,
    private graphQlService: GraphQLService,
    private router: Router,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    // this.categoryTitle = this.sharedMethodsService.CLIENT_SHARE;
    // this.title = this.sharedMethodsService.getWidgetName(7);
    this.categoryTitle = 'IP Market Share';
    this.title = 'Market Share Over Time';
    if (this.activatedRoute.snapshot.routeConfig.path.indexOf('landing') > -1) {
      this.dashboard = true;
    }
  }

  ngOnChanges(changes) {
    if (this.clientId) {
      if (!this.filters) {
        // this.filters = { propertyTypes: ['all'] };
        this.marketPositionsOverTimeData();
      } else {
        // this.propertyTypes = this.filters.propertyTypes.join(', ');
        // this.getWidgetData();
      }
    }
  }
  marketPositionsOverTimeData() {
    this.subscription = this.graphQlService.getMarketPositionsOverTime()
      .subscribe(res => {
        // Get Client share data
        this.widgetBody = res['body'];
        this.widgetFooter = res['footer'];
        // this.getWidgetData();
        this.dataReady = true;
      }, error => {
        setTimeout(() => {
          console.error(error);
          this.errorOccured = true;
          this.headerIcons.download = false;
          this.headerIcons.filter = false;
        }, 300);
      });
  }
  // getWidgetData() {
  //   // Widget Body
  //   if (this.widgetBody.length > 0) { // Check if selected client returns any data
  //     this.mgtCbresfVal = 0;
  //     this.mgtClientsfVal = 0;
  //     this.leaseCbresfVal = 0;
  //     this.leaseClientsfVal = 0;
  //     this.mgtLeaseCbresfVal = 0;
  //     this.mgtCbresfValues = [];
  //     this.leaseCbresfValues = [];
  //     this.mgtLeaseCbresfValues = [];
  //   } else { // Return property as undefined to the view if data array is empty
  //     this.mgtCbresf = null;
  //     this.leaseCbresf = null;
  //     this.mgtLeaseCbresf = null;
  //   }
  //   if (this.propertyTypes === 'all') { // Check if filter need to be applied
  //     this.mgtCbresfValues = this.widgetBody.map(p => p['cbreManagedArea']);
  //     if (this.mgtCbresfValues.length > 0) {
  //       this.mgtCbresfVal = this.mgtCbresfValues.reduce((a, b) => a + b);
  //     }
  //     const mgtClientsfValues = this.widgetBody.map(p => p['totalBuildingArea']);
  //     if (mgtClientsfValues.length > 0) {
  //       this.mgtClientsfVal = mgtClientsfValues.reduce((a, b) => a + b);
  //     }
  //     this.leaseCbresfValues = this.widgetBody.map(p => p['cbreLeasingArea']);
  //     if (this.leaseCbresfValues.length > 0) {
  //       this.leaseCbresfVal = this.leaseCbresfValues.reduce((a, b) => a + b);
  //     }
  //     const leaseClientsfValues = this.widgetBody.map(p => p['totalBuildingArea']);
  //     if (leaseClientsfValues.length > 0) {
  //       this.leaseClientsfVal = leaseClientsfValues.reduce((a, b) => a + b);
  //     }
  //     for (let j = 0; j < this.mgtCbresfValues.length; j++) {
  //       if (this.mgtCbresfValues[j] > 0 && this.leaseCbresfValues[j] > 0) {
  //         const valueDiff = this.leaseCbresfValues[j] - this.mgtCbresfValues[j];
  //         if (valueDiff >= 0) {
  //           this.mgtLeaseCbresfValues.push(this.mgtCbresfValues[j]);
  //         } else {
  //           this.mgtLeaseCbresfValues.push(this.leaseCbresfValues[j]);
  //         }
  //       }
  //     }
  //     if (this.mgtLeaseCbresfValues.length > 0) {
  //       this.mgtLeaseCbresfVal = this.mgtLeaseCbresfValues.reduce((a, b) => a + b);
  //     }
  //   } else {
  //     for (let i = 0; i < this.filters.propertyTypes.length; i++) {
  //       const selectedPropTypes = this.filters.propertyTypes[i].charAt(0).toUpperCase() + this.filters.propertyTypes[i].slice(1);
  //       this.mgtCbresfValues = this.widgetBody
  //         .filter(p => p['propertyType'] === `${selectedPropTypes}`)
  //         .map(p => p['cbreManagedArea']);
  //       if (this.mgtCbresfValues.length > 0) {
  //         this.mgtCbresfVal += this.mgtCbresfValues.reduce((a, b) => a + b);
  //       }
  //       const mgtClientsfValues = this.widgetBody
  //         .filter(p => p['propertyType'] === `${selectedPropTypes}`)
  //         .map(p => p['totalBuildingArea']);
  //       if (mgtClientsfValues.length > 0) {
  //         this.mgtClientsfVal += mgtClientsfValues.reduce((a, b) => a + b);
  //       }
  //       this.leaseCbresfValues = this.widgetBody
  //         .filter(p => p['propertyType'] === `${selectedPropTypes}`)
  //         .map(p => p['cbreLeasingArea']);
  //       if (this.leaseCbresfValues.length > 0) {
  //         this.leaseCbresfVal += this.leaseCbresfValues.reduce((a, b) => a + b);
  //       }
  //       const leaseClientsfValues = this.widgetBody
  //         .filter(p => p['propertyType'] === `${selectedPropTypes}`)
  //         .map(p => p['totalBuildingArea']);
  //       if (leaseClientsfValues.length > 0) {
  //         this.leaseClientsfVal += leaseClientsfValues.reduce((a, b) => a + b);
  //       }
  //       // Manangement & Lease CBRE SF
  //       this.mgtLeaseCbresfValues = [];
  //       for (let j = 0; j < this.mgtCbresfValues.length; j++) {
  //         if (this.mgtCbresfValues[j] > 0 && this.leaseCbresfValues[j] > 0) {
  //           const valueDiff = this.leaseCbresfValues[j] - this.mgtCbresfValues[j];
  //           if (valueDiff >= 0) {
  //             this.mgtLeaseCbresfValues.push(this.mgtCbresfValues[j]);
  //           } else {
  //             this.mgtLeaseCbresfValues.push(this.leaseCbresfValues[j]);
  //           }
  //         }
  //       }
  //       if (this.mgtLeaseCbresfValues.length > 0) {
  //         this.mgtLeaseCbresfVal += this.mgtLeaseCbresfValues.reduce((a, b) => a + b);
  //       }
  //     }
  //   }
  //   if (this.mgtCbresfVal > 0) {
  //     this.mgtCbresf = this.mgtCbresfVal;
  //   } else {
  //     this.mgtCbresf = 0;
  //   }
  //   if (this.mgtClientsfVal > 0) {
  //     this.mgtClientsf = this.mgtClientsfVal;
  //   } else {
  //     this.mgtClientsf = 0;
  //   }
  //   if (this.mgtCbresfVal > 0 && this.mgtClientsfVal > 0) {
  //     this.mgtClientshare = this.mgtCbresfVal / this.mgtClientsfVal;
  //   } else {
  //     this.mgtClientshare = 0;
  //   }
  //   if (this.leaseCbresfVal > 0) {
  //     this.leaseCbresf = this.leaseCbresfVal;
  //   } else {
  //     this.leaseCbresf = 0;
  //   }
  //   if (this.leaseClientsfVal > 0) {
  //     this.leaseClientsf = this.leaseClientsfVal;
  //   } else {
  //     this.leaseClientsf = 0;
  //   }
  //   if (this.leaseCbresfVal > 0 && this.leaseClientsfVal > 0) {
  //     this.leaseClientshare = this.leaseCbresfVal / this.leaseClientsfVal;
  //   } else {
  //     this.leaseClientshare = 0;
  //   }
  //   if (this.mgtLeaseCbresfVal > 0) {
  //     this.mgtLeaseCbresf = this.mgtLeaseCbresfVal;
  //   } else {
  //     this.mgtLeaseCbresf = 0;
  //   }
  //   this.mgtLeaseClientsf = this.mgtClientsf;
  //   // Widget Footer
  //   this.source = this.widgetFooter['source'];
  //   this.clientShareLastUpdate = this.widgetFooter['lastUpdatedDate'];
  // }
  buttonClick(buttonName: string): void {
    if (buttonName === 'filter') {
      this.openFilterDialog();
    } else if (buttonName === 'details') {
      // this.details();
      this.router.navigate(['table']);
    }
  }
  // details button click
  details() {
    this.router.navigate([`clientshare/${this.activatedRoute.snapshot.params.parentClientId}`], { queryParams: this.filters });
  }
  // Open Filter Dialog
  openFilterDialog(): void {
    this.filterClick.emit(this.filters);
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // tslint:disable-next-line:member-ordering
  public bubbleChartData = {
    chartOptions: {
      label: 'test values',
      responsive: true,
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: true
        }],
      }
    },
    chartLabels: ['CBRE', 'JLL', 'BNP Paribas', 'Colliers', 'Cushman & Wakefield',
      'Eastdil Secured', 'HFF', 'Knight frank', 'Marcus & Millichap', 'Savills', 'Other'],
    chartType: 'bubble',
    /** Each points represented by an object containing (x:number,y:number,r:radius in px)*/
    chartData: [{
      x: 100,
      y: 0,
      r: 10
    }, {
      x: 60,
      y: 30,
      r: 20
    }, {
      x: 40,
      y: 60,
      r: 25
    }, {
      x: 80,
      y: 80,
      r: 50
    }, {
      x: 20,
      y: 30,
      r: 25
    }, {
      x: 0,
      y: 100,
      r: 5
    }, {
      x: 50,
      y: 30,
      r: 20
    }, {
      x: 40,
      y: 30,
      r: 20
    }, {
      x: 30,
      y: 30,
      r: 20
    }, {
      x: 70,
      y: 30,
      r: 20
    }, {
      x: 90,
      y: 30,
      r: 20
    }],
    chartColors: [{ backgroundColor: 'rgba(199, 199, 199, 0.5)' }],
  };

}
