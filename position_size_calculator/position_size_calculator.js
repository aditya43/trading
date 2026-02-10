// ===== INPUTS =====
const accountSize = 50000;        // Set account size
const buyTriggerPrice = 65.71;   // <-- Set Buy trigger price
const sl = 63;                // <-- Set SL price

const TICK_SIZE = 0.1;

// ===== HELPER FUNCTION =====
function roundToTick(price, tick = TICK_SIZE, direction = "up") {
    return direction === "up"
        ? Math.ceil(price / tick) * tick
        : Math.floor(price / tick) * tick;
}

// ===== TICK-SAFE PRICES =====
const buyTriggerPriceTickSafe = roundToTick(buyTriggerPrice, TICK_SIZE, "up");
const slTickSafe = roundToTick(sl, TICK_SIZE, "down");

// ===== BUY LIMIT CALCULATIONS =====
const buyLimitPrice05PercentSlippage = roundToTick(
    buyTriggerPrice * 1.005,
    TICK_SIZE,
    "up"
);

const buyLimitPrice1PercentSlippage = roundToTick(
    buyTriggerPrice * 1.01,
    TICK_SIZE,
    "up"
);

// ===== POSITION SIZE =====
const positionSize05PercentSlippage = Math.round(
    accountSize / buyLimitPrice05PercentSlippage
);

const positionSize1PercentSlippage = Math.round(
    accountSize / buyLimitPrice1PercentSlippage
);

// ===== SL % CALCULATIONS =====
const slPercent05 = (
    ((buyLimitPrice05PercentSlippage - slTickSafe) / buyLimitPrice05PercentSlippage) * 100
);

const slPercent1 = (
    ((buyLimitPrice1PercentSlippage - slTickSafe) / buyLimitPrice1PercentSlippage) * 100
);

// ===== TARGET CALCULATIONS (FROM BUY TRIGGER PRICE) =====
const target20 = roundToTick(buyTriggerPrice * 1.20, TICK_SIZE, "down");
const target25 = roundToTick(buyTriggerPrice * 1.25, TICK_SIZE, "down");
const target30 = roundToTick(buyTriggerPrice * 1.30, TICK_SIZE, "down");

// ===== OUTPUT =====
console.log(`Account Size: ${accountSize}`);
console.log(`Buy Trigger Price: ${buyTriggerPriceTickSafe}`);
console.log(`SL: ${slTickSafe}`);

console.log(`Buy Limit Price With 0.5% Slippage: ${buyLimitPrice05PercentSlippage.toFixed(1)}`);
console.log(`Buy Limit Price With 1% Slippage: ${buyLimitPrice1PercentSlippage.toFixed(1)}`);

console.log(`QTY With 0.5% Slippage: ${positionSize05PercentSlippage}`);
console.log(`QTY With 1% Slippage: ${positionSize1PercentSlippage}`);

console.log(`SL % from Buy (0.5% Slippage): ${slPercent05.toFixed(2)}%`);
console.log(`SL % from Buy (1% Slippage): ${slPercent1.toFixed(2)}%`);

console.log(`Target 20%: ${target20}`);
console.log(`Target 25%: ${target25}`);
console.log(`Target 30%: ${target30}`);
