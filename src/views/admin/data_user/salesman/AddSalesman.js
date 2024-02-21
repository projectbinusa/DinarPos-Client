import React, { useState } from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  MapPinIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { API_SALESMAN } from "../../../../utils/BaseUrl";

function AddSalesman() {
  const [nama, setNama] = useState("");
  const [notelephone, setNotelephone] = useState("");
  const [alamat, setAlamat] = useState("");

  const addSalesman = async (e) => {
    e.preventDefault();
    const salesman = {
      namaSalesman: nama,
      alamatSalesman: alamat,
      noTelpSalesman: notelephone,
    };
    try {
      const request = await axios.post(`${API_SALESMAN}/add`, salesman);
      const res = request.data;

      console.log(res);

      
    } catch (e) {}
  };
  return (
    <section className="md:flex font-popins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="md:ml-[18rem] ml-0 pt-24 md:pt-5 w-full md:px-7 px-5">
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
        <main className="container bg-white shadow-lg p-5 my-5 rounded">
          <form action="" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Input
              label="Nama Salesman"
              variant="standard"
              color="blue"
              size="lg"
              icon={<UserCircleIcon />}
            />
            <Input
              label="No Telephone"
              variant="standard"
              color="blue"
              size="lg"
              type="number"
              icon={<PhoneIcon />}
            />
            <Input
              label="Alamat"
              variant="standard"
              color="blue"
              size="lg"
              icon={<MapPinIcon />}
            />
          </form>
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
        </main>
      </div>
    </section>
  );
}

export default AddSalesman;
