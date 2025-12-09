import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiscreteInputComponent } from './discrete-input.component';

describe('DiscreteInputComponent', () => {
  let component: DiscreteInputComponent;
  let fixture: ComponentFixture<DiscreteInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscreteInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscreteInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept param input', () => {
    component.param = 'test';
    expect(component.param).toBe('test');
  });

  it('should accept size input', () => {
    component.size = 'large';
    expect(component.size).toBe('large');
  });

  it('should accept type input', () => {
    component.type = 'date';
    expect(component.type).toBe('date');
  });

  it('should have default values', () => {
    expect(component.param).toBe('');
    expect(component.size).toBe('default');
    expect(component.type).toBe('text');
  });
});
