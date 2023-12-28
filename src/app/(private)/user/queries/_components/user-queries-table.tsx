"use client";
import { Property, Query } from "@prisma/client";
import { Table } from "antd";
import dayjs from "dayjs";
import React from "react";

function UserQueriesTable({ queries }: { queries: Query[] }) {
  const columns = [
    {
      title: "Property",
      dataIndex: "property",
      render: (property: Property) => property.name,
    },
    {
      title: "Quote Amount",
      dataIndex: "quoteAmount",
      render: (quoteAmount: number) => `$ ${quoteAmount}`,
    },
    {
      title: "Message",
      dataIndex: "message",
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (createdAt: string) =>
        dayjs(createdAt).format("DD MMM YYYY hh:mm A"),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={queries} />
    </div>
  );
}

export default UserQueriesTable;
