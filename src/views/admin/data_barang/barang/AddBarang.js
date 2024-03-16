import React, { useState } from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { API_BARANG } from "../../../../utils/BaseUrl";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function AddBarang() {
  const [barcode, setbarcode] = useState("");
  const [nama, setnama] = useState("");
  const [unit, setunit] = useState("");
  const [hargaBeli, sethargaBeli] = useState("");
  const [hargaJual, sethargaJual] = useState("");

  const history = useHistory();

  const addBarang = async (e) => {
    e.preventDefault();

    const request = {
      barcodeBarang: barcode,
      namaBarang: nama,
      hargaBeli: hargaBeli,
      hargaBarang: hargaJual,
      unit: unit,
    };

    try {
      await axios.post(`${API_BARANG}/add`, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/data_barang");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        history.push("/");
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
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full lg:px-7 px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            tambah barang
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/dashboard_admin" className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/data_barang">
              <span>Barang</span>
            </a>
            <span className="cursor-default capitalize">tambah barang</span>
          </Breadcrumbs>
        </div>
        <main className="container bg-white shadow-lg px-5 py-8 my-5 rounded">
          <form onSubmit={addBarang}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Input
                label="Barcode Barang"
                variant="static"
                color="blue"
                size="lg"
                icon={<ClipboardDocumentListIcon />}
                onChange={(e) => setbarcode(e.target.value)}
                placeholder="Masukkan Barcode Barang"
              />
              <Input
                label="Nama Barang"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Nama Barang"
                onChange={(e) => setnama(e.target.value)}
                icon={<UserCircleIcon />}
              />
              <Input
                label="Unit Barang"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Unit Barang"
                onChange={(e) => setunit(e.target.value)}
                icon={<UserCircleIcon />}
              />
              <Input
                label="Harga Beli"
                variant="static"
                color="blue"
                size="lg"
                type="number"
                placeholder="Masukkan Harga Beli"
                onChange={(e) => sethargaBeli(e.target.value)}
                icon={<CurrencyDollarIcon />}
              />
              <Input
                label="Harga Jual"
                variant="static"
                color="blue"
                size="lg"
                type="number"
                placeholder="Masukkan Harga Jual"
                onChange={(e) => sethargaJual(e.target.value)}
                icon={<CurrencyDollarIcon />}
              />
            </div>
            <div className="mt-10 flex gap-4">
              <Button variant="gradient" color="blue" type="submit">
                <span>Simpan</span>
              </Button>
              <a href="/data_barang">
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

export default AddBarang;
