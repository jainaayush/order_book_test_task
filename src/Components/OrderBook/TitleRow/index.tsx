import React, { FunctionComponent } from "react";
import { MOBILE_WIDTH } from "../../../Constants/constants";
import { TableCell, Paper, Table, TableRow, TableHead } from "@mui/material";

interface TitleRowProps {
  reversedFieldsOrder?: boolean;
  windowWidth: number;
}

const TitleRow: FunctionComponent<TitleRowProps> = ({
  reversedFieldsOrder = false,
  windowWidth,
}) => {
  return (
    <>
      {reversedFieldsOrder || windowWidth < MOBILE_WIDTH ? (
        <>
          <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: '0px' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: "#c1375b", color: '#fff' }}>
                    PRICE
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#c1375b", color: '#fff', width: '300px' }}>SIZE</TableCell>
                  <TableCell sx={{ backgroundColor: "#c1375b", color: '#fff', width: '300px' }}>TOTAL</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </Paper>
        </>
      ) : (
        <>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: '#078308', color: '#fff' }}>TOTAL</TableCell>
                  <TableCell style={{ backgroundColor: '#078308', color: '#fff', width: '300px' }}>SIZE</TableCell>
                  <TableCell style={{ backgroundColor: '#078308', color: '#fff', width: '300px' }}>PRICE</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </Paper>
        </>
      )}
    </>
  );
};

export default TitleRow;
