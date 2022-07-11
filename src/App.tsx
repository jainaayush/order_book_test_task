import React, { useState } from "react";
import GlobalStyle from "./Style/global";
import Header from "./Components/Header";

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
  const [isPageVisible, setIsPageVisible] = useState(true);

  return (
    <>
      {isPageVisible ? (
        <>
          <GlobalStyle />
          <Header
            options={options}
            isFeedKilled={true}
            selectedMarket={"productId"}
          />
        </>
      ) : (
        "HIDDEN PAGE."
      )}
    </>
  );
}

export default App;
