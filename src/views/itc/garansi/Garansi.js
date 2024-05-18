import React, { useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./../../../assets/styles/datatables.css";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Button, Typography } from "@material-tailwind/react";

function Garansi() {
  const tableRef = useRef(null);
  const [garansi, setgaransi] = useState([]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Data Garansi
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
            <a href="/garansi">
              <span>Garansi</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <a href="/add_garansi" className="float-right mb-5">
            <Button variant="gradient" color="blue">
              Tambah
            </Button>
          </a>
          <div className="rounded my-5 p-2 w-full overflow-x-auto">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto w-full"
            >
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold">No</th>
                  <th className="text-sm py-2 px-3 font-semibold">ID TT</th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    TGL Masuk{" "}
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">Barang</th>
                  <th className="text-sm py-2 px-3 font-semibold">Merek </th>
                  <th className="text-sm py-2 px-3 font-semibold">Masuk ke </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Kerusakan{" "}
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">TGL Jadi</th>
                  <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan="9"
                    className="text-sm text-center capitalize py-3 bg-gray-100"
                  >
                    Tidak ada data
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </section>
  );
}

export default Garansi;
