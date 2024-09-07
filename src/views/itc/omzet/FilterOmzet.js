import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Button, Typography } from "@material-tailwind/react";
import { API_OMZET } from "../../../utils/BaseUrl";
import axios from "axios";

function Omzet() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filter, setFilter] = useState([]);
  const tableRef = useRef(null);

  const initializeDataTable = () => {
    if (tableRef.current) {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }

      $(tableRef.current).DataTable({
        paging: true,
        searching: true,
        ordering: true,
        info: true,
        data: filter, // Ensure to provide data here
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
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      console.log("Data fetched:", response.data.data);
      setFilter(response.data.data);
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
    // Add logic to filter data based on selectedMonth
    console.log("Pencarian dengan bulan:", selectedMonth);
  };

  // Array bulan dan tahun
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
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Data Omzet
          </Typography>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <a href="/add_omzet" className="float-right mb-5">
            <Button variant="gradient" color="blue" className="font-popins font-medium">
              Tambah
            </Button>
          </a>
          <div className="flex items-center gap-4 my-4">
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="border rounded p-2"
            >
              <option value="">Pilih Bulan Tahun</option>
              {monthOptions.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <Button
              variant="gradient"
              color="blue"
              className="font-popins font-medium"
              onClick={handleGoClick}
            >
              GO
            </Button>
          </div>

          <div className="bg-white shadow-md rounded p-4">
            <div className="bg-blue-500 text-white text-center rounded-t p-2">
              Lina Ristiani (Apr 2024)
            </div>
            <div className="text-center p-4">
              <h2 className="text-2xl font-bold">Rp. 46,089,000</h2>
              <p>12 % dari target</p>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default Omzet;
