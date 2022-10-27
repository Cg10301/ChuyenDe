/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";

import "../content.css";

export default function noidung(props) {
  return (
    <div>
      <div className="wrapper">
        <div className="wrapper-header">
          <strong>
            <p className="title bigsize-text">
              KHUNG CHƯƠNG TRÌNH ĐÀO TẠO NGÀNH{" "}
              {props.selectedDataNganh.TenNganh}
            </p>
            <p className="title">
              Khóa: {props.selectedDataKhoaHoc.TenKhoaHoc}
            </p>
          </strong>
        </div>
        <div className="wrapper-content">
          {props.dataKhoiKT.map((dataKhoiKT) => {
            return (
              <div key={dataKhoiKT.id} className="list">
                <strong>
                  <p>
                    {dataKhoiKT.id}. {dataKhoiKT.TenKhoiKienThuc}
                  </p>
                </strong>
                <div className="toplist">
                  <p style={{ width: "15%" }}>Mã học phần</p>
                  <p style={{ width: "25%" }}>Tên học phần</p>
                  <p style={{ width: "10%", textAlign: "center" }}>
                    Số tín chỉ
                  </p>
                  <p style={{ width: "20%" }}>Điều kiện tiên quyết</p>
                  <p style={{ width: "10%" }}>Số giờ</p>
                  <p style={{ width: "10%", textAlign: "center" }}>Hệ số</p>
                </div>
                <div className="content-list">
                  {props.dataNdCTDT.map((dataND) => {
                    if (dataND.idKhoiKT === dataKhoiKT.id) {
                      const MH = props.dataMonHoc.filter((dataMH) => {
                        return dataMH.id === dataND.idMonHoc;
                      });
                      
                      return (
                        <div key={dataND.id} className="monhoc">
                          <p style={{ width: "15%" }}>
                            {MH[0].MaMonHoc}
                          </p>
                          <p style={{ width: "25%" }}>
                            {MH[0].TenMonHoc}
                          </p>
                          <p
                            style={{
                              width: "10%",
                              textAlign: "center",
                            }}
                          >
                            {MH[0].SoTinChi}
                          </p>
                          <p style={{ width: "20%" }}>
                            {MH[0].DieuKienTienQuyet}
                          </p>
                          <p style={{ width: "10%" }}>
                            {MH[0].SoGio}
                          </p>
                          <p
                            style={{
                              width: "10%",
                              textAlign: "center",
                            }}
                          >
                            {MH[0].HeSo}
                          </p>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
