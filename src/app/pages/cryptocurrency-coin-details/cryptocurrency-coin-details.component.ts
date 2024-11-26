import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cryptocurrency-coin-details',
  templateUrl: './cryptocurrency-coin-details.component.html',
  styleUrls: ['./cryptocurrency-coin-details.component.scss']
})
export class CryptocurrencyCoinDetailsComponent {
    slug = ""
    cryptocurrencyCoinName = ""
    currentPrice = 0
    pricePercentageChange = ""
    priceAmountChange = ""
    tickerSymbol = ""
    marketCap = 0
    fullyDilutedMarketCap = 0
    twentyFourHourTradingVolume = 0
    circulatingSupply = 0
    maxSupply = 0
    totalSupply = 0
    convertToTwoDecimalPlaces = (numberToConvert: number) => {
        return Math.round((numberToConvert + Number.EPSILON) * 100) / 100
    }

    private routeSub: Subscription | undefined;
    constructor(private route: ActivatedRoute, private http: HttpClient) { }
    ngOnInit(): void {
      this.routeSub = this.route.params.subscribe(params => {
        this.slug = params['slug'];
      });
      this.http.get(
        `http://localhost:8080?slug=${this.slug}`)
        .subscribe(data => {
          let firstKey = Object.keys(JSON.parse(JSON.stringify(data)).data)[0]
          let returnedData = JSON.parse(JSON.stringify(data)).data[firstKey]
          console.log(returnedData);
          this.tickerSymbol = returnedData.symbol;
          this.cryptocurrencyCoinName = returnedData.name;
          this.currentPrice = this.convertToTwoDecimalPlaces(returnedData.quote.USD.price)
          let pricePercentageChange = this.convertToTwoDecimalPlaces(returnedData.quote.USD.percent_change_24h);
          if(pricePercentageChange > 0) {
            this.pricePercentageChange = "+" + pricePercentageChange;
          } else {
            this.pricePercentageChange = pricePercentageChange.toString()
          }
          this.marketCap = Math.round(returnedData.quote.USD.market_cap)
          this.fullyDilutedMarketCap = Math.round(returnedData.quote.USD.fully_diluted_market_cap)
          this.twentyFourHourTradingVolume = Math.round(returnedData.quote.USD.volume_24h)
          this.circulatingSupply = Math.round(returnedData.circulating_supply);
          this.maxSupply = Math.round(returnedData.max_supply);
          this.totalSupply = Math.round(returnedData.total_supply);
        });
    }
}