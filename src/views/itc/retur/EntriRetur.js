import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import $ from "jquery";
import "datatables.net";
import "./../../../assets/styles/datatables.css";
import { Breadcrumbs, IconButton, Typography } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";

function EntriRetur() {
  const tableRef = useRef(null);
  const [entries, setentries] = useState([]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  useEffect(() => {
    if (entries && entries.length > 0) {
      initializeDataTable();
    }
  }, [entries]);
  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Entri Retur
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
            <a href="/data_retur">
              <span>Retur</span>
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
                  <th className="text-sm py-2 px-3 font-semibold">No TT</th>
                  <th className="text-sm py-2 px-3 font-semibold">Nama</th>
                  <th className="text-sm py-2 px-3 font-semibold">Alamat </th>
                  <th className="text-sm py-2 px-3 font-semibold">Produk </th>
                  <th className="text-sm py-2 px-3 font-semibold">IN </th>
                  <th className="text-sm py-2 px-3 font-semibold">C </th>
                  <th className="text-sm py-2 px-3 font-semibold">Status </th>
                  <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {entries.length > 0 ? (
                  entries.map((row, index) => (
                    <tr key={index}>
                      <td className="text-sm w-[4%]">{index + 1}</td>
                      <td className="text-sm py-2 px-3">{index + 1}</td>
                      <td className="text-sm py-2 px-3">{index + 1}</td>
                      <td className="text-sm py-2 px-3">{index + 1}</td>
                      <td className="text-sm py-2 px-3">{index + 1}</td>
                      <td className="text-sm py-2 px-3">{index + 1}</td>
                      <td className="text-sm py-2 px-3 flex items-center justify-center">
                        <div className="flex flex-row gap-3">
                          <a href={"/aksi_add_retur/" + index + 1}>
                            <IconButton size="md" color="light-blue">
                              <PlusIcon className="w-6 h-6 white" />
                            </IconButton>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
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

export default EntriRetur;
