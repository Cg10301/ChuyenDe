import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../../App.css";
import { Table, Button, Input, Select, Modal } from "antd";
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
const { Option } = Select;


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

  const [tenDmCTDTTextInput, setTenDmCTDTTextInput] = useState("");
  const [maDmCTDTTextInput, setMaDmCTDTTextInput] = useState("");
  const [selectedNganh_Add, setSelectedNganh_Add] = useState(null);
  const [selectedKhoaHoc_Add, setSelectedKhoaHoc_Add] = useState(null);


  const [dataNganh, setDataNganh] = useState([]);
  const [dataKhoaHoc, setDataKhoaHoc] = useState([]);
  const [selectedNganh, setSelectedNganh] = useState(null);
  const [selectedKhoaHoc, setSelectedKhoaHoc] = useState(null);

  const handleCancel = () => {
    setIsModalAddOpen(false);
    setIsModalEditOpen(false);
    setMaDmCTDTTextInput("");
    setTenDmCTDTTextInput("");
  };

  const fetchData = (params = {}) => {
    setLoading(true);
    async function fetchData() {
      const response = await fetch(`${PATH_API}CTDT`);
      const data = await response.json();
      return data;
    }
    fetchData().then((data) => {
      if (selectedKhoaHoc === null && selectedNganh === null) {
        setDataSource(data);
        setPagination({
          ...params.pagination,
        });
      } else if (selectedKhoaHoc !== null && selectedNganh === null) {
        const filtedData = data.filter((data) => {
          return data.idKhoaHoc === selectedKhoaHoc;
        });
        setDataSource(filtedData);
        setPagination({
          ...params.pagination,
        });
      } else if (selectedKhoaHoc === null && selectedNganh !== null) {
        const filtedData = data.filter((data) => {
          return data.idNganh === selectedNganh;
        });
        setDataSource(filtedData);
        setPagination({
          ...params.pagination,
        });
      } else {
        const filtedData = data.filter((data) => {
          return (
            data.idNganh === selectedNganh && data.idKhoaHoc === selectedKhoaHoc
          );
        });
        setDataSource(filtedData);
        setPagination({
          ...params.pagination,
        });
      }
      setLoading(false);
    });
  };

  async function fetchDataSp(TableSp) {
    const response = await fetch(`${PATH_API}${TableSp}`);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    fetchDataSp("Nganh").then((data) => {
      setDataNganh(data);
    });

    fetchDataSp("KhoaHoc").then((data) => {
      setDataKhoaHoc(data);
    });

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
      title: "Mã danh mục CTĐT",
      dataIndex: "MaCTDT",
      key: "MaCTDT",

      sorter: (a, b) => a.MaCTDT.length - b.MaCTDT.length,
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
        return record.MaCTDT.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Tên danh mục CTĐT",
      dataIndex: "TenCTDT",
      key: "TenCTDT",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.TenCTDT.length - b.TenCTDT.length,
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
        return record.TenCTDT.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Tên ngành",
      key: "idNganh",
      render: (record) => {
        const Nganh = dataNganh.filter((data) => {
          return data.id === record.idNganh;
        });
        return Nganh[0].TenNganh;
      },
    },
    {
      title: "Tên khóa học",
      key: "idKhoaHoc",
      render: (record) => {
        const KhoaHoc = dataKhoaHoc.filter((data) => {
          return data.id === record.idKhoaHoc;
        });
        return KhoaHoc[0].TenKhoaHoc;
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
                let text = "Bạn muốn xóa CTĐT " + record.TenCTDT + " không? ";
                if (window.confirm(text) === true) {
                  setLoading(true);
                  fetch(`${PATH_API}CTDT/${record.id}`, {
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
      <Sider selectedKey="CTDT" signOut={props.signOut} />
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
              <h1>Quản lý danh mục CTĐT</h1>
              <Select
                placeholder="Tìm kiếm để chọn ngành"
                showSearch
                style={{
                  width: 200,
                }}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
                onSelect={(value) => {
                  if (selectedKhoaHoc === null) {
                    fetchDataSp("CTDT").then((data) => {
                      const new_dataSource = data.filter((data) => {
                        return data.idNganh === value;
                      });
                      setDataSource(new_dataSource);
                      setSelectedNganh(value);
                    });
                  } else {
                    fetchDataSp("CTDT").then((data) => {
                      const new_dataSource = data.filter((data) => {
                        return (
                          data.idNganh === value &&
                          data.idKhoaHoc === selectedKhoaHoc
                        );
                      });
                      setDataSource(new_dataSource);
                      setSelectedNganh(value);
                    });
                  }
                }}
                allowClear
                onClear={() => {
                  if (selectedKhoaHoc === null) {
                    fetchDataSp("CTDT").then((data) => {
                      setDataSource(data);
                      setSelectedNganh(null);
                    });
                  } else {
                    fetchDataSp("CTDT").then((data) => {
                      const new_dataSource = data.filter((data) => {
                        return data.idKhoaHoc === selectedKhoaHoc;
                      });
                      console.log(selectedKhoaHoc);
                      setDataSource(new_dataSource);
                      setSelectedNganh(null);
                    });
                    
                  }
                }}
              >
                {dataNganh.map((data) => {
                  return (
                    <Option key={data.id} value={data.id}>
                      {data.TenNganh}
                    </Option>
                  );
                })}
              </Select>
              <Select
                placeholder="Tìm kiếm để chọn khóa học"
                showSearch
                style={{
                  width: 200,
                }}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
                onSelect={(value) => {
                  //CHeck lai
                  if (selectedNganh === null) {
                    fetchDataSp("CTDT").then((data) => {
                      const new_dataSource = data.filter((data) => {
                        return data.idKhoaHoc === value;
                      });
                      setDataSource(new_dataSource);
                      setSelectedKhoaHoc(value);
                    });
                  } else {
                    fetchDataSp("CTDT").then((data) => {
                      const new_dataSource = data.filter((data) => {
                        return (
                          data.idKhoaHoc === value &&
                          data.idNganh === selectedNganh
                        );
                      });
                      setDataSource(new_dataSource);
                      setSelectedKhoaHoc(value);
                    });
                  }
                }}
                allowClear
                onClear={() => {
                  if (selectedNganh === null) {
                    fetchDataSp("CTDT").then((data) => {
                      setDataSource(data);
                      setSelectedKhoaHoc(null);
                    });
                  } else {
                    fetchDataSp("CTDT").then((data) => {
                      const new_dataSource = data.filter((data) => {
                        return data.idNganh === selectedNganh;
                      });
                      setDataSource(new_dataSource);
                      setSelectedKhoaHoc(null);
                    });
                  }
                }}
              >
                {dataKhoaHoc.map((data) => {
                  return (
                    <Option key={data.id} value={data.id}>
                      {data.TenKhoaHoc}
                    </Option>
                  );
                })}
              </Select>
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
                rowKey="MaCTDT"
                loading={loading}
                dataSource={dataSource}
                pagination={pagination}
                onChange={handleTableChange}
                bordered
              ></Table>

              {/* Form add ************************************************* */}
              <Modal
                title="Thêm mới danh mục CTĐT"
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
                    const new_maCTDT = e.target.elements.maCTDT.value;
                    const new_tenCTDT = e.target.elements.tenCTDT.value;
                    const new_idNganh = selectedNganh_Add;
                    const new_idKhoaHoc= selectedKhoaHoc_Add;
                    const new_data = {
                      MaCTDT: new_maCTDT,
                      TenCTDT: new_tenCTDT,
                      idNganh: new_idNganh,
                      idKhoaHoc: new_idKhoaHoc
                    };
                  
                    fetch(`${PATH_API}CTDT`, {
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
                    setSelectedNganh_Add(null); 
                    setSelectedKhoaHoc_Add(null);
                  }}
                >
                  <div className="form-input form-input-center">
                    <label htmlFor="maNganh">Mã danh mục CTĐT:</label>
                    <Input
                      id="add_CTDT"
                      name="maCTDT"
                      value={tenDmCTDTTextInput}
                      onChange={(e) => {
                        setTenDmCTDTTextInput(e.target.value);
                      }}
                      required={true}
                    />
                  </div>
                  <div className="form-input" style={{paddingLeft: "93px"}}>
                    <label htmlFor="tenCTDT">Tên khoa:</label>
                    <Input
                      id="add_tenCTDT"
                      name="tenCTDT"
                      value={maDmCTDTTextInput}
                      onChange={(e) => {
                        setMaDmCTDTTextInput(e.target.value);
                      }}
                      required={true}
                      style={{width: "69.6%"}}
                    />
                  </div>
                  <div className="form-input"   style={{paddingLeft: "107px"}}>
                    <label htmlFor="Nganh">Ngành:</label>
                    <Select
                      value={selectedNganh_Add}
                      name="chonNganh"
                      placeholder="Tìm kiếm để chọn ngành"
                      showSearch
                      style={{
                        width: 200,
                      }}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children.includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        optionA.children
                          .toLowerCase()
                          .localeCompare(optionB.children.toLowerCase())
                      }
                      allowClear
                      onSelect={(value) => {
                        setSelectedNganh_Add(value);
                      }}
                      
                    >
                      {dataNganh.map((data) => {
                        return (
                          <Option key={data.id} value={data.id}>
                            {data.TenNganh}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                  <div className="form-input"  style={{paddingLeft: "90px"}}>
                    <label htmlFor="KhoaHoc">Khóa học:</label>
                    <Select
                      value={selectedKhoaHoc_Add}
                      name="chonKhoaHoc"
                      placeholder="Tìm kiếm để chọn khóa học"
                      showSearch
                      style={{
                        width: 200,
                      }}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children.includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        optionA.children
                          .toLowerCase()
                          .localeCompare(optionB.children.toLowerCase())
                      }
                      allowClear
                      onSelect={(value) => {
                        setSelectedKhoaHoc_Add(value);
                      }}
                      
                    >
                      {dataKhoaHoc.map((data) => {
                        return (
                          <Option key={data.id} value={data.id}>
                            {data.TenKhoaHoc}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                  <Button type="primary" htmlType="submit">
                    Xác nhận
                  </Button>
                </form>
              </Modal>

              {/* Form Edit ********************************************************* */}
              <Modal
                title="Sửa thông tin ngành"
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
                  <div className="form-input form-input-center" >
                    <label htmlFor="edit_maCTDT">Mã danh mục CTĐT:</label>
                    <Input
                      name="edit_maCTDT"
                      value={editingData?.MaCTDT}
                      onChange={(e) => {
                        setEditingData((pre) => {
                          return { ...pre, MaCTDT: e.target.value };
                        });
                      }}
                    />
                  </div>
                  <div className="form-input form-input-center">
                    <label htmlFor="edit_tenCTDT">Tên danh mục CTĐT:</label>
                    <Input
                      name="edit_tenCTDT"
                      value={editingData?.TenCTDT}
                      onChange={(e) => {
                        setEditingData((pre) => {
                          return { ...pre, TenCTDT: e.target.value };
                        });
                      }}
                    />
                  </div>
                  <div className="form-input form-input-center">
                    
                    <Select
                      defaultValue={editingData?.idNganh}
                      name="chonNganh"
                      placeholder="Tìm kiếm để chọn ngành"
                      showSearch
                      style={{
                        width: 200,
                      }}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children.includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        optionA.children
                          .toLowerCase()
                          .localeCompare(optionB.children.toLowerCase())
                      }
                      allowClear
                      onSelect={(value) => {
                        setEditingData((pre) => {
                          return { ...pre, idNganh: value };
                        });
                      }}
                      
                    >
                      {dataNganh.map((data) => {
                        return (
                          <Option key={data.id} value={data.id}>
                            {data.TenNganh}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                  <div className="form-input form-input-center">
                    
                    <Select
                      defaultValue={editingData?.idKhoaHoc}
                      name="chonKhoaHoc"
                      placeholder="Tìm kiếm để chọn khóa học"
                      showSearch
                      style={{
                        width: 200,
                      }}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children.includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        optionA.children
                          .toLowerCase()
                          .localeCompare(optionB.children.toLowerCase())
                      }
                      allowClear
                      onSelect={(value) => {
                        setEditingData((pre) => {
                          return { ...pre, idKhoaHoc: value };
                        });
                      }}
                      
                    >
                      {dataKhoaHoc.map((data) => {
                        return (
                          <Option key={data.id} value={data.id}>
                            {data.TenKhoaHoc}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>

                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      dataSource.map((data) => {
                        if (data.id === editingData.id) {
                          setLoading(true);
                          fetch(`${PATH_API}CTDT/${editingData.id}`, {
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
