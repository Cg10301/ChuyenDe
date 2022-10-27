import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../../App.css";

import { Table, Button, Input, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import PATH_API from "../../API/path_api"


import Header from "../../components/layouts/header";
import Sider from "../../components/layouts/sider";
import Footer from "../../components/layouts/footer";
import { Layout } from "antd";

const { Content } = Layout;



export default function KhoaHoc(props) {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  const [editingData, setEditingData] = useState(null);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [TenKhoaHocTextInput, setTenKhoaHocTextInput] = useState("");

  const handleCancel = () => {
    setIsModalAddOpen(false);
    setIsModalEditOpen(false);
    setTenKhoaHocTextInput("");
  };

  const fetchData = (params = {}) => {
    setLoading(true);
    async function fetchData() {
      const response = await fetch(`${PATH_API}KhoaHoc`);
      const data = await response.json();
      return data;
    }
    fetchData().then((data) => {
      setDataSource(data);
      setLoading(false);
      setPagination({
        ...params.pagination,
      });
    });
  };

  useEffect(() => {
    fetchData({
      pagination,
    });
  }, []);

  const handleTableChange = (newPagination, filters, sorter) => {
    fetchData({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination: newPagination,
      ...filters,
    });
  };

  const onEditData = (record) => {
    setIsModalEditOpen(true);
    setEditingData({ ...record });
  };

  const resetEditing = () => {
    setIsModalEditOpen(false);
    setEditingData(null);
  };

  const columns = [
    {
      title: "Mã khóa học",
      dataIndex: "id",
      key: "id",

      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Tên khóa học",
      dataIndex: "TenKhoaHoc",
      key: "TenKhoaHoc",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.TenKhoaHoc.length - b.TenKhoaHoc.length,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              style={{ background: "#e6f7ff" }}
              autoFocus
              placeholder="Tìm kiếm..."
              value={selectedKeys[1]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                clearFilters();
                confirm();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.TenKhoaHoc.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      key: "action",
      title: "",
      align: "center",
      render: (record) => {
        return (
          <>
            <EditOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                onEditData(record);
              }}
            />
            <DeleteOutlined
              style={{ color: "red", marginLeft: "10px" }}
              onClick={() => {
                let text =
                  "Bạn muốn xóa khóa học " + record.TenKhoaHoc + " không? ";
                if (window.confirm(text) === true) {
                  setLoading(true);
                  fetch(`${PATH_API}KhoaHoc/${record.id}`, {
                    method: "DELETE",
                  })
                    .then((response) => response.json())
                    .then(() => {
                      fetchData({
                        pagination,
                      });
                    })
                    .then(() => {
                      console.log("Delete successful");
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                    });
                }
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <Layout hasSider>
      <Sider selectedKey="KhoaHoc" signOut={props.signOut} />
      <Layout className="site-layout">
        <Header />
        <Content
          className="content"
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            height: "550px",
          }}
        >
          <div className="site-layout-background">
            <div className="content-header">
              <h1>Quản lý khóa học</h1>
              <Button
                className="btn-add"
                type="primary"
                onClick={() => {
                  setIsModalAddOpen(true);
                }}
              >
                Thêm mới
              </Button>
            </div>
            <div className="content-container">
              <Table
                style={{ width: "100%" }}
                columns={columns}
                size="middle"
                rowKey="id"
                loading={loading}
                dataSource={dataSource}
                pagination={pagination}
                onChange={handleTableChange}
                bordered
              ></Table>
              {/* Form Add *********************************************** */}
              <Modal
                title="Thêm mới khóa học"
                open={isModalAddOpen}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Hủy
                  </Button>,
                ]}
                closable={false}
              >
                <form
                  id="form-add"
                  className="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setLoading(true);

                    const new_TenKhoaHoc = e.target.elements.TenKhoaHoc.value;
                    const new_data = {
                      TenKhoaHoc: new_TenKhoaHoc,
                    };
                    fetch(`${PATH_API}KhoaHoc`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(new_data),
                    })
                      .then((response) => response.json())
                      .then(() => {
                        fetchData({
                          pagination,
                        });
                      })
                      .catch((error) => {
                        console.error("Error:", error);
                      });
                    handleCancel();
                  }}
                >
                  <div className="form-input form-input-center">
                    <label htmlFor="TenKhoaHoc">Tên khóa học:</label>
                    <Input
                      name="TenKhoaHoc"
                      value={TenKhoaHocTextInput}
                      onChange={(e) => {
                        setTenKhoaHocTextInput(e.target.value);
                      }}
                    />
                  </div>
                  <Button type="primary" htmlType="submit">
                    Xác nhận
                  </Button>
                </form>
              </Modal>
              {/* Form Edit******************************************************* */}
              <Modal
                title="Sửa thông tin khóa học"
                open={isModalEditOpen}
                onCancel={handleCancel}
                footer={[
                  <Button
                    key="back"
                    onClick={() => {
                      setIsModalEditOpen(false);
                    }}
                  >
                    Hủy
                  </Button>,
                ]}
                closable={false}
              >
                <div name="form-edit" className="form">
                  <div className="form-input form-input-center">
                    <label htmlFor="edit_TenKhoaHoc">Tên khóa học:</label>
                    <Input
                      name="edit_TenKhoaHoc"
                      value={editingData?.TenKhoaHoc}
                      onChange={(e) => {
                        setEditingData((pre) => {
                          return { ...pre, TenKhoaHoc: e.target.value };
                        });
                      }}
                    />
                  </div>

                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      dataSource.map((data) => {
                        if (data.id === editingData.id) {
                          setLoading(true);
                          fetch(`${PATH_API}KhoaHoc/${editingData.id}`, {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(editingData),
                          })
                            .then((response) => response.json())
                            .then(() => {
                              fetchData({
                                pagination,
                              });
                            })
                            .catch((error) => {
                              console.error("Error:", error);
                            });
                          return editingData;
                        }
                        return data;
                      });
                      resetEditing();
                    }}
                  >
                    Xác nhận
                  </Button>
                </div>
              </Modal>
            </div>
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}
