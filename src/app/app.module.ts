import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

// Material Modules
import {
  MatAutocompleteModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatRadioModule,
  MatTabsModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatOptionModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTableModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatSlideToggleModule
} from '@angular/material';

import { CdkTableModule } from '@angular/cdk/table';

// Third Party Modules
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgUploaderModule } from 'ngx-uploader';
import { ApolloModule, Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ChartsModule } from 'ng2-charts/ng2-charts';
// routing modules
import { AdvisoryRoutingModule } from './routing/advisory-routing.module';
import { AppRoutingModule } from './routing/app-routing.module';
// services

// components
import { AppComponent } from './app.component';
import { AdvisoryPageComponent } from './pages/advisory-page/advisory-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { ChartWidgetComponent } from './pages/widgets/chart-widget/chart-widget.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UnauthorizedPageComponent } from './pages/unauthorized-page/unauthorized-page.component';
import { AuthCallbackPageComponent } from './pages/auth-callback-page/auth-callback-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';


import { environment } from '../environments/environment';
import { MarketShareOverTimeWidgetComponent } from './pages/widgets/market-share-over-time-widget/market-share-over-time-widget.component';
import { BarChartComponent } from './pages/widgets/bar-chart/bar-chart.component'
import { WidgetHeaderComponent } from './components/widget-header/widget-header.component';
import { ErrorComponent } from './components/error/error.component';
import { SourceUpdatedComponent } from './components/source-updated/source-updated.component';
import { BubbleChartComponent } from './components/bubble-chart/bubble-chart.component';
import { FileDownloadComponent } from './components/file-download/file-download.component';
import { WidgetComponent } from './pages/widget/widget.component';
import { FilterContainerComponent } from './components/filter-container/filter-container.component';

@NgModule({
  declarations: [
    AppComponent,
    AdvisoryPageComponent,
    HomePageComponent,
    UnauthorizedPageComponent,
    AuthCallbackPageComponent,
    PageNotFoundComponent,
    FooterComponent,
    HeaderComponent,
    NavBarComponent,
    ChartWidgetComponent,
    NoDataComponent,
    MarketShareOverTimeWidgetComponent,
    BarChartComponent,
    WidgetHeaderComponent,
    ErrorComponent,
    SourceUpdatedComponent,
    BubbleChartComponent,
    FileDownloadComponent,
    WidgetComponent,
    FilterContainerComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatTabsModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    TooltipModule,
    CdkTableModule,
    FlexLayoutModule,
    NgUploaderModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    AdvisoryRoutingModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
