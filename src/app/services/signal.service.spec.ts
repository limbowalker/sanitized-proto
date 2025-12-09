import { TestBed } from '@angular/core/testing';
import { SignalService } from './signal.service';
import { Landmark, Place, Trip } from '../types';

describe('SignalService', () => {
  let service: SignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Initial state', () => {
    it('should initialize with correct default values', () => {
      expect(service.drawerOpen()).toBe(false);
      expect(service.user()).toEqual({
        uid: '123',
        displayName: 'Ben Shishko',
        photoUrl: 'google.com',
        email: 'ben.shishko@gmail.com'
      });
      expect(service.trips()).toEqual([]);
      expect(service.selectedTrip()).toBeNull();
      expect(service.selectedPlace()).toBeNull();
      expect(service.contextPlace()).toBeNull();
      expect(service.panelState()).toBeNull();
      expect(service.mapsLoaded()).toBe(false);
    });
  });

  describe('closePanel()', () => {
    it('should reset all panel-related signals to null', () => {
      // Arrange
      const mockTrip: Trip = {
        id: '1',
        userIds: ['123'],
        startDate: new Date(),
        endDate: new Date(),
        name: 'Test Trip',
        places: [],
        imgUrl: 'test.jpg'
      };
      service.selectedTrip.set(mockTrip);
      service.panelState.set(mockTrip);
      service.selectedPlace.set({} as Place);
      service.contextPlace.set({} as Place);

      // Act
      service.closePanel();

      // Assert
      expect(service.selectedTrip()).toBeNull();
      expect(service.panelState()).toBeNull();
      expect(service.selectedPlace()).toBeNull();
      expect(service.contextPlace()).toBeNull();
    });
  });

  describe('closeSearch()', () => {
    it('should set panelState to selectedTrip and clear contextPlace when trip is selected', () => {
      // Arrange
      const mockTrip: Trip = {
        id: '1',
        userIds: ['123'],
        startDate: new Date(),
        endDate: new Date(),
        name: 'Test Trip',
        places: [],
        imgUrl: 'test.jpg'
      };
      service.selectedTrip.set(mockTrip);
      service.contextPlace.set({} as Place);
      service.panelState.set('search_place');

      // Act
      service.closeSearch();

      // Assert
      expect(service.panelState()).toEqual(mockTrip);
      expect(service.contextPlace()).toBeNull();
    });

    it('should call closePanel when no trip is selected', () => {
      // Arrange
      service.selectedTrip.set(null);
      spyOn(service, 'closePanel');

      // Act
      service.closeSearch();

      // Assert
      expect(service.closePanel).toHaveBeenCalled();
    });
  });

  describe('addPlace()', () => {
    it('should add a place to selectedTrip when trip exists', () => {
      // Arrange
      const mockTrip: Trip = {
        id: '1',
        userIds: ['123'],
        startDate: new Date(),
        endDate: new Date(),
        name: 'Test Trip',
        places: [],
        imgUrl: 'test.jpg'
      };
      const mockPlace: Place = {
        id: 'place1',
        displayName: 'Test Place',
        latLng: { lat: 0, lng: 0 },
        duration: 2,
        bookingUrl: 'test.com',
        comment: 'Test',
        places: []
      };
      service.selectedTrip.set(mockTrip);

      // Act
      service.addPlace(mockPlace);

      // Assert
      const updatedTrip = service.selectedTrip();
      expect(updatedTrip).not.toBeNull();
      expect(updatedTrip!.places.length).toBe(1);
      expect(updatedTrip!.places[0]).toEqual(mockPlace);
    });

    it('should log error and not add place when no trip is selected', () => {
      // Arrange
      spyOn(console, 'error');
      const mockPlace: Place = {
        id: 'place1',
        displayName: 'Test Place',
        latLng: { lat: 0, lng: 0 },
        duration: 2,
        bookingUrl: 'test.com',
        comment: 'Test',
        places: []
      };
      service.selectedTrip.set(null);

      // Act
      service.addPlace(mockPlace);

      // Assert
      expect(console.error).toHaveBeenCalledWith('No trip selected');
      expect(service.selectedTrip()).toBeNull();
    });
  });

  describe('deletePlace()', () => {
    it('should remove a place from selectedTrip', () => {
      // Arrange
      const placeToDelete: Place = {
        id: 'place1',
        displayName: 'Test Place',
        latLng: { lat: 0, lng: 0 },
        duration: 2,
        bookingUrl: 'test.com',
        comment: 'Test',
        places: []
      };
      const placeToKeep: Place = {
        id: 'place2',
        displayName: 'Keep Place',
        latLng: { lat: 1, lng: 1 },
        duration: 3,
        bookingUrl: 'test2.com',
        comment: 'Test2',
        places: []
      };
      const mockTrip: Trip = {
        id: '1',
        userIds: ['123'],
        startDate: new Date(),
        endDate: new Date(),
        name: 'Test Trip',
        places: [placeToDelete, placeToKeep],
        imgUrl: 'test.jpg'
      };
      service.selectedTrip.set(mockTrip);

      // Act
      service.deletePlace(placeToDelete);

      // Assert
      const updatedTrip = service.selectedTrip();
      expect(updatedTrip).not.toBeNull();
      expect(updatedTrip!.places.length).toBe(1);
      expect(updatedTrip!.places[0]).toEqual(placeToKeep);
    });

    it('should log error when no trip is selected', () => {
      // Arrange
      spyOn(console, 'error');
      const mockPlace: Place = {
        id: 'place1',
        displayName: 'Test Place',
        latLng: { lat: 0, lng: 0 },
        duration: 2,
        bookingUrl: 'test.com',
        comment: 'Test',
        places: []
      };
      service.selectedTrip.set(null);

      // Act
      service.deletePlace(mockPlace);

      // Assert
      expect(console.error).toHaveBeenCalledWith('No trip selected');
    });
  });

  describe('addLandmark()', () => {
    it('should add a landmark to the context place within selectedTrip', () => {
      // Arrange
      const mockLandmark: Landmark = {
        id: 'landmark1',
        displayName: 'Test Landmark',
        imgUrl: 'landmark.jpg',
        latLng: { lat: 0, lng: 0 },
        comment: 'Test landmark'
      };
      const contextPlace: Place = {
        id: 'place1',
        displayName: 'Test Place',
        latLng: { lat: 0, lng: 0 },
        duration: 2,
        bookingUrl: 'test.com',
        comment: 'Test',
        places: []
      };
      const mockTrip: Trip = {
        id: '1',
        userIds: ['123'],
        startDate: new Date(),
        endDate: new Date(),
        name: 'Test Trip',
        places: [contextPlace],
        imgUrl: 'test.jpg'
      };
      service.selectedTrip.set(mockTrip);
      service.contextPlace.set(contextPlace);

      // Act
      service.addLandmark(mockLandmark);

      // Assert
      const updatedTrip = service.selectedTrip();
      expect(updatedTrip).not.toBeNull();
      expect(updatedTrip!.places[0].places.length).toBe(1);
      expect(updatedTrip!.places[0].places[0]).toEqual(mockLandmark);
    });

    it('should log error when context place is not found in trip', () => {
      // Arrange
      spyOn(console, 'error');
      const mockLandmark: Landmark = {
        id: 'landmark1',
        displayName: 'Test Landmark',
        imgUrl: 'landmark.jpg',
        latLng: { lat: 0, lng: 0 },
        comment: 'Test landmark'
      };
      const contextPlace: Place = {
        id: 'place1',
        displayName: 'Test Place',
        latLng: { lat: 0, lng: 0 },
        duration: 2,
        bookingUrl: 'test.com',
        comment: 'Test',
        places: []
      };
      const differentPlace: Place = {
        id: 'place2',
        displayName: 'Different Place',
        latLng: { lat: 1, lng: 1 },
        duration: 3,
        bookingUrl: 'test2.com',
        comment: 'Test2',
        places: []
      };
      const mockTrip: Trip = {
        id: '1',
        userIds: ['123'],
        startDate: new Date(),
        endDate: new Date(),
        name: 'Test Trip',
        places: [differentPlace],
        imgUrl: 'test.jpg'
      };
      service.selectedTrip.set(mockTrip);
      service.contextPlace.set(contextPlace);

      // Act
      service.addLandmark(mockLandmark);

      // Assert
      expect(console.error).toHaveBeenCalledWith('Context place not found in the trip.');
    });

    it('should log error and set trip to null when no trip is selected', () => {
      // Arrange
      spyOn(console, 'error');
      const mockLandmark: Landmark = {
        id: 'landmark1',
        displayName: 'Test Landmark',
        imgUrl: 'landmark.jpg',
        latLng: { lat: 0, lng: 0 },
        comment: 'Test landmark'
      };
      service.selectedTrip.set(null);
      service.contextPlace.set({} as Place);

      // Act
      service.addLandmark(mockLandmark);

      // Assert
      expect(console.error).toHaveBeenCalledWith('No trip selected.');
      expect(service.selectedTrip()).toBeNull();
    });

    it('should log error and set trip to null when no context place is set', () => {
      // Arrange
      spyOn(console, 'error');
      const mockLandmark: Landmark = {
        id: 'landmark1',
        displayName: 'Test Landmark',
        imgUrl: 'landmark.jpg',
        latLng: { lat: 0, lng: 0 },
        comment: 'Test landmark'
      };
      const mockTrip: Trip = {
        id: '1',
        userIds: ['123'],
        startDate: new Date(),
        endDate: new Date(),
        name: 'Test Trip',
        places: [],
        imgUrl: 'test.jpg'
      };
      service.selectedTrip.set(mockTrip);
      service.contextPlace.set(null);

      // Act
      service.addLandmark(mockLandmark);

      // Assert
      expect(console.error).toHaveBeenCalledWith('No trip selected.');
      expect(service.selectedTrip()).toBeNull();
    });
  });

  describe('deleteLandmark()', () => {
    it('should remove a landmark from the context place', () => {
      // Arrange
      const landmarkToDelete: Landmark = {
        id: 'landmark1',
        displayName: 'Delete Landmark',
        imgUrl: 'landmark1.jpg',
        latLng: { lat: 0, lng: 0 },
        comment: 'To delete'
      };
      const landmarkToKeep: Landmark = {
        id: 'landmark2',
        displayName: 'Keep Landmark',
        imgUrl: 'landmark2.jpg',
        latLng: { lat: 1, lng: 1 },
        comment: 'To keep'
      };
      const contextPlace: Place = {
        id: 'place1',
        displayName: 'Test Place',
        latLng: { lat: 0, lng: 0 },
        duration: 2,
        bookingUrl: 'test.com',
        comment: 'Test',
        places: [landmarkToDelete, landmarkToKeep]
      };
      const mockTrip: Trip = {
        id: '1',
        userIds: ['123'],
        startDate: new Date(),
        endDate: new Date(),
        name: 'Test Trip',
        places: [contextPlace],
        imgUrl: 'test.jpg'
      };
      service.selectedTrip.set(mockTrip);
      service.contextPlace.set(contextPlace);

      // Act
      service.deleteLandmark(landmarkToDelete);

      // Assert
      const updatedTrip = service.selectedTrip();
      expect(updatedTrip).not.toBeNull();
      expect(updatedTrip!.places[0].places.length).toBe(1);
      expect(updatedTrip!.places[0].places[0]).toEqual(landmarkToKeep);
    });

    it('should log error when context place not found in trip', () => {
      // Arrange
      spyOn(console, 'error');
      const mockLandmark: Landmark = {
        id: 'landmark1',
        displayName: 'Test Landmark',
        imgUrl: 'landmark.jpg',
        latLng: { lat: 0, lng: 0 },
        comment: 'Test landmark'
      };
      const contextPlace: Place = {
        id: 'place1',
        displayName: 'Test Place',
        latLng: { lat: 0, lng: 0 },
        duration: 2,
        bookingUrl: 'test.com',
        comment: 'Test',
        places: [mockLandmark]
      };
      const differentPlace: Place = {
        id: 'place2',
        displayName: 'Different Place',
        latLng: { lat: 1, lng: 1 },
        duration: 3,
        bookingUrl: 'test2.com',
        comment: 'Test2',
        places: []
      };
      const mockTrip: Trip = {
        id: '1',
        userIds: ['123'],
        startDate: new Date(),
        endDate: new Date(),
        name: 'Test Trip',
        places: [differentPlace],
        imgUrl: 'test.jpg'
      };
      service.selectedTrip.set(mockTrip);
      service.contextPlace.set(contextPlace);

      // Act
      service.deleteLandmark(mockLandmark);

      // Assert
      expect(console.error).toHaveBeenCalledWith('Context place not found in the trip.');
    });

    it('should log error when no trip is selected', () => {
      // Arrange
      spyOn(console, 'error');
      const mockLandmark: Landmark = {
        id: 'landmark1',
        displayName: 'Test Landmark',
        imgUrl: 'landmark.jpg',
        latLng: { lat: 0, lng: 0 },
        comment: 'Test landmark'
      };
      service.selectedTrip.set(null);
      service.contextPlace.set({} as Place);

      // Act
      service.deleteLandmark(mockLandmark);

      // Assert
      expect(console.error).toHaveBeenCalledWith('No trip selected');
    });

    it('should log error when no context place is set', () => {
      // Arrange
      spyOn(console, 'error');
      const mockLandmark: Landmark = {
        id: 'landmark1',
        displayName: 'Test Landmark',
        imgUrl: 'landmark.jpg',
        latLng: { lat: 0, lng: 0 },
        comment: 'Test landmark'
      };
      const mockTrip: Trip = {
        id: '1',
        userIds: ['123'],
        startDate: new Date(),
        endDate: new Date(),
        name: 'Test Trip',
        places: [],
        imgUrl: 'test.jpg'
      };
      service.selectedTrip.set(mockTrip);
      service.contextPlace.set(null);

      // Act
      service.deleteLandmark(mockLandmark);

      // Assert
      expect(console.error).toHaveBeenCalledWith('No trip selected');
    });
  });
});
