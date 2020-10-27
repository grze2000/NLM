import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-flow-meter',
  templateUrl: './flow-meter.component.html',
  styleUrls: ['./flow-meter.component.scss']
})
export class FlowMeterComponent implements OnInit {
  @Input() sidebar: boolean;
  @Output() closeEvent = new EventEmitter();

  flowTypes: string[] = [
    'Przepływ nieznany',
    'Przepływ - SUW/ZUW',
    'Przepływ - Zbiornik',
    'Przepływ międzystrefowy',
    'Sprzedaż - Online',
    'Sprzedaż - odczyt co 12h',
    'Sprzedaż - odczyt ręczny',
    'Przepływ wirtualny'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
