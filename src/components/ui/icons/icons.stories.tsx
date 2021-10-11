import { SvgIcon } from "@mui/material";
import { ComponentMeta } from "@storybook/react";
import Medipack from "./Medipack";
import MedipackFilled from "./MedipackFilled";
import MedipackOutlined from "./MedipackOutlined";
import MedipackTwoTone from "./MedipackTwoTone";
import VSAV from "./VSAV";
import VSAVFilled from "./VSAVFilled";
import VSAVOutlined from "./VSAVOutlined";
import VSAVTwoTone from "./VSAVTwoTone";

export default {
  title: "inventory-app/icons",
  component: SvgIcon,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof SvgIcon>;

export const VSAV_ = () => <VSAV />;
export const VSAV_Outlined = () => <VSAVOutlined />;
export const VSAV_Filled = () => <VSAVFilled />;
export const VSAV_TwoTone = () => <VSAVTwoTone />;
export const Medipack_ = () => <Medipack />;
export const Medipack_Outlined = () => <MedipackOutlined />;
export const Medipack_Filled = () => <MedipackFilled />;
export const Medipack_TwoTone = () => <MedipackTwoTone />;
