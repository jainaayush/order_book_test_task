import React, { FunctionComponent } from "react";
import { MenuItem, Select } from "@material-ui/core";

interface SelectGroupProps {
  options: number[];
}

export const SelectGroup: FunctionComponent<SelectGroupProps> = ({
  options,
}) => {
  return (
    <>
      <Select
        labelId="group-select-label"
        id="group-select"
        value={"groupingSize"}
        label="Group"
      >
        <MenuItem>option1</MenuItem>
      </Select>
    </>
  );
};

export default SelectGroup;
