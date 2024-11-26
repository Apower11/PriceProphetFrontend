import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeModule } from './pages/home/home.module';
import { StockDetailsModule } from './pages/stock-details/stock-details.module';
import { CryptocurrencyDetailsModule } from './pages/cryptocurrency-coin-details/cryptocurrency-coin-details.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    HomeModule,
    StockDetailsModule,
    CryptocurrencyDetailsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
