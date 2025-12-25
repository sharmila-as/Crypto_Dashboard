import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgChartsModule, BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

import { CryptoService } from '../../core/services/crypto.service';
import { MarketChartResponse } from '../../shared/models/crypto.models';

@Component({
  selector: 'app-market-chart',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  templateUrl: './market-chart.html',
  styleUrls: ['./market-chart.css']
})
export class MarketChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  
  
  coinId: string = 'bitcoin';
  days: number = 30;
  loading = false;

  coins = [
    { id: 'bitcoin', label: 'Bitcoin (BTC)' },
    { id: 'ethereum', label: 'Ethereum (ETH)' },
    { id: 'dogecoin', label: 'Dogecoin (DOGE)' }
  ];

  timeframes = [
    { label: '7D', value: 7 },
    { label: '14D', value: 14 },
    { label: '30D', value: 30 }
  ];

  
  // Chart Config
  
  chartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false, // ✅ required
    interaction: {
      mode: 'index',
      intersect: false
    },
    scales: {
      yPrice: {
        type: 'linear',
        position: 'left',
        ticks: {
          maxTicksLimit: 6,
          callback: v => `$${Number(v).toLocaleString()}`
        }
      },
      yVolume: {
        type: 'linear',
        position: 'right',
        grid: { drawOnChartArea: false },
        ticks: {
          maxTicksLimit: 5
        }
      },
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 8
        }
      }
    }
  };


  constructor(
    private cryptoService: CryptoService,
    private cdr: ChangeDetectorRef
  ) {}

  
  // Lifecycle
  
  ngOnInit(): void {
    this.loadData();
  }

  
  // Data Loader
  
  loadData(): void {
    this.loading = true;

    this.cryptoService
      .getMarketChart(this.coinId, this.days)
      .subscribe({
        next: (res: MarketChartResponse) => {
          const labels = res.prices.map(p =>
            new Date(p[0]).toLocaleDateString()
          );

          const prices = res.prices.map(p => p[1]);
          const volumes = res.total_volumes.map(v => v[1]);

          this.chartData = {
            labels,
            datasets: [
              {
                type: 'line',
                label: 'Price',
                data: prices,
                yAxisID: 'yPrice',
                borderColor: '#6d3b7c',
                backgroundColor: 'rgba(109,59,124,0.15)',
                tension: 0.35,
                fill: true,
                pointRadius: 0
              } as any,
              {
                type: 'bar',
                label: 'Volume',
                data: volumes,
                yAxisID: 'yVolume',
                backgroundColor: 'rgba(148,163,184,0.6)'
              } as any
            ]
          };

          
          this.chart?.update();
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  
  // UI Handlers
  
  onCoinChange(): void {
    this.loadData();
  }

  onTimeframeChange(days: number): void {
    this.days = days;
    this.loadData();
  }
}
