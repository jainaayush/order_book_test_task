import React, { useEffect, useState } from "react";
import GlobalStyle from "./Style/global";
import Header from "./Components/Header";
import OrderBook from "./Components/OrderBook";
import { clearOrdersState } from "./Components/OrderBook/orderbookSlice";
import { useAppDispatch } from "./Hooks";

export const ProductIds = {
  XBTUSD: "PI_XBTUSD",
  ETHUSD: "PI_ETHUSD",
};

const options: any = {
  PI_XBTUSD: [0.5, 1, 2.5],
  PI_ETHUSD: [0.05, 0.1, 0.25],
};

export const ProductsMap: any = {
  PI_XBTUSD: "PI_ETHUSD",
  PI_ETHUSD: "PI_XBTUSD",
};

function App() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [productId, setProductId] = useState(ProductIds.XBTUSD);
  const [isFeedKilled, setIsFeedKilled] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const dispatch = useAppDispatch();

  // Window width detection
  useEffect(() => {
    window.onresize = () => {
      setWindowWidth(window.innerWidth);
    };
    setWindowWidth(() => window.innerWidth);
  }, []);

  // Page Visibility detection
  useEffect(() => {
    // Set the name of the hidden property and the change event for visibility
    let hidden: string = "";
    let visibilityChange: string = "";

    if (typeof document.hidden !== "undefined") {
      // Opera 12.10 and Firefox 18 and later support
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else {
      // @ts-ignore
      if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
      } else {
        // @ts-ignore
        if (typeof document.webkitHidden !== "undefined") {
          hidden = "webkitHidden";
          visibilityChange = "webkitvisibilitychange";
        }
      }
    }

    const handleVisibilityChange = () => {
      const isHidden = document["hidden"];
      if (isHidden) {
        document.title = "Orderbook Paused";
        setIsPageVisible(false);
      } else {
        document.title = "Orderbook";
        setIsPageVisible(true);
      }
    };

    // Warn if the browser doesn't support addEventListener or the Page Visibility API
    if (typeof document.addEventListener === "undefined" || hidden === "") {
      console.log(
        "This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API."
      );
    } else {
      // Handle page visibility change
      document.addEventListener(
        visibilityChange,
        handleVisibilityChange,
        false
      );
    }
  }, []);

  const toggleProductId = (): void => {
    dispatch(clearOrdersState());
    setProductId(ProductsMap[productId]);
  };

  const changeFeed = (): void => {
    setIsFeedKilled(!isFeedKilled);
  };

  return (
    <>
      {isPageVisible ? (
        <>
          <GlobalStyle />
          <Header
            options={options[productId]}
            changeFeedCallback={toggleProductId}
            killFeedCallback={changeFeed}
            isFeedKilled={isFeedKilled}
            selectedMarket={productId}
          />
          <OrderBook
            windowWidth={windowWidth}
            productId={productId}
            isFeedKilled={isFeedKilled}
          />
        </>
      ) : (
        "HIDDEN PAGE."
      )}
    </>
  );
}

export default App;
