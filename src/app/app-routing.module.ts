import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockDetailsComponent } from './pages/stock-details/stock-details.component';
import { CryptocurrencyCoinDetailsComponent } from './pages/cryptocurrency-coin-details/cryptocurrency-coin-details.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'stock/details/:tickerSymbol',
    component: StockDetailsComponent,
  },
  {
    path: 'cryptocurrency-coin/details/:slug',
    component: CryptocurrencyCoinDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
