import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  selectedVehicle: Vehicle | null = null;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehicleService.getAllVehicles().subscribe({
      next: (data) => (this.vehicles = data),
      error: (err) => console.error('Error fetching vehicles:', err)
    });
  }

  updateVehicle(vehicle: Vehicle): void {
    this.selectedVehicle = { ...vehicle }; 
  }

  saveUpdate(): void {
    if (this.selectedVehicle) {
      const reg = this.selectedVehicle.reg;
      const mechanicDetails = {
        mid: this.selectedVehicle.mechanic.mid
      };
  
      this.vehicleService.updateMechanicForVehicle(reg, mechanicDetails).subscribe({
        next: (response) => {
          console.log('Update successful:', response);
          this.selectedVehicle = null; 
          this.loadVehicles(); 
        },
        error: (err) => {
          console.error('Error updating vehicle:', err);
          alert('Failed to update vehicle. Please try again.');
        }
      });
    }
  }
  
  
  

  cancelUpdate(): void {
    this.selectedVehicle = null;
  }
}
