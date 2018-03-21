import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { StockTableComponent } from './stock-table/stock-table.component';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StockTableService } from './stock-table/stock-table.service';

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    StockTableComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    NgbModule.forRoot(),
    HttpModule
  ],
  providers: [
    StockTableService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
