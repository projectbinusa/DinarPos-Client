import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../component/SidebarAdmin";
import {
  Breadcrumbs,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { API_SERVICE } from "../../utils/BaseUrl";
import $ from "jquery";
import "../../assets/styles/datatables.css";
import { InformationCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

function ServiceCancelTeknisi() {
  const tableRef = useRef(null);
  const [services, setservices] = useState([]);
  // const [servicesTgl, setservicesTgl] = useState([]);
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [validasi, setvalidasi] = useState(false);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  // GET ALL
  const getAllService = async () => {
    if (startDate === "" && endDate === "" && validasi === true) {
      Swal.fire({
        icon: "warning",
        title: "Masukkan Tanggal Terlebih Dahulu!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    let response;
    try {
      if (validasi === true && endDate != "" && startDate != "") {
        let response = await axios.get(`${API_SERVICE}/cancel/filter?akhir=${endDate}&awal=${startDate}`, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        });
        setservices(response.data.data)
      } else {
        let response = await axios.get(`${API_SERVICE}/cancel`, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        });
        setservices(response.data.data)
      }
    } catch (error) {
      console.log("get all", error);
    }
  }

  useEffect(() => {
    if (validasi == true) {
      getAllService();
      setvalidasi(false);
    }
  }, [validasi, endDate, startDate]);

  useEffect(() => {
    getAllService();
  }, []);

  const handleSearchByMonth = () => {
    setvalidasi(true);
  };

  useEffect(() => {
    if (services && services.length > 0) {
      initializeDataTable();
    }
  }, [services]);

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
        services.map(async (service) => {
          const tglData = await tglKonfirmasi(service.idTT);
          return tglData;
        })
      );
      setTglKonfirm(tglList);
    };

    fetchTglKonfirm();
  }, [services]);

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
            Service Cancel
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/dashboard_teknisi" className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/service_cancel_teknisi">
              <span>Cancel</span>
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
                onChange={(e) => setstartDate(e.target.value)}
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
                onChange={(e) => setendDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full lg:w-auto flex justify-start items-center">
              <IconButton
                variant="gradient"
                color="blue"
                onClick={handleSearchByMonth}
                size="md"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </IconButton>
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
                  <th className="text-sm py-2 px-3 font-semibold">No</th>
                  <th className="text-sm py-2 px-3 font-semibold">Nama</th>
                  <th className="text-sm py-2 px-3 font-semibold">Alamat </th>
                  <th className="text-sm py-2 px-3 font-semibold">Produk</th>
                  <th className="text-sm py-2 px-3 font-semibold">In </th>
                  <th className="text-sm py-2 px-3 font-semibold">C </th>
                  <th className="text-sm py-2 px-3 font-semibold">Status </th>
                  <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {services.length > 0 ? (
                  services.map((row, index) => {
                    const tglKonfirms = tglKonfirm[index] || [];
                    return (
                      <tr key={index}>
                        <td className="text-sm w-[4%]">{index + 1}</td>
                        <td className="text-sm py-2 px-3">
                          {row.customer.nama_customer}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {row.customer.alamat}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {row.produk} <span className="block">{row.merk}</span>{" "}
                          <span className="block">{row.type}</span>{" "}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {formatDate(row.tanggalMasuk)}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {tglKonfirms.map((down, idx) => (
                            <ul key={idx}>
                              <li>{formatDate(down.tglKonf)}</li>
                            </ul>
                          ))}{" "}
                        </td>
                        <td className="text-sm py-2 px-3">{row.statusEnd}</td>
                        <td className="text-sm py-2 px-3 flex items-center justify-center">
                          <div className="flex flex-row gap-3">
                            <a href={"/detail_service_teknisi/" + row.idTT}>
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

export default ServiceCancelTeknisi;
