import { KeyIcon, MapPinIcon, PhoneIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Breadcrumbs, Button, Input, Option, Select, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";

function EditTeknisi() {
  const [nama, setnama] = useState("");
  const [alamat, setalamat] = useState("");
  const [nohp, setnohp] = useState("");
  const [bagian, setbagian] = useState("");
  const [password, setpassword] = useState("");

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full lg:px-7 px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            edit teknisi
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
            <a href="/data_teknisi">
              <span>Teknisi</span>
            </a>
            <span className="cursor-default capitalize">edit Teknisi</span>
          </Breadcrumbs>
        </div>
        <main className="container bg-white shadow-lg px-5 py-8 my-5 rounded">
          <form >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Input
                label="Nama Teknisi"
                variant="static"
                color="blue"
                size="lg"
                icon={<UserCircleIcon />}
                onChange={(e) => setnama(e.target.value)}
                placeholder="Masukkan Nama Teknisi"
              />
              <Input
                label="Alamat"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Alamat"
                onChange={(e) => setalamat(e.target.value)}
                icon={<MapPinIcon />}
              />
              <Input
                label="No HP"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan No HP"
                onChange={(e) => setnohp(e.target.value)}
                icon={<PhoneIcon />}
              />
              <Input
                label="Password"
                variant="static"
                color="blue"
                size="lg"
                type="number"
                placeholder="Masukkan Password"
                onChange={(e) => setpassword(e.target.value)}
                icon={<KeyIcon />}
              />
              <Select
                variant="static"
                label="Bagian"
                color="blue"
                className="w-full"
                onChange={(selected) => setbagian(selected)}
              >
                <Option value="Electro">Electro</Option>
                <Option value="PC">PC</Option>
              </Select>
            </div>
            <div className="mt-10 flex gap-4">
              <Button variant="gradient" color="blue" type="submit">
                <span>Simpan</span>
              </Button>
              <a href="/data_teknisi">
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

export default EditTeknisi;
