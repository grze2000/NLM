import { MapService } from './services/map.service';
import { Component } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import LegendItem from './models/LegendItem';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import SourceVector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import {Icon, Style} from 'ol/style';
import Marker from './models/Marker';
import { Mode } from './models/enums';

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
  ];
  markersSource: any;
  markersLayer: any;
  mapMode: Mode;
  flowTypes: any;
  addMarker: boolean = false;

  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.mapService.getMode().subscribe(mode => { this.mapMode = mode; this.addMarker = mode === Mode.ADD; });
    this.mapService.getTypes().subscribe(types => {this.flowTypes = types});

    // Create layer for markers
    this.markersSource = new SourceVector({});
    this.markersLayer = new LayerVector({
      source: this.markersSource
    })

    // Redraw markers
    this.mapService.getMarkers().subscribe((markers: Marker[]) => {
      this.markersSource.forEachFeature(ft => {
        this.markersSource.removeFeature(ft);
      });
      
      markers.forEach((marker: Marker) => {
        const type = this.flowTypes.find(x => x.type === marker.type);
        let feature = new Feature({
          geometry: new Point(olProj.fromLonLat(marker.lonLat))
        });
        feature.setStyle(new Style({
          image: new Icon({
            color: type.color,
            crossOrigin: 'anonymous',
            src: 'assets/marker.svg',
            imgSize: [35, 35]
          })
        }));
        this.markersSource.addFeature(feature);
      });
    })

    // Init map
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.markersLayer
      ],
      view: new View({
        center: olProj.fromLonLat([17.9737, 54.662]),
        zoom: 13.5
      }),
      controls: []
    });

    this.map.on('singleclick', evt => {
      if(this.mapMode === Mode.ADD) {
        this.mapService.selectPoint(olProj.toLonLat(evt.coordinate));
      }
    });
  }

  zoom(zoom) {
    const view = this.map.getView();
    view.animate({
      zoom: view.getZoom() + zoom,
      duracion: 1000
    });
  }

  showFlowmeter(): void {
    this.sidebar = !this.sidebar;
    this.mapService.reset();
  }

  closeFlowmeter(): void {
    this.sidebar = false;
    this.mapService.reset();
  }

  title = 'nlm';
}
