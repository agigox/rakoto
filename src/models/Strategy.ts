import { type LatLngExpression } from 'leaflet';
import { type Coordinates } from './Coordinates';

interface IInterval {
  minValue: number;
  maxValue: number;
}
export interface IPoint {
  name: string;
  type: string; // Aérien ou souterrain
  pointType: string; // Ligne ou poste
  substation: number; // Tension
}
export interface IParameters {
  distance: IInterval;
  cost: IInterval;
  delay: IInterval;
}
export interface IIndicators {
  available: number;
  isSufficient: boolean;
  isStation: boolean;
}
export interface IStrategy {
  id: number;
  point: IPoint;
  parameters: IParameters;
  indicators: IIndicators;
  connectionMessage: string;
  polylineCoords: LatLngExpression[] | LatLngExpression[][];
  pointCoords: Coordinates;
}
