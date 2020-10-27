import { Component, OnInit, Input } from '@angular/core';
import LegendItem from '../models/LegendItem';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {
  @Input() title: string;
  @Input() items: LegendItem[];

  expanded: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
