import { MapService } from './services/map.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LegendComponent } from './legend/legend.component';
import { FlowMeterComponent } from './flow-meter/flow-meter.component';

@NgModule({
  declarations: [
    AppComponent,
    LegendComponent,
    FlowMeterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
