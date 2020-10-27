import { Component } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  map: any;
  sidebar: boolean = false;

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

  toggleSidebar() {
    console.log('here');
    this.sidebar = !this.sidebar;
  }

  title = 'nlm';
}
