import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./../../../assets/styles/datatables.css";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Button, Breadcrumbs, IconButton, Typography } from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { API_IJIN } from "../../../utils/BaseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import formatDate from "../../../component/FormatDate";

function Ijin() {
  const tableRef = useRef(null);
  const [ijins, setIjin] = useState([]);

  const initializeDataTable = () => {
    if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable({});
    }
  };

  const getAllIjin = async () => {
    try {
      const response = await axios.get(`${API_IJIN}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setIjin(response.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Gagal memuat data ijin!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };


  useEffect(() => {
    getAllIjin();
  }, []);

  useEffect(() => {
    if (ijins && ijins.length > 0) {
      initializeDataTable();
    }
  }, [ijins]);

  console.log(ijins);


  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Ijin
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
          <div className="rounded my-5 p-2 w-full overflow-x-auto">
            <table id="example_data" ref={tableRef} className="table-auto w-full border-collapse rounded-sm">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-xs py-3 px-4">No</th>
                  <th className="text-xs py-3 px-4">Durasi</th>
                  <th className="text-xs py-3 px-4">Tanggal Awal</th>
                  <th className="text-xs py-3 px-4">Tanggal Akhir</th>
                  <th className="text-xs py-2 px-3">Salesman</th>
                  <th className="text-xs py-3 px-4">Keterangan</th>
                  <th className="text-xs py-3 px-4">Foto</th>
                </tr>
              </thead>
              <tbody>
                {ijins.length > 0 ? (
                  ijins.map((row, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="text-sm text-center py-3 px-4">{index + 1}</td>
                      <td className="text-sm text-center py-3 px-4">{row.jenis}</td>
                      <td className="text-sm text-center py-3 px-4">{formatDate(row.tgl_a)}</td>
                      <td className="text-sm text-center py-3 px-4">{formatDate(row.tgl_b)}</td>
                      <td className="text-sm text-center py-3 px-4">{row.salesman.namaSalesman}</td>
                      <td className="text-sm text-center py-3 px-4">{row.ket}</td>
                      <td className="text-sm text-center py-3 px-4">
                        <img src={row.foto} alt="foto" className="h-24 w-24 rounded object-cover" />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4 bg-gray-100 text-xs">
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

export default Ijin;

