import React from "react";
import { Dropdown, Button, message, type MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";

type ActionKey = "edit" | "delete" | "view";

const items: MenuProps["items"] = [
  { key: "edit", label: "แก้ไข" },
  { key: "delete", label: "ลบ" },
  { key: "view", label: "ดูรายละเอียด" },
];

const actionMap: Record<ActionKey, () => void> = {
  edit: () => message.info("กำลังแก้ไข..."),
  delete: () => message.error("ลบข้อมูลแล้ว"),
  view: () => message.success("เปิดรายละเอียด"),
};

const onClick: MenuProps["onClick"] = ({ key }) => {
  const k = key as ActionKey;
  actionMap[k]?.();
};

export default function BasicDropdown() {
  return (
    <Dropdown menu={{ items, onClick }}>
      <Button>
        เมนู <DownOutlined />
      </Button>
    </Dropdown>
  );
}
