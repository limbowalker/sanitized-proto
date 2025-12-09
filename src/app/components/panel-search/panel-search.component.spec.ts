import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelSearchComponent } from './panel-search.component';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('PanelSearchComponent', () => {
  let component: PanelSearchComponent;
  let fixture: ComponentFixture<PanelSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelSearchComponent],
      providers: [provideNoopAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelSearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
