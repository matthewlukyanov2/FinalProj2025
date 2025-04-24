import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService) {}

  updateVehicle(vehicle: any): void {
    console.log("Update clicked for:", vehicle);
  }
  

  ngOnInit(): void {
    this.vehicleService.getAllVehicles().subscribe({
      next: (data) => (this.vehicles = data),
      error: (err) => console.error('Error fetching vehicles:', err)
    });
  }
}
