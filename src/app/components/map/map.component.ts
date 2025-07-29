import { Component, effect, ViewChild } from '@angular/core';
import {GoogleMap, GoogleMapsModule} from '@angular/google-maps';
import { SignalService } from '../../services/signal.service';
import { Landmark } from '../../types';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    GoogleMap,
    GoogleMapsModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {

  //googleMap!: GoogleMap; 
  @ViewChild(GoogleMap) googleMap!: GoogleMap; 

  constructor(protected signals: SignalService) {
    effect(() => {
      if(this.signals.selectedPlace()) {
        this.jumpTo();
      }
    }, { allowSignalWrites: true });
  }

  center: google.maps.LatLngLiteral = this.signals.selectedTrip()?.places[0].latLng || {lat: 24, lng: 12};
  zoom = 6;
  display!: google.maps.LatLngLiteral;

  options: google.maps.MapOptions = {
    cameraControl: false,
    clickableIcons: true,
    disableDefaultUI: true,
    zoomControl: true
  };

  
  jumpTo() {
    if(this.signals.selectedPlace()) {
      this.googleMap.panTo(this.signals.selectedPlace()!.latLng);
      this.zoom = 13;

      // implement logic for different zoom levels for place and landmark
    }
  }

  moveMap(event: google.maps.MapMouseEvent) {
    this.center = (event.latLng!.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng!.toJSON();
  }

  //ben
  //ben
}
