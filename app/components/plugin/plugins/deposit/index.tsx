import { installExtension } from "../../install";
import { ExtensionPosition } from "../../types";
import Comp from "./comp";

// const Comp = lazy(() => import("./comp"));

installExtension<{
  onOk: () => void;
}>({
  name: "swap-deposit",
  scope: ["*"],
  positions: [ExtensionPosition.DepositForm],
})((props) => {
  console.log(props);
  return <Comp />;
});
