import React, { useState } from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import {
  MapPinIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { API_SALESMAN } from "../../../../utils/BaseUrl";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function AddSalesman() {
  const [nama, setNama] = useState("");
  const [notelephone, setNotelephone] = useState("");
  const [alamat, setAlamat] = useState("");

  const history = useHistory();

  const addSalesman = async (e) => {
    e.preventDefault();
    const salesman = {
      namaSalesman: nama,
      alamatSalesman: alamat,
      noTelpSalesman: notelephone,
    };
    try {
      const request = await axios.post(`${API_SALESMAN}/add`, salesman, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      Swal.fire({
        icon: "success",
        title: "Data Berhasil Ditambahkan!",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/data_salesman");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      if (error.ressponse && error.response.status === 401) {
        localStorage.clear();
        history.push("/");
      } else {
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
            Tambah Salesman
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
            <a href="/data_salesman">
              <span>Salesman</span>
            </a>
            <span className="cursor-default">Tambah Salesman</span>
          </Breadcrumbs>
        </div>
        <main className="container bg-white shadow-lg px-5 py-8 my-5 rounded">
          <form action="">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Input
                label="Nama Salesman"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Nama Salesman"
                icon={<UserCircleIcon />}
              />
              <Input
                label="No Telephone"
                variant="static"
                color="blue"
                size="lg"
                type="number"
                placeholder="Masukkan No Telephone"
                icon={<PhoneIcon />}
              />
              <Input
                label="Alamat"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Alamat Salesman"
                icon={<MapPinIcon />}
              />
              <Select
                variant="static"
                label="Level Pengguna"
                color="blue"
                size="lg"
              >
                <Option>Kasir</Option>
                <Option>Admin</Option>
                <Option>Warehouse</Option>
                <Option>Accounting</Option>
              </Select>
            </div>
            <div className="mt-10 flex gap-4">
              <Button variant="gradient" color="blue" type="submit">
                <span>Simpan</span>
              </Button>
              <a href="/data_salesman">
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

export default AddSalesman;
