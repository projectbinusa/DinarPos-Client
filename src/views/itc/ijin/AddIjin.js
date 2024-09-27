import React, { useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { API_IZIN } from "../../../utils/BaseUrl";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function AddIjin() {
  const history = useHistory();
  const [created_date, setCreatedDate] = useState("");
  const [ket, setKet] = useState("");
  const [foto, setFoto] = useState(null);
  const [jenis, setJenis] = useState("");

  // Fungsi untuk menangani penambahan ijin
  const addIjin = async (e) => {
    e.preventDefault();

    // Membuat FormData untuk mengirim data dan file
    const formData = new FormData();
    formData.append("created_date", created_date);
    formData.append("ket", ket);
    formData.append("foto", foto); // Menyisipkan file foto
    formData.append("jenis", jenis);

    try {
      await axios.post(`${API_IZIN}/add`, formData, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data", // Mengatur tipe konten untuk mengirim file
        },
      });
      Swal.fire({
        icon: "success",
        title: "Data Berhasil Ditambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/ijin");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        history.push("/");
      } else if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Data Sudah Ada!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      } else {
        Swal.fire({
          icon: "error",
          title: "Tambah Data Gagal!",
          text: error.response?.data?.data || "Terjadi kesalahan",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    }
  };

  // Fungsi untuk menangani perubahan input file foto
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFoto(file);
    } else {
      Swal.fire({
        icon: "warning",
        title: "File harus berupa gambar!",
        showConfirmButton: false,
        timer: 1500,
      });
      setFoto(null);
    }
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Tambah Ijin
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href={`/${localStorage.getItem("userLevel") === "Superadmin" ? "dashboard" : "dashboard_service"}`} className="opacity-60">
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
              <div className="mt-2">
                <Select
                  label="Durasi"
                  color="blue"
                  variant="outlined"
                  required
                  value={jenis}
                  onChange={(e) => setJenis(e)}
                >
                  <Option value="1 HARI">1 Hari</Option>
                  <Option value="1 HARI LEBIH">1 Hari Lebih</Option>
                </Select>
              </div>
              <div>
                <Input
                  label="Tanggal"
                  variant="static"
                  color="blue"
                  size="lg"
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
              <div>
                <Input
                  label="Keterangan"
                  size="lg"
                  placeholder="Masukkan Keterangan"
                  variant="static"
                  color="blue"
                  onChange={(e) => setKet(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" className="mt-5" color="blue">
              Tambah
            </Button>
          </form>
        </main>
      </div>
    </section>
  );
}

export default AddIjin;
