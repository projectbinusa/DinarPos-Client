import React, { useEffect, useRef, useState } from "react";
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

import $ from "jquery";
import "datatables.net";
import "./../../../../assets/styles/datatables.css";
import { API_CUSTOMER } from "../../../../utils/BaseUrl";
import axios from "axios";

function DataCustomer() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const tableRef = useRef(null);
  const [customers, setCustomer] = useState([]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  const getAll = async () => {
    try {
      const response = await axios.get(`${API_CUSTOMER}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setCustomer(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (customers && customers.length > 0) {
      initializeDataTable();
    }
  }, [customers]);

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full lg:px-7 px-5">
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
        <main className="bg-white shadow-lg p-5 my-5 rounded overflow-auto">
          <div className="flex flex-col lg:flex-row gap-4">
            <a href="/add_customer">
              <Button variant="gradient" color="blue">
                Tambah Customer
              </Button>
            </a>
            <div>
              <Button onClick={handleOpen} variant="gradient" color="blue">
                Tambah customer cp
              </Button>
            </div>
          </div>
          <div className="rounded my-5 w-full">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto w-full"
            >
              <thead className="border-b-2 ">
                <tr>
                  <th className="py-2 px-3 font-semibold">No</th>
                  <th className="py-2 px-3 font-semibold">Nama</th>
                  <th className="py-2 px-3 font-semibold">Jenis</th>
                  <th className="py-2 px-3 font-semibold">Alamat</th>
                  <th className="py-2 px-3 font-semibold">Email</th>
                  <th className="py-2 px-3 font-semibold">No Telepon</th>
                  <th className="py-2 px-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {customers.length > 0 ? (
                  customers.map((customer, index) => (
                    <tr key={index}>
                      <td className="w-[4%]">{index + 1}</td>
                      <td className="py-2 px-3">{customer.nama_customer}</td>
                      <td className="py-2 px-3">{customer.jenis}</td>
                      <td className="py-2 px-3">{customer.alamat}</td>
                      <td className="py-2 px-3">{customer.email}</td>
                      <td className="py-2 px-3">{customer.telp}</td>
                      <td className="py-2 px-3">{customer.telp}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center capitalize py-3 bg-gray-100"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      {/* MODAL TAMBAH CUSTOMER CP */}
      <Dialog open={open} handler={handleOpen} size="lg">
        <DialogHeader>Tambah Customer CP</DialogHeader>
        <form action="" className="">
          <DialogBody className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
