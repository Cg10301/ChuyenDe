import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../../App.css";
import { Table, Button, Input, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Header from "../layouts/header";
import Sider from "../layouts/sider";
import Footer from "../layouts/footer";
import { Layout } from "antd";
import PATH_API from "../../API/path_api"


const { Content } = Layout;



export default function Dashboard(props) {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });
  const [editingData, setEditingData] = useState(null);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [tenKKTTextInput, settenKKTTextInput] = useState("");

  const handleCancel = () => {
    setIsModalAddOpen(false);
    setIsModalEditOpen(false);
    settenKKTTextInput("");
  };

  const fetchData = (params = {}) => {
    setLoading(true);
    async function fetchData() {
      const response = await fetch(
        `${PATH_API}KhoiKienThuc`
      );
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
      title: "Mã khối kiến thức",
      dataIndex: "id",
      key: "id",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.id - b.id,
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
              value={selectedKeys[0]}
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
        return record.id.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Tên khối kiến thức",
      dataIndex: "TenKhoiKienThuc",
      key: "TenKhoiKienThuc",
      
      sorter: (a, b) => a.TenKhoiKienThuc.length - b.TenKhoiKienThuc.length,
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
        return record.TenKhoiKienThuc.toLowerCase().includes(value.toLowerCase());
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
                let text = "Bạn muốn xóa khối kiến thức " + record.TenKhoiKienThuc + " không? ";
                if (window.confirm(text) === true) {
                  setLoading(true);
                  fetch(`${PATH_API}KhoiKienThuc/${record.id}`, {
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
      <Sider selectedKey="khoiKT" signOut={props.signOut}/>
      <Layout className="site-layout">
        <Header/>
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
        <h1>Quản lý khối kiến thức</h1>
        <Button className="btn-add" type="primary" onClick={()=>{setIsModalAddOpen(true)}}>
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
                title="Thêm mới khối kiến thức"
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
                    const new_TenKhoiKienThuc = e.target.elements.TenKhoiKienThuc.value;
                    const new_data = {
                     
                      TenKhoiKienThuc: new_TenKhoiKienThuc,
                    };
                    fetch(`${PATH_API}KhoiKienThuc`, {
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
                    <label htmlFor="TenKhoiKienThuc">Tên khối kiến thức:</label>
                    <Input
                      name="TenKhoiKienThuc"
                      value={tenKKTTextInput}
                      onChange={(e) => {
                        settenKKTTextInput(e.target.value);
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
                title="Sửa thông tin khối kiến thức"
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
                    <label htmlFor="edit_tenkhoahoc">Tên khóa học:</label>
                    <Input
                      name="edit_tenkhoahoc"
                      value={editingData?.TenKhoiKienThuc}
                      onChange={(e) => {
                        setEditingData((pre) => {
                          return { ...pre, TenKhoiKienThuc: e.target.value };
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
                          fetch(`${PATH_API}KhoiKienThuc/${editingData.id}`, {
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
