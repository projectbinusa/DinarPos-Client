import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Button, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { API_KUNJUNGAN } from "../../../utils/BaseUrl";

function Kunjungan() {
  const [datas, setDatas] = useState([]);
  const [tglAwal, setTglAwal] = useState("");
  const [tglAkhir, setTglAkhir] = useState("");

  const getAll = async () => {
    try {
      const response = await axios.get(API_KUNJUNGAN, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setDatas(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  // EXPORT LAPORAN KUNJUNGAN
  const exportData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:2000/api/kunjungan/export/kunjungan?tglAwal=${tglAwal}&tglAkhir=${tglAkhir}`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("token")}`,
            accept: "*/*",
          },
          responseType: "blob", // This is important for handling the file download
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "LAPORAN_KUNJUNGAN_ALL.xlsx"); // The filename from the API
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error exporting data", error);
    }
  };

  return (
    <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Kunjungan
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
          <form onSubmit={exportData}>
            <div className="mt-8 w-full lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Awal"
                value={tglAwal}
                onChange={(e) => setTglAwal(e.target.value)}
                required
              />
            </div>
            <div className="mt-8 w-full lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Akhir"
                value={tglAkhir}
                onChange={(e) => setTglAkhir(e.target.value)}
                required
              />
            </div>
            <Button className="mt-5 font-poppins font-medium" color="blue" type="submit">
              Export
            </Button>
          </form>

          <div className="rounded mb-5 p-1 mt-12 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-xs py-3 px-4 font-semibold">No</th>
                  <th className="text-xs py-3 px-4 font-semibold">Tanggal</th>
                  <th className="text-xs py-3 px-4 font-semibold">Nama</th>
                  <th className="text-xs py-3 px-4 font-semibold">Instansi</th>
                  <th className="text-xs py-3 px-4 font-semibold">Jenis</th>
                  <th className="text-xs py-3 px-4 font-semibold">Daerah</th>
                  <th className="text-xs py-3 px-4 font-semibold">Tujuan</th>
                  <th className="text-xs py-3 px-4 font-semibold">Action</th>
                  <th className="text-xs py-3 px-4 font-semibold">Info didapat</th>
                  <th className="text-xs py-3 px-4 font-semibold">CP</th>
                  <th className="text-xs py-3 px-4 font-semibold">Visit</th>
                  <th className="text-xs py-3 px-4 font-semibold">Tipe</th>
                  <th className="text-xs py-3 px-4 font-semibold">Peluang</th>
                  <th className="text-xs py-3 px-4 font-semibold">Deal</th>
                  <th className="text-xs py-3 px-4 font-semibold">Detail</th>
                </tr>
              </thead>
              <tbody>
                {datas.length > 0 ? (
                  datas.map((kunjungan, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="text-sm text-center py-3 px-4">{index + 1}</td>
                      <td className="text-sm text-center py-3 px-4">{kunjungan.tanggal}</td>
                      <td className="text-sm text-center py-3 px-4">{kunjungan.nama}</td>
                      <td className="text-sm text-center py-3 px-4">{kunjungan.instansi}</td>
                      <td className="text-sm text-center py-3 px-4">{kunjungan.jenis}</td>
                      <td className="text-sm text-center py-3 px-4">{kunjungan.daerah}</td>
                      <td className="text-sm text-center py-3 px-4">{kunjungan.tujuan}</td>
                      <td className="text-sm text-center py-3 px-4">{kunjungan.action}</td>
                      <td className="text-sm text-center py-3 px-4">{kunjungan.info_dapat}</td>
                      <td className="text-sm text-center py-3 px-4">{kunjungan.cp}</td>
                      <td className="text-sm text-center py-3 px-4">{kunjungan.visit}</td>
                      <td className="text-sm text-center py-3 px-4">{kunjungan.tipe}</td>
                      <td className="text-sm text-center py-3 px-4">{kunjungan.peluang}</td>
                      <td className="text-sm text-center py-3 px-4">{kunjungan.deal}</td>
                      <td className="text-sm text-center py-3 px-4">Detail</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="15" className="text-center py-4 bg-gray-100 text-sm">
                      Tidak Ada Data
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

export default Kunjungan;
