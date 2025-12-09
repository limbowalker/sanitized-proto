import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {MatRippleModule} from '@angular/material/core';
import { SignalService } from '../../services/signal.service';


@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatRippleModule,
],
  animations: [
    trigger('resizeAnimation', [
      state('true', style({ opacity: 1, width: '*' })),
      state('false', style({ opacity: 0, width: '0' })),
      transition('true <=> false', animate('200ms ease-in-out'))
    ])
  ],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {
  constructor(protected signals: SignalService) {};

  months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

}
