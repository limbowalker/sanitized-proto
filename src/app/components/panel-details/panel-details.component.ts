import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SignalService } from '../../services/signal.service';
import { DiscreteInputComponent } from '../discrete-input/discrete-input.component';
import { MatRipple } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDragPlaceholder,
} from '@angular/cdk/drag-drop';
import { Landmark, Place } from '../../../types';

@Component({
  selector: 'app-panel-details',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    DiscreteInputComponent,
    CdkDrag,
    CdkDropList,
    CdkDragPlaceholder,
    MatRipple,
    MatMenuModule,
    MatListModule
  ],
  templateUrl: './panel-details.component.html',
  styleUrl: './panel-details.component.scss'
})
export class PanelDetailsComponent {

  constructor (protected signals: SignalService) {}

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  showOnMap(place: Place | Landmark) {
    if(this.signals.selectedPlace() == place) {
      this.signals.selectedPlace.set(null);
    }
    else {
      this.signals.selectedPlace.set(place);
    }
  }
}
  