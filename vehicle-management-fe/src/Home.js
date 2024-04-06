import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Home.css';

function Home() {
    const [make, setMake] = useState(""); 
    const [year, setYear] = useState("");
    const [vin, setVin] = useState(""); 
    const [model, setModel] = useState("");
    const [message, setMessage] = useState("");
    const [vehicles, setVehicles] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        getAllVehicle();
    }, []);

    const handleSubmit = async event => {
        event.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            createVehicleDetails();
        } else {
            setErrors(formErrors);
        }
    };

    function createVehicleDetails() {
        axios
            .post("http://localhost:8080/save", {
                make: make,
                model: model,
                year: year,
                vin: vin,
            })
            .then((res) => {
                console.log(res);
                setMessage("Vehicle created Successfully!");
                getAllVehicle();
            })
            .catch((err) => {
                console.log(err);
                setMessage("Invalid data sent for Processing. Please check the input!");
            });
    }

    function deleteVehicle(id) {
        deleteVehicleById(id);
    }

    function deleteVehicleById(id) {
        axios
            .delete(`http://localhost:8080/delete/${id}`)
            .then((res) => {
                console.log(res);
                setMessage("Vehicle deleted Successfully!");
                getAllVehicle();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function editVehicleById(id, body) {
        axios
            .post('http://localhost:8080/save?id='+id, body)
            .then((res) => {
                console.log(res);
                setMessage("Vehicle updated Successfully!");
                getAllVehicle();
            })
            .catch((err) => {
                console.log(err);
                setMessage("Invalid data sent for Processing. Please check the input!");

            });
    }

    function getAllVehicle() {
        axios
            .get("http://localhost:8080/getVehicle/all")
            .then((res) => {
                console.log(res);
                setVehicles(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function validateForm() {
        let errors = {};
        if (!make) {
            errors.make = "Make is required";
        }
        if (!model) {
            errors.model = "Model is required";
        }
        if (!year) {
            errors.year = "Year is required";
        }
        if (!vin) {
            errors.vin = "VIN is required";
        }
        return errors;
    }

function handleMakeChange(e, id) {
    const updatedVehicles = vehicles.map(item => {
        if (item.id === id) {
            return { ...item, make: e.target.value };
        }
        return item;
    });
    setVehicles(updatedVehicles);
}

function handleYearChange(e, id) {
    const updatedVehicles = vehicles.map(item => {
        if (item.id === id) {
            return { ...item, year: e.target.value };
        }
        return item;
    });
    setVehicles(updatedVehicles);
}

function handleVinChange(e, id) {
    const updatedVehicles = vehicles.map(item => {
        if (item.id === id) {
            return { ...item, vin: e.target.value };
        }
        return item;
    });
    setVehicles(updatedVehicles);
}

function handleModelChange(e, id) {
    const updatedVehicles = vehicles.map(item => {
        if (item.id === id) {
            return { ...item, model: e.target.value };
        }
        return item;
    });
    setVehicles(updatedVehicles);
}

function handleMakeChangeForCreate(e) {
    setMake(e.target.value);
}

function handleVinChangeForCreate(e) {
    setVin(e.target.value);
}

function handleModelChangeForCreate(e) {
    setModel(e.target.value);
}

function handleYearChangeForCreate(e) {
    setYear(e.target.value);
}

    return (
        <div className="home">
            <h1>Create Vehicle</h1>
            <form onSubmit={handleSubmit}>
                <label>Make : </label> <input type="number" className='textInput' value={make} onChange={handleMakeChangeForCreate} placeholder="Enter the Make details.." />
                {errors.make && <p>{errors.make}</p>}
                <label>Year : </label> <input type="number" className='textInput' value={year} onChange={handleYearChangeForCreate}  placeholder="Enter the Year details.." />
                {errors.year && <p>{errors.year}</p>}
                <label>VIN : </label> <input type="text" className='textInput' value={vin} onChange={handleVinChangeForCreate} placeholder="Enter the VIN details.." />
                {errors.vin && <p>{errors.vin}</p>}
                <label>Model : </label> <input type="text" className='textInput' value={model} onChange={handleModelChangeForCreate} placeholder="Enter the Model details.." />
                {errors.model && <p>{errors.model}</p>}
                <input type="submit" className='submit' value="Submit" />
                <p>{message}</p>
            </form>
            
            <h1>Vehicle Information</h1>
            <div className="navi">
                <table className='tableStyle'>
                    <tbody>
                        {vehicles.map(item =>
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td><input type="number" value={item.make} onChange={(e) => handleMakeChange(e, item.id)} /></td>
                                <td><input type="number" value={item.year} onChange={(e) => handleYearChange(e, item.id)} /></td>
                                <td><input type="text" value={item.vin} onChange={(e) => handleVinChange(e, item.id)} /></td> 
                                <td><input type="text" value={item.model} onChange={(e) => handleModelChange(e, item.id)} /></td>
                                <td><button className='delete' onClick={() => deleteVehicle(item.id)}>Delete</button></td>
                                <td><button className='delete' onClick={() => editVehicleById(item.id, { make: item.make, year: item.year, vin: item.vin, model: item.model })}>Update</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default Home;
