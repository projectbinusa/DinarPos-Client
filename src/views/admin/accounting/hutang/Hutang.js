import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import $ from "jquery";
import "datatables.net";
import "./../../../../assets/styles/datatables.css";
import axios from "axios";
import { API_HUTANG } from "../../../../utils/BaseUrl";
import { CheckIcon } from "@heroicons/react/24/outline";

function Hutang() {
  const tableRef = useRef(null);
  const [hutangs, sethutangs] = useState([]);
  const [tglAwal, settglAwal] = useState("");
  const [tglAkhir, settglAkhir] = useState("");

  const getAll = async () => {
    try {
      const response = await axios.get(`${API_HUTANG}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      sethutangs(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  useEffect(() => {
    if (hutangs && hutangs.length > 0) {
      initializeDataTable();
    }
  }, [hutangs]);

  const rekapHutang = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${API_HUTANG}/export/excel/rekap-hutang`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "RekapHutang.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error saat mengunduh file:", error);
    }
  };

  const bukuHutang = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${API_HUTANG}/export/excel/hutang?tglAkhir=${tglAkhir}&tglAwal=${tglAwal}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "BukuHutang.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error saat mengunduh file:", error);
    }
  };

  const historyHutang = async () => {
    try {
      const response = await axios.get(
        `${API_HUTANG}/export/excel/history-hutang?tglAkhir=${tglAkhir}&tglAwal=${tglAwal}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "HistoryHutang.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error saat mengunduh file:", error);
    }
  };

  return (
    <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Hutang{" "}
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
            <a href="/data_hutang">
              <span>Hutang</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded ">
          <form onSubmit={bukuHutang}>
            <div className="mt-8 w-72 lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Awal"
                required
                onChange={(e) => settglAwal(e.target.value)}
              />
            </div>
            <div className="mt-8 w-72 lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Akhir"
                required
                onChange={(e) => settglAkhir(e.target.value)}
              />
            </div>
            <Button className="mt-5" color="blue" type="submit">
              Export
            </Button>
          </form>
          <div className="flex flex-col lg:flex-row lg:gap-4">
            <div>
              <Button
                className="mt-5"
                color="blue"
                type="button"
                onClick={rekapHutang}
              >
                Export Rekap Hutang
              </Button>
            </div>
            <div>
              <Button className="mt-5" color="blue" type="button" onClick={historyHutang}>
                Export History Hutang
              </Button>
            </div>
          </div>
          <div className="rounded mb-5 p-1 mt-12 overflow-x-auto">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto w-full overflow-x-auto"
            >
              <thead className="bg-blue-500 text-white w-full">
                <tr>
                  <th className="text-sm py-2 px-2.5 font-semibold w-[4%]">
                    No
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Tanggal</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    No Faktur
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Nama Suplier
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Nilai Transaksi (Rp)
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Sisa Hutang (Rp)
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {hutangs.length > 0 ? (
                  hutangs.map((hutang, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-sm w-[4%]">{index + 1}</td>
                        <td className="text-sm py-2 px-3">
                          {hutang.created_date}
                        </td>
                        <td className="text-sm py-2 px-3">{hutang.noFaktur}</td>
                        <td className="text-sm py-2 px-3">
                          {hutang.suplier.namaSuplier}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {hutang.totalBelanja}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {hutang.kekurangan}
                        </td>
                        <td className="text-sm py-2 px-3 flex flex-col gap-2">
                          <a
                            href={"/pelunasan_hutang/" + hutang.idTransaksiBeli}
                          >
                            <IconButton size="md" color="light-blue">
                              <CheckIcon className="w-6 h-6 white" />
                            </IconButton>
                          </a>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="7"
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

export default Hutang;
