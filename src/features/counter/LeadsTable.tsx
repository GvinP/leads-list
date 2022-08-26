import { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

import "antd/dist/antd.css";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { Table, Tag, Card, Input, Divider, Typography, Avatar } from "antd";
import { fetchLeads } from "./leadsSlice";
import { Contact2 } from "./leadsAPI";
import moment from 'moment'
const { Search } = Input;

type TableData = {
  key: number;
  name: string;
  status: number;
  date: number;
  responsible: number;
  contacts: Contact2[];
  price: number;
};

export function LeadsTable() {
  const leads = useAppSelector((state) => state.leads.leads);
  const users = useAppSelector((state) => state.leads.users);
  const pipeline = useAppSelector((state) => state.leads.pipelines);
  const isLoading = useAppSelector((state) => state.leads.isLoading);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");

  const columns = [
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Статус",
      key: "status",
      dataIndex: "status",
      render: (status: number) => (
        <Tag
          color={
            pipeline._embedded.statuses.find((st) => st.id === status)?.color
          }
          style={{ color: "rgba(0, 0, 0, 0.65)" }}
          key={status}
        >
          {pipeline._embedded.statuses.find((st) => st.id === status)?.name}
        </Tag>
      ),
    },
    {
      title: "Ответственный",
      key: "responsible",
      dataIndex: "responsible",
      render: (responsible: number) => (
        <div style={{ display: "flex" }} key={responsible * Math.random()}>
          <Avatar size="small" icon={<UserOutlined />} />
          <p style={{marginLeft: 15}}>{users.find((user) => user.id === responsible)?.name}</p>
        </div>
      ),
    },

    {
      title: "Дата создания",
      dataIndex: "date",
      key: "date",
      render: (data: string) => (
        <p key={data}>{moment(data).format('LL')}</p>
      )
    },
    {
      title: "Бюджет",
      dataIndex: "price",
      key: "price ",
    },
  ];

  const data: TableData[] = leads?.reduce((acc, el) => {
    acc.push({
      key: +el.id,
      name: el.name,
      status: el.status_id,
      responsible: el.responsible_user_id,
      date: el.created_at,
      contacts: el.contacts,
      price: el.price,
    });
    return acc;
  }, [] as TableData[]);

  useEffect(() => {
    dispatch(fetchLeads());
  }, []);

  useEffect(() => {
    if (search.length > 2) {
      dispatch(fetchLeads(search));
    }
  }, [search]);

  const onSearch = (search: string) => dispatch(fetchLeads(search));
  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          Список сделок
        </Typography.Title>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "200px" }}
        />
      </div>
      <Divider />
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <>
              {record?.contacts?.map((contact) => (
                <div style={{ display: "flex" }} key={contact.id}>
                  <Avatar size="small" icon={<UserOutlined />} />
                  <span style={{ marginLeft: 15 }}>{contact.name}</span>
                  {contact?.custom_fields_values?.find(
                    (value) => value.field_name === "Phone"
                  )?.values[0].value ? (
                    <a
                      href={`tel:${
                        contact?.custom_fields_values?.find(
                          (value) => value.field_name === "Phone"
                        )?.values[0].value
                      }`}
                      style={{ marginLeft: 15 }}
                    >
                      <PhoneOutlined />
                    </a>
                  ) : null}
                  {contact?.custom_fields_values?.find(
                    (value) => value.field_name === "Email"
                  )?.values[0].value ? (
                    <a
                      href={`mailto:${
                        contact?.custom_fields_values?.find(
                          (value) => value.field_name === "Email"
                        )?.values[0].value
                      }`}
                      style={{ marginLeft: 15 }}
                    >
                      <MailOutlined />
                    </a>
                  ) : null}
                </div>
              ))}
            </>
          ),
        }}
        dataSource={data}
        pagination={false}
        loading={isLoading}
      />
    </Card>
  );
}
