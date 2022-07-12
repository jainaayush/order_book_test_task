import React, { FunctionComponent } from "react";
import styled from "styled-components";

export const Wrapper = styled.div`
  color: #ffffff;
  font-size: 1.2em;
  width: 100%;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
`;

interface StatusMessageProps {
  selectedMarket: string;
  isFeedKilled: boolean;
}

const StatusMessage: FunctionComponent<StatusMessageProps> = ({
  selectedMarket = "",
  isFeedKilled,
}) => {
  return (
    <Wrapper>
      {isFeedKilled ? "Feed killed." : `Selected market: ${selectedMarket}`}
    </Wrapper>
  );
};

export default StatusMessage;
