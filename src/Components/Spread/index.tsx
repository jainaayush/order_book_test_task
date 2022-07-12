import React, { FunctionComponent } from "react";
import { formatNumber } from "../../Helpers";
import styled from "styled-components";

export const Wrapper = styled.div`
  color: #fff;
  background-color: #07879b;
  width: 100%;
  text-align: center;
  padding: 0.7em 0;
  margin-top: 78px;

  @media only screen and (min-width: 800px) {
    position: absolute;
    top: -6px;
  }
`;

interface SpreadProps {
  bids: number[][];
  asks: number[][];
}

const Spread: FunctionComponent<SpreadProps> = ({ bids, asks }) => {
  const getHighestBid = (bids: number[][]): number => {
    const prices: number[] = bids.map((bid) => bid[0]);
    return Math.max.apply(Math, prices);
  };

  const getLowestAsk = (asks: number[][]): number => {
    const prices: number[] = asks.map((ask) => ask[0]);
    return Math.min.apply(Math, prices);
  };

  const getSpreadAmount = (bids: number[][], asks: number[][]): number =>
    Math.abs(getHighestBid(bids) - getLowestAsk(asks));

  const getSpreadPercentage = (spread: number, highestBid: number): string =>
    `(${((spread * 100) / highestBid).toFixed(2)}%)`;

  return (
    <Wrapper>
      Spread: {formatNumber(getSpreadAmount(bids, asks))}
      {getSpreadPercentage(getSpreadAmount(bids, asks), getHighestBid(bids))}
    </Wrapper>
  );
};

export default Spread;
