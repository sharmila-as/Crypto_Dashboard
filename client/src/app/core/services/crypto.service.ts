import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarketChartResponse, TopMoversResponse } from '../../shared/models/crypto.models';

@Injectable({ providedIn: 'root' })
export class CryptoService {
  private API = '/api'; 

  constructor(private http: HttpClient) {}

  getMarketChart(coinId: string, days: number): Observable<MarketChartResponse> {
    return this.http.get<MarketChartResponse>(
      `${this.API}/market-chart?coinId=${coinId}&days=${days}`
    );
  }

  getTopMovers(): Observable<TopMoversResponse> {
    return this.http.get<TopMoversResponse>(`${this.API}/top-movers`);
  }

  // Bonus: Add prices endpoint
  getPrices(ids: string = 'bitcoin,ethereum,solana'): Observable<any> {
    return this.http.get(`${this.API}/prices?ids=${ids}`);
  }
}
