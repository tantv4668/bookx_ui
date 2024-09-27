import { BaseTradingPage } from "@orderly.network/react/esm/page/trading/page";
import { DesktopTradingPage } from "@orderly.network/react/esm/page/trading/desktop/trading";
import { MobileTradingPage } from "@orderly.network/react/esm/page/trading/mobile/trading";

export { DataListView } from "./desktop";

type TradingPage = typeof BaseTradingPage & {
  mobile: typeof MobileTradingPage;
  desktop: typeof DesktopTradingPage;
};

const TradingPage = BaseTradingPage as TradingPage;
TradingPage.mobile = MobileTradingPage;
TradingPage.desktop = DesktopTradingPage;

export { TradingPage };
