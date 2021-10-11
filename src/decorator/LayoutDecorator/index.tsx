import { Box } from "@mui/system";
import { ReactNode } from "react";
import AppBar from "../../components/ui/AppBar";

export type LayoutDecoratorProps = {
  children: ReactNode;
  customAppBar?: ReactNode;
};

const LayoutDecorator = (props: LayoutDecoratorProps) => {
  const { children, customAppBar } = props;
  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="start"
    >
      <Box display="flex" flexGrow={1} justifyContent="center" width="100%">
        {children}
      </Box>
      {customAppBar ? customAppBar : <AppBar />}
    </Box>
  );
};

export default LayoutDecorator;
