import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Vehicle } from '../interfaces/vehicle';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  url : string = "http://localhost:3000/api/vehicles"
  constructor(private http: HttpClient,
    private authService: AuthService
  ) { }
// obtener todos los vehiculos 
  getAll(){
    return this.http.get(this.url)
  }
// obtner un vehiculo específico
  getById(id: string){
    return this.http.get(`${this.url}/${id}`)
  }
  
// eliminar vehiculo
deleteVehicle(vehicleId: string){
  const headers= new HttpHeaders({
    'Authorization': `Bearer ${this.authService.user?.token}`})

  return this.http.delete(`${this.url}/${vehicleId}`,{headers});
}

// editar vehiculo 
editar(bookingId: string, available: boolean){
  const headers= new HttpHeaders({
    'Authorization': `Bearer ${this.authService.user?.token}`
  })
  return this.http.put(`${this.url}/${this.authService.user?.id}/${bookingId}`, {available}, {headers});
  
}


}
