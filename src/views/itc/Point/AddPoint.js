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
import { API_POINT } from "../../../utils/BaseUrl"; // Assume you have an API endpoint for points
import axios from "axios";
import Swal from "sweetalert2";

function AddPoint() {
  const history = useHistory();
  const [tanggal, setTanggal] = useState("");
  const [point, setPoint] = useState("");
  const [teknisi, setTeknisi] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const validateInputs = () => {
    if (!tanggal || !point || !teknisi || !keterangan) {
      Swal.fire({
        icon: "warning",
        title: "Semua field harus diisi",
        showConfirmButton: true,
      });
      return false;
    }
    if (isNaN(point)) {
      Swal.fire({
        icon: "warning",
        title: "Point harus berupa angka",
        showConfirmButton: true,
      });
      return false;
    }
    return true;
  };

  const addPoint = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    const request = {
      tanggal: tanggal,
      point: parseInt(point),
      teknisi: teknisi,
      keterangan: keterangan,
    };

    console.log("Mengirim data ke server:", request);

    try {
    //   await axios.post(`${API_POINT}/add`, request, {
    //     headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
    //   });
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/point");
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

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            tambah point
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
            <a href="/point">
              <span>Point</span>
            </a>
            <span className="cursor-default capitalize">tambah Point</span>
          </Breadcrumbs>
        </div>
        <main className="container bg-white shadow-lg px-5 py-8 my-5 rounded">
          <form onSubmit={addPoint}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Input
                label="Tanggal"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Tanggal"
                type="date"
                name="tanggal"
                onChange={(e) => setTanggal(e.target.value)}
              />
              <Input
                label="Point"
                variant="static"
                color="blue"
                size="lg"
                type="number"
                placeholder="Masukkan Point"
                name="point"
                onChange={(e) => setPoint(e.target.value)}
              />
              <Input
                label="Teknisi"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Nama Teknisi"
                name="teknisi"
                onChange={(e) => setTeknisi(e.target.value)}
              />
              <div>
                <Textarea
                  label="Keterangan"
                  size="lg"
                  placeholder="Masukkan Keterangan"
                  variant="static"
                  color="blue"
                  name="keterangan"
                  onChange={(e) => setKeterangan(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-10 flex gap-4">
              <Button variant="gradient" color="blue" type="submit">
                <span>Simpan</span>
              </Button>
              <a href="/point">
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

export default AddPoint;
