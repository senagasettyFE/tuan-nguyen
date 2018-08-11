import { Component, OnInit, Input } from '@angular/core';
import 'chart.piecelabel.js';
import 'chartjs-plugin-piechart-outlabels';
import { HeaderIcons } from '../../../viewmodels/widget';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { GraphQLService } from '../../../api/graphql.service';
import { MarketShareFilters } from '../../../viewmodels/filters';

@Component({
  selector: 'cbre-mie-lib-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
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
  @Input() filters: MarketShareFilters = { viewBy: 'CBRE' };
  // @Output() filterClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() chartvm;

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
    this.title = 'Market Share';
    if (this.activatedRoute.snapshot.routeConfig.path.indexOf('landing') > -1) {
      this.dashboard = true;
    }
  }

}
