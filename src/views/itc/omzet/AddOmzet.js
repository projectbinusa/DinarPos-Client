import React, { useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { API_OMZET } from "../../../utils/BaseUrl";
import {
   Button,
   Input,
   Typography,
   Breadcrumbs 
} from "@material-tailwind/react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function AddOmzet() {
  const history = useHistory();
  const [created_date, setCreatedDate] = useState("");
  const [omzet, setOmzet] = useState("");
  const [salesman, setSalesman] = useState("");

  const addOmzet = async (e) => {
    e.preventDefault();

    // Pastikan omzet adalah angka
    const parsedOmzet = parseFloat(omzet);
    
    if (isNaN(parsedOmzet)) {
      Swal.fire({
        icon: "error",
        title: "Input Tidak Valid!",
        text: "Jumlah Omzet harus berupa angka.",
        showConfirmButton: false,
        timer: 1500,
      });
      return; // Hentikan eksekusi jika omzet tidak valid
    }

    const request = {
      created_date: created_date, // Pastikan format tanggal sesuai
      omzet: omzet,
      salesman: salesman,
    };

    try {
      const response = await axios.post(`${API_OMZET}/add`, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });

      // Cek respon dari API
      console.log("Response dari server:", response.data);

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Data Berhasil Ditambahkan",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/omzet");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          localStorage.clear();
          history.push("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Tambah Data Gagal!",
            text: data.message || "Terjadi kesalahan saat menambahkan data.",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log("Error Response:", error.response); // Tampilkan respon kesalahan
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Tambah Data Gagal!",
          text: "Tidak dapat terhubung ke server.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
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
            <a href="/omzet" className="opacity-60">Omzet</a>
            <span className="cursor-default capitalize">Tambah Omzet</span>
          </Breadcrumbs>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-lg">
          <form onSubmit={addOmzet} className="space-y-4">
            <div className="space-y-4">
              <div className="w-full lg:w-[50%]">
                <Input
                  variant="outlined"
                  color="blue"
                  type="date"
                  label="Tanggal"
                  value={created_date}
                  onChange={(e) => setCreatedDate(e.target.value)}
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
                  onChange={(e) => setOmzet(e.target.value)}
                  required
                />
              </div>
              <div className="w-full lg:w-[50%]">
                <Input
                  variant="outlined"
                  color="blue"
                  type="text"
                  label="Nama Salesman"
                  value={salesman}
                  onChange={(e) => setSalesman(e.target.value)}
                  required
                />
              </div>
              <div className="mt-10 flex gap-4">
                <Button
                  variant="gradient"
                  color="blue"
                  type="submit"
                  className="font-popins font-medium"
                >
                  <span>Simpan</span>
                </Button>
                <a href="/omzet">
                  <Button
                    variant="text"
                    color="gray"
                    className="mr-1 font-popins font-medium"
                  >
                    <span>Kembali </span>
                  </Button>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddOmzet;
