import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Dashboard from "../components/Dashboard";
import Khoa from "../components/Qly_CTDT/Khoa";
import KhoaHoc from "../components/Qly_CTDT/Khoahoc";
import Nganh from "../components/Qly_CTDT/Nganh";
import Mon from "../components/Qly_CTDT/Mon";
import DmCTDT from "../components/Qly_CTDT/Danhmuc_CTDT";
import KKT from "../components/Qly_CTDT/KhoiKT";
import NdCTDT from "../components/Qly_CTDT/NoiDung_CTDT";
import TaiKhoan from "../components/Qly_Nguoidung/TaiKhoan";

const AppRouter = (props) => {
  

  useEffect(() => {
   
  }, []);


  return (
    <Routes>
      <Route path="/" element={<Dashboard signOut={props.signOut}/>} />
      <Route path="/khoa" element={<Khoa signOut={props.signOut}/>} />
      <Route path="/khoahoc" element={<KhoaHoc signOut={props.signOut}/>} />
      <Route path="/nganh" element={<Nganh signOut={props.signOut}/>} />
      <Route path="/mon" element={<Mon signOut={props.signOut}/>} />
      <Route path="/khoiKT" element={<KKT signOut={props.signOut}/>} />
      <Route path="/ndCTDT" element={<NdCTDT signOut={props.signOut}/>} />
      <Route path="/dmCTDT" element={<DmCTDT signOut={props.signOut}/>} />
      <Route path="/taikhoan" element={<TaiKhoan signOut={props.signOut}/>} />

    </Routes>
  );
};
export default AppRouter;
