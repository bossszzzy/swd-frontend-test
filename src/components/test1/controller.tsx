"use client";

import { Button, Space } from "antd";
import "../../app/test1.css";
import { useTranslation } from "react-i18next";

type Props = {
  onMoveShapeLeft: () => void;
  onMoveShapeRight: () => void;
  onMovePosition: () => void;
  onReset: () => void;
};

export default function Controller({
  onMoveShapeLeft,
  onMoveShapeRight,
  onMovePosition,
}: Props) {
  const style = { height: "200px" };
  const { t } = useTranslation();
  return (
    <Space wrap>
      <Button onClick={onMoveShapeLeft} className={"card"} style={style}>
        <div className="triangle-left"></div>
        <div className={"abs"}>{t("test1.moveShape")}</div>
      </Button>
      <Button onClick={onMovePosition} className={"cardLong"} style={style}>
        <div className="triangle-down"></div>
        <div className="triangle-up"></div>
        <div className={"abs"}>{t("test1.movePosition")}</div>
      </Button>
      <Button onClick={onMoveShapeRight} className={"card"} style={style}>
        <div className="triangle-right"></div>
        <div className={"abs"}>{t("test1.moveShape")}</div>
      </Button>
    </Space>
  );
}
