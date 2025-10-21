"use client";

import React from "react";
import { Dropdown, Button, type MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

type ActionKey = "th" | "en";

export default function BasicDropdown() {
  const { t, i18n } = useTranslation();

  const items: MenuProps["items"] = [
    { key: "th", label: t("langTh") },
    { key: "en", label: t("langEn") },
  ];

  const onClick: MenuProps["onClick"] = ({ key }) => {
    const k = key as ActionKey;
    i18n.changeLanguage(k);
    localStorage.setItem("lang", k);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end"
      }}
    >
      <Dropdown menu={{ items, onClick }}>
        <Button>
          {t("menu")}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}
