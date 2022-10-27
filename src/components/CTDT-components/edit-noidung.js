import React, { useState } from "react";

import "antd/dist/antd.css";
import { Table, Button, Modal, Input, Select } from "antd";
import {
  EyeOutlined,
  ExceptionOutlined,
  SearchOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

export default function EditNoiDung(props) {
  // const [dataMonHoc, setDataMonHoc] = useState(props.dataMonHoc);

  return (
    <div className="wrapper" style={{ width: "100%" }}>
      <div className="wrapper-header">
        <strong>
          <p className="title bigsize-text">
            KHUNG CHƯƠNG TRÌNH ĐÀO TẠO NGÀNH {props.selectedDataNganh.tennganh}
          </p>
          <p className="title">Khóa: {props.selectedDataKhoaHoc.tenkhoahoc}</p>
        </strong>
      </div>
      <div className="wrapper-content">
        {props.dataKhoiKT.map((dataKhoiKT) => {
          const columnsMonHocTheoKKT = [
            {
              title: "Mã môn học",
              dataIndex: "mamon",
              key: "mamon",

              sorter: (a, b) => a.mamon.length - b.mamon.length,
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
                return record.mamon.toLowerCase().includes(value.toLowerCase());
              },
            },
            {
              title: "Tên môn học",
              dataIndex: "tenmon",
              key: "tenmon",
              // defaultSortOrder: "descend",
              sorter: (a, b) => a.tenmon.length - b.tenmon.length,
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
                return record.tenmon
                  .toLowerCase()
                  .includes(value.toLowerCase());
              },
            },
            {
              key: "action",
              title: "",
              align: "center",
              render: (record) => {
                return (
                  <>
                    <ArrowRightOutlined
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        let idKhoiKT = getIdKhoiKT();
                        const del_NdCTDT = {
                          idCTDT: props.selectedDanhMuc.id,
                          idKhoiKT: idKhoiKT,
                          idMonHoc: record.id,
                        };

                        // setListDeleteNdCTDT(...listDeleteNdCTDT, del_NdCTDT);

                        // console.log(listDeleteNdCTDT);
                        // let index = listMonHocTheoKKT.indexOf(record);
                        // listMonHocTheoKKT.splice(index, 1);
                        // console.log(
                        //   "🚀 ~ file: NoiDung_CTDT.js ~ line 712 ~ {dataKhoiKT.map ~ listMonHocTheoKKT",
                        //   listMonHocTheoKKT
                        // );
                      }}
                    />
                  </>
                );
              },
            },
          ];

          const columnsMonHocConLai = [
            {
              key: "action",
              title: "",
              align: "center",
              render: (record) => {
                return (
                  <>
                    <ArrowLeftOutlined
                      style={{ marginLeft: "10px" }}
                      onClick={() => {}}
                    />
                  </>
                );
              },
            },
            {
              title: "Mã môn học",
              dataIndex: "mamon",
              key: "mamon",

              sorter: (a, b) => a.mamon.length - b.mamon.length,
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
                return record.mamon.toLowerCase().includes(value.toLowerCase());
              },
            },
            {
              title: "Tên môn học",
              dataIndex: "tenmon",
              key: "tenmon",
              // defaultSortOrder: "descend",
              sorter: (a, b) => a.tenmon.length - b.tenmon.length,
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
                return record.tenmon
                  .toLowerCase()
                  .includes(value.toLowerCase());
              },
            },
          ];
          function getIdKhoiKT() {
            return dataKhoiKT.id;
          }

          let listMonHocTheoKKT = [];
          let listMonHocConLai = [...props.dataMonHoc];

          const new_NdCTDT = props.dataNdCTDT.filter((data) => {
            return data.idKhoiKT === dataKhoiKT.id;
          });

          props.dataMonHoc.forEach((dataMH) => {
            new_NdCTDT.forEach((dataND) => {
              if (dataMH.id === dataND.idMonHoc) {
                listMonHocTheoKKT = [...listMonHocTheoKKT, dataMH];
              }
            });
          });

          props.dataNdCTDT.map((dataND) => {
            listMonHocConLai = [...listMonHocConLai].filter((dataMH) => {
              return dataMH.id !== dataND.idMonHoc;
            });
            return dataND;
          });

          return (
            <div key={dataKhoiKT.id} className="list">
              <strong>
                <p style={{ width: "30%" }}>
                  {dataKhoiKT.id}. {dataKhoiKT.tenkhoiKT}
                </p>
              </strong>
              <div className="content-list" style={{ flexDirection: "row" }}>
                <Table
                  style={{ width: "45%" }}
                  columns={columnsMonHocTheoKKT}
                  size="small"
                  rowKey="mamon"
                  dataSource={listMonHocTheoKKT}
                  pagination={false}
                  scroll={{
                    y: 250,
                  }}
                ></Table>
                <div style={{ width: "45%" }}>
                  <strong>Danh sách môn học: </strong>
                  <Table
                    style={{ width: "100%" }}
                    columns={columnsMonHocConLai}
                    size="small"
                    rowKey="mamon"
                    dataSource={listMonHocConLai}
                    pagination={false}
                    scroll={{
                      y: 250,
                    }}
                  ></Table>
                </div>
              </div>
              <hr style={{ borderColor: "#afabab24" }}></hr>
            </div>
          );
        })}
      </div>
    </div>
  );
}
