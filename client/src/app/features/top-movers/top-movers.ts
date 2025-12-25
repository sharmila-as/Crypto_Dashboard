import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoService } from '../../core/services/crypto.service';
import { TopMoversResponse } from '../../shared/models/crypto.models';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-top-movers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-movers.html',
  styleUrls: ['./top-movers.css']
})
export class TopMoversComponent implements OnInit {
  data?: TopMoversResponse;
  loading = true;
  error?: string;

  constructor(
  private cryptoService: CryptoService,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
    console.log('TopMoversComponent initialized');

    this.cryptoService
      .getTopMovers()
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: res => {
          this.data = res;
          this.cdr.detectChanges();
        },
        error: err => {
          console.error(err);
          this.error = 'Failed to load top movers';
          this.cdr.detectChanges();
        }
      });
  }
}
