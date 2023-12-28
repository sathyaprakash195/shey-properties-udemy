"use client";
import { User } from "@prisma/client";
import { Table } from "antd";
import dayjs from "dayjs";
import React from "react";

function UsersTable({ users }: { users: User[] }) {
  const columns = [
    {
      title: "Profile Pic",
      dataIndex: "profilePic",
      render(profilePic: string) {
        return (
          <img
            src={profilePic}
            alt="Profile Pic"
            width="35"
            className="rounded-full"
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Registered On",
      dataIndex: "createdAt",
      render(createdAt: string) {
        return dayjs(createdAt).format("MMM DD YYYY HH:mm A");
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render(status: string, record: User) {
        if (record.isActive) {
          return "Active";
        }
        return "Inactive";
      },
    },
    {
      title: "Is Admin",
      dataIndex: "status",
      render(isAdmin: boolean) {
        if (isAdmin) {
          return "Yes";
        }
        return "No";
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render(action: any, record: User) {
        return <></>
      },
    },
  ];
  return (
    <div>
      <Table dataSource={users} columns={columns} />
    </div>
  );
}

export default UsersTable;
