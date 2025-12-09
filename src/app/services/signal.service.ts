import { Injectable, signal } from '@angular/core';
import { Landmark, Place, Trip, User } from '../types';
import { proto } from '../types';

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  drawerOpen = signal<boolean>(false);
  user = signal<User | null>({uid: '123', displayName: 'Ben Shishko', photoUrl: 'google.com', email: 'ben.shishko@gmail.com'});
  trips = signal<Trip[]>(proto);
  selectedTrip = signal<Trip | null>(null);
  selectedPlace = signal<Place | Landmark | null>(null);

  //Used to know which trip step has been selected prior search
  contextPlace = signal<Place | null>(null);

  panelState = signal<Trip | 'search_place' | 'search_city' | null>(null);

  mapsLoaded = signal<boolean>(false);

  constructor() { }

  closePanel() {
    this.selectedTrip.set(null);
    this.panelState.set(null);
    this.selectedPlace.set(null);
    this.contextPlace.set(null);
  }

  closeSearch() {
    if(this.selectedTrip()) {
      this.panelState.set(this.selectedTrip());
      this.contextPlace.set(null);
    } else {
      this.closePanel();
    }
  }

  addLandmark(landmark: Landmark) {
    this.selectedTrip.update((currentTrip: Trip | null) => { 
      if (currentTrip && this.contextPlace()) {
        const place = this.contextPlace(); 
        const placeIndex = currentTrip.places.findIndex(p => p.id === place!.id);
  
        if (placeIndex !== -1) {
          // Create a new trip object with updated places array for immutability
          return {
            ...currentTrip,
            places: currentTrip.places.map((p, idx) => 
              idx === placeIndex 
                ? { ...p, places: [...p.places, landmark] }
                : p
            )
          };
        } else {
          console.error('Context place not found in the trip.');
          return currentTrip;
        }
      } else {
        console.error('No trip selected.');
        return null;
      }
    });
  }

  addPlace(place: Place) {
    this.selectedTrip.update((currentTrip: Trip | null) => {
      if(currentTrip) {
        // Create a new trip object with updated places array for immutability
        return {
          ...currentTrip,
          places: [...currentTrip.places, place]
        };
      } else {
        console.error('No trip selected');
        return currentTrip;
      }
    })
  }

  deletePlace(place: Place) {
    this.selectedTrip.update((currentTrip: Trip | null) => {
      if(currentTrip) {
        // Create a new trip object with filtered places array for immutability
        return {
          ...currentTrip,
          places: currentTrip.places.filter(el => el !== place)
        };
      } else {
        console.error('No trip selected');
        return currentTrip;
      }
    })
  }

  deleteLandmark(landmark: Landmark) {
    this.selectedTrip.update((currentTrip: Trip | null) => {
      if(currentTrip && this.contextPlace()) {
        const place = this.contextPlace(); 
        const placeIndex = currentTrip.places.findIndex(p => p.id === place!.id);
  
        if (placeIndex !== -1) {
          // Create a new trip object with updated places array for immutability
          return {
            ...currentTrip,
            places: currentTrip.places.map((p, idx) => 
              idx === placeIndex 
                ? { ...p, places: p.places.filter(el => el !== landmark) }
                : p
            )
          };
        } else {
          console.error('Context place not found in the trip.');
          return currentTrip;
        }
      } else {
        console.error('No trip selected');
        return currentTrip;
      }
    })
  }
}
