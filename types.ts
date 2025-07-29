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

export interface User {
    uid: string,
    displayName: string,
    photoUrl: string,
    email: string
}

export interface LatLng {
    lat: number,
    lng: number
}


export const proto = [
    {
        id: 'trip1',
        userIds: ['user1'],
        startDate: new Date(2024, 11, 10),
        imgUrl: 'https://lh5.googleusercontent.com/p/AF1QipMhEumaUASrq29BpMn-X8MfQ7Wkg_vh9Vo9XT6u=w203-h253-k-no',
        endDate: new Date(2024, 11, 20),
        name: 'Sri Lanka Trip with super long name that should be wrapped',
        places: [
            {
                id: 'place1',
                displayName: 'Colombo',
                latLng: { lat: 6.9271, lng: 79.8612 },
                duration: 3,
                bookingUrl: 'https://www.booking.com/city/lk/colombo.en-gb.html',
                comment: 'The capital city',
                places: [
                    {
                        id: 'landmark1',
                        displayName: 'National Museum of Colombo',
                        imgUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FNational_Museum_of_Colombo&psig=AOvVaw3lH6b1bDgEihCzZ9VRBEl1&ust=1697027268950000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKj4gcC8qIEDFQAAAAAdAAAAABAE',
                        latLng: { lat: 6.9323, lng: 79.8584 },
                        comment: 'Museum',
                    },
                    {
                        id: 'landmark2',
                        displayName: 'Gangaramaya Temple',
                        imgUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FGangaramaya_Temple&psig=AOvVaw1o_r7xPywjuzH2qsM23d2b&ust=1697027337846000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJjI_fC8qIEDFQAAAAAdAAAAABAI',
                        latLng: { lat: 6.9271, lng: 79.8612 },
                        comment: 'Temple',
                    }
                ]
            },
            {
                id: 'place2',
                displayName: 'Tangalle',
                latLng: { lat: 6.9271, lng: 79.8612 },
                duration: 2,
                bookingUrl: 'https://www.booking.com/city/lk/tangalle.en-gb.html',
                comment: 'Beach destination',
                places: [
                    {
                        id: 'landmark3',
                        displayName: 'Tangalle Beach',
                        imgUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.srilanka.travel%2Ftangalle&psig=AOvVaw2X9t9j8LH2LVJYjd9uowWl&ust=1697027407950000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiF8PC9qIEDFQAAAAAdAAAAABAJ',
                        latLng: { lat: 6.9271, lng: 79.8612 },
                        comment: 'Beach',
                    }
                ]
            },
            {
                id: 'place3',
                displayName: 'Kandy',
                latLng: { lat: 6.9271, lng: 79.8612 },
                duration: 3,
                bookingUrl: 'https://www.booking.com/city/lk/kandy.en-gb.html',
                comment: 'Cultural city',
                places: [
                    {
                        id: 'landmark4',
                        displayName: 'Temple of the Tooth',
                        imgUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FTemple_of_the_Tooth&psig=AOvVaw1h5-vw1mQgpeykNWh65j2c&ust=1697027470191000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJCR_vC9qIEDFQAAAAAdAAAAABAI',
                        latLng: { lat: 6.9271, lng: 79.8612 },
                        comment: 'Temple',
                    },
                    {
                        id: 'landmark5',
                        displayName: 'Kandy Lake',
                        imgUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FKandy_Lake&psig=AOvVaw3g_EgXcL2X9Zzr4k8w6B7K&ust=1697027515191000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPCN6_C9qIEDFQAAAAAdAAAAABAI',
                        latLng: { lat: 6.9271, lng: 79.8612 },
                        comment: 'Lake',
                    }
                ]
            },
        ]
    },
    {
        id: 'trip3',
        userIds: ['user1', 'user2'],
        startDate: new Date(2024, 5, 15),
        imgUrl: 'https://lh5.googleusercontent.com/p/AF1QipMhEumaUASrq29BpMn-X8MfQ7Wkg_vh9Vo9XT6u=w203-h253-k-no',
        endDate: new Date(2024, 5, 25),
        name: 'Road Trip through California',
        places: [
            {
                id: 'place6',
                displayName: 'San Francisco',
                latLng: { lat: 6.9271, lng: 79.8612 },
                duration: 3,
                bookingUrl: 'https://www.booking.com/city/us/san-francisco.en-gb.html',
                comment: 'Explore the Golden Gate Bridge and Alcatraz',
                places: [
                    {
                        id: 'landmark9',
                        displayName: 'Golden Gate Bridge',
                        imgUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FGolden_Gate_Bridge&psig=AOvVaw015ggjgjhk1y6eyM_nB50D&ust=1697028112626000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOj44_D-qIEDFQAAAAAdAAAAABAE',
                        latLng: { lat: 6.9271, lng: 79.8612 },
                        comment: 'Iconic bridge',
                    },
                    {
                        id: 'landmark10',
                        displayName: 'Alcatraz Island',
                        imgUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FAlcatraz_Island&psig=AOvVaw350-9sR7b0Xc0-J2x9yN4L&ust=1697028144289000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID4t_D-qIEDFQAAAAAdAAAAABAI',
                        latLng: { lat: 6.9271, lng: 79.8612 },
                        comment: 'Former prison',
                    },
                    {
                        id: 'landmark11',
                        displayName: 'Golden Gate Park',
                        imgUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FGolden_Gate_Park&psig=AOvVaw3fU8v3R5kDw6_Lf8_NhtjR&ust=1697028177857000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPiFtfD-qIEDFQAAAAAdAAAAABAI',
                        latLng: { lat: 6.9271, lng: 79.8612 },
                        comment: 'Urban park',
                    }
                ]
            },
            {
                id: 'place7',
                displayName: 'Yosemite National Park',
                latLng: { lat: 6.9271, lng: 79.8612 },
                duration: 2,
                bookingUrl: 'https://www.nps.gov/yose/planyourvisit/lodging.htm',
                comment: 'Hike among giant sequoia trees and waterfalls',
                places: [
                    {
                        id: 'landmark12',
                        displayName: 'Yosemite Valley',
                        imgUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FYosemite_Valley&psig=AOvVaw3wXCLi2leoiy9B93u3w_9V&ust=1697028232013000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJicx_D-qIEDFQAAAAAdAAAAABAE',
                        latLng: { lat: 6.9271, lng: 79.8612 },
                        comment: 'Glacial valley',
                    },
                    {
                        id: 'landmark13',
                        displayName: 'Half Dome',
                        imgUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FHalf_Dome&psig=AOvVaw3y-BBv9-V7u_9eID-rcMC_&ust=1697028267249000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOiwz_D-qIEDFQAAAAAdAAAAABAI',
                        latLng: { lat: 6.9271, lng: 79.8612 },
                        comment: 'Granite dome',
                    }
                ]
            },
            {
                id: 'place8',
                displayName: 'Los Angeles',
                latLng: { lat: 6.9271, lng: 79.8612 },
                duration: 3,
                bookingUrl: 'https://www.booking.com/city/us/los-angeles.en-gb.html',
                comment: 'See Hollywood and walk the Walk of Fame',
                places: [
                    {
                        id: 'landmark14',
                        displayName: 'Hollywood Walk of Fame',
                        imgUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FHollywood_Walk_of_Fame&psig=AOvVaw25G4qYdNl2Lc6z70509qyg&ust=1697028320532000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOC80_D-qIEDFQAAAAAdAAAAABAE',
                        latLng: { lat: 6.9271, lng: 79.8612 },
                        comment: 'Public sidewalk',
                    },
                    {
                        id: 'landmark15',
                        displayName: 'Griffith Observatory',
                        imgUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FGriffith_Observatory&psig=AOvVaw2q1t-0Oa73g8cK2t8h029O&ust=1697028356938000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPDK0_D-qIEDFQAAAAAdAAAAABAI',
                        latLng: { lat: 6.9271, lng: 79.8612 },
                        comment: 'Observatory',
                    }
                ]
            }
        ]
    },

]


