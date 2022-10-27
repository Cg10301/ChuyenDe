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



export default function Mon(props) {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });
  const [editingData, setEditingData] = useState(null);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [TenMonHocTextInput, setTenMonHocTextInput] = useState("");
  const [MaMonHocTextInput, setMaMonHocTextInput] = useState("");
  const [soTCTextInput, setsoTCTextInput] = useState("");
  const [dktqTextInput, setdktqTextInput] = useState("");
  const [SoGioTextInput, setSoGioTextInput] = useState("");
  const [HeSoTextInput, setHeSoTextInput] = useState("");

  const handleCancel = () => {
    setIsModalAddOpen(false);
    setIsModalEditOpen(false);
    setMaMonHocTextInput("");
    setTenMonHocTextInput("");
    setsoTCTextInput("");
    setdktqTextInput("");
    setSoGioTextInput("");
    setHeSoTextInput("");
  };

  const fetchData = (params = {}) => {
    setLoading(true);
    async function fetchData() {
      const response = await fetch(`${PATH_API}MonHoc`);
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
      title: "Mã học phần",
      dataIndex: "MaMonHoc",
      key: "MaMonHoc",

      sorter: (a, b) => a.MaMonHoc.length - b.MaMonHoc.length,
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
        return record.MaMonHoc.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Tên học phần",
      dataIndex: "TenMonHoc",
      key: "TenMonHoc",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.TenMonHoc.length - b.TenMonHoc.length,
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
        return record.TenMonHoc.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Số tín chỉ",
      dataIndex: "SoTinChi",
      key: "SoTinChi",
      align: "center",
    },
    {
      title: "Điều kiện tiên quyết",
      dataIndex: "DieuKienTienQuyet",
      key: "DieuKienTienQuyet",
    },
    {
      title: "Số giờ",
      dataIndex: "SoGio",
      key: "SoGio",
      align: "center",
    },
    {
      title: "Hệ số",
      dataIndex: "HeSo",
      key: "HeSo",
      align: "center",
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
                let text = "Bạn muốn xóa môn học " + record.TenMonHoc + " không? ";
                if (window.confirm(text) === true) {
                  setLoading(true);
                  fetch(`${PATH_API}MonHoc/${record.id}`, {
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
      <Sider selectedKey="mon" signOut={props.signOut} />
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
              <h1>Quản lý môn học</h1>
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
              {/* Form add ******************************************** */}
              <Modal
                title="Thêm mới môn học"
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
                  id="form"
                  className="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setLoading(true);
                    const new_MaMonHoc = e.target.elements.MaMonHoc.value;
                    const new_TenMonHoc = e.target.elements.TenMonHoc.value;
                    const new_soTC = Number.parseInt(
                      e.target.elements.SoTinChi.value
                    );
                    const new_dktq = e.target.elements.DieuKienTienQuyet.value;
                    const new_SoGio = Number.parseInt(
                      e.target.elements.SoGio.value
                    );
                    const new_HeSo = Number.parseFloat(
                      e.target.elements.HeSo.value
                    );
                    const new_data = {
                      MaMonHoc: new_MaMonHoc,
                      TenMonHoc: new_TenMonHoc,
                      SoTinChi: new_soTC,
                      DieuKienTienQuyet: new_dktq,
                      SoGio: new_SoGio,
                      HeSo: new_HeSo,
                    };

                    fetch(`${PATH_API}MonHoc`, {
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
                    <label htmlFor="MaMonHoc">Mã môn học:</label>
                    <Input
                      name="MaMonHoc"
                      value={TenMonHocTextInput}
                      onChange={(e) => {
                        setTenMonHocTextInput(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-input form-input-center">
                    <label htmlFor="TenMonHoc">Tên môn học:</label>
                    <Input
                      name="TenMonHoc"
                      value={MaMonHocTextInput}
                      onChange={(e) => {
                        setMaMonHocTextInput(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-input-leftstart">
                    <div className="form-input">
                      <label htmlFor="SoTinChi">Số tín chỉ:</label>
                      <Input
                        id="SoTinChi"
                        name="SoTinChi"
                        className="small-input"
                        value={soTCTextInput}
                        onChange={(e) => {
                          setsoTCTextInput(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-input">
                      <label htmlFor="DieuKienTienQuyet">Điều kiện tiên quyết:</label>
                      <Input
                        name="DieuKienTienQuyet"
                        className="small-input"
                        value={dktqTextInput}
                        onChange={(e) => {
                          setdktqTextInput(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-input">
                      <label htmlFor="SoGio">Số giờ:</label>
                      <Input
                        name="SoGio"
                        className="small-input"
                        value={SoGioTextInput}
                        onChange={(e) => {
                          setSoGioTextInput(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-input">
                      <label htmlFor="HeSo">Hệ số:</label>
                      <Input
                        name="HeSo"
                        className="small-input"
                        value={HeSoTextInput}
                        onChange={(e) => {
                          setHeSoTextInput(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <Button type="primary" htmlType="submit">
                    Xác nhận
                  </Button>
                </form>
              </Modal>
              {/* form edit ******************************************** */}
              <Modal
                title="Sửa thông tin môn học"
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
                <div name="form" className="form ">
                  <div className="form-input form-input-center">
                    <label htmlFor="edit_MaMonHoc">Mã môn học:</label>
                    <Input
                      name="edit_MaMonHoc"
                      value={editingData?.MaMonHoc}
                      onChange={(e) => {
                        setEditingData((pre) => {
                          return { ...pre, MaMonHoc: e.target.value };
                        });
                      }}
                    />
                  </div>
                  <div className="form-input form-input-center">
                    <label htmlFor="edit_TenMonHoc">Tên môn học:</label>
                    <Input
                      name="edit_TenMonHoc"
                      value={editingData?.TenMonHoc}
                      onChange={(e) => {
                        setEditingData((pre) => {
                          return { ...pre, TenMonHoc: e.target.value };
                        });
                      }}
                    />
                  </div>
                  <div className="form-input-leftstart">
                    <div className="form-input">
                      <label htmlFor="SoTinChi">Số tín chỉ:</label>
                      <Input
                        name="edit_SoTinChi"
                        className="small-input"
                        value={editingData?.SoTinChi}
                        onChange={(e) => {
                          setEditingData((pre) => {
                            return { ...pre, SoTinChi: e.target.value };
                          });
                        }}
                      />
                    </div>
                    <div className="form-input">
                      <label htmlFor="DieuKienTienQuyet">Điều kiện tiên quyết:</label>
                      <Input
                        name="edit_DieuKienTienQuyet"
                        className="small-input"
                        value={editingData?.DieuKienTienQuyet}
                        onChange={(e) => {
                          setEditingData((pre) => {
                            return { ...pre, DieuKienTienQuyet: e.target.value };
                          });
                        }}
                      />
                    </div>
                    <div className="form-input">
                      <label htmlFor="SoGio">Số giờ:</label>
                      <Input
                        name="edit_SoGio"
                        className="small-input"
                        value={editingData?.SoGio}
                        onChange={(e) => {
                          setEditingData((pre) => {
                            return { ...pre, SoGio: e.target.value };
                          });
                        }}
                      />
                    </div>
                    <div className="form-input">
                      <label htmlFor="HeSo">Hệ số:</label>
                      <Input
                        name="edit_HeSo"
                        className="small-input"
                        value={editingData?.HeSo}
                        onChange={(e) => {
                          setEditingData((pre) => {
                            return { ...pre, HeSo: e.target.value };
                          });
                        }}
                      />
                    </div>
                  </div>

                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      dataSource.map((data) => {
                        if (data.id === editingData.id) {
                          setLoading(true);
                          fetch(`${PATH_API}MonHoc/${editingData.id}`, {
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
