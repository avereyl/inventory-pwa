
export enum SupplyTag {
    BATTERY='battery', EXP_DATE='exp_date', LEVEL='level'
}

export interface Supply {
    key:string;
    name : string;
    quantity : number;
    tags: SupplyTag[];
}