import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SignalService } from '../../services/signal.service';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

import { Landmark, Place, Trip } from '../../types';

@Component({
  selector: 'app-panel-search',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './panel-search.component.html',
  styleUrl: './panel-search.component.scss'
})
export class PanelSearchComponent implements AfterViewInit {
  constructor(protected signals: SignalService) { }

  searchControl = new FormControl('');
  autocompleteOptions: google.maps.places.Place[] = [];

  @ViewChild('searchInput') searchInput!: ElementRef;

  ngAfterViewInit(): void {
    this.searchInput.nativeElement.focus();

    if (this.signals.mapsLoaded()) {
      this.initAutocomplete();
    }
  }

  submitSearch(value?: any): void {
    this.searchControl.setValue(value.displayName);

    if (value) {
      switch (this.signals.panelState()) {
        case 'search_city':        
          const city: Place = {
            id: value.id,
            displayName: value.displayName,
            latLng: value.location.toJSON(),
            duration: 1,
            bookingUrl: '',
            comment: '',
            places: []
          }
  
          this.signals.addPlace(city);
          break;
  
        case 'search_place':
          const place: Landmark = {
            id: value.id,
            displayName: value.displayName,
            latLng: value.location.toJSON(),
            comment: '',
            imgUrl: ''
          }
          
          this.signals.addLandmark(place);
          console.log('updated context', this.signals.contextPlace())
          break;
      
        default:
          console.log('Error');
          break;
      }

      this.signals.closeSearch();
    }
  }


  // MAPS PART BELOW 
  initialRequest = {
    input: "Warsaw",
    //locationRestriction: { west: -122.44, north: 37.8, east: -122.39, south: 37.78 },
    //origin: { lat: 37.7893, lng: -122.4039 },
    includedPrimaryTypes: ["restaurant", "point_of_interest", "establishment", "locality", "political"],
    language: "en-US",
    region: "us",
  };


  async initAutocomplete() {
    // @ts-ignore
    const { Place, PlacesService, AutocompleteSessionToken, AutocompleteSuggestion } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;

    const token = new AutocompleteSessionToken();
    const service = new PlacesService(document.createElement('div'));

    this.fireAutocomplete(this.initialRequest.input);

    this.searchControl.valueChanges.subscribe(value => this.fireAutocomplete(value!));
    const request = this.refreshToken(this.initialRequest) as any;
  }

  async fireAutocomplete(input: string) {
    if (input == '') {
      this.autocompleteOptions = [];
      return;
    }

    this.initialRequest.input = input;

    // @ts-ignore
    const { suggestions } = await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(this.initialRequest);
    this.autocompleteOptions = [];

    for (const suggestion of suggestions) {
      const placePrediction = suggestion.placePrediction;
      const placeResult = await placePrediction!.toPlace().fetchFields({ fields: ['id', 'displayName', 'formattedAddress', 'location', 'googleMapsURI'] });

      this.autocompleteOptions.push(placeResult.place);
    }
  }

  async refreshToken(request: any) {
    const token = new google.maps.places.AutocompleteSessionToken();
    request.sessionToken = token;
    return request;
  }  
}