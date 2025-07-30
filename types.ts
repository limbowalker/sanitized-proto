/* 
    Data schema for trip planner
    proto app. May need some refactoring
    due to duplicate params.
*/

export interface Landmark {
    id: string,
    displayName: string,
    imgUrl: string,
    latLng: LatLng,
    comment: string,
}

export interface Place {
    id: string,
    displayName: string,
    latLng: LatLng,
    duration: number,
    bookingUrl: string,
    comment: string,
    places: Landmark[]
}

export interface Trip {
    id: string,
    userIds: string[],
    startDate: Date,
    endDate: Date,
    name: string,
    places: Place[],
    imgUrl: string,
}

export interface LatLng {
    lat: number,
    lng: number
}

