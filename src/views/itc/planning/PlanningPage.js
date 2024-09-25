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
  const [updated_date, setupdated_date] = useState("");
  const [created_date, setcreated_date] = useState("");
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

    if (updated_date && created_date) {
      filtered = filtered.filter(
        (item) =>
          new Date(item.tanggal) >= new Date(updated_date) &&
          new Date(item.tanggal) <= new Date(created_date)
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
                  value={updated_date}
                  onChange={(e) => setupdated_date(e.target.value)}
                />
              </div>
              <div className="w-full lg:w-[30%]">
                <Input
                  variant="static"
                  color="blue"
                  type="date"
                  label="Tanggal Akhir"
                  required
                  value={created_date}
                  onChange={(e) => setcreated_date(e.target.value)}
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
                  <th className="text-sm py-2 px-3 font-semibold text-left">
                    No
                  </th>
                   <th className="text-sm py-2 px-3 font-semibold text-left">
                    Tanggal
                   </th>
                   <th className="text-sm py-2 px-3 font-semibold text-left">
                    Nama Customer
                   </th>
                   <th className="text-sm py-2 px-3 font-semibold text-left">
                    Jenis
                   </th>
                   <th className="text-sm py-2 px-3 font-semibold text-left">
                    kecamatan
                   </th>
                   <th className="text-sm py-2 px-3 font-semibold text-left">
                    Printer
                   </th>
                   <th className="text-sm py-2 px-3 font-semibold text-left">
                    Jumlah Murid
                   </th>
                   <th className="text-sm py-2 px-3 font-semibold text-left">
                    PC
                   </th>
                   <th className="text-sm py-2 px-3 font-semibold text-left">
                    UNBK
                    </th>
                </tr>
              </thead>
              <tbody>
                {filteredPlanning.length > 0 ? (
                  filteredPlanning.map((row, index) => (
                    <tr key={row.id} className="border-t hover:bg-gray-50 transition">
                      <td className="text-sm py-2 px-3">
                        {index + 1}
                      </td>
                       <td className="text-sm py-2 px-3">
                        {row.created_date}
                       </td>
                       <td className="text-sm py-2 px-3">
                        {row.customer.nama_customer}
                       </td>
                       <td className="text-sm py-2 px-3">
                        {row.customer.jenis}
                       </td>
                       <td className="text-sm py-2 px-3">
                        {row.customer.kec.nama_kec}
                       </td>
                       <td className="text-sm py-2 px-3">
                        {row.customer.printer}
                       </td>
                       <td className="text-sm py-2 px-3">
                        {row.customer.jml}
                       </td>
                       <td className="text-sm py-2 px-3">
                       {row.customer.pc}
                       </td>
                       <td className="text-sm py-2 px-3">
                        {row.customer.unbk}
                        </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="13" className="text-center py-4 text-sm text-gray-600">
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
