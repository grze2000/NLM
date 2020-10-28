import { Mode } from './../models/enums';
import { MapService } from './../services/map.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-flow-meter',
  templateUrl: './flow-meter.component.html',
  styleUrls: ['./flow-meter.component.scss']
})
export class FlowMeterComponent implements OnInit {
  @Input() sidebar: boolean;
  @Output() closeEvent = new EventEmitter();

  mode: Mode;
  submitBtnText: string = 'Dodaj punkt';
  flowTypes: any;
  formData: any = {
    name: '',
    type: '',
    flowValue: 0
  }

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
    this.mapService.getMode().subscribe(mode => {
      this.mode = mode;
      this.submitBtnText = mode === Mode.VIEW ? 'Dodaj punkt' : 'Zatwierdź';
    });
    this.mapService.getTypes().subscribe(types => {
      this.flowTypes = types.map(x => x.type);
      this.formData.type = this.flowTypes[0];
    });
  }

  submit(): void {
    // TO DO: better form validation, Angular form improvements
    this.mapService.setNewMarkerInfo(this.formData.name, this.formData.type, this.formData.flowValue);
    if(this.mode === Mode.VIEW) {
      this.mapService.setMode(Mode.ADD);
    } else if(this.mode === Mode.ADD) {
      if(this.formData.name.length) {
        this.mapService.addMarker();
        this.formData = {
          name: '',
          type: this.flowTypes[0],
          flowValue: 0
        }
      } else {
        alert("Validation failed!");
      }
    }
  }
  
  updateType(): void {
    this.mapService.setNewMarkerInfo(this.formData.name, this.formData.type, this.formData.flowValue);
  }

  reset(): void {
    this.mapService.selectPoint(null);
    this.mapService.setNewMarkerInfo('', this.flowTypes[0], 0);
    this.mapService.setMode(Mode.VIEW);
  }
}
