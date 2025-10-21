"use client";
import { Button, Form, Input, InputNumber, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  clearForm,
  createPerson,
  setForm,
  updatePerson,
} from "@/features/peopleSlice";

import { useTranslation } from "react-i18next";

export default function PersonForm() {
  const dispatch = useDispatch();
  const form = useSelector((s: RootState) => s.people.form);
  const { t } = useTranslation();
  const onFinish = () => {
    if (form.id) dispatch(updatePerson());
    else dispatch(createPerson());
  };

  return (
      <Form
        layout="vertical"
        initialValues={form}
        onValuesChange={(_, all) => dispatch(setForm(all))}
        onFinish={onFinish}
        key={form.id || "create"} // reset fields on editing swap
      >
        <Form.Item
          label={t("test2.firstName")}
          name="firstName"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input placeholder="John" />
        </Form.Item>
        <Form.Item
          label={t("test2.lastName")}
          name="lastName"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input placeholder="Doe" />
        </Form.Item>
        <Form.Item
          label={t("test2.email")}
          name="email"
          rules={[{ required: true, type: "email", message: "Valid email" }]}
        >
          <Input placeholder="john@company.com" />
        </Form.Item>
        <Form.Item label={t("test2.age")} name="age">
          <InputNumber style={{ width: "100%" }} min={0} max={120} />
        </Form.Item>

        <Space>
          <Button type="primary" htmlType="submit">
            {form.id ? t("test2.update") : t("test2.create")}
          </Button>
          <Button htmlType="button" onClick={() => dispatch(clearForm())}>
            {t("test2.clear")}
          </Button>
        </Space>
      </Form>
  );
}
