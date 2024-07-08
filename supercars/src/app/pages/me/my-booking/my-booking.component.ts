import { Component } from '@angular/core';
import { Booking } from '../../../interfaces/booking';
import { BookingService } from '../../../services/booking.service';
import { FormatDatePipe } from '../../../pipes/format-date.pipe';
import { DivisaPipe } from '../../../pipes/divisa.pipe';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { CanCancelPipe } from '../../../pipes/can-cancel.pipe';


@Component({
  selector: 'app-my-booking',
  standalone: true,
  imports: [FormatDatePipe, DivisaPipe, CanCancelPipe],
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.css'
})
export class MyBookingComponent {
  bookings: Booking[] = [];

  constructor(private bookingService: BookingService, private authService: AuthService){
    this.bookingService.getByUserId(authService.user!.id).subscribe({
      next: (response)=>{
        this.bookings = response as Booking[]
      },
      error: (err)=>{
        console.log("error al obtener las reservas", err)

      }
    })
  }

  eliminar(bookingId: string){
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
        this.bookingService.deleteBooking(bookingId).subscribe({
          next: ()=>{
            Swal.fire({
              title: "¡Reserva eliminada!",
              text: "Tu reserva ha sido eliminada correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 2000
            });

            this.bookings = this.bookings.filter(x=>x._id !== bookingId)
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
    const reservaEditar: Booking | undefined = this.bookings.find(x => x._id === bookingId);
    if (!reservaEditar) {
      // Manejar caso donde la reserva no se encuentra
      return;
    }
  
    Swal.fire({
      title: `Editar reserva del ${reservaEditar.vehicle.brand} ${reservaEditar.vehicle.model}`,
      html: `
        <div>
          <div>
            <label class="form-label">Fecha inicio</label>
            <input type="date" class="form-control" id="startDateInput">
          </div>
          <div>
            <label class="form-label">Fecha fin</label>
            <input type="date" class="form-control" id="endDateInput">
          </div>
        </div>`
    }).then((result) => {
      if (result.isConfirmed) {
        const startDateInput = document.getElementById('startDateInput') as HTMLInputElement;
        const endDateInput = document.getElementById('endDateInput') as HTMLInputElement;
  
        const nuevaFechaInicio = startDateInput.value;
        const nuevaFechaFin = endDateInput.value;
  
        // Validar las fechas antes de enviar la solicitud
        if (nuevaFechaInicio && nuevaFechaFin && nuevaFechaInicio <= nuevaFechaFin) {
          // Llamar al servicio para editar la reserva
          this.bookingService.editar(bookingId, nuevaFechaInicio, nuevaFechaFin).subscribe({
            next: () => {
              Swal.fire({
                title: "Reserva editada",
                icon: "success",
                showCloseButton: false,
                timer: 2000
              });
  
              // Actualizar localmente la reserva editada
              this.bookings = this.bookings.map(booking =>
                booking._id === bookingId ? { ...booking, startDate: nuevaFechaInicio, endDate: nuevaFechaFin } : booking
              );
            },
            error: (err: any) => {
              console.error("Error al editar la reserva:", err);
              Swal.fire({
                title: "Oops!",
                text: "Ha ocurrido un error al editar la reserva. Por favor, intenta nuevamente.",
                icon: "error",
                showConfirmButton: false,
                timer: 1500
              });
            }
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "La fecha de inicio debe ser anterior o igual a la fecha de fin.",
            icon: "error",
            showConfirmButton: false,
            timer: 2000
          });
        }
      }
    });
  }
};  
