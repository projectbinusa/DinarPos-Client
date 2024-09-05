import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Typography } from "@material-tailwind/react";
import axios from "axios";
import { API_KUNJUNGAN } from "../../../utils/BaseUrl";

function Kunjungan() {
  const [datas, setDatas] = useState([]);

  const getAll = async () => {
    try {
      const response = await axios.get(`${API_KUNJUNGAN}`, {
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
          <div className="rounded mb-5 p-1 mt-12 overflow-x-auto">
            <table>
              <thead className="bg-blue-500 text-white w-full">
                <tr>
                  <th className="text-xs py-1 px-2 font-semibold w-[4%]">No</th>
                  <th className="text-xs py-1 px-2 font-semibold">Tanggal</th>
                  <th className="text-xs py-1 px-2 font-semibold">Nama</th>
                  <th className="text-xs py-1 px-2 font-semibold">Instansi</th>
                  <th className="text-xs py-1 px-2 font-semibold">Jenis</th>
                  <th className="text-xs py-1 px-2 font-semibold">Daerah</th>
                  <th className="text-xs py-1 px-2 font-semibold">Tujuan</th>
                  <th className="text-xs py-1 px-2 font-semibold">Action</th>
                  <th className="text-xs py-1 px-2 font-semibold">
                    Info didapat
                  </th>
                  <th className="text-xs py-1 px-2 font-semibold">CP</th>
                  <th className="text-xs py-1 px-2 font-semibold">Visit</th>
                  <th className="text-xs py-1 px-2 font-semibold">Tipe</th>
                  <th className="text-xs py-1 px-2 font-semibold">Peluang</th>
                  <th className="text-xs py-1 px-2 font-semibold">Deal</th>
                  <th className="text-xs py-1 px-2 font-semibold">Detail</th>
                </tr>
              </thead>
              <tbody>
                {datas.length > 0 ? (
                  datas.map((kunjungan, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-sm w-[4%]">{index + 1}</td>
                        <td className="text-sm py-2 px-3">
                          {kunjungan.tanggal}
                        </td>
                        <td className="text-sm py-2 px-3">{kunjungan.nama}</td>
                        <td className="text-sm py-2 px-3">
                          {kunjungan.instansi}
                        </td>
                        <td className="text-sm py-2 px-3">{kunjungan.jenis}</td>
                        <td className="text-sm py-2 px-3">
                          {kunjungan.daerah}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {kunjungan.tujuan}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {kunjungan.action}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {kunjungan.info_dapat}
                        </td>
                        <td className="text-sm py-2 px-3">{kunjungan.cp}</td>
                        <td className="text-sm py-2 px-3">{kunjungan.visit}</td>
                        <td className="text-sm py-2 px-3">{kunjungan.tipe}</td>
                        <td className="text-sm py-2 px-3">
                          {kunjungan.peluang}
                        </td>
                        <td className="text-sm py-2 px-3">{kunjungan.deal}</td>
                        <td className="text-sm py-2 px-3 flex flex-col gap-2">
                          {/* <IconButton size="md" color="red">
                            <TrashIcon className="w-6 h-6 white" />
                          </IconButton> */}
                        </td>
                      </tr>
                    );
                  })
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

export default Kunjungan;
