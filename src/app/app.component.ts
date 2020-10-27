import { Component } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import LegendItem from './models/LegendItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  map: any;
  sidebar: boolean = false;
  zoneLegend: LegendItem[] = [
    { value: 'brak', iconClass: 'icon-square', iconColor: '#DBE4E9' },
    { value: '0', iconClass: 'icon-square', iconColor: '#00FF00' },
    { value: '10', iconClass: 'icon-square', iconColor: '#5FE645' },
    { value: '20', iconClass: 'icon-square', iconColor: '#71CC3E' },
    { value: '30', iconClass: 'icon-square', iconColor: '#82B336' },
    { value: '40', iconClass: 'icon-square', iconColor: '#94992E' },
    { value: '50', iconClass: 'icon-square', iconColor: '#A68027' },
    { value: '60', iconClass: 'icon-square', iconColor: '#B8661F' },
    { value: '70', iconClass: 'icon-square', iconColor: '#CA4C17' },
    { value: '80', iconClass: 'icon-square', iconColor: '#DB330F' },
    { value: '90', iconClass: 'icon-square', iconColor: '#ED1908' },
    { value: '100', iconClass: 'icon-square', iconColor: '#FF0000' }
  ];
  flowLegend: LegendItem[] = [
    { value: 'Przepływ nieznany', iconClass: 'icon-marker', iconColor: '#B9B9B9'},
    { value: 'Przepływ - SUW/ZUW', iconClass: 'icon-marker', iconColor: '#03D708'},
    { value: 'Przepływ - Zbiornik', iconClass: 'icon-marker', iconColor: '#D75D03'},
    { value: 'Przepływ miedzystrefowy', iconClass: 'icon-marker', iconColor: '#0B4566'},
    { value: 'Sprzedaż - Online', iconClass: 'icon-marker', iconColor: '#00D097'},
    { value: 'Sprzedaż - odczyt co 12h', iconClass: 'icon-marker', iconColor: '#B000D0'},
    { value: 'Sprzedaż - odczyt ręczny', iconClass: 'icon-marker', iconColor: '#780000'},
    { value: 'Przepływ wirtualny', iconClass: 'icon-marker', iconColor: '#000000'},
  ]

  ngOnInit() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: olProj.fromLonLat([17.9737, 54.662]),
        zoom: 13.5
      }),
      controls: []
    });
  }

  zoom(zoom) {
    const view = this.map.getView();
    view.animate({
      zoom: view.getZoom() + zoom,
      duracion: 1000
    });
  }

  title = 'nlm';
}
