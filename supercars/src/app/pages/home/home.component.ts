import { Component } from '@angular/core';
import { Vehicle } from '../../interfaces/vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { DivisaPipe } from '../../pipes/divisa.pipe';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FiltrarPipe } from '../../pipes/filtrar.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DivisaPipe, RouterModule, FormsModule, FiltrarPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  vehicles: Vehicle[] =[]
 filtro: string = ""

  constructor(private vehicleService: VehicleService){
    vehicleService.getAll().subscribe({
      next: (response)=>{
        this.vehicles = response as Vehicle[]
      },
      error: ()=>{}
    })
  }
  searchText(){}
}
