import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { GraphQLService } from '../../api/graphql.service';
import { AdvisoryService } from '../../api/advisory.service';
@Component({
  selector: 'cbre-mie-advisory-page',
  templateUrl: './advisory-page.component.html',
  styleUrls: ['./advisory-page.component.scss']
})
export class AdvisoryPageComponent implements OnInit, OnDestroy {
  doughnutchartvm;
  bubbleChartVM;
  gqlSubscription$: Subscription;
  marketPosition;
  renderedClientId: number;
  constructor(private advisoryService: AdvisoryService,
    private graphQLService: GraphQLService) { }

  ngOnInit() {
    this.getMarketPosition();
    this.doughnutchartvm = this.advisoryService.getDoughnutChartData();
    this.bubbleChartVM  = this.advisoryService.getBubbleChartData();
    this.renderedClientId = 1;
  }
  getMarketPosition() {
    if (this.gqlSubscription$) {
      this.gqlSubscription$.unsubscribe();
    }
    this.gqlSubscription$ = this.graphQLService
      .getMarketPositions()
      .subscribe(response => {
        if (response && response.data && response.data['MarketPositions']
          && response.data['MarketPositions'].entities) {
          this.marketPosition = response;
          console.log(this.marketPosition.data.MarketPositions.entities);
        }
      });
  }
  ngOnDestroy(): void {
    if (this.gqlSubscription$) {
      this.gqlSubscription$.unsubscribe();
    }
  }
}
