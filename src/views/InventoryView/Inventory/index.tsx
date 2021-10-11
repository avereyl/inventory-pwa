import Inventory from "../../../types/Inventory";

export type InventoryProps = {
  inventory: Inventory;
  keyPrefix: string;
  level?: number;
};

const Inventory = (props: InventoryProps) => {
  const { inventory } = props;
  return <></>;
};

export default Inventory;
