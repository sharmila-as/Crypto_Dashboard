import { Component } from '@angular/core';
import { TopMoversComponent } from './features/top-movers/top-movers';
import { MarketChartComponent } from './features/market-chart/market-chart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopMoversComponent, MarketChartComponent],
  template: `
    <header class="dashboard-header">
      <h1 class="dashboard-title">Crypto Dashboard</h1>
      <p class="dashboard-subtitle">
        Real-time cryptocurrency analysis and insights
      </p>
    </header>

    <app-market-chart></app-market-chart>
    <app-top-movers></app-top-movers>
  `,
  styles: [`
    .dashboard-header {
      margin-bottom: 1.75rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid rgba(124, 58, 237, 0.25);
    }

    .dashboard-title {
      font-size: 2.25rem;
      font-weight: 800;
      color: #111827;
      letter-spacing: -0.02em;
      margin: 0;
      text-align: center;
    }

    .dashboard-subtitle {
      margin-top: 0.25rem;
      font-size: 1rem;
      color: #6b7280;
      text-align: center;
    }

    @media (max-width: 768px) {
      .dashboard-title {
        font-size: 1.75rem;
      }
    }
  `]
})
export class AppComponent {}
