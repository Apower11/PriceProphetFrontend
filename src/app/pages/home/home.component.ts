import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface Security {
  id: number;
  name: string;
  tickerSymbol: string;
  currentPrice: number;
}

let cryptoCoinsTracked: Security[] = [
  {
    id: 1,
    name: "Bitcoin",
    tickerSymbol: "BTC",
    currentPrice: 0
  },
  {
    id: 2,
    name: "Ethereum",
    tickerSymbol: "ETH",
    currentPrice: 0
  },
  {
    id: 3,
    name: "Tether",
    tickerSymbol: "USDT",
    currentPrice: 0
  },
  {
    id: 4,
    name: "Solana",
    tickerSymbol: "SOL",
    currentPrice: 0
  }
]

let stocksTracked: Security[] = [
  {
    id: 1,
    name: "Apple",
    tickerSymbol: "AAPL",
    currentPrice: 0
  },
  {
    id: 2,
    name: "Microsoft",
    tickerSymbol: "MSFT",
    currentPrice: 0
  },
  {
    id: 3,
    name: "Nvidia",
    tickerSymbol: "NVDA",
    currentPrice: 0
  },
  {
    id: 4,
    name: "Amazon",
    tickerSymbol: "AMZN",
    currentPrice: 0
  },
]

let commoditiesTracked: Security[] = [
  {
    id: 1,
    name: "Gold",
    tickerSymbol: "gold",
    currentPrice: 0
  },
  {
    id: 2,
    name: "Platinum",
    tickerSymbol: "platinum",
    currentPrice: 0
  },
  {
    id: 3,
    name: "Palladium",
    tickerSymbol: "palladium",
    currentPrice: 0
  },
  {
    id: 4,
    name: "Aluminum",
    tickerSymbol: "aluminum",
    currentPrice: 0
  },
]

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'frontend';
  stocks = stocksTracked;
  cryptoCoins = cryptoCoinsTracked;
  commodities = commoditiesTracked;
  constructor(private http: HttpClient) {
 
  }
  ngOnInit(): void {
    for(let i = 0; i < this.stocks.length; i++){
      this.http.get(
        `https://finnhub.io/api/v1/quote?symbol=${this.stocks[i].tickerSymbol}&token=${environment.finnhubApiKey}`)
        .subscribe(data => {
          let price = JSON.parse(JSON.stringify(data)).c;
          this.stocks[i].currentPrice = Math.round((price + Number.EPSILON) * 100) / 100;
        });
    }
    for(let i = 0; i < this.cryptoCoins.length; i++){
      this.http.get(
        `https://rest.coinapi.io/v1/exchangerate/${this.cryptoCoins[i].tickerSymbol}/USD`, {
          headers: {
            'X-CoinAPI-Key': environment.coinApiApiKey
          }
        })
        .subscribe(data => {
          let price = JSON.parse(JSON.stringify(data)).rate;
          this.cryptoCoins[i].currentPrice = Math.round((price + Number.EPSILON) * 100) / 100;
        });
    }
    for(let i = 0; i < this.commodities.length; i++){
      this.http.get(
        `https://api.api-ninjas.com/v1/commodityprice?name=${this.commodities[i].tickerSymbol}`, {
          headers: {
            'X-Api-Key': environment.commodityApiKey
          }
        })
        .subscribe(data => {
          let price = JSON.parse(JSON.stringify(data)).price;
          this.commodities[i].currentPrice = Math.round((price + Number.EPSILON) * 100) / 100;
        });
    }
  }
}
