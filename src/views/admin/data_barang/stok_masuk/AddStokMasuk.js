import React from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { InformationCircleIcon, PlusIcon } from "@heroicons/react/24/outline";

function AddStokMasuk() {
  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full lg:px-7 px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Tambah Stok Barang
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
            <a href="/stok_masuk_barang">
              <span>Stok Masuk</span>
            </a>
            <span className="cursor-default">Tambah Stok Barang</span>
          </Breadcrumbs>
        </div>
        <main className="container bg-white shadow-lg px-5 py-8 my-5 rounded">
          <form action="">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Select variant="static" label="Data Suplier" color="blue">
                <Option>Material Tailwind HTML</Option>
                <Option>Material Tailwind React</Option>
                <Option>Material Tailwind Vue</Option>
                <Option>Material Tailwind Angular</Option>
                <Option>Material Tailwind Svelte</Option>
              </Select>
              <Select variant="static" label="Data Barang" color="blue">
                <Option>Material Tailwind HTML</Option>
                <Option>Material Tailwind React</Option>
                <Option>Material Tailwind Vue</Option>
                <Option>Material Tailwind Angular</Option>
                <Option>Material Tailwind Svelte</Option>
              </Select>
              <Input
                label="Jumlah Stok Masuk"
                variant="static"
                color="blue"
                type="number"
                size="lg"
                placeholder="Masukkan Jumlah Stok Masuk"
                icon={<PlusIcon />}
              />
              <Input
                label="Keterangan"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Keterangan"
                icon={<InformationCircleIcon />}
              />
            </div>
            <div className="mt-10 flex gap-4">
              <Button variant="gradient" color="blue" type="submit">
                <span>Simpan</span>
              </Button>
              <a href="/stok_masuk_barang">
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

export default AddStokMasuk;
