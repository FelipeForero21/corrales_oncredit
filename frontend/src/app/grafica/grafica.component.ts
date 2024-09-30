import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Chart, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend, BarController, LineElement, PointElement, LineController, ArcElement, PieController } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css'],
})
export class GraficaComponent implements OnInit, OnChanges {
  @Input() corrales: any[] = [];
  public chart: any;
  public tipoGrafica: 'bar' | 'line' | 'pie' = 'bar'; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    Chart.register(
      BarController,
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend,
      LineController,
      LineElement,
      PointElement,
      ArcElement,
      PieController
    );
    this.obtenerCorrales();
  }

  ngOnChanges(): void {
    if (this.corrales) {
      this.crearGrafica();
    }
  }

  obtenerCorrales() {
    this.http.get<any[]>('http://localhost:3000/corrales').subscribe((data) => {
      const corralesConAnimales = data.map(corral => ({
        ...corral,
        cantidadAnimales: 0,
      }));

      const observables = corralesConAnimales.map(corral => 
        this.http.get<any[]>(`http://localhost:3000/corrales/${corral.id}/animales`).pipe(
          map((animales: any[]) => ({
            ...corral,
            cantidadAnimales: animales.length,
          }))
        )
      );

      forkJoin(observables).subscribe((result) => {
        this.corrales = result;
        this.crearGrafica();
      });
    });
  }

  crearGrafica() {
    const labels = this.corrales.map(corral => corral.nombre);
    const data = this.tipoGrafica === 'pie'
      ? this.corrales.map((_, index) => index + 1) // Para el tipo pastel, usar valores de 1 en adelante
      : this.corrales.map(corral => corral.cantidadAnimales); // Para barras y líneas, usar cantidad de animales
  
    if (this.chart) {
      this.chart.destroy();
    }
  
    this.chart = new Chart('canvas', {
      type: this.tipoGrafica,
      data: {
        labels: labels,
        datasets: [{
          label: 'Cantidad de Animales',
          data: data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverOffset: 4,
        }],
      },
      options: {
        scales: this.tipoGrafica === 'bar' || this.tipoGrafica === 'line' ? {
          y: {
            beginAtZero: true,
          },
        } : {},
      },
    });
  }

  cambiarGrafica(tipo: 'bar' | 'line' | 'pie') {
    this.tipoGrafica = tipo; 
    this.crearGrafica(); 
  }
}
