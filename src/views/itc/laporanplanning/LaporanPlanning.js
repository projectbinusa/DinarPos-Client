import React, { useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { API_PLANNING_EXPORT_EXCEL } from "../../../utils/BaseUrl";
import {
  Breadcrumbs,
  Button,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import axios from "axios";

function LapPlanning() {
  const [tglAwal, settglAwal ] = useState("");
  const [tglAkhir, settglAkhir ] = useState("");
  const [status, setStatus] = useState("");

  const exportDataPlanning = async (e) => {
    e.preventDefault();

    if (!tglAwal || !tglAkhir || !status) {
        console.error("Semua field harus diisi");
        return;
    }

    
    try {
        const response = await axios.get(
            `${API_PLANNING_EXPORT_EXCEL}?tglAwal=${tglAwal}&tglAkhir=${tglAkhir}&status=${status}`,
            {
                headers: {
                    "auth-tgh": `jwt ${localStorage.getItem("token")}`,
                },
                responseType: "blob", 
            }
        );

        if (response.status === 200) {
            const fileName =
                response.headers["content-disposition"]?.split("filename=")[1]?.replace(/['"]/g, "") ||
                "LAPORAN_PLANNING.xlsx";

            // Membuat objek Blob dari response data
            const blob = new Blob([response.data], {
                type: response.headers["content-type"],
            });

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName); 
            document.body.appendChild(link);
            link.click(); // Mengunduh file
            document.body.removeChild(link); // Menghapus elemen link dari DOM
            window.URL.revokeObjectURL(url); // Menghapus URL yang telah dibuat
        } else {
            console.error("Gagal mendapatkan file dari server. Status:", response.status);
        }
    } catch (error) {
        // Menangani error dengan lebih baik
        if (error.response) {
            console.error("Kesalahan dari server:", error.response.data);
        } else if (error.request) {
            console.error("Permintaan tidak mendapatkan respons:", error.request);
        } else {
            console.error("Error saat mengatur permintaan:", error.message);
        }
    }
};


  return (
    <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase font-poppins">
            Lap Planning
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/dashboard" className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <form onSubmit={exportDataPlanning}>
            <div className="w-72 lg:w-[50%]">
              <div className="mt-8">
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
              <div className="mt-8">
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
              <div className="mt-8">
                <Select
                  id="pilih"
                  label="Status"
                  color="blue"
                  variant="outlined"
                  required
                  value={status}
                  onChange={(value) => setStatus(value)} // Perbaiki onChange
                >
                  <Option value="">Pilih Status</Option>
                  <Option value="NAMA">Nama</Option>
                  <Option value="USERNAME">Username</Option>
                  <Option value="ALAMAT">Alamat</Option>
                  <Option value="NO TELEFON">No Telefon</Option>
                  <Option value="TARGET">Target</Option>
                </Select>
              </div>
            </div>
            <Button
              className="mt-5 font-poppins font-medium"
              color="blue"
              type="submit"
            >
              Export Planning
            </Button>
          </form>
        </main>
      </div>
    </section>
  );
}

export default LapPlanning;
