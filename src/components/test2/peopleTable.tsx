"use client";
import { Button, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { deletePerson, loadFormFromPerson } from "@/features/peopleSlice";
import { useTranslation } from "react-i18next";

export default function PeopleTable() {
  const dispatch = useDispatch();
  const data = useSelector((s: RootState) => s.people.items);
  const { t } = useTranslation();

  const columns: ColumnsType = [
    { title: t("test2.firstName"), dataIndex: "firstName" },
    { title: t("test2.lastName"), dataIndex: "lastName" },
    { title: t("test2.email"), dataIndex: "email" },
    { title: t("test2.age"), dataIndex: "age", width: 80 },
    {
      title: t("test2.manage"),
      key: "actions",
      width: 180,
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            onClick={() => dispatch(loadFormFromPerson(record.id))}
          >
            {t("test2.edit")}
          </Button>
          <Popconfirm
            title="Delete this person?"
            okText="Delete"
            okButtonProps={{ danger: true }}
            onConfirm={() => dispatch(deletePerson(record.id))}
            >
            <Button size="small" danger>
            {t("test2.delete")}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
    />
  );
}
