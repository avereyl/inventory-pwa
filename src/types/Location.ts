

export type LocationParams = {
    locationType : LocationType
}

export enum LocationType {
    VSAV='vsav',
    MEDIPACK='medipack'
}

export interface Location {
    type? : LocationType;
    name : string;
}