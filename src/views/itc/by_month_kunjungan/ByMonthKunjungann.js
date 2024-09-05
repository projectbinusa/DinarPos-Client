import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Typography, Button } from "@material-tailwind/react";
import axios from "axios";
import { API_KUNJUNGAN } from "../../../utils/BaseUrl";

function ByMonthKunjungan() {
  const [byMonthKunjungan, setByMonthKunjungan] = useState([]);
  const [bulan, setBulan] = useState(getCurrentMonth()); // Set bulan default ke bulan saat ini

  // Fungsi untuk mendapatkan bulan saat ini dalam format MM
  function getCurrentMonth() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0, jadi tambah 1
    return month;
  }

  const getAll = async () => {
    try {
      const response = await axios.get(`${API_KUNJUNGAN}/bulan`, {
        params: { bulan }, // Kirim parameter bulan
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      });
      setByMonthKunjungan(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll(); // Panggil getAll setiap kali bulan berubah
  }, [bulan]);

  return (
    <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            By Month Kunjungan
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
            <a href="/by_month_kunjungan">
              <span>By Month Kunjungan</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded ">
          <div className="flex justify-end">
            <a href="/add_by_month_kunjungan">
              <Button
                color="blue"
                type="submit"
                className="font-poppins font-medium"
              >
                Tambah
              </Button>
            </a>
          </div>
          <div className="rounded mb-5 p-1 mt-12 overflow-x-auto">
            <table
              id="example_data"
              className="rounded-sm table-auto w-full overflow-x-auto"
            >
              <thead className="bg-blue-500 text-white w-full">
                <tr>
                  <th className="text-sm py-2 px-2.5 font-semibold w-[4%]">
                    No
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Tanggal Report
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Instansi
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Jenis</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Daerah</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Peluang</th>
                  <th className="text-sm py-2 px-3.5 font-semibold">
                    Info didapat
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">CP</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Wkt_p</th>
                </tr>
              </thead>
              <tbody>
                {byMonthKunjungan.length > 0 ? (
                  byMonthKunjungan.map((kunjungan, index) => (
                    <tr key={index}>
                      <td className="text-sm w-[4%]">{index + 1}</td>
                      <td className="text-sm py-2 px-3">{kunjungan.tanggal}</td>
                      <td className="text-sm py-2 px-3">
                        {kunjungan.instansi}
                      </td>
                      <td className="text-sm py-2 px-3">{kunjungan.jenis}</td>
                      <td className="text-sm py-2 px-3">{kunjungan.daerah}</td>
                      <td className="text-sm py-2 px-3">{kunjungan.peluang}</td>
                      <td className="text-sm py-2 px-3">
                        {kunjungan.info_dapat}
                      </td>
                      <td className="text-sm py-2 px-3">{kunjungan.cp}</td>
                      <td className="text-sm py-2 px-3">{kunjungan.wkt_p}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="30"
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
    </section>
  );
}

export default ByMonthKunjungan;
