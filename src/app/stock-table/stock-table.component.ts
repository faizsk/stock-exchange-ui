import { Response } from '@angular/http';
import { StockTableService } from './stock-table.service';
import { Component, OnInit } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent implements OnInit {

  constructor(private service: StockTableService) {
  }

  private updateEnabled: boolean;
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};
  private stocks: any[];

  private selectedStock: { stockCode: string, stockName: string, stockValueId: string, dateTime: string, stockPrice: string } = {
    stockCode: "123",
    stockName: "123",
    stockValueId: "234",
    dateTime: "43",
    stockPrice: "23"
  }

  ngOnInit() {
    this.service.getStocks()
      .subscribe(response => {
        var temp = response.json()
        temp.map((element) => {
          element.stockValue.sort(function (a, b) {
            return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
          });
        });
        this.stocks = temp;
      });
  }

  addFieldValue(stock) {
    this.service.createStock(stock);
  }

  editStockValue(updatestockCode, updatestockName, updatestockValueId, updatedateTime, updatestockPrice) {
    this.service.updateStock(updatestockCode, updatestockName, updatestockValueId, updatedateTime, updatestockPrice).subscribe();
    location.reload();
  }

  loadDetails(newStockCode, newStockName, stockValueId, newDateTime, newStockPrice) {
    this.updateEnabled = true;
    this.selectedStock = {
      stockCode: newStockCode,
      stockName: newStockName,
      stockValueId: stockValueId,
      dateTime: newDateTime,
      stockPrice: newStockPrice
    };
  }

  deleteFieldValue(stockCode, _id) {
    this.service.deleteStock(stockCode, _id)
      .subscribe(
        response => {
          this.stocks.forEach((item, index) => {
            if (item.stockCode == stockCode) {
              index = item.stockValue.findIndex(function (x) {
                return x._id.valueOf() === _id;
              });
              item.stockValue.splice(index, 1);
            }
          });
        },
        (error: Response) => {
          if (error.status === 404)
            alert(error.statusText);
          else {
            alert('Unexpected error')
            console.log(error);
          }
        }
      );
  }

}
