import buildings from '../components/buildings';
import { Building } from './building';

interface Vec2 {
  x: number;
  y: number;
}
export class BuildingCursor{
  position: Vec2 = { x: 0, y: 0 };
  enabled: boolean = false;
  building: Building;
}
