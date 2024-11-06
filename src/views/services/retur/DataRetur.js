import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import $ from "jquery";
import "datatables.net";
import "./../../../assets/styles/datatables.css";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { API_PENGGUNA, API_SERVICE, API_SERVICE_RETUR } from "../../../utils/BaseUrl";
import axios from "axios";
import Decrypt from "../../../component/Decrypt";

function DataRetur() {
  const tableRef = useRef(null);
  const [returs, setreturs] = useState([]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  const getAll = async () => {
    try {
      const response = await axios.get(`${API_SERVICE_RETUR}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setreturs(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (returs && returs.length > 0) {
      initializeDataTable();
    }
  }, [returs]);

  const [tglKonfirm, setTglKonfirm] = useState([]);

  const tglKonfirmasi = async (transactionId) => {
    try {
      const response = await axios.get(
        `${API_SERVICE}/tgl_konfirm?id=${transactionId}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      return response.data.data;
    } catch (error) {
      console.log("get all", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchTglKonfirm = async () => {
      const tglList = await Promise.all(
        returs.map(async (service) => {
          const tglData = await tglKonfirmasi(service.idTT);
          return tglData;
        })
      );
      setTglKonfirm(tglList);
    };

    fetchTglKonfirm();
  }, [returs]);

  const formatDate = (value) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

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
          <Typography variant="lead" className="uppercase font-poppins">
            Data Retur
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href={"/" + dashboard} className="opacity-60">
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
          <a href="/entri_retur" className="float-right mb-5">
            <Button variant="gradient" color="blue" className="font-popins font-medium">
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
                  <th className="text-xs py-2 px-3">No TT Baru</th>
                  <th className="text-xs py-2 px-3">No TT Lama</th>
                  <th className="text-xs py-2 px-3">Nama</th>
                  <th className="text-xs py-2 px-3">Alamat </th>
                  <th className="text-xs py-2 px-3">Produk </th>
                  <th className="text-xs py-2 px-3">IN </th>
                  <th className="text-xs py-2 px-3">C </th>
                  <th className="text-xs py-2 px-3">Status </th>
                  <th className="text-xs py-2 px-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {returs.length > 0 ? (
                  returs.map((row, index) => {
                    const tglKonfirms = tglKonfirm[index] || [];

                    return (
                      <tr key={index}>
                        <td className="text-xs w-[4%]">{row?.ttBaru?.idTT}</td>
                        <td className="text-xs py-2 px-3">{row?.ttLama?.idTT}</td>
                        <td className="text-xs py-2 px-3">{row?.ttBaru?.nama}</td>
                        <td className="text-xs py-2 px-3">
                          {row?.ttBaru?.alamat}
                        </td>
                        <td className="text-xs py-2 px-3">
                          {row?.ttBaru?.produk}
                        </td>
                        <td className="text-xs py-2 px-3">
                          {formatDate(row?.ttBaru?.tanggalMasuk)}
                        </td>
                        <td className="text-xs py-2 px-3">
                          {tglKonfirms.map((down, idx) => (
                            <ul key={idx}>
                              <li>{formatDate(down.tglKonf)}</li>
                            </ul>
                          ))}
                        </td>
                        <td className="text-xs py-2 px-3">
                          {row?.ttBaru?.statusEnd}
                        </td>
                        <td className="text-xs py-2 px-3 flex items-center justify-center">
                          <div className="flex flex-row gap-3">
                            <a href={"/detail_service/" + row?.ttBaru?.idTT}>
                              <IconButton size="md" color="light-blue">
                                <InformationCircleIcon className="w-6 h-6 white" />
                              </IconButton>
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="text-xs text-center capitalize py-3 bg-gray-100"
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

export default DataRetur;
