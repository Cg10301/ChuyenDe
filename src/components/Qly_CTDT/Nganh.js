import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../../App.css";

import { Table, Button, Input, Modal, Select } from "antd";
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



export default function Nganh(props) {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  const [editingData, setEditingData] = useState(null);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  

  // state du lieu them moi Nganh
  const [KhoaData, setKhoaData] = useState([]);
  const [TenNganhTextInput, setTenNganhTextInput] = useState("");
  const [MaNganhTextInput, setMaNganhTextInput] = useState("");
  const [selectedKhoa, setSelectedKhoa] = useState(null);
  const [selectedKhoaAdd, setSelectedKhoaAdd] = useState(null);



  const handleCancel = () => {
    setIsModalAddOpen(false);
    setIsModalEditOpen(false);
    setMaNganhTextInput("");
    setTenNganhTextInput("");
  };

  const fetchData = (params = {}) => {
    setLoading(true);
    async function fetchData() {
      const response = await fetch(`${PATH_API}Nganh`);
      const data = await response.json();
      return data;
    }
    fetchData().then((data) => {
      if(selectedKhoa === null){
        setDataSource(data);
        setPagination({
          ...params.pagination,
        });
      }
      else{
        const filtedData = data.filter((data)=>{
          return data.idKhoa === selectedKhoa;
        })
        setDataSource(filtedData);
        setPagination({
          ...params.pagination,
        });
      }
      setLoading(false);
        
    });
  };

  async function fetchDataSp(DataSp) {
    const response = await fetch(`${PATH_API}${DataSp}`);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    
    fetchDataSp("Khoa").then((data) => {
      setKhoaData(data);
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
      title: "Mã ngành",
      dataIndex: "MaNganh",
      key: "MaNganh",

      sorter: (a, b) => a.MaNganh - b.MaNganh,
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
        return record.MaNganh.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Tên ngành",
      dataIndex: "TenNganh",
      key: "TenNganh",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.TenNganh.length - b.TenNganh.length,
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
        return record.TenNganh.toLowerCase().includes(value.toLowerCase());
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
                let text = "Bạn muốn xóa ngành " + record.TenNganh + " không? ";
                if (window.confirm(text) === true) {
                  setLoading(true);
                  fetch(`${PATH_API}Nganh/${record.id}`, {
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
      <Sider selectedKey="Nganh" signOut={props.signOut} />
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
              <h1 style={{ width: "200px" }}>Quản lý ngành</h1>
              <div className="form-input form-input-center">
                <label htmlFor="Khoa">Khoa:</label>
                <Select
                  placeholder="Tìm kiếm để chọn Khoa"
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
                    
                    fetchDataSp("Nganh").then((data) => {
                      const new_dataSource = data.filter((data) => {
                        return data.idKhoa === value;
                      });
                      console.log(value);
                      setDataSource(new_dataSource);
                      setSelectedKhoa(value); //
                     
                    });
                  }}
                  allowClear
                  onClear={()=>{
                    
                    fetchDataSp("Nganh").then((data) => {
                      setDataSource(data);
                      setSelectedKhoa(null); 
                    });
                  }}
                >
                  {KhoaData.map((data) => {
                    return (
                      <Option key={data.id} value={data.id}>
                        {data.TenKhoa}
                      </Option>
                    );
                  })}
                </Select>
              </div>
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
                rowKey="MaNganh"
                loading={loading}
                dataSource={dataSource}
                pagination={pagination}
                onChange={handleTableChange}
                bordered
              ></Table>
              {/* Form add ************************************************* */}
              <Modal
                title="Thêm mới ngành"
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
                    const new_MaNganh = e.target.elements.MaNganh.value;
                    const new_TenNganh = e.target.elements.TenNganh.value;
                    const new_idKhoa = selectedKhoaAdd;
                    const new_data = {
                      MaNganh: new_MaNganh,
                      TenNganh: new_TenNganh,
                      idKhoa: new_idKhoa
                    };
                  
                    fetch(`${PATH_API}Nganh`, {
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
                    setSelectedKhoaAdd(null); 
                  }}
                >
                  <div className="form-input form-input-center">
                    <label htmlFor="MaNganh">Mã Khoa:</label>
                    <Input
                      id="add_MaNganh"
                      name="MaNganh"
                      value={TenNganhTextInput}
                      onChange={(e) => {
                        setTenNganhTextInput(e.target.value);
                      }}
                      required={true}
                    />
                  </div>
                  <div className="form-input form-input-center">
                    <label htmlFor="TenNganh">Tên Khoa:</label>
                    <Input
                      id="add_TenNganh"
                      name="TenNganh"
                      value={MaNganhTextInput}
                      onChange={(e) => {
                        setMaNganhTextInput(e.target.value);
                      }}
                      required={true}
                    />
                  </div>
                  <div className="form-input form-input-center">
                    <label htmlFor="Khoa">Khoa:</label>
                    <Select
                      value={selectedKhoaAdd}
                      name="chonKhoa"
                      placeholder="Tìm kiếm để chọn Khoa"
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
                        setSelectedKhoaAdd(value);
                      }}
                      
                    >
                      {KhoaData.map((data) => {
                        return (
                          <Option key={data.id} value={data.id}>
                            {data.TenKhoa}
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
                    <label htmlFor="edit_MaNganh">Mã ngành:</label>
                    <Input
                      name="edit_MaNganh"
                      value={editingData?.MaNganh}
                      onChange={(e) => {
                        setEditingData((pre) => {
                          return { ...pre, MaNganh: e.target.value };
                        });
                      }}
                    />
                  </div>
                  <div className="form-input form-input-center">
                    <label htmlFor="edit_TenNganh">Tên ngành:</label>
                    <Input
                      name="edit_TenKhoa"
                      value={editingData?.TenNganh}
                      onChange={(e) => {
                        setEditingData((pre) => {
                          return { ...pre, TenNganh: e.target.value };
                        });
                      }}
                    />
                  </div>
                  <div className="form-input form-input-center">
                    
                    <Select
                      defaultValue={editingData?.idKhoa}
                      name="chonKhoa"
                      placeholder="Tìm kiếm để chọn Khoa"
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
                          return { ...pre, idKhoa: value };
                        });
                      }}
                      
                    >
                      {KhoaData.map((data) => {
                        return (
                          <Option key={data.id} value={data.id}>
                            {data.TenKhoa}
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
                          fetch(`${PATH_API}Nganh/${editingData.id}`, {
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
