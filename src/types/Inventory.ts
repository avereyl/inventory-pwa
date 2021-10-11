import { Location } from "./Location";
import { Supply } from "./Supply";

type Inventory = {
    id:string;
    documentDate? : string;
    location : Location;
    supplies: Supply[];
    children: Inventory[];
}

export default Inventory;