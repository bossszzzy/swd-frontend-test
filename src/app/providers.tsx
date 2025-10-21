"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { ConfigProvider } from "antd";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ConfigProvider>{children}</ConfigProvider>
    </Provider>
  );
}
