package com.altimetrik.vehicle.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.altimetrik.vehicle.data.VehicleDTO;
import com.altimetrik.vehicle.service.VehicleService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class VehicleController {
	
	@Autowired
	VehicleService service;
	
	@GetMapping("/getVehicle/{id}")
	public ResponseEntity<VehicleDTO> getVehicle(@PathVariable("id") Integer id) {
		
		if(id!=null && id.intValue()>0) {
			return ResponseEntity.ok(service.getVehicle(id));
		}
		return ResponseEntity.ok(new VehicleDTO());
	}
	
	@GetMapping("/getVehicle/all")
	public ResponseEntity<List<VehicleDTO>> getAllVehicle() {
		return ResponseEntity.ok(service.getAllVehicle());
	}
	
	@PostMapping("/save")
	public ResponseEntity<VehicleDTO> createVehice(@RequestParam(name = "id", required = false) Integer id,  @RequestBody VehicleDTO vehicle) {
		
		if(vehicle != null) {
			return ResponseEntity.ok(service.createVehicle(vehicle, id));
		}
		
		return ResponseEntity.ok(null);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteVehice(@PathVariable("id") Integer id) {
		service.deleteVehicle(id);
		return ResponseEntity.ok("Vehicle Deleted Successfully!");
	}

}
