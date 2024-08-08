import React, { useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import axios from "axios";
import "datatables.net";
import "../../../assets/styles/datatables.css";
import { API_POIN } from "../../../utils/BaseUrl";

function LaporanPendapatan() {
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");

  const handleStartDateChange = (e) => {
    setStartMonth(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndMonth(e.target.value);
  };

  // EXPORT LAPORAN SERVICE TAKEN
  const exportLaporanPendapatan = async (e) => {
    e.preventDefault();
    if (!startMonth || !endMonth) {
      Swal.fire({
        icon: "warning",
        title: "Bulan Awal dan Bulan Akhir harus diisi.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    try {
      const response = await axios.get(
        `${API_POIN}/export?bulanAkhir=${endMonth}&bulanAwal=${startMonth}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          responseType: "blob",
        }
      );

      // Handle the blob response and download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "LaporanPendapatan.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      Swal.fire({
        icon: "success",
        title: "Export berhasil",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error saat mengunduh file:",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Laporan Pendapatan
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href={"dashboard"} className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011-1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/laporan_pendapatan">
              <span>Laporan Pendapatan</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-end mb-6 lg:justify-between">
            <div className="w-full">
              <Input
                type="month"
                id="startMonth"
                label="Bulan Awal"
                variant="outlined"
                required
                value={startMonth}
                onChange={handleStartDateChange}
                // fullWidth
                // InputLabelProps={{
                //   shrink: true,
                // }}
              />
            </div>
            <div className="w-full">
              <Input
                type="month"
                id="endMonth"
                label="Bulan Akhir"
                variant="outlined"
                required
                value={endMonth}
                onChange={handleEndDateChange}
                // fullWidth
                // InputLabelProps={{
                //   shrink: true,
                // }}
              />
            </div>
            <div className="w-full lg:w-auto flex justify-start items-center">
              <Button
                variant="filled"
                color="blue"
                className="mt-1"
                onClick={exportLaporanPendapatan}
              >
                Export
              </Button>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default LaporanPendapatan;
