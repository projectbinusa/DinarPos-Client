import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import axios from "axios";
import { API_PLANNING } from "../../../utils/BaseUrl";
import {
  Button,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";

function PlanningPage() {
  const [planning, setPlanning] = useState([]);
  const [filteredPlanning, setFilteredPlanning] = useState([]);
  const [tglAwal, settglAwal] = useState("");
  const [tglAkhir, settglAkhir] = useState("");
  const [filterOption, setFilterOption] = useState("All");

  // Mengambil data dari API
  const getAllPlanning = async () => {
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

  useEffect(() => {
    getAllPlanning();
  }, []);

  // Filter data berdasarkan tanggal dan opsi filter
  const handleFilter = (e) => {
    e.preventDefault();

    let filtered = planning;

    if (tglAwal && tglAkhir) {
      filtered = filtered.filter(
        (item) =>
          new Date(item.tanggal) >= new Date(tglAwal) &&
          new Date(item.tanggal) <= new Date(tglAkhir)
      );
    }

    if (filterOption !== "All") {
      filtered = filtered.filter((item) => item.filterOption === filterOption);
    }

    setFilteredPlanning(filtered);
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <Typography variant="lead" className="uppercase text-gray-700 mb-4">
          Data Planning
        </Typography>

        <div className="bg-white shadow-lg p-6 rounded-lg">
          <form onSubmit={handleFilter} className="space-y-4">
            <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
              <div className="w-full lg:w-[30%]">
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
              <div className="w-full lg:w-[30%]">
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
              <div className="w-full lg:w-[30%]">
                <Select
                  variant="static"
                  label="Filter"
                  value={filterOption}
                  onChange={(value) => setFilterOption(value)}
                >
                  <Option value="All">All</Option>
                  <Option value="Option1">Option1</Option>
                  <Option value="Option2">Option2</Option>
                </Select>
              </div>
              <div className="w-full lg:w-[10%] flex items-end">
                <Button
                  type="submit"
                  variant="gradient"
                  color="blue"
                  className="w-full"
                >
                  Cari
                </Button>
              </div>
            </div>
          </form>

          <div className="overflow-x-auto mt-6">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold text-left">No</th>
                  <th className="text-sm py-2 px-3 font-semibold text-left">Tanggal</th>
                  <th className="text-sm py-2 px-3 font-semibold text-left">Nama ITC</th>
                  <th className="text-sm py-2 px-3 font-semibold text-left">Nama Customer</th>
                  <th className="text-sm py-2 px-3 font-semibold text-left">Jenis</th>
                  <th className="text-sm py-2 px-3 font-semibold text-left">Daerah</th>
                  <th className="text-sm py-2 px-3 font-semibold text-left">Printer</th>
                  <th className="text-sm py-2 px-3 font-semibold text-left">Jumlah Murid</th>
                  <th className="text-sm py-2 px-3 font-semibold text-left">PC</th>
                  <th className="text-sm py-2 px-3 font-semibold text-left">UNBK</th>
                  <th className="text-sm py-2 px-3 font-semibold text-left">Jurusan</th>
                  <th className="text-sm py-2 px-3 font-semibold text-left">Pihak Dituju</th>
                  <th className="text-sm py-2 px-3 font-semibold text-left">Tujuan</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlanning.length > 0 ? (
                  filteredPlanning.map((row, index) => (
                    <tr key={row.id} className="border-t hover:bg-gray-50 transition">
                      <td className="text-sm py-2 px-3">{index + 1}</td>
                      <td className="text-sm py-2 px-3">{row.created_date}</td>
                      <td className="text-sm py-2 px-3">{row.namaITC}</td>
                      <td className="text-sm py-2 px-3">{row.namaCustomer}</td>
                      <td className="text-sm py-2 px-3">{row.jenis}</td>
                      <td className="text-sm py-2 px-3">{row.daerah}</td>
                      <td className="text-sm py-2 px-3">{row.printer}</td>
                      <td className="text-sm py-2 px-3">{row.jumlahMurid}</td>
                      <td className="text-sm py-2 px-3">{row.pc}</td>
                      <td className="text-sm py-2 px-3">{row.unbk}</td>
                      <td className="text-sm py-2 px-3">{row.jurusan}</td>
                      <td className="text-sm py-2 px-3">{row.pihakDituju}</td>
                      <td className="text-sm py-2 px-3">{row.tujuan}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="13" className="text-center py-4 text-sm text-gray-600">
                      Data tidak  ditemukan
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
