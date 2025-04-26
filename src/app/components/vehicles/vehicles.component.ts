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
  errorMessage: string = '';

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.loadVehicles();
}

  // Method to fetch the list of vehicles from the VehicleService
  loadVehicles(): void {
    this.vehicleService.getAllVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.errorMessage = ''; // clear any previous error
      },
      error: (err) => {
        console.error('Error fetching vehicles:', err);
        this.errorMessage = 'Failed to load vehicles.';
      }
    });
  }

  // Method to update a selected vehicle
  updateVehicle(vehicle: Vehicle): void {
    this.selectedVehicle = { ...vehicle }; 
    this.errorMessage = '';
  }

  // Method to save the updated vehicle details
  saveUpdate(): void {
    if (this.selectedVehicle) {
      const reg = this.selectedVehicle.reg;
      const mechanicDetails = {
        mid: this.selectedVehicle.mechanic.mid
      };
  
      // Call the service to update the vehicle
      this.vehicleService.updateMechanicForVehicle(reg, mechanicDetails).subscribe({
        next: (response) => {
          console.log('Update successful:', response);
          this.selectedVehicle = null; 
          this.loadVehicles(); 
          this.errorMessage = '';
        },
        error: (err) => {
          console.error('Error updating vehicle:', err);
          alert('Failed to update vehicle. Please try again.');
        }
      });
    }
  }
  
  // Method to cancel updating a vehicle
  cancelUpdate(): void {
    this.selectedVehicle = null;
    this.errorMessage = '';
  }

  // Toggle dark mode
  toggleTheme(): void {
    if (document.body.classList.contains('dark-mode')) {
      this.disableDarkMode();
    } else {
      this.enableDarkMode();
    }
  }

  enableDarkMode(): void {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  }

  disableDarkMode(): void {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
}
