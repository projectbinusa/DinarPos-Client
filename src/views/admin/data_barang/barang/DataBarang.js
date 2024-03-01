import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import $ from "jquery";
import "datatables.net";
import "./../../../../assets/styles/datatables.css";
import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { API_BARANG } from "../../../../utils/BaseUrl";
import axios from "axios";

function DataBarang() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleOpen2 = () => setOpen2(!open2);

  const tableRef = useRef(null);
  const [barangs, setBarang] = useState([]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  const getAll = async () => {
    try {
      const response = await axios.get(`${API_BARANG}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setBarang(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (barangs && barangs.length > 0) {
      initializeDataTable();
    }
  }, [barangs]);

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full lg:px-7 px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Data Barang
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
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded overflow-auto">
          <div className="flex justify-between">
            <div className="flex flex-col lg:flex-row gap-4">
              <div>
                <Button
                  onClick={handleOpen}
                  variant="gradient"
                  color="light-blue"
                >
                  Import
                </Button>
              </div>
              <div>
                <Button
                  onClick={handleOpen2}
                  variant="gradient"
                  color="light-blue"
                >
                  Export
                </Button>
              </div>
            </div>
            <a href="/add_barang">
              <Button variant="gradient" color="blue">
                Tambah Barang
              </Button>
            </a>
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
                  <th className="py-2 px-3 font-semibold">Barcode Barang</th>
                  <th className="py-2 px-3 font-semibold">Nama Barang</th>
                  <th className="py-2 px-3 font-semibold">Unit Barang</th>
                  <th className="py-2 px-3 font-semibold">Harga Beli</th>
                  <th className="py-2 px-3 font-semibold">Harga Jual</th>
                  <th className="py-2 px-3 font-semibold">Jumlah Stok</th>
                  <th className="py-2 px-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {barangs.length > 0 ? (
                  barangs.map((barang, index) => (
                    <tr key={index}>
                      <td className="w-[4%]">{index + 1}</td>
                      <td className="py-2 px-3">{barang.barcode_barang}</td>
                      <td className="py-2 px-3">{barang.nama_barang}</td>
                      <td className="py-2 px-3">{barang.unit}</td>
                      <td className="py-2 px-3">{barang.harga_beli}</td>
                      <td className="py-2 px-3">{barang.harga_jual}</td>
                      <td className="py-2 px-3">{barang.jumlah_stok}</td>
                      <td className="py-2 px-3">{barang.telp}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
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
      {/* MODAL IMPORT */}
      <Dialog open={open} handler={handleOpen} size="md">
        <DialogHeader>Import Data Barang</DialogHeader>
        <DialogBody>
          <p className="text-black">Silahkan download format di bawah ini</p>
          <Button variant="gradient" color="blue" className="mt-2 mb-5">
            Download Format
          </Button>
          <hr />
        </DialogBody>
        <form action="" className="">
          <DialogBody>
            <Input
              label="Pilih File"
              variant="static"
              color="blue"
              type="file"
            />{" "}
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
              <span>Import</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
      {/* END MODAL IMPORT */}

      {/* MODAL EXPORT */}
      <Dialog open={open2} handler={handleOpen2} size="md">
        <DialogHeader>Export Data Barang</DialogHeader>
        <DialogBody>
          <p className="text-black">Silahkan export di bawah ini</p>
          <Button variant="gradient" color="blue" className="mt-2 mb-5">
            Export Data Barang
          </Button>
          <hr />
        </DialogBody>
        <form action="" className="">
          <DialogBody>
            <Input
              label="Tanggal Awal"
              variant="static"
              color="blue"
              type="date"
            />
            <div className="mt-8">
              <Input
                label="Tanggal Akhir"
                variant="static"
                color="blue"
                type="date"
              />{" "}
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="gray"
              onClick={handleOpen2}
              className="mr-1"
            >
              <span>Kembali</span>
            </Button>
            <Button
              variant="gradient"
              color="blue"
              onClick={handleOpen2}
              type="submit"
            >
              <span>EXPORT persediaan barang</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
      {/* END MODAL EXPORT */}
    </section>
  );
}

export default DataBarang;
