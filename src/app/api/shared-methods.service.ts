import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedMethodsService {

  OPPORTUNITY_FLOW = 'opportunity flow';
  REVENUE = 'revenue';
  CLIENT_SHARE = 'cbre client share';
  ACCOUNT_MANAGEMENT = 'account management';

  constructor() { }

  getWidgetName(widgetId: number): string {
    switch (widgetId) {
      case 1:
        return 'AVERAGE REVENUE';
      case 2:
        return 'HEAD COUNT VS REVENUE';
      case 3:
        return 'AGGREGATE MARKET SHARE';
      case 4:
        return 'MARKET SHARE OVER TIME';
      case 5:
        return 'COMPARISON (IP SALES)';
      case 6:
        return 'COMPARISON - BENCHMARK';
      case 7:
        return 'IP SEGMENT BREAKDOWN';
      case 8:
        return 'IP SEGMENT TRANSACTION VOLUME';
      case 9:
        return 'MARKET SHARE - CBRE VS. COMPETITOR';
      case 10:
        return 'CBRE HISTORICAL GROWTH AGAINST BENCHMARK';
      default:
        return '';
    }
  }
}
