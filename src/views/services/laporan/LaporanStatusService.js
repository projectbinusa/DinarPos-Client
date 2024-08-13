import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import $ from "jquery";
import "datatables.net";
import "../../../assets/styles/datatables.css";
import Decrypt from "../../../component/Decrypt";
import { API_PENGGUNA } from "../../../utils/BaseUrl";
import axios from "axios";

function LaporanStatusService() {
  const tableRef = useRef(null);
  const [status, setstatus] = useState([]);

  const initializeDataTable = () => {
    if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable({});
    }
  };

  useEffect(() => {
    if (status && status.length > 0) {
      initializeDataTable();
    }
  }, [status]);

  const [level, setlevel] = useState("");

  const idPengguna = Decrypt()
  useEffect(() => {
    axios.get(`${API_PENGGUNA}/` + idPengguna, {
      headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
    }).then((res) => {
      const response = res.data.data;
      setlevel(response.levelPengguna)
    }).catch((err) => {
      console.log(err);
    })
  }, [idPengguna])

  let dashboard = "";

  if (level === "Superadmin") {
    dashboard = "dashboard";
  } else if (level === "AdminService") {
    dashboard = "dashboard_service"
  }

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Laporan Status Service
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href={"/" + dashboard} className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011-1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/laporan_status">
              <span>Laporan Status Service</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <br />
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-end mb-6 lg:justify-between">
            <div className="w-full">
              <Input
                type="date"
                id="startDate"
                label="Tanggal Awal"
                color="blue"
                variant="outlined"
                required
                // onChange={(e) => setStartDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Input
                type="date"
                id="endDate"
                label="Tanggal Akhir"
                color="blue"
                variant="outlined"
                required
                // onChange={(e) => setEndDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full lg:w-auto flex justify-start items-center">
              <Button
                variant="gradient"
                color="blue"
                // onClick={filterTangggal}
                size="md"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-auto flex justify-start items-center">
            <Button
              variant="gradient"
              color="blue"
              // onClick={filterTangggal}
              size="md"
              className="font-poppins font-medium"
            >
              Export            </Button>
          </div>
          <div className="rounded mt-10 p-2 w-full overflow-x-auto">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto w-full"
            >
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold">No</th>
                  <th className="text-sm py-2 px-3 font-semibold">ID TT</th>
                  <th className="text-sm py-2 px-3 font-semibold">Customer </th>
                  <th className="text-sm py-2 px-3 font-semibold">TGL Masuk</th>
                  <th className="text-sm py-2 px-3 font-semibold">No Faktur </th>
                  <th className="text-sm py-2 px-3 font-semibold">Keluhan </th>
                  <th className="text-sm py-2 px-3 font-semibold">TGL </th>
                  <th className="text-sm py-2 px-3 font-semibold">Teknisi</th>
                  <th className="text-sm py-2 px-3 font-semibold">Status</th>
                  <th className="text-sm py-2 px-3 font-semibold">Solusi</th>
                </tr>
              </thead>
              {/* <tbody>
                {status.length > 0 ? (
                  status.map((row, index) => {
                    return (
                      // <tr key={index}>
                      //   <td className="text-sm w-[4%]">{index + 1}</td>
                      //   <td className="text-sm py-2 px-3">
                      //     {row.customer.nama_customer}
                      //   </td>
                      //   <td className="text-sm py-2 px-3">
                      //     {row.customer.alamat}
                      //   </td>
                      //   <td className="text-sm py-2 px-3">
                      //     {row.produk}
                      //     <span className="block">{row.merk}</span>
                      //     <span className="block">{row.type}</span>
                      //   </td>
                      //   <td className="text-sm py-2 px-3">
                      //     {formatDate(row.tanggalMasuk)}
                      //   </td>
                      //   <td className="text-sm py-2 px-3">
                      //     {tglKonfirms.map((down, idx) => (
                      //       <ul key={idx}>
                      //         <li>{formatDate(down.tglKonf)}</li>
                      //       </ul>
                      //     ))}
                      //   </td>
                      //   <td className="text-sm py-2 px-3">
                      //     {row.statusEnd}
                      //   </td>
                      //   <td className="text-sm py-2 px-3 flex items-center justify-center">
                      //     <div className="flex flex-row gap-3">
                      //       <a href={"/detail_service/" + row.idTT}>
                      //         <IconButton size="md" color="light-blue">
                      //           <InformationCircleIcon className="w-6 h-6 white" />
                      //         </IconButton>
                      //       </a>
                      //     </div>
                      //   </td>
                      // </tr>
                    );
                  })
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
              </tbody> */}
            </table>
          </div>
        </main>
      </div>
    </section>
  );
}
export default LaporanStatusService;
