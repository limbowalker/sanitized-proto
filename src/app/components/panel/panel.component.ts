import { Component, OnDestroy } from '@angular/core';
import { SignalService } from '../../services/signal.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import { PanelSearchComponent } from "../panel-search/panel-search.component";
import { PanelDetailsComponent } from "../panel-details/panel-details.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    PanelSearchComponent, 
    PanelDetailsComponent,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {
  constructor(protected signals: SignalService, protected breakpoint: BreakpointObserver) {
    const layoutChanges = breakpoint.observe('(max-width: 768px)');
    const subscription = layoutChanges.subscribe( res => {
      this.isMobile = res.matches;
    })
  }

  isMobile = false;
}
