import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:8080/api/vehicle/all';

  constructor(private http: HttpClient) {}

  getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl);
  }

  updateMechanicForVehicle(reg: string, mechanicDetails: any): Observable<any> {
    const url = `http://localhost:8080/api/vehicle/${reg}`;
    return this.http.put(url, mechanicDetails);
  }
  
  
}