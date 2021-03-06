# Order Book

An Order Book app built with React/Typescript and powered by WebSockets.

<hr />

## Tech stack

- React / Typescript
- SASS / styled-components
- WebSockets / react-use-websocket

## Application features:

### 1. Order Book

1.  The Order Book consists of two sides: the buy side and the sell side.
2.  Both sides contain information about the amount of orders opened at each price level.
3.  Each level displays the:
    1. Price - this is what defines the level. As orders must be placed at a price that is a
       multiple of the selected markets tick size (0.5) each level will be an increment of 0.5 (as
       long as there is an order open at that level).
    2. Size - the total quantity of contracts derived from open orders that have been placed at
       this level.
    3. Total - the summed amount of contracts derived from open orders that reside in the
       book at this level and above. To calculate the total of a given level we take the size of the
       current level and sum the sizes leading to this price level in the order book. The total is
       also used to calculate the depth visualizer (colored bars behind the levels), the depth of
       each level is calculated by taking that level's total as a percentage of the highest total in
       the book.

### 2. Grouping Select Box

1.  By default the orders are grouped by the select markets ticket size (0.5).
2.  Possible toggling of the grouping: between 0.5, 1, 2.5 for XBTUSD market and 0.05, 0.1 and 0.25 for ETHUSD market.
3.  To group levels we combine the levels rounded down to the nearest group size e.g. if we change our grouping from 0.5 to 1 then we would combine the data from prices 1000 and 1000.5 and display it under a single level in the orderbook with the price 1000.

### 3. Change Feed Button

1. Changes selected market between PI_XBTUSD and PI_ETHUSD.
2. Supports dynamic grouping logic - handles groupings for XBT (0.5, 1, 2.5) and groupings for ETH (0.05, 0.1, 0.25).

### 4. Kill Feed Button

1. Clicking this button stops the feed.
2. Clicking this button second time renews the feed.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
