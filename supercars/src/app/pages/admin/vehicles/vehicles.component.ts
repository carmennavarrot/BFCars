import { Component } from '@angular/core';
import { Vehicle } from '../../../interfaces/vehicle';
import { VehicleService } from '../../../services/vehicle.service';
import { DivisaPipe } from '../../../pipes/divisa.pipe';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FiltrarPipe } from '../../../pipes/filtrar.pipe';
import { CanCancelPipe } from "../../../pipes/can-cancel.pipe";
import Swal from 'sweetalert2';
import { BookingService } from '../../../services/booking.service';


@Component({
    selector: 'app-vehicles',
    standalone: true,
    templateUrl: './vehicles.component.html',
    styleUrl: './vehicles.component.css',
    imports: [DivisaPipe, RouterModule, FormsModule, FiltrarPipe, CanCancelPipe]
})
export class VehiclesComponent {


vehicles: Vehicle[] = []
filtro: string = "";

constructor(private vehicleService: VehicleService){
  vehicleService.getAll().subscribe({
    next: (response)=>{
      this.vehicles = response as Vehicle[]
    },
    error: ()=>{}
  })
}

eliminar(vehicleId: string){
  Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás revertir esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar"
  }).then((result) => {
    if (result.isConfirmed) {
      this.vehicleService.deleteVehicle(vehicleId).subscribe({
        next: ()=>{
          Swal.fire({
            title: "¡Veiculo eliminado!",
            text: "Tu vehiculo ha sido eliminado correctamente",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          });

          this.vehicles = this.vehicles.filter(x=>x._id !== vehicleId)
        },
        error:()=>{
          Swal.fire({
            title: "Oops!",
            text: "Ha ocurrido un error",
            icon: "error",
            showConfirmButton: false,
            timer: 1500
          })
        }
      })

      
    }
  });
}

editar(bookingId: string) {
  const vehicleEditar: Vehicle | undefined = this.vehicles.find(x => x._id === bookingId);
  if (!vehicleEditar) {
    return;
  }

  Swal.fire({
    title: `Editar disponibilidad del ${vehicleEditar.brand} ${vehicleEditar.model}`,
    html: `
      <div>
        <label class="form-label">Disponible</label>
        <input type="checkbox" id="available" ${vehicleEditar.available ? 'checked' : ''}>
      </div>`,
    focusConfirm: false,
    preConfirm: () => {
      const available = (document.getElementById('available') as HTMLInputElement).checked;
      return { available };
    }
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      const { available } = result.value;
      this.vehicleService.editar(bookingId, available).subscribe({
        next: () => {
          Swal.fire({
            title: "Disponibilidad actualizada",
            icon: "success",
            showCloseButton: false,
            timer: 2000
          });
          this.vehicles = this.vehicles.map(vehicle =>
            vehicle._id === bookingId ? { ...vehicle, available } : vehicle
          );
        },
        error: (err: any) => {
          console.error("Error al editar la disponibilidad:", err);
          Swal.fire({
            title: "Oops!",
            text: "Ha ocurrido un error al editar. Por favor, intenta nuevamente.",
            icon: "error",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }
  });
}


}









