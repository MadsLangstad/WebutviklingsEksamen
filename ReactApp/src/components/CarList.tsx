import React, { useState, useEffect } from 'react';
import CarService from '../services/CarService';

// Define the type for a car object
type Car = {
  chassis: string;
  
  // Add other car properties with their types here
  
};

const CarList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    getCarsFromService();
  }, []);

  const getCarsFromService = async () => {
    try {
      const carsFromService = await CarService.getAllCars();
      setCars(carsFromService);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const getMoviesJSX = () => {
    const carsJSX = cars.map((car, i) => (

      <li key={i}>{car.chassis}</li> // Use the unique identifier of car for key if possible
    ));
    return carsJSX;
  };

  return (
    <section>
      <h3>F1 Cars</h3>
      <p>Nr of Formula1 Cars: {cars.length}</p>
      <ul>{getMoviesJSX()}</ul>
    </section>
  );
};

export default CarList;
