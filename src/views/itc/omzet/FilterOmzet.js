import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Button, Typography, Card, Select, Option } from "@material-tailwind/react";
import { API_OMZET } from "../../../utils/BaseUrl";
import axios from "axios";

function Omzet() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedITC, setSelectedITC] = useState(""); // State untuk ITC
  const [filter, setFilter] = useState([]);
  const [omzetData, setOmzetData] = useState({
    name: "",
    month: "",
    amount: 0,
    percentage: "0%",
  });
  const tableRef = useRef(null);

  const initializeDataTable = () => {
    if (tableRef.current) {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy(); // Musnahkan DataTable yang ada
      }

      $(tableRef.current).DataTable({
        paging: true,
        searching: true,
        ordering: true,
        info: true,
        data: filter,
        columns: [
          { title: "No" },
          { title: "Marketing" },
          { title: "Customer" },
          { title: "Bast" },
          { title: "Baut" },
          { title: "Baso" },
          { title: "Spk" },
          { title: "Ev_Datang" },
          { title: "Ev_Proses" },
          { title: "Ev_Finish" },
          { title: "Aksi" },
        ],
      });
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const getAllOmzet = async () => {
    try {
      const response = await axios.get(API_OMZET, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }, // Gunakan standar Bearer token
      });
      console.log("Data fetched:", response.data.data);

      // Set data ke state filter dan omzetData
      setFilter(response.data.data);

      // Asumsi response punya data omzet spesifik, misalnya di index pertama
      if (response.data.data.length > 0) {
        setOmzetData({
          name: response.data.data[0].name,
          month: response.data.data[0].month,
          amount: response.data.data[0].amount,
          percentage: response.data.data[0].percentage,
        });
      }
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllOmzet();
  }, []);

  useEffect(() => {
    if (filter.length > 0) {
      initializeDataTable();
    }
  }, [filter]);

  const handleGoClick = () => {
    console.log("Pencarian dengan bulan:", selectedMonth, "dan ITC:", selectedITC);
  };

  const monthOptions = [
    "Januari 2024",
    "Februari 2024",
    "Maret 2024",
    "April 2024",
    "Mei 2024",
    "Juni 2024",
    "Juli 2024",
    "Agustus 2024",
    "September 2024",
    "Oktober 2024",
    "November 2024",
    "Desember 2024",
  ];

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        {/* Header */}
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between mb-6">
          <Typography variant="lead" className="uppercase font-semibold text-gray-800">
            Data Omzet
          </Typography>
        </div>

        <main className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col lg:flex-row items-center gap-4 mb-6">
            <div className="w-full lg:w-auto max-w-xs">
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="">Pilih Bulan Tahun</option>
                {monthOptions.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full lg:w-auto max-w-xs">
              <Select
                variant="outlined"
                label="Pilih ITC"
                value={selectedITC}
                onChange={(value) => setSelectedITC(value)} // Perbaikan onChange dengan argumen value langsung
                className="focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Option value="">ALL</Option>
                <Option value="ITC1">ITC1</Option>
                <Option value="ITC2">ITC2</Option>
                <Option value="ITC3">ITC3</Option>
              </Select>
            </div>

            {/* Button GO */}
            <Button
              variant="gradient"
              color="blue"
              className="font-poppins font-medium w-full lg:w-auto"
              onClick={handleGoClick}
            >
              GO
            </Button>
          </div>

          {/* Omzet Card */}
          <Card className="w-full max-w-md mx-auto p-4 shadow-lg rounded-lg">
            <Typography
              variant="h6"
              className="text-center bg-blue-600 text-white py-2 rounded-t-md font-bold"
            >
              {omzetData.name} ({omzetData.month})
            </Typography>
            <div className="flex flex-col items-center py-6 space-y-2">
              <Typography variant="h5" className="font-bold text-gray-700">
                Rp. {omzetData.amount}
              </Typography>
              <Typography variant="small" className="text-gray-500">
                {omzetData.percentage} dari target
              </Typography>
            </div>
          </Card>
        </main>
      </div>
    </section>
  );
}

export default Omzet;
