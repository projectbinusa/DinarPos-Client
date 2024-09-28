import React, { useEffect, useState } from "react";
import axios from "axios";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Button, Typography } from "@material-tailwind/react";
import { API_FINISH, API_FINISH_MARKETTING } from "../../../utils/BaseUrl";

function DataFinish() {
  const [finish, setFinish] = useState([]); // perbaikan nama state
  const [level, setLevel] = useState("");

  const getAllFinish = async () => {
    try {
      const { data } = await axios.get(`${API_FINISH}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setFinish(data.data); // sesuai dengan state yang diinisialisasi
    } catch (error) {
      console.error("Gagal mengambil data finish:", error);
    }
  };

  const fetchLevel = () => {
    setLevel(localStorage.getItem("level"));
  };

  useEffect(() => {
    getAllFinish();
    fetchLevel();
  }, []);

  let dashboard = "";
  if (level === "Superadmin") {
    dashboard = "dashboard";
  } else if (level === "AdminService") {
    dashboard = "dashboard_service";
  }

  return (
    <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Deal Finish
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/home" className="opacity-60">
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
          <div className="flex justify-end mb-5">
            <a href="/form_finish">
              <Button
                variant="gradient"
                color="blue"
                className="font-poppins font-medium">
                Tambah
              </Button>
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-sm py-3 px-4 font-semibold text-left">No</th>
                  <th className="text-sm py-3 px-4 font-semibold text-left">Basp</th>
                  <th className="text-sm py-3 px-4 font-semibold text-left">Baut</th>
                  <th className="text-sm py-3 px-4 font-semibold text-left">Spk</th>
                  <th className="text-sm py-3 px-4 font-semibold text-left">Ev_Datang</th>
                  <th className="text-sm py-3 px-4 font-semibold text-left">Ev_Proses</th>
                  <th className="text-sm py-3 px-4 font-semibold text-left">Ev_Finish</th>
                </tr>
              </thead>
              <tbody>
                {finish.length > 0 ? (
                  finish.map((row, index) => (
                    <tr key={row.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                      <td className="text-sm py-2 px-4 border">{index + 1}</td>
                      <td className="text-sm py-2 px-4 border">{row.basp}</td>
                      <td className="text-sm py-2 px-4 border">{row.baut}</td>
                      <td className="text-sm py-2 px-4 border">{row.file_spk}</td>
                      <td className="text-sm py-2 px-4 border">{row.ev_dtg}</td>
                      <td className="text-sm py-2 px-4 border">{row.ev_pro}</td>
                      <td className="text-sm py-2 px-4 border">{row.ev_fin}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-3 bg-gray-200 border">
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

export default DataFinish;