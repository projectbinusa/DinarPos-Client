import React from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";

function EditGaransi() {
  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            edit garansi
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
            <span className="cursor-default capitalize">edit Garansi</span>
          </Breadcrumbs>
        </div>
        <main className="container bg-white shadow-lg px-5 py-8 my-5 rounded">
          <form>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Input
                label="Nama Barang"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Nama Barang"
              />
              <Input
                label="Merek"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Merek"
              />
              <Input
                label="TGL Masuk"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan TGL Masuk"
                type="date"
              />
              <Input
                label="Masuk ke"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Masuk ke"
              />
              <Input
                label="ID TT"
                variant="static"
                color="blue"
                size="lg"
                type="number"
                placeholder="Masukkan ID TT"
              />
              <div>
                <Textarea
                  label="Kerusakan"
                  size="lg"
                  placeholder="Masukkan Kerusakan"
                  variant="static"
                  color="blue"
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

export default EditGaransi;
