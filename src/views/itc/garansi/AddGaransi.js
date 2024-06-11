import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useHistory } from "react-router-dom";
import { API_GARANSI, API_SERVICE } from "../../../utils/BaseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import { API_CUSTOMER } from "../../../utils/BaseUrl";

function AddGaransi() {
  const history = useHistory();
  const [namaBrg, setNamaBrg] = useState("");
  const [merek, setMerek] = useState("");
  const [tanggalMasuk, setTanggalMasuk] = useState("");
  const [masukKe, setMasukKe] = useState("");
  const [idTT, setIdTt] = useState(0);
  const [kerusakan, setKerusakan] = useState("");

  const addGaransi = async (e) => {
    e.preventDefault();

    const request = {
      namaBrg: namaBrg,
      merek: merek,
      tanggalMasuk: tanggalMasuk,
      masukKe: masukKe,
      id_tt: idTT,
      kerusakan: kerusakan,
    };

    try {
      await axios.post(`${API_GARANSI}/add`, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/garansi");
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
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    }
  };

  const [values, setvalues] = useState("");
  const [options, setoptions] = useState([]);

  const handle = async () => {
    if (values.trim() !== "") {
      const response = await fetch(`${API_SERVICE}/taken/N`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setoptions(data.data);
      console.log(data);
    } else {
      return;
    }
  };

  useEffect(() => {
    handle();
  }, [values]);

  const handleChange = (event) => {
    setvalues(event.target.value);
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            tambah garansi
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/dashboard" className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/garansi">
              <span>Garansi</span>
            </a>
            <span className="cursor-default capitalize">tambah Garansi</span>
          </Breadcrumbs>
        </div>
        <main className="container bg-white shadow-lg px-5 py-8 my-5 rounded">
          <form onSubmit={addGaransi}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Input
                label="Nama Barang"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Nama Barang"
                name="namaBrg"
                onChange={(e) => setNamaBrg(e.target.value)}
              />
              <Input
                label="Merek"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Merek"
                name="merek"
                onChange={(e) => setMerek(e.target.value)}
              />
              <Input
                label="TGL Masuk"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan TGL Masuk"
                type="date"
                name="tanggalMasuk"
                onChange={(e) => setTanggalMasuk(e.target.value)}
              />
              <Input
                label="Masuk ke"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Masuk ke"
                name="masukKe"
                onChange={(e) => setMasukKe(e.target.value)}
              />
              <Input
                label="ID TT"
                variant="static"
                color="blue"
                size="lg"
                type="number"
                placeholder="Masukkan ID TT"
                name="idTT"
                onChange={(event) => {
                  handleChange(event);
                  setIdTt(event.target.value);
                }}
              />
              <div>
                <Textarea
                  label="Kerusakan"
                  size="lg"
                  placeholder="Masukkan Kerusakan"
                  variant="static"
                  color="blue"
                  name="kerusakan"
                  onChange={(e) => setKerusakan(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-10 flex gap-4">
              <Button variant="gradient" color="blue" type="submit">
                <span>Simpan</span>
              </Button>
              <a href="/garansi">
                <Button variant="text" color="gray" className="mr-1">
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

export default AddGaransi;
