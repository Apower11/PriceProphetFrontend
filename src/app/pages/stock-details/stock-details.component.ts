import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent {
    tickerSymbol = ""
    stockName = ""
    currentPrice = 0
    marketCap = ""
    high = 0
    low = 0
    openPrice = 0
    previousClosePrice = 0
    fiftyTwoWeekHigh = 0
    fiftyTwoWeekLow = 0
    pricePercentageChange = ""
    priceAmountChange = ""
    earningsPerShare = 0
    priceToEarningsRatio = 0
    convertToTwoDecimalPlaces = (numberToConvert: number) => {
        return Math.round((numberToConvert + Number.EPSILON) * 100) / 100
    }

    private routeSub: Subscription | undefined;
    constructor(private route: ActivatedRoute, private http: HttpClient) { }
    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe(params => {
            this.tickerSymbol = params['tickerSymbol'];
          });
          this.http.get(
            `https://finnhub.io/api/v1/stock/profile2?symbol=${this.tickerSymbol}&token=${environment.finnhubApiKey}`)
            .subscribe(data => {
              this.stockName = JSON.parse(JSON.stringify(data)).name;
              let marketCapitalization = JSON.parse(JSON.stringify(data)).marketCapitalization * 1000000
              let postfixes = ['', 'k', 'M', 'B', 'T']
                let count = 0
                while (marketCapitalization >= 1000 && count < postfixes.length) {
                    marketCapitalization /= 1000
                    count++
                } 
                this.marketCap = Math.round((marketCapitalization + Number.EPSILON) * 100) / 100 + postfixes[count];
            });
            this.http.get(
                `https://finnhub.io/api/v1/quote?symbol=${this.tickerSymbol}&token=${environment.finnhubApiKey}`)
                .subscribe(data => {
                  let price = JSON.parse(JSON.stringify(data)).c;
                  let high = JSON.parse(JSON.stringify(data)).h;
                  let low = JSON.parse(JSON.stringify(data)).l;
                  let returnedData = JSON.parse(JSON.stringify(data))
                  this.currentPrice = Math.round((price + Number.EPSILON) * 100) / 100;
                  this.high = Math.round((high + Number.EPSILON) * 100) / 100;
                  this.low = Math.round((low + Number.EPSILON) * 100) / 100;
                  this.openPrice = Math.round((returnedData.o + Number.EPSILON) * 100) / 100;
                  this.previousClosePrice = Math.round((returnedData.pc + Number.EPSILON) * 100) / 100;
                  let pricePercentageChange = Math.round((returnedData.dp + Number.EPSILON) * 100) / 100;
                  let priceAmountChange = Math.round((returnedData.d + Number.EPSILON) * 100) / 100;
                  if(pricePercentageChange < 0){
                    this.pricePercentageChange = pricePercentageChange.toString();
                  } else if(pricePercentageChange > 0) {
                    this.pricePercentageChange = "+" + pricePercentageChange.toString();
                  }
                  if(priceAmountChange < 0){
                    this.priceAmountChange = priceAmountChange.toString();
                  } else if(priceAmountChange > 0) {
                    this.priceAmountChange = "+" + priceAmountChange.toString();
                  }
                });
                this.http.get(
                    `https://finnhub.io/api/v1/stock/metric?symbol=${this.tickerSymbol}&metric=all&token=${environment.finnhubApiKey}`)
                    .subscribe(data => {
                        let returnedData = JSON.parse(JSON.stringify(data)); 
                        this.fiftyTwoWeekLow = Math.round((returnedData.metric["52WeekLow"] + Number.EPSILON) * 100) / 100;
                        this.fiftyTwoWeekHigh = Math.round((returnedData.metric["52WeekHigh"] + Number.EPSILON) * 100) / 100;
                        this.earningsPerShare = Math.round((returnedData.metric["epsExclExtraItemsTTM"] + Number.EPSILON) * 100) / 100;
                    });
    }
}