import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import $ from "jquery";
import "datatables.net";
import "../../assets/styles/datatables.css";  // Update this path
import { InformationCircleIcon } from "@heroicons/react/24/outline";

function DashboardTeknisi() {
  const tableRef = useRef(null);
  const [teknisiData, setTeknisiData] = useState([]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  useEffect(() => {
    if (teknisiData && teknisiData.length > 0) {
      initializeDataTable();
    }
  }, [teknisiData]);

  const formatDate = (value) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Dashboard Teknisi
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
            <a href="/dashboard_teknisi">
              <span>Teknisi</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <div className="rounded my-5 p-2 w-full overflow-x-auto">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto w-full"
            >
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold">No</th>
                  <th className="text-sm py-2 px-3 font-semibold">Nama</th>
                  <th className="text-sm py-2 px-3 font-semibold">Alamat</th>
                  <th className="text-sm py-2 px-3 font-semibold">Bagian</th>
                  <th className="text-sm py-2 px-3 font-semibold">No HP</th>
                  <th className="text-sm py-2 px-3 font-semibold">Status</th>
                  <th className="text-sm py-2 px-3 font-semibold">Total Point</th>
                  <th className="text-sm py-2 px-3 font-semibold">Created Date</th>
                  <th className="text-sm py-2 px-3 font-semibold">Updated Date</th>
                  <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {teknisiData.length > 0 ? (
                  teknisiData.map((row, index) => (
                    <tr key={index}>
                      <td className="text-sm w-[4%]">{index + 1}</td>
                      <td className="text-sm py-2 px-3">{row.nama}</td>
                      <td className="text-sm py-2 px-3">{row.alamat}</td>
                      <td className="text-sm py-2 px-3">{row.bagian}</td>
                      <td className="text-sm py-2 px-3">{row.nohp}</td>
                      <td className="text-sm py-2 px-3">{row.status}</td>
                      <td className="text-sm py-2 px-3">{row.total_point}</td>
                      <td className="text-sm py-2 px-3">{formatDate(row.created_date)}</td>
                      <td className="text-sm py-2 px-3">{formatDate(row.update_date)}</td>
                      <td className="text-sm py-2 px-3 flex items-center justify-center">
                        <div className="flex flex-row gap-3">
                          <a href={"/detail_teknisi/" + row.id}>
                            <IconButton size="md" color="light-blue">
                              <InformationCircleIcon className="w-6 h-6 white" />
                            </IconButton>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="10"
                      className="text-sm text-center capitalize py-3 bg-gray-100"
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

export default DashboardTeknisi;
