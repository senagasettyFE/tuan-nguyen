import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SharedMethodsService } from '../../api/shared-methods.service';

import { HeaderIcons } from '../../viewmodels/widget';

@Component({
  selector: 'cbre-mie-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.scss']
})
export class WidgetHeaderComponent implements OnInit {

  @Input() category: string;
  @Input() header: string;
  @Input() subheader: string;
  @Input() widgetId: number;
  @Input() headerIcons: HeaderIcons;
  dashboard: boolean;
  @Output() buttonClickEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedMethodsService: SharedMethodsService
    // private clientService: ClientService
  ) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.routeConfig.path.indexOf('landing') > -1) {
      this.dashboard = true;
    }
    if (!this.header) {
      this.header = this.sharedMethodsService.getWidgetName(this.widgetId);
    }
  }

  buttonClick(button) {
    this.buttonClickEvent.emit(button);
  }

  canDownload() {
    // if (this.clientService.selectedClientEditPermissionId && this.clientService.selectedClientEditPermissionId === 1) {
    //   return true;
    // } else {
    //   return false;
    // }
    return true;
  }

  getCategoryClass() {
    if (this.category === this.sharedMethodsService.ACCOUNT_MANAGEMENT) {
      return 'acct-mgt';
    } else if (this.category === this.sharedMethodsService.CLIENT_SHARE) {
      return 'client-share';
    } else if (this.category === this.sharedMethodsService.OPPORTUNITY_FLOW) {
      return 'opportunity-flow';
    } else if (this.category === this.sharedMethodsService.REVENUE) {
      return 'revenue';
    } else if (this.category === 'IP Market Share') {
      return 'market-share';
    }
  }

  getWidgetClass() {
    if (this.subheader) {
      return 'min-height';
    }
  }

}
