import { Component, OnDestroy } from '@angular/core';
import { SignalService } from '../../services/signal.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import { PanelSearchComponent } from "../panel-search/panel-search.component";
import { PanelDetailsComponent } from "../panel-details/panel-details.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';



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
export class PanelComponent implements OnDestroy {
  private subscription: Subscription;

  constructor(protected signals: SignalService, protected breakpoint: BreakpointObserver) {
    const layoutChanges = breakpoint.observe('(max-width: 768px)');
    this.subscription = layoutChanges.subscribe((res: { matches: boolean }) => {
      this.isMobile = res.matches;
    })
  }

  isMobile = false;

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
