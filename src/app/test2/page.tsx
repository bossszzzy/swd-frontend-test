"use client";

import { Col, Row } from "antd";
import PersonForm from "@/components/test2/personForm";
import PeopleTable from "@/components/test2/peopleTable";

export default function Page() {
  return (
    <div style={{ padding: 24 }}>
      <Row gutter={24}>
        <Col xs={24} md={10} lg={8}>
          <PersonForm />
        </Col>
        <Col xs={24} md={14} lg={16}>
          <PeopleTable />
        </Col>
      </Row>
    </div>
  );
}
