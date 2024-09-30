import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Button, IconButton, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { API_KUNJUNGAN } from "../../../utils/BaseUrl";
import $ from "jquery"
import { InformationCircleIcon } from "@heroicons/react/24/outline";

function Kunjungan() {
  const [datas, setDatas] = useState([]);

  const tableRef = useRef(null);
  const initializeDataTable = () => {
    if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable({});
    }
  };
  
  const formatDate = (value) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };

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

  useEffect(() => {
    if (datas && datas.length > 0) {
      initializeDataTable();
    }
  }, [datas])


  return (
    <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Kunjungan
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
          <div className="rounded mb-5 p-1 overflow-x-auto">
            <table className="w-full border-collapse" id="example_data" ref={tableRef}>
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-sm py-3 px-4 font-semibold">No</th>
                  <th className="text-sm py-3 px-4 font-semibold">Tanggal</th>
                  <th className="text-sm py-3 px-4 font-semibold">Nama</th>
                  <th className="text-sm py-3 px-4 font-semibold">Instansi</th>
                  <th className="text-sm py-3 px-4 font-semibold">Jenis</th>
                  <th className="text-sm py-3 px-4 font-semibold">Daerah</th>
                  <th className="text-sm py-3 px-4 font-semibold">Tujuan</th>
                  <th className="text-sm py-3 px-4 font-semibold">Action</th>
                  <th className="text-sm py-3 px-4 font-semibold">Info didapat</th>
                  <th className="text-sm py-3 px-4 font-semibold">CP</th>
                  <th className="text-sm py-3 px-4 font-semibold">Visit</th>
                  <th className="text-sm py-3 px-4 font-semibold">Tipe</th>
                  <th className="text-sm py-3 px-4 font-semibold">Peluang</th>
                  <th className="text-sm py-3 px-4 font-semibold">Deal</th>
                  <th className="text-sm py-3 px-4 font-semibold">Detail</th>
                </tr>
              </thead>
              <tbody>
                {datas.length > 0 ? (
                  datas.map((kunjungan, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="text-sm text-center py-3 px-4">{index + 1}</td>
                      <td className="text-sm text-center py-3 px-4">{formatDate(kunjungan.tanggalKunjungan)}</td>
                      <td className="text-sm text-center py-3 px-4">{kunjungan.salesman.namaSalesman}</td>
                      <td className="text-sm text-center py-3 px-4">{kunjungan.customer.nama_customer}</td>
                      <td className="text-sm text-center py-3 px-4">{kunjungan.customer.jenis}</td>
                      <td className="text-sm text-center py-3 px-4">{kunjungan.customer.kabKot.nama_kabkot} / {kunjungan.customer.kec.nama_kec}</td>
                      <td className="text-sm text-center py-3 px-4">{kunjungan.tujuan}</td>
                      <td className="text-sm text-center py-3 px-4">{kunjungan.action}</td>
                      <td className="text-sm text-center py-3 px-4">{kunjungan.infoDpt}</td>
                      <td className="text-sm text-center py-3 px-4">{kunjungan.cp}</td>
                      <td className="text-sm text-center py-3 px-4">{kunjungan.nVisit}</td>
                      <td className="text-sm text-center py-3 px-4">{kunjungan.visit}</td>
                      <td className="text-sm text-center py-3 px-4">{kunjungan.peluang}</td>
                      <td className="text-sm text-center py-3 px-4">{kunjungan.deal}</td>
                      <td className="text-sm py-2 px-3 flex items-center justify-center">
                        <a href={"/detail_kunjungan/" + kunjungan.idReport}>
                          <IconButton size="md" color="green">
                            <InformationCircleIcon className="w-6 h-6 white" />
                          </IconButton>
                        </a>
                      </td>
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
