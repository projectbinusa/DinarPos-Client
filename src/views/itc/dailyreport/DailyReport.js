import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; // Use useHistory for v5
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Typography,
  Input,
  Button,
  Option,
  Select,
} from "@material-tailwind/react";
import axios from "axios";
import { API_KUNJUNGAN_DATE_BETWEEN_SALESMAN } from "../../../utils/BaseUrl";

function DailyRepost() {
  const [tglAwal, setTglAwal] = useState("");
  const [tglAkhir, setTglAkhir] = useState("");
  const [dailyRepost, setDailyRepost] = useState([]);
  const [status, setStatus] = useState("");
  const [idSalesman, setIdSalesman] = useState(""); // Add state for id_salesman
  const history = useHistory(); // Use useHistory

  const getAllDailyRepost = async () => {
    if (!tglAwal || !tglAkhir || !idSalesman) {
      console.log("Please select both dates and a salesman ID.");
      return;
    }
    try {
      const response = await axios.get(
        `${API_KUNJUNGAN_DATE_BETWEEN_SALESMAN}?id_salesman=${idSalesman}&tanggal_awal=${tglAwal}&tanggal_akhir=${tglAkhir}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      console.log("API Response:", response.data);
      setDailyRepost(response.data.data);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  useEffect(() => {
    if (tglAwal && tglAkhir && idSalesman) {
      getAllDailyRepost();
    }
  }, [tglAwal, tglAkhir, idSalesman]);

  const handlePrint = async (e) => {
    e.preventDefault();

    // Ambil data sebelum melakukan navigasi
    await getAllDailyRepost();

    // Setelah data diambil, navigasikan ke halaman PrintKunjungan
    history.push({
      pathname: "/print_kunjungan",
      state: { tglAwal, tglAkhir, dailyRepost },
    });
  };

  return (
    <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Daily Report
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
            <a href="/daily_repost">
              <span>Daily Report</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded ">
          <div className="flex justify-end">
            <a href="/add_daily">
              <Button
                color="blue"
                type="submit"
                className="font-poppins font-medium"
              >
                Tambah
              </Button>
            </a>
          </div>
          <form onSubmit={handlePrint}>
            <div className="mt-1 w-72 lg:w-[50%]">
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
            <div className="mt-3 w-72 lg:w-[50%]">
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
            <div className="w-full lg:w-1/4 mt-4">
              <Button
                className="mt-5 font-poppins font-medium mb-4"
                color="blue"
                type="submit"
              >
                Print
              </Button>
              <Select
                id="pilih"
                label="Waktu Pengadaan"
                color="blue"
                variant="outlined"
                value={status}
                onChange={(value) => setStatus(value)}
                className="w-full text-sm"
              >
                <Option value="">Pilih Bulan</Option>
                <Option value="01">Januari</Option>
                <Option value="02">Februari</Option>
                <Option value="03">Maret</Option>
                <Option value="04">April</Option>
                <Option value="05">Mei</Option>
                <Option value="06">Juni</Option>
                <Option value="07">Juli</Option>
                <Option value="08">Agustus</Option>
                <Option value="09">September</Option>
                <Option value="10">Oktober</Option>
                <Option value="11">November</Option>
                <Option value="12">Desember</Option>
              </Select>
            </div>
          </form>

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
                  <th className="text-sm py-2 px-2.5 font-semibold">Tanggal</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Jumlah Report
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dailyRepost.length > 0 ? (
                  dailyRepost.map((item, index) => (
                    <tr key={index}>
                      <td className="text-sm py-2 px-2.5">{index + 1}</td>
                      <td className="text-sm py-2 px-2.5">{item.tanggal}</td>
                      <td className="text-sm py-2 px-2.5">
                        {item.jumlah_report}
                      </td>
                      <td className="text-sm py-2 px-2.5">Aksi</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="text-sm py-2 px-2.5"
                      colSpan="30"
                      style={{ textAlign: "center" }}
                    >
                      No Data Available
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

export default DailyRepost;
