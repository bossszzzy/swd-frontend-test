"use client";
import { Button, Card, Form, Input, InputNumber, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  clearForm,
  createPerson,
  setForm,
  updatePerson,
} from "@/features/peopleSlice";

export default function PersonForm() {
  const dispatch = useDispatch();
  const form = useSelector((s: RootState) => s.people.form);

  const onFinish = () => {
    if (form.id) dispatch(updatePerson());
    else dispatch(createPerson());
  };

  return (
    <Card
      title={form.id ? "Edit Person" : "Create Person"}
      style={{ maxWidth: 520 }}
    >
      <Form
        layout="vertical"
        initialValues={form}
        onValuesChange={(_, all) => dispatch(setForm(all))}
        onFinish={onFinish}
        key={form.id || "create"} // reset fields on editing swap
      >
        <Form.Item
          label="First name"
          name="firstName"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input placeholder="John" />
        </Form.Item>
        <Form.Item
          label="Last name"
          name="lastName"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input placeholder="Doe" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email", message: "Valid email" }]}
        >
          <Input placeholder="john@company.com" />
        </Form.Item>
        <Form.Item label="Age" name="age">
          <InputNumber style={{ width: "100%" }} min={0} max={120} />
        </Form.Item>

        <Space>
          <Button type="primary" htmlType="submit">
            {form.id ? "Update" : "Create"}
          </Button>
          <Button htmlType="button" onClick={() => dispatch(clearForm())}>
            Clear
          </Button>
        </Space>
      </Form>
    </Card>
  );
}
