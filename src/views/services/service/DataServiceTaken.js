import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { API_PENGGUNA, API_SERVICE } from "../../../utils/BaseUrl";
import $ from "jquery";
import "datatables.net";
import "./../../../assets/styles/datatables.css";
import {
  InformationCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import Decrypt from "../../../component/Decrypt";

function DataServiceTaken() {
  const [validasi, setValidasi] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [services, setServices] = useState([]);
  const [tglKonfirm, setTglKonfirm] = useState([]);
  const tableRef = useRef(null);

  const formatDate = (value) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  const initializeDataTable = () => {
    if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable();
    }
  };

  const getAll = async () => {
    try {
      const response = await axios.get(`${API_SERVICE}/taken`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setServices(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  const getAllTgl = async () => {
    try {
      const response = await axios.get(
        `${API_SERVICE}/service-taken-by-date?akhir=${endDate}&awal=${startDate}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setServices(response.data);
      setValidasi(false);
    } catch (error) {
      console.log("get all", error);
    }
  };

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
      console.log("tglKonfirmasi", error);
      return [];
    }
  };

  useEffect(() => {
    getAll()
  }, [])

  useEffect(() => {
    if (services.length > 0) {
      initializeDataTable();
    }
  }, [services]);

  useEffect(() => {
    const fetchTglKonfirm = async () => {
      const tglList = await Promise.all(
        services.map(async (service) => {
          const tglData = await tglKonfirmasi(service.idTT);
          return tglData;
        })
      );
      setTglKonfirm(tglList);
    };

    fetchTglKonfirm();
  }, [services]);

  useEffect(() => {
    if (validasi || endDate !== "" || startDate !== "") {
      getAllTgl();
    }
  }, [validasi]);

  const filterTangggal = async () => {
    if (startDate === "" || endDate === "" || startDate === endDate) {
      Swal.fire({
        icon: "warning",
        title: "Isi Form Terlebih Dahulu!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    setValidasi(true);
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

  if (level === "Pimpinan") {
    dashboard = "dashboard_pimpinan";
  } else if (level === "Teknisi") {
    dashboard = "dashboard_teknisi"
  } else if (level === "AdminService") {
    dashboard = "dashboard_service"
  } else {
    dashboard = "dashboard"
  }

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase font-poppins">
            Data Service Taken
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href={'/' + dashboard} className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/data_service">
              <span>Service</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-end mb-6 lg:justify-between">
            <div className="w-full">
              <Input
                type="date"
                id="startDate"
                label="Tanggal Awal"
                color="blue"
                variant="outlined"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
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
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full lg:w-auto flex justify-start items-center">
              <Button
                variant="gradient"
                color="blue"
                onClick={filterTangggal}
                size="md"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="rounded my-5 p-2 w-full overflow-x-auto">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto w-full"
            >
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-xs py-2 px-3">No</th>
                  <th className="text-xs py-2 px-3">Nama</th>
                  <th className="text-xs py-2 px-3">Alamat </th>
                  <th className="text-xs py-2 px-3">Produk</th>
                  <th className="text-xs py-2 px-3">In </th>
                  <th className="text-xs py-2 px-3">C </th>
                  <th className="text-xs py-2 px-3">Status </th>
                  <th className="text-xs py-2 px-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {services.length > 0 ? (
                  services.map((row, index) => {
                    const tglKonfirms = tglKonfirm[index] || [];

                    return (
                      <tr key={index}>
                        <td className="text-xs w-[4%]">{index + 1}</td>
                        <td className="text-xs py-2 px-3">
                          {row.customer.nama_customer}
                        </td>
                        <td className="text-xs py-2 px-3">
                          {row.customer.alamat}
                        </td>
                        <td className="text-xs py-2 px-3">
                          {row.produk}
                          <span className="block">{row.merk}</span>
                          <span className="block">{row.type}</span>
                        </td>
                        <td className="text-xs py-2 px-3">
                          {formatDate(row.tanggalMasuk)}
                        </td>
                        <td className="text-xs py-2 px-3">
                          {tglKonfirms.map((down, idx) => (
                            <ul key={idx}>
                              <li>{formatDate(down.tglKonf)}</li>
                            </ul>
                          ))}
                        </td>
                        <td className="text-xs py-2 px-3">
                          TAKEN ({row.statusEnd})
                        </td>
                        <td className="text-xs py-2 px-3 flex items-center justify-center">
                          <div className="flex flex-row gap-3">
                            <a href={"/detail_service_taken/" + row.idTT}>
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
                      colSpan="8"
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

export default DataServiceTaken;
