import { Component } from '@angular/core';
import { FormatDatePipe } from '../../../pipes/format-date.pipe';
import { DivisaPipe } from '../../../pipes/divisa.pipe';
import { CanCancelPipe } from '../../../pipes/can-cancel.pipe';
import { Booking } from '../../../interfaces/booking';
import { BookingService } from '../../../services/booking.service';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormatDatePipe, DivisaPipe, CanCancelPipe],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  bookings: Booking[] = []

constructor(private bookingService: BookingService,
 
){
  bookingService.getAllReservations().subscribe({
    next:(response)=>{
      this.bookings = response as Booking[]
    },
    error: (error)=>{
      console.log("Error al obtener las reservas", error)
      
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


}
