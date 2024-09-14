import React, { useEffect, useRef, useState, useCallback } from "react";
import $ from "jquery";
import "datatables.net";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Swal from "sweetalert2";
import { API_PLANNING } from "../../../utils/BaseUrl";
import {
  Button,
  Input,
  Typography,
  Select,
  Option,
  IconButton,
} from "@material-tailwind/react";

function PlanningPage() {
  const tableRef = useRef(null);
  const [planning, setPlanning] = useState([]);
  const [level, setLevel] = useState("");
  const [filteredPlanning, setFilteredPlanning] = useState([]);
  const [tglAwal, settglAwal] = useState("");
  const [tglAkhir, settglAkhir] = useState("");
  const [filterOption, setFilterOption] = useState("All");

  // Inisialisasi DataTable
  const initializeDataTable = () => {
    if (tableRef.current && $.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }
    $(tableRef.current).DataTable({
      responsive: true,
      autoWidth: false,
      searching: true,
      paging: true,
      ordering: true,
      lengthChange: true,
      pageLength: 10,
    });
  };

  // Mengambil data dari API
  const getAllIjin = async () => {
    try {
      const response = await axios.get(`${API_PLANNING}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setPlanning(response.data.data || []);
      setFilteredPlanning(response.data.data || []); // Set juga untuk filteredPlanning
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Mengambil level user dari localStorage
  const fetchLevel = () => {
    setLevel(localStorage.getItem("level"));
  };

  useEffect(() => {
    getAllIjin();
    fetchLevel();
  }, []);

  useEffect(() => {
    if (planning.length > 0) {
      initializeDataTable();
    }
  }, [planning]);

  // Fungsi untuk menghapus data
  const hapusPlanning = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda Ingin Menghapus?",
      text: "Perubahan data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        // Mengirim request penghapusan ke server
        await axios.delete(`${API_PLANNING}/${id}`, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        });

        // Menampilkan pesan sukses
        Swal.fire({
          icon: "success",
          title: "Dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });

        // Mengupdate state dengan menghapus data yang dihapus
        setPlanning((prev) => prev.filter((item) => item.id !== id));
        setFilteredPlanning((prev) => prev.filter((item) => item.id !== id));

      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Hapus Ijin Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen overflow-x-auto">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <Typography variant="lead" className="uppercase text-gray-700 mb-4">
          Planning
        </Typography>

        <div className="bg-white shadow-lg p-6 rounded-lg">
          <form className="space-y-4">
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
                  variant="static"
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
                  filteredPlanning.map((row, index) => (
                    <tr key={row.id} className="border-t hover:bg-gray-50 transition">
                      <td className="text-sm py-2 px-2.5">{index + 1}</td>
                      <td className="text-sm py-2 px-2.5">{row.tanggal}</td>
                      <td className="text-sm py-2 px-2.5">{row.namaITC}</td>
                      <td className="text-sm py-2 px-2.5">{row.namaSalesman}</td>
                      <td className="text-sm py-2 px-2.5">{row.namaCustomer}</td>
                      <td className="text-sm py-2 px-2.5">{row.jenis}</td>
                      <td className="text-sm py-2 px-2.5">{row.daerah}</td>
                      <td className="text-sm py-2 px-2.5">{row.printer}</td>
                      <td className="text-sm py-2 px-2.5">{row.jumlahMurid}</td>
                      <td className="text-sm py-2 px-2.5">{row.pc}</td>
                      <td className="text-sm py-2 px-2.5">{row.unbk}</td>
                      <td className="text-sm py-2 px-2.5">{row.jurusan}</td>
                      <td className="text-sm py-2 px-2.5">{row.pihakDituju}</td>
                      <td className="text-sm py-2 px-2.5">{row.tujuan}</td>
                      <td className="text-sm py-2 px-2.5">
                        <IconButton
                          size="sm"
                          color="red"
                          variant="outlined"
                          onClick={() => hapusPlanning(row.id)}
                        >
                          <TrashIcon className="h-4" />
                        </IconButton>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="15" className="text-center py-4">
                      Data tidak ditemukan
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
