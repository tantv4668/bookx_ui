'use client';
import { FC, useContext } from "react";
// import { Footer } from "@/layout/footer";
import { DataList } from "./dataList";
import { OrderlyAppContext } from "../../provider";
import { SystemStatusBar } from "../../block/systemStatusBar";
import { TopNavbar } from "@/app/portfolio/common/topNavbar";
import { Layout } from "../../layout";
import { Header } from "../../layout/header";

// const { Header, Content } = Layout;

export const Portfolio: FC = (props) => {
  const { footerStatusBarProps } = useContext(OrderlyAppContext);

  return (
    <div>asdasdas</div>

  );
};
