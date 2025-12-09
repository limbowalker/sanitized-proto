import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelDetailsComponent } from './panel-details.component';
import { SignalService } from '../../services/signal.service';
import { Trip } from '../../../types';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('PanelDetailsComponent', () => {
  let component: PanelDetailsComponent;
  let fixture: ComponentFixture<PanelDetailsComponent>;
  let signalService: SignalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelDetailsComponent],
      providers: [provideNoopAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelDetailsComponent);
    component = fixture.componentInstance;
    signalService = TestBed.inject(SignalService);
    
    // Set up a mock trip to avoid null errors
    const mockTrip: Trip = {
      id: '1',
      userIds: ['123'],
      startDate: new Date(),
      endDate: new Date(),
      name: 'Test Trip',
      places: [],
      imgUrl: 'test.jpg'
    };
    signalService.selectedTrip.set(mockTrip);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
