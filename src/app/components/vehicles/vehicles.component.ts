import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule for ngModel

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Add FormsModule here
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  selectedVehicle: Vehicle | null = null; // ✅ Selected vehicle for update form

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.vehicleService.getAllVehicles().subscribe({
      next: (data) => (this.vehicles = data),
      error: (err) => console.error('Error fetching vehicles:', err)
    });
  }

  updateVehicle(vehicle: Vehicle): void {
    this.selectedVehicle = { ...vehicle }; // ✅ Create a copy to allow editing
  }

  cancelUpdate(): void {
    this.selectedVehicle = null; // ✅ Cancel update, hide form
  }

  saveUpdate(): void {
    if (!this.selectedVehicle) return;

    console.log('Saving updated vehicle:', this.selectedVehicle);

    // Later you will call a PUT request here like:
    // this.vehicleService.updateVehicle(this.selectedVehicle.reg, this.selectedVehicle.mechanic.mid).subscribe(...)
    
    this.selectedVehicle = null; // Close the form after save (for now)
  }
}
