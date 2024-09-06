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
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function AddOmzet() {
  const history = useHistory();
  const [tgl, setTgl] = useState(""); // Perbaiki nama setter
  const [selectedITC, setSelectedITC] = useState("");
  const [omzet, setomzet] = useState("");
  const [customer, setcustomer] = useState("");
  const [values, setValues] = useState("");
  const [options, setOptions] = useState([]);

  const addOmzet = async (e) => {
    e.preventDefault();

    if (!omzet || !customer || !tgl || !selectedITC) {
      Swal.fire({
        icon: "warning",
        title: "Semua field harus diisi!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const request = {
      omzet,
      customer,
      tgl,
      itc: selectedITC,
    };

    try {
      await axios.post(`${API_OMZET}/add`, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      Swal.fire({
        icon: "success",
        title: "Data Berhasil Ditambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/omzet");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      if (error.response) {
        console.log("Error Response:", error.response);
        if (error.response.status === 401) {
          localStorage.clear();
          history.push("/");
        } else if (error.response.status === 400) {
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
            text: error.response.data?.data || "Terjadi kesalahan",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        console.log("Error:", error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Tidak dapat terhubung ke server",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const fetchOptions = async () => {
    if (values.trim() !== "") {
      try {
        const response = await axios.get(`${API_OMZET}/taken/N`, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        });
        setOptions(response.data.data);
      } catch (error) {
        console.log("Failed to fetch options:", error);
      }
    }
  };

  useEffect(() => {
    fetchOptions();
  }, [values]);

  const handleChange = (event) => {
    setValues(event.target.value);
  };

  const [level, setLevel] = useState("");
  let dashboard = "";

  if (level === "Superadmin") {
    dashboard = "dashboard";
  } else if (level === "AdminService") {
    dashboard = "dashboard_service";
  }

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
          <form onSubmit={addOmzet} className="space-y-4">
            <div className="space-y-4">
              <div className="w-full lg:w-[50%]">
                <Select
                  variant="outlined"
                  label="ITC"
                  value={selectedITC}
                  onChange={setSelectedITC} // Menggunakan handler yang benar
                  required
                >
                  <Option value="">-Pilih-</Option>
                  {options.map((option, index) => (
                    <Option key={index} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="w-full lg:w-[50%]">
                <Input
                  variant="outlined"
                  color="blue"
                  type="date"
                  label="Tanggal"
                  value={tgl}
                  onChange={(e) => setTgl(e.target.value)} // Gunakan setter yang benar
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
