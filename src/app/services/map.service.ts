import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import Marker from '../models/Marker';
import { Mode } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private mode = new BehaviorSubject<Mode>(Mode.VIEW);
  private markers: Marker[] = []
  private newMarker: Marker = {
    name: '',
      type: 'Przepływ - Zbiornik',
      flowValue: 0,
      lonLat: null
  };
  private markersSubject = new BehaviorSubject<Marker[]>(this.markers);

  flowTypes: any = [
    {type: 'Przepływ nieznany', color: '#B9B9B9'},
    {type: 'Przepływ - SUW/ZUW', color: '#03D708'},
    {type: 'Przepływ - Zbiornik', color: '#D75D03'},
    {type: 'Przepływ międzystrefowy', color: '#0B4566'},
    {type: 'Sprzedaż - Online', color: '#00D097'},
    {type: 'Sprzedaż - odczyt co 12h', color: '#B000D0'},
    {type: 'Sprzedaż - odczyt ręczny', color: '#780000'},
    {type: 'Przepływ wirtualny', color: '#000000'}
  ];

  constructor() { }

  addMarker(marker: Marker = this.newMarker): void {
    this.markers.push(marker);
    this.reset();    
  }

  getMarkers(): Observable<Marker[]> {
    return this.markersSubject.asObservable();
  }

  getMode(): Observable<Mode> {
    return this.mode.asObservable();
  }

  setMode(mode: Mode): void {
    this.mode.next(mode);
  }

  selectPoint(point: number[]): void {
    this.newMarker.lonLat = point;
    this.markersSubject.next(this.newMarker.lonLat ? [...this.markers, this.newMarker] : this.markers);
  }

  setNewMarkerInfo(name: string, type: string, flowValue: number): void {
    this.newMarker.name = name;
    this.newMarker.type = type;
    this.newMarker.flowValue = flowValue;
    this.markersSubject.next(this.newMarker.lonLat ? [...this.markers, this.newMarker] : this.markers);
  }

  getTypes(): Observable<any> {
    return of(this.flowTypes);
  }

  reset(): void {
    this.newMarker = {
      name: '',
      type: '',
      flowValue: 0,
      lonLat: null
    }
    this.mode.next(Mode.VIEW);
    this.markersSubject.next(this.newMarker.lonLat ? [...this.markers, this.newMarker] : this.markers);
  }
}
