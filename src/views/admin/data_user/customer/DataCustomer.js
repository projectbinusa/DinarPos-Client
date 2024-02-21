import React, { useState } from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";

function DataCustomer() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <section className="md:flex font-popins bg-gray-50 ">
      <SidebarAdmin />
      <div className="md:ml-[18rem] ml-0 pt-24 md:pt-5 w-full md:px-7 px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Data Customer
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
            <a href="/data_customer">
              <span>Customer</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="container bg-white shadow-lg p-5 my-5 rounded">
          <div className="block lg:flex gap-4">
            <a href="/add_customer">
              <Button variant="gradient" color="blue">
                Tambah Customer
              </Button>
            </a>
            <Button
              onClick={handleOpen}
              variant="gradient"
              color="blue"
              className="mt-4 lg:mt-0"
            >
              Tambah customer cp
            </Button>
          </div>
        </main>
      </div>
      {/* MODAL TAMBAH CUSTOMER CP */}
      <Dialog open={open} handler={handleOpen} size="lg">
        <DialogHeader>Tambah Customer CP</DialogHeader>
        <form action="" className="">
          <DialogBody className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Select
              variant="static"
              label="Salesman"
              color="blue"
              className="w-full"
            >
              <Option>Material Tailwind HTML</Option>
              <Option>Material Tailwind React</Option>
              <Option>Material Tailwind Vue</Option>
              <Option>Material Tailwind Angular</Option>
              <Option>Material Tailwind Svelte</Option>
            </Select>
            <Select
              variant="static"
              label="Customer"
              color="blue"
              className="w-full"
            >
              <Option>Material Tailwind HTML</Option>
              <Option>Material Tailwind React</Option>
              <Option>Material Tailwind Vue</Option>
              <Option>Material Tailwind Angular</Option>
              <Option>Material Tailwind Svelte</Option>
            </Select>
            <Input
              color="blue"
              variant="static"
              label="Nama CP"
              placeholder="Masukkan Nama CP"
            />
            <Input
              color="blue"
              variant="static"
              label="Jabatan"
              placeholder="Masukkan Jabatan Customer"
            />
            <Input
              color="blue"
              variant="static"
              label="Email"
              type="email"
              placeholder="Masukkan Email Customer"
            />
            <Input
              color="blue"
              variant="static"
              label="No Telp"
              type="number"
              placeholder="Masukkan No Telp Customer"
            />
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="gray"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Kembali</span>
            </Button>
            <Button
              variant="gradient"
              color="blue"
              onClick={handleOpen}
              type="submit"
            >
              <span>Simpan</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
      {/* END MODAL TAMBAH CUSTOMER CP */}
    </section>
  );
}

export default DataCustomer;
