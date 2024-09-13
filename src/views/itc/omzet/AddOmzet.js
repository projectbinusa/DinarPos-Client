import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { API_OMZET } from "../../../utils/BaseUrl";
import {
  Button,
  Input,
  Typography,
  Select,
  Breadcrumbs,
  Option,
} from "@material-tailwind/react";
import { useHistory } from "react-router-dom"; // Menggunakan useHistory
import Swal from "sweetalert2";
import axios from "axios";

function AddOmzet() {
  const history = useHistory(); // Inisialisasi dengan useHistory
  const [tgl, settgl] = useState(""); // Setter untuk tanggal
  const [selectedITC, setSelectedITC] = useState("");
  const [omzet, setomzet] = useState("");
  const [customer, setcustomer] = useState("");
  const [level, setLevel] = useState("");

  useEffect(() => {
    const levelUser = localStorage.getItem("level") || "";
    setLevel(levelUser);
  }, []);

  const dashboard = level === "Superadmin" ? "dashboard" : (level === "AdminService" ? "dashboard_service" : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!tgl || !selectedITC || !omzet || !customer) {
      Swal.fire({
        icon: "warning",
        title: "Semua kolom harus diisi!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const formData = new FormData();
    formData.append("tgl", tgl);
    formData.append("selectedITC", selectedITC);
    formData.append("omzet", omzet);
    formData.append("customer", customer);
  
    // Debug: log the FormData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.post(`${API_OMZET}/add`, formData, {
        headers: {
          // Hapus content-type karena axios akan otomatis menentukannya saat menggunakan FormData
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      });
      
      Swal.fire({
        icon: "success",
        title: "Data Berhasil Ditambahkan!",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/omzet");
    } catch (error) {
      console.error("Error:", error);
      handleAxiosError(error);
    }
};


  const handleAxiosError = (error) => {
    if (error.response && error.response.status === 405) {
      Swal.fire({
        icon: "error",
        title: "Metode Tidak Diizinkan!",
        text: "Silakan cek metode HTTP yang digunakan atau kontak admin.",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (error.response && error.response.status === 400) {
      Swal.fire({
        icon: "error",
        title: "Data Sudah Ada!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Tambah Data Gagal!",
        text: error.response?.data?.message || "Terjadi kesalahan.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  
  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Tambah Omzet
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href={`/${dashboard}`} className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/omzet">
              <span className="opacity-60">Omzet</span>
            </a>
            <span className="cursor-default capitalize">Tambah Omzet</span>
          </Breadcrumbs>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4"> {/* Ganti addOmzet dengan handleSubmit */}
            <div className="space-y-4">
              <div className="w-full lg:w-[50%]">
              </div>
              <div className="w-full lg:w-[50%]">
                <Input
                  variant="outlined"
                  color="blue"
                  type="date"
                  label="Tanggal"
                  value={tgl}
                  onChange={(e) => settgl(e.target.value)} // Gunakan setter yang benar
                  required
                />
              </div>
              <div className="w-full lg:w-[50%]">
                <Input
                  variant="outlined"
                  color="blue"
                  type="number"
                  label="Jumlah Omzet"
                  value={omzet}
                  onChange={(e) => setomzet(e.target.value)} // Gunakan setter yang benar
                  required
                />
              </div>
              <div className="w-full lg:w-[50%]">
                <Input
                  variant="outlined"
                  color="blue"
                  type="text"
                  label="Nama Customer"
                  value={customer}
                  onChange={(e) => setcustomer(e.target.value)} // Gunakan setter yang benar
                  required
                />
              </div>
              <div className="w-full lg:w-[50%]">
                <Select
                  variant="static"
                  label="ITC"
                  value={selectedITC}
                  onChange={(value) => setSelectedITC(value)} // Ubah e.target.value menjadi value langsung
                  required
                >
                  <Option value="">ALL</Option>
                  <Option value="ITC1">ITC1</Option>
                  <Option value="ITC2">ITC2</Option>
                  <Option value="ITC3">ITC3</Option>
                </Select>
              </div>
              <div className="flex items-end">
                <Button type="submit" color="blue" className="w-full lg:w-auto">
                  Tambah
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddOmzet;
