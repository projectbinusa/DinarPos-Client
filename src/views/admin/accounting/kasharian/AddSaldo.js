import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Option,
  Input,
  Select,
  Typography,
} from "@material-tailwind/react";
import {
  ClipboardDocumentListIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { API_KAS_HARIAN } from "../../../../utils/BaseUrl";

function AddSaldo() {
  const [shift, setShift] = useState("");
  const [saldoAwal, setSaldoAwal] = useState("");

  const history = useHistory();

  const AddSaldo = async (e) => {
    e.preventDefault();

    const request = {
      shift: shift,
      saldoAwal: saldoAwal,
    };

    try {
      await axios.post(`${API_KAS_HARIAN}/add`, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/kas_harian");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        history.push("/");
      } else if (error.response.status === 400) {
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
            Tambah Saldo Awal
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
            <a href="/kas_harian">
              <span>Kas Harian</span>
            </a>
            <span className="cursor-default">Tambah Saldo Awal</span>
          </Breadcrumbs>
        </div>
        <main className="container bg-white shadow-lg px-5 py-8 my-5 rounded">
          <form onSubmit={AddSaldo}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Select
                label="Shift"
                variant="outlined"
                color="blue"
                size="lg"
                icon={<ClipboardDocumentListIcon />}
                value={shift}
                onChange={(selectedOption) => setShift(selectedOption)}
                required
              >
                <Option value="">Pilih</Option>
                <Option value="Pagi">Pagi</Option>
                <Option value="Siang">Siang</Option>
              </Select>
              <Input
                label="Saldo Awal"
                variant="outlined"
                color="blue"
                type="number"
                size="lg"
                placeholder="Masukkan Saldo Awal"
                icon={<PlusIcon />}
                value={saldoAwal}
                onChange={(e) => setSaldoAwal(e.target.value)}
                required
              />
            </div>
            <div className="mt-10 flex gap-4">
              <Button variant="gradient" color="blue" type="submit">
                <span>Simpan</span>
              </Button>
              <a href="/kas_harian">
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

export default AddSaldo;
