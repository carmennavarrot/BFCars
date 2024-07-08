import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  signup(fechaInicio: any, fechaFin: any, value: any) {
    throw new Error('Method not implemented.');
  }
url: string = "http://localhost:3000/api/bookings"
  constructor(private http: HttpClient,
    private authService: AuthService
  ) { }

  // saco las reservas por id para cada usuario autorizado
  getByUserId(userid: string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.user?.token}`})

    return this.http.get(`${this.url}/user/${userid}`,{headers})
    // get autorizado

  }
  
// post autorizado
  saveBooking( vehicleId: string, sDate: string, eDate: string, price:number, discount: number ){

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.user?.token}`})


    return this.http.post(this.url,{
      vehicle: vehicleId,
      startDate: sDate,
      endDate: eDate,
      price: price,
      discount: discount
    }, {headers});
  }
  // delete autorizado, eliminar reserva
  deleteBooking(bookingId: string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.user?.token}`})

      
    return this.http.delete(`${this.url}/${this.authService.user?.id}/${bookingId}`, {headers})
  }

//sacar todas las reservas
getAllReservations() {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.authService.user?.token}`
  })

  return this.http.get(this.url,{headers});
}


// editar
editar(bookingId: string, startDate: string, endDate: string) {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.authService.user?.token}`,
  });
  return this.http.put(`${this.url}/${this.authService.user?.id}/${bookingId}`, {startDate,endDate}, {headers});
}

}



