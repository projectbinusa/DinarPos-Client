import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import $ from "jquery";
import "datatables.net";
import "./../../../assets/styles/datatables.css";

function DataPoin() {
  const tableRef = useRef(null);
  const [points, setpoints] = useState([]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  useEffect(() => {
    if (points && points.length > 0) {
      initializeDataTable();
    }
  }, [points]);

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Poin Teknisi
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
            <a href="/take_over">
              <span>Poin</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          <div className="bg-white shadow-lg p-5 my-5 rounded">
            <div className="flex justify-between items-center">
              <Typography
                variant="paragraph"
                className="capitalize font-semibold"
              >
                Poin{" "}
              </Typography>
              <Button variant="gradient" color="blue">
                Input{" "}
              </Button>
            </div>
            <br /> <hr /> <br />
            <br />
            <div className="flex gap-2 items-center">
              <Input
                label="Tanda Terima"
                variant="static"
                color="blue"
                size="md"
                //   onChange={(e) => setidTT(e.target.value)}
                placeholder="Cari Tanda Terima"
                required
              />
              <Button variant="gradient" color="blue" size="sm">
                GO!
              </Button>
            </div>{" "}
            <br />
            <div class="overflow-x-auto" id="tables_poin">
              <table class="border border-collapse w-full" id="table_poin">
                <thead>
                  <tr>
                    <th class="border-gray-300 border bg-gray-200 font-normal text-sm py-2 px-1">
                      No
                    </th>
                    <th class="border-gray-300 border bg-gray-200 font-normal text-sm py-2 px-1">
                      Teknisi
                    </th>
                    <th class="border-gray-300 border bg-gray-200 font-normal text-sm py-2 px-1">
                      Total Poin
                    </th>
                    <th class="border-gray-300 border bg-gray-200 font-normal text-sm py-2 px-1">
                      Nominal (Rp)
                    </th>
                    <th class="border-gray-300 border bg-gray-200 font-normal text-sm py-2 px-1">
                      %
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-sm text-center py-2 px-2 border-gray-300 border">
                      1
                    </td>
                    <td class="text-sm text-center py-2 px-2 border-gray-300 border">
                      NizarRestu
                    </td>
                    <td class="text-sm text-center py-2 px-2 border-gray-300 border">
                      1
                    </td>
                    <td class="text-sm text-center py-2 px-2 border-gray-300 border">
                      1
                    </td>
                    <td class="text-sm text-center py-2 px-2 border-gray-300 border">
                      1%
                    </td>
                  </tr>
                  <tr>
                    <td class="text-sm text-center py-2 px-2 border-gray-300 border"></td>
                    <td class="text-sm text-right py-2 px-2 border-gray-300 border">
                      <strong>Total</strong>
                    </td>
                    <td class="text-sm text-center py-2 px-2 border-gray-300 border">
                      1
                    </td>
                    <td class="text-sm text-center py-2 px-2 border-gray-300 border">
                      1
                    </td>
                    <td class="text-sm text-center py-2 px-2 border-gray-300 border">
                      1%
                    </td>
                  </tr>
                  <tr>
                    <td class="text-sm text-center py-2 px-2 border-gray-300 border"></td>
                    <td class="text-sm text-right py-2 px-2 border-gray-300 border">
                      <strong>Rata-rata</strong>
                    </td>
                    <td class="text-sm text-center py-2 px-2 border-gray-300 border">
                      1
                    </td>
                    <td class="text-sm text-center py-2 px-2 border-gray-300 border">
                      1
                    </td>
                    <td class="text-sm text-center py-2 px-2 border-gray-300 border">
                      1%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white shadow-lg p-5 my-5 rounded lg:col-span-2">
            <Typography
              variant="paragraph"
              className="capitalize font-semibold"
            >
              History Poin{" "}
            </Typography>{" "}
            <br />
            <hr /> <br /> <br />
            <div className="flex gap-2 items-center">
              <Input
                label="Tanggal Awal"
                variant="static"
                color="blue"
                size="md"
                //   onChange={(e) => setidTT(e.target.value)}
                placeholder="Masukkan Tanggal Awal"
                required
              />
              <Input
                label="Tanggal Akhir"
                variant="static"
                color="blue"
                size="md"
                //   onChange={(e) => setidTT(e.target.value)}
                placeholder="Masukkan Tanggal Akhir"
                required
              />
              <div>
                <IconButton size="md" color="light-blue">
                  <MagnifyingGlassIcon className="w-6 h-6 white" />
                </IconButton>
              </div>
            </div>{" "}
            <br />
            <div className="rounded p-1 w-full overflow-x-auto">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto w-full"
            >
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold">No</th>
                  <th className="text-sm py-2 px-3 font-semibold">Teknisi</th>
                  <th className="text-sm py-2 px-3 font-semibold">Tgl </th>
                  <th className="text-sm py-2 px-3 font-semibold">Poin </th>
                  <th className="text-sm py-2 px-3 font-semibold">Nominal </th>
                  <th className="text-sm py-2 px-3 font-semibold">Ket </th>
                </tr>
              </thead>
              <tbody>
                {points.length > 0 ? (
                  points.map((row, index) => (
                    <tr key={index}>
                      <td className="text-sm w-[4%]">{index + 1}</td>
                      <td className="text-sm py-2 px-3">{index + 1}</td>
                      <td className="text-sm py-2 px-3">{index + 1}</td>
                      <td className="text-sm py-2 px-3">{index + 1}</td>
                      <td className="text-sm py-2 px-3">{index + 1}</td>
                      <td className="text-sm py-2 px-3">{index + 1}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-sm text-center capitalize py-3 bg-gray-100"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default DataPoin;
