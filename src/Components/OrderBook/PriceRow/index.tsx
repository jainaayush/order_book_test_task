import React, { FunctionComponent } from "react";

import { Wrapper } from "./styles";
import { MOBILE_WIDTH } from "../../../Constants/constants";
import { TableCell, Paper, Table, TableBody, TableRow } from "@mui/material";

interface PriceRowProps {
  total: string;
  size: string;
  price: string;
  reversedFieldsOrder: boolean;
  windowWidth: number;
}

const PriceRow: FunctionComponent<PriceRowProps> = ({
  total,
  size,
  price,
  reversedFieldsOrder = false,
  windowWidth,
}) => {
  return (
    <>
      <Wrapper
        data-testid="price--row"
        isRight={!reversedFieldsOrder}
        windowWidth={windowWidth}
      >
        {reversedFieldsOrder || windowWidth < MOBILE_WIDTH ? (
          <>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableBody>
                  <TableRow>
                    <TableCell className="price">{price}</TableCell>
                    <TableCell style={{ width:'300px' }}>{size}</TableCell>
                    <TableCell style={{ width:'300px' }}>{total}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </>
        ) : (
          <>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableBody>
                  <TableRow>
                    <TableCell>{total}</TableCell>
                    <TableCell style={{ width:'300px' }}>{size}</TableCell>
                    <TableCell style={{ width:'300px' }} className="price">{price}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default PriceRow;
