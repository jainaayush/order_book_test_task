import React, { ChangeEvent, FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks";
import { selectGrouping, setGrouping } from "../OrderBook/orderbookSlice";
import { MenuItem, Select } from "@material-ui/core";

interface SelectGroupProps {
  options: number[];
}

export const SelectGroup: FunctionComponent<SelectGroupProps> = ({
  options,
}) => {
  const groupingSize: number = useAppSelector(selectGrouping);
  const dispatch = useAppDispatch();

  const handleChange = (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    return dispatch(setGrouping(Number(event.target.value) as any));
  };

  return (
    <>
      <Select
        labelId="group-select-label"
        id="group-select"
        value={groupingSize}
        label="Group"
        onChange={handleChange}
      >
        {options.map((option, idx) => (
          <MenuItem key={idx} value={option}>
            Group {option}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default SelectGroup;
