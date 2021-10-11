
import { useCallback } from "react";
import inventories from "../data/inventories.json"
import Inventory from "../types/Inventory";
import { LocationType } from "../types/Location";

const countSupplies = (inv : Inventory) : number => {
    let sum = 0;
    sum += inv.supplies.length;
    inv.children.map(child => countSupplies(child)).forEach(count => sum+=count);
    return sum;
}

const useInventories = () => {

    const findInventories = () : Inventory[] => {
        return inventories as Inventory[];
    }

    const findInventoryByLocationType = (locationType : LocationType) : Inventory | undefined => {
        return inventories.find(inv => inv.location.type === locationType) as Inventory | undefined;
    }

    const countSuppliesByLocationType = useCallback(
        (locationType : LocationType) : number => {
            const inventory = findInventoryByLocationType(locationType);
            return inventory ? countSupplies(inventory) : 0;
        }, []);



    return {findInventories, findInventoryByLocationType, countSuppliesByLocationType};

}

export default useInventories;