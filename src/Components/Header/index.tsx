import React, { FunctionComponent } from "react";
import SelectGroup from "../SelectGroup";
import StyledButton from "../StyledButton";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

interface HeaderProps {
  options: number[];
  isFeedKilled: boolean;
  selectedMarket: string;
}

const Header: FunctionComponent<HeaderProps> = ({
  options,
  isFeedKilled,
  selectedMarket,
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        variant="elevation"
        style={{ backgroundColor: "#1fbbd8", padding: "4px 0px" }}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ overflow: "visible" }}
          >
            Order Book App
          </Typography>
          <Box style={{ display: "flex", gap: "15px" }}>
            <SelectGroup options={options} />
            {!isFeedKilled && (
              <StyledButton title={"Change Feed"} backgroundColor={"#0f748f"} />
            )}
            <StyledButton
              title={isFeedKilled ? "Renew feed" : "Kill Feed"}
              backgroundColor={"#0f748f"}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
