import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { API_IJIN } from "../../../utils/BaseUrl";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function AddIjin() {
  const history = useHistory();
  const [created_date, setCreatedDate] = useState("");
  const [ket, setKet] = useState("");
  const [foto, setFoto] = useState(null);
  const [previewFoto, setPreviewFoto] = useState(""); // Tambahkan state untuk preview foto

  const addIjin = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('created_date', created_date);
    formData.append('ket', ket);
    formData.append('foto', foto);

    try {
      await axios.post(`${API_IJIN}/add`, formData, {
        headers: { 
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
          'Content-Type': 'multipart/form-data' // Set header Content-Type untuk form-data
        },
      });
      Swal.fire({
        icon: "success",
        title: "Data Berhasil Ditambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      history("/ijin"); // Ganti history.push dengan navigate
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        history("/"); // Ganti history.push dengan navigate
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
          text: error.response?.data?.data || "Terjadi kesalahan",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFoto(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFoto(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      Swal.fire({
        icon: "warning",
        title: "File harus berupa gambar!",
        showConfirmButton: false,
        timer: 1500,
      });
      setPreviewFoto(null);
      setFoto(null);
    }
  };

  const level = localStorage.getItem("userLevel"); // Pastikan level didefinisikan dengan benar
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
            Tambah Ijin
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href={`/${dashboard}`} className="opacity-60">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/ijin">
              <span className="opacity-60">Ijin</span>
            </a>
            <span className="cursor-default capitalize">Tambah Ijin</span>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg px-5 py-8 my-5 rounded">
          <form onSubmit={addIjin}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Input
                  label="Tanggal"
                  variant="static"
                  color="blue"
                  size="lg"
                  placeholder="Masukkan Tanggal"
                  type="date"
                  name="tanggal"
                  onChange={(e) => setCreatedDate(e.target.value)}
                />
              </div>
              <div>
                <Input
                  label="Foto"
                  variant="static"
                  color="blue"
                  size="lg"
                  type="file"
                  name="foto"
                  onChange={handleFotoChange}
                />
              </div>
              <div className="w-full lg:w-[50%]">
                <Textarea
                  label="Keterangan"
                  size="lg"
                  placeholder="Masukkan Keterangan"
                  variant="static"
                  color="blue"
                  name="keterangan"
                  onChange={(e) => setKet(e.target.value)}
                />
              </div>
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
              <a href="/ijin">
                <Button
                  variant="text"
                  color="gray"
                  className="mr-1 font-popins font-medium"
                >
                  <span>Kembali</span>
                </Button>
              </a>
            </div>
          </form>
        </main>
      </div>
    </section>
  );
}

export default AddIjin;
