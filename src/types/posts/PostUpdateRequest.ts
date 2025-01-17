// src/types/Complex.ts

export interface ComplexResponse {
  category: string;
  residentialComplex: string;
  description: string;
  buildingArea: number;
  livingArea: number;
  objects: number;
  year: number;
  buildingFloors: number;
  parkingSlot: boolean;
  installment: boolean;
  swimmingPool: boolean;
  elevator: boolean;
  latitude: number;
  longitude: number;
  address: string;
}
