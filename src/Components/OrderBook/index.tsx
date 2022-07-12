import React, { FunctionComponent, useEffect } from "react";
import useWebSocket from "react-use-websocket";

import TitleRow from "./TitleRow";
import PriceRow from "./PriceRow";
import Spread from "../Spread";
import { useAppDispatch, useAppSelector } from "../../Hooks";
import {
  addAsks,
  addBids,
  addExistingState,
  selectAsks,
  selectBids,
} from "./orderbookSlice";
import { MOBILE_WIDTH, ORDERBOOK_LEVELS } from "../../Constants/constants";
import Loader from "../Loader";
import { ProductsMap } from "../../App";
import { formatNumber } from "../../Helpers";

import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  min-height: 31.25em;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: flex-start;
  border-color: #263946;
  margin-top: 120px;

  @media only screen and (min-width: 800px) {
    flex-direction: row;
    justify-content: center;
  }
`;

export const TableWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  color: #bfc1c8;
  div {
    border-radius: 0px !important;
  }

  @media only screen and (min-width: 800px) {
    width: 50%;
    padding: 0px 20px;
    margin-top: 10px;
  }
`;

const WSS_FEED_URL: string = "wss://www.cryptofacilities.com/ws/v1";

export enum OrderType {
  BIDS,
  ASKS,
}

interface OrderBookProps {
  windowWidth: number;
  productId: string;
  isFeedKilled: boolean;
}

interface Delta {
  bids: number[][];
  asks: number[][];
}

let currentBids: number[][] = [];
let currentAsks: number[][] = [];

const OrderBook: FunctionComponent<OrderBookProps> = ({
  windowWidth,
  productId,
  isFeedKilled,
}) => {
  const bids: number[][] = useAppSelector(selectBids);
  const asks: number[][] = useAppSelector(selectAsks);
  const dispatch = useAppDispatch();
  const { sendJsonMessage, getWebSocket } = useWebSocket(WSS_FEED_URL, {
    onOpen: () => console.log("WebSocket connection opened."),
    onClose: () => console.log("WebSocket connection closed."),
    shouldReconnect: (closeEvent) => true,
    onMessage: (event: WebSocketEventMap["message"]) => processMessages(event),
  });

  const processMessages = (event: { data: string }) => {
    const response = JSON.parse(event.data);

    if (response.numLevels) {
      dispatch(addExistingState(response));
    } else {
      process(response);
    }
  };

  useEffect(() => {
    function connect(product: string) {
      const unSubscribeMessage = {
        event: "unsubscribe",
        feed: "book_ui_1",
        product_ids: [ProductsMap[product]],
      };
      sendJsonMessage(unSubscribeMessage);

      const subscribeMessage = {
        event: "subscribe",
        feed: "book_ui_1",
        product_ids: [product],
      };
      sendJsonMessage(subscribeMessage);
    }

    if (isFeedKilled) {
      getWebSocket()?.close();
    } else {
      connect(productId);
    }
  }, [isFeedKilled, productId, sendJsonMessage, getWebSocket]);

  const process = (data: Delta) => {
    if (data?.bids?.length > 0) {
      currentBids = [...currentBids, ...data.bids];

      if (currentBids.length > ORDERBOOK_LEVELS) {
        dispatch(addBids(currentBids));
        currentBids = [];
        currentBids.length = 0;
      }
    }
    if (data?.asks?.length >= 0) {
      currentAsks = [...currentAsks, ...data.asks];

      if (currentAsks.length > ORDERBOOK_LEVELS) {
        dispatch(addAsks(currentAsks));
        currentAsks = [];
        currentAsks.length = 0;
      }
    }
  };

  const formatPrice = (arg: number): string => {
    return arg.toLocaleString("en", {
      useGrouping: true,
      minimumFractionDigits: 2,
    });
  };

  const buildPriceLevels = (
    levels: number[][],
    orderType: OrderType = OrderType.BIDS
  ): React.ReactNode => {
    const sortedLevelsByPrice: number[][] = [...levels].sort(
      (currentLevel: number[], nextLevel: number[]): number => {
        let result: number = 0;
        if (orderType === OrderType.BIDS || windowWidth < MOBILE_WIDTH) {
          result = nextLevel[0] - currentLevel[0];
        } else {
          result = currentLevel[0] - nextLevel[0];
        }
        return result;
      }
    );

    return sortedLevelsByPrice.map((level, idx) => {
      const calculatedTotal: number = level[2];
      const total: string = formatNumber(calculatedTotal);
      const size: string = formatNumber(level[1]);
      const price: string = formatPrice(level[0]);

      return (
        <>
          <div key={idx}>
            <PriceRow
              key={size + total}
              total={total}
              size={size}
              price={price}
              reversedFieldsOrder={orderType === OrderType.ASKS}
              windowWidth={windowWidth}
            />
          </div>
        </>
      );
    });
  };

  return (
    <Wrapper style={{}}>
      {bids.length && asks.length ? (
        <>
          <TableWrapper>
            {windowWidth > MOBILE_WIDTH && (
              <TitleRow windowWidth={windowWidth} reversedFieldsOrder={false} />
            )}
            <div>{buildPriceLevels(bids, OrderType.BIDS)}</div>
          </TableWrapper>
          <Spread bids={bids} asks={asks} />
          <TableWrapper>
            <TitleRow windowWidth={windowWidth} reversedFieldsOrder={true} />
            <div>{buildPriceLevels(asks, OrderType.ASKS)}</div>
          </TableWrapper>
        </>
      ) : (
        <Loader />
      )}
    </Wrapper>
  );
};

export default OrderBook;
