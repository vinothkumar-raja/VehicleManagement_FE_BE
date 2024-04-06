package com.altimetrik.vehicle.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.altimetrik.vehicle.data.VehicleDTO;
import com.altimetrik.vehicle.entity.Vehicle;
import com.altimetrik.vehicle.repository.VehicleRepository;

@Service
public class VehicleService {

	@Autowired
	VehicleRepository repository;

	public VehicleDTO getVehicle(Integer id) {
		Optional<Vehicle> data = repository.findById(id);
		if (data.isPresent()) {
			return convertEntityToDTO(data.get());
		}

		return null;
	}

	private VehicleDTO convertEntityToDTO(Vehicle vehicle) {
		if (vehicle != null) {
			VehicleDTO dto = new VehicleDTO();
			dto.setId(vehicle.getId());
			dto.setMake(vehicle.getMake());
			dto.setModel(vehicle.getModel());
			dto.setVin(vehicle.getVin());
			dto.setYear(vehicle.getYear());
			return dto;
		}

		return null;
	}

	public List<VehicleDTO> getAllVehicle() {
		List<VehicleDTO> vehicleDTOs = new ArrayList<>();
		List<Vehicle> vehicleList = repository.findAll();
		if (vehicleList != null) {
			for (Vehicle vehicle : vehicleList) {
				vehicleDTOs.add(convertEntityToDTO(vehicle));
			}
		}
		return vehicleDTOs;
	}

	public void deleteVehicle(Integer id) {
		repository.deleteById(id);
	}

	public VehicleDTO createVehicle(VehicleDTO vehicleDTO, Integer id) {
		vehicleDTO.setId(id);
		Vehicle vehicle = convertDTOToEntity(vehicleDTO);
		return convertEntityToDTO(repository.save(vehicle));
	}

	private Vehicle convertDTOToEntity(VehicleDTO vehicleDto) {
		if (vehicleDto != null) {
			Vehicle vehicle = new Vehicle();
			vehicle.setId(vehicleDto.getId());
			vehicle.setMake(vehicleDto.getMake());
			vehicle.setModel(vehicleDto.getModel());
			vehicle.setVin(vehicleDto.getVin());
			vehicle.setYear(vehicleDto.getYear());
			return vehicle;
		}
		return null;
	}

//	public static void main(String args[]) {
//
//		// Vinoth, Vinoth, kumar
//
//		List<Employee> employeelist = new ArrayList<>();
//		// emp.stream().
//		Map<String, Long> empcountDetails = employeelist.stream().map(e -> e)
//				.collect(Collectors.groupingBy(Employee::getName, Collectors.counting()));
//		Set<String> duplicateKeySet = empcountDetails.keySet();
//
//		int count = 0;
//		for (Map.Entry<String, Long> entry : empcountDetails.entrySet()) {
//			if (entry.getValue() > 2) {
//
//				for (Employee emp : employeelist) {
//					if (emp.getName() == entry.getKey()) {
//						count++;
//					}
//
//					if (count > entry.getValue()) {
//						System.out.println(emp.getName());
//						break;
//					}
//
//				}
//			}
//
//		}
//
//	}
			

	
}
