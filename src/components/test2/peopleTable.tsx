"use client";
import { Button, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { deletePerson, loadFormFromPerson } from "@/features/peopleSlice";

export default function PeopleTable() {
  const dispatch = useDispatch();
  const data = useSelector((s: RootState) => s.people.items);

  const columns: ColumnsType = [
    { title: "First name", dataIndex: "firstName" },
    { title: "Last name", dataIndex: "lastName" },
    { title: "Email", dataIndex: "email" },
    { title: "Age", dataIndex: "age", width: 80 },
    {
      title: "Actions",
      key: "actions",
      width: 180,
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            onClick={() => dispatch(loadFormFromPerson(record.id))}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete this person?"
            okText="Delete"
            okButtonProps={{ danger: true }}
            onConfirm={() => dispatch(deletePerson(record.id))}
          >
            <Button size="small" danger>
              Delete
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
      pagination={{
        pageSize: 5,
        showSizeChanger: true,
        pageSizeOptions: [5, 10, 20],
      }}
    />
  );
}
