import React, { useEffect, useRef, useState, useCallback } from "react";
import $ from "jquery";
import "datatables.net";
import SidebarAdmin from "../../../component/SidebarAdmin";
import axios from "axios";
import Swal from "sweetalert2";
import { API_PLANNING } from "../../../utils/BaseUrl";
import {
  Button,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";

function PlanningPage() {
  const tableRef = useRef(null);
  const [planning, setPlanning] = useState([]);
  const [filteredPlanning, setFilteredPlanning] = useState([]);
  const [tglAwal, settglAwal] = useState("");
  const [tglAkhir, settglAkhir] = useState("");
  const [filterOption, setFilterOption] = useState("All");

  const initializeDataTable = useCallback(() => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().clear().destroy();
    }
    
    $(tableRef.current).DataTable({
      data: filteredPlanning,
      columns: [
        { title: "No", data: null, render: (data, type, row, meta) => meta.row + 1 },
        { title: "Tgl", data: "tanggal" },
        { title: "Nama ITC", data: "namaITC" },
        { title: "Nama Salesman", data: "namaSalesman" },
        { title: "Nama Customer", data: "namaCustomer" },
        { title: "Jenis", data: "jenis" },
        { title: "Daerah", data: "daerah" },
        { title: "Printer", data: "printer" },
        { title: "Jumlah Murid", data: "jumlahMurid" },
        { title: "PC", data: "pc" },
        { title: "UNBK", data: "unbk" },
        { title: "Jurusan", data: "jurusan" },
        { title: "Pihak Dituju", data: "pihakDituju" },
        { title: "Tujuan", data: "tujuan" },
        { title: "Aksi", data: null, defaultContent: "<button>Aksi</button>" },
      ],
    });
  }, [filteredPlanning]);
  
  const getAll = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire("Error", "Anda harus login untuk mengakses data ini.", "error");
        return;
      }
  
      const response = await axios.get(`${API_PLANNING}`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
  
      if (response.data && response.data.data) {
        setPlanning(response.data.data);
        setFilteredPlanning(response.data.data);
      } else {
        Swal.fire("Error", "Data tidak ditemukan.", "error");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
        } else {
          Swal.fire("Error", `Terjadi kesalahan: ${error.response.status}`, "error");
        }
      } else if (error.request) {
        Swal.fire("Error", "Tidak dapat terhubung ke server. Periksa koneksi Anda.", "error");
      } else {
        Swal.fire("Error", `Terjadi kesalahan: ${error.message}`, "error");
      }
      console.log("Error fetching planning data:", error);
    }
  };
  
  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (filteredPlanning.length > 0) {
      initializeDataTable();
    }
  }, [filteredPlanning, initializeDataTable]);

  const tglFilter = (e) => {
    e.preventDefault();

    if (new Date(tglAwal) > new Date(tglAkhir)) {
      Swal.fire("Error", "Tanggal akhir harus setelah tanggal awal.", "error");
      return;
    }

    const filteredData = planning.filter((laporan) => {
      const laporanDate = new Date(laporan.tanggal);
      const isDateInRange =
        laporanDate >= new Date(tglAwal) && laporanDate <= new Date(tglAkhir);
      const isJenisMatch =
        filterOption === "All" || laporan.jenis === filterOption;

      return isJenisMatch && isDateInRange;
    });

    setFilteredPlanning(filteredData);
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen overflow-x-auto">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <Typography variant="lead" className="uppercase text-gray-700 mb-4">
          Planning
        </Typography>

        <div className="bg-white shadow-lg p-6 rounded-lg">
          <form onSubmit={tglFilter} className="space-y-4">
            <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
              <div className="w-full lg:w-[45%]">
                <Input
                  variant="static"
                  color="blue"
                  type="date"
                  label="Tanggal Awal"
                  required
                  value={tglAwal}
                  onChange={(e) => settglAwal(e.target.value)}
                />
              </div>
              <div className="w-full lg:w-[45%]">
                <Input
                  variant="static"
                  color="blue"
                  type="date"
                  label="Tanggal Akhir"
                  required
                  value={tglAkhir}
                  onChange={(e) => settglAkhir(e.target.value)}
                />
              </div>
              <div className="w-full lg:w-1/3">
                <Select
                  variant="outlined"
                  label="Filter"
                  value={filterOption}
                  onChange={(e) => setFilterOption(e.target.value)}
                >
                  <Option value="All">All</Option>
                  <Option value="Option1">Option1</Option>
                  <Option value="Option2">Option2</Option>
                </Select>
              </div>
              <div className="flex items-end">
                <Button type="submit" color="blue" className="w-full lg:w-auto">
                  Cari
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-8 overflow-x-auto">
            <table
              ref={tableRef}
              className="min-w-full bg-white border border-gray-300 rounded-lg"
            >
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-sm py-2 px-2.5 font-semibold">No</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Tgl</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Nama ITC</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Nama Salesman</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Nama Customer</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Jenis</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Daerah</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Printer</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Jumlah Murid</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">PC</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">UNBK</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Jurusan</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Pihak Dituju</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Tujuan</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlanning.length > 0 ? (
                  filteredPlanning.map((planning, index) => (
                    <tr key={planning.id} className="border-t hover:bg-gray-50 transition">
                      <td className="text-sm py-2 px-2.5">{index + 1}</td>
                      <td className="text-sm py-2 px-2.5">{planning.tanggal}</td>
                      <td className="text-sm py-2 px-2.5">{planning.namaITC}</td>
                      <td className="text-sm py-2 px-2.5">{planning.namaSalesman}</td>
                      <td className="text-sm py-2 px-2.5">{planning.namaCustomer}</td>
                      <td className="text-sm py-2 px-2.5">{planning.jenis}</td>
                      <td className="text-sm py-2 px-2.5">{planning.daerah}</td>
                      <td className="text-sm py-2 px-2.5">{planning.printer}</td>
                      <td className="text-sm py-2 px-2.5">{planning.jumlahMurid}</td>
                      <td className="text-sm py-2 px-2.5">{planning.pc}</td>
                      <td className="text-sm py-2 px-2.5">{planning.unbk}</td>
                      <td className="text-sm py-2 px-2.5">{planning.jurusan}</td>
                      <td className="text-sm py-2 px-2.5">{planning.pihakDituju}</td>
                      <td className="text-sm py-2 px-2.5">{planning.tujuan}</td>
                      <td className="text-sm py-2 px-2.5">Aksi</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="15" className="text-center py-4">
                      Data tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlanningPage;
