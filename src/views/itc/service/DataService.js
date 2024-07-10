import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Typography,
  Button,
  IconButton,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  InformationCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { API_SERVICE } from "../../../utils/BaseUrl";
import $ from "jquery";
import "datatables.net";
import "../../../assets/styles/datatables.css";

function DataService() {
  const tableRef = useRef(null);
  const [services, setServices] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pilih, setPilih] = useState("");
  const [tglKonfirm, setTglKonfirm] = useState([]);
  const [validasi, setValidasi] = useState(false);

  const [allService, setAllService] = useState([]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  useEffect(() => {
    if (allService && allService.length > 0) {
      initializeDataTable();
    }
  }, [allService]);

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
    const fetchTglKonfirm = async () => {
      const tglList = await Promise.all(
        allService.map(async (service) => {
          const tglData = await tglKonfirmasi(service.idTT);
          return tglData;
        })
      );
      setTglKonfirm(tglList);
    };

    fetchTglKonfirm();
  }, [allService]);

  const getAllService = async () => {
    try {
      const response = await axios.get(`${API_SERVICE}/taken/N`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setAllService(response.data.data);
        
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllService();
  }, []);

  const getAllServiceFilter = async () => {
    try {
      const response = await axios.get(
        `${API_SERVICE}/tanggal?status=${pilih}&tanggal_akhir=${endDate}&tanggal_awal=${startDate}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.data.length === 0) {
        console.log("Tidak ada data yang sesuai dengan kriteria pencarian.");
        setServices([]);
        setTglKonfirm([]);
        return;
      }

      setServices(response.data.data);

      const tglList = await Promise.all(
        response.data.data.map(async (service) => {
          const tglData = await tglKonfirmasi(service.idTT);
          return tglData;
        })
      );
      setTglKonfirm(tglList);

      initializeDataTable();
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    if (validasi) {
      getAllServiceFilter();
    }
  }, [validasi]);

  const filterTangggal = async () => {
    if (startDate === endDate && pilih === "") {
      console.log(
        "Tanggal awal dan akhir tidak boleh sama dan pilihan harus dipilih."
      );
      setServices([]);
      setTglKonfirm([]);
      return;
    }

    setValidasi((prevValidasi) => !prevValidasi);
  };

  const formatDate = (value) => {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    $("#example_table").DataTable({
      order: [[6, "desc"]],
    });
  }, []);

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Data Service
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/dashboard" className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011-1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/dashboard_teknisi">
              <span>Data Service</span>
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
            <div className="w-full">
              <Select
                id="pilih"
                label="Status"
                color="blue"
                variant="outlined"
                required
                onChange={(value) => setPilih(value)}
                className="w-full"
              >
                <Option value="">Pilih</Option>
                <Option value="N_A">New Arrival</Option>
                <Option value="Proses">Proses</Option>
                <Option value="Ready">Ready</Option>
              </Select>
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
          <div className="flex justify-between items-center">
            <a href="/data_service_taken" className="mb-5">
              <Button variant="gradient" color="green">
                Taken
              </Button>
            </a>
            <a href="/add_service" className="mb-5">
              <Button variant="gradient" color="blue">
                Tambah
              </Button>
            </a>
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
                {validasi === true ? (
                  <>
                    {services.length > 0 ? (
                      services.map((row, index) => {
                        const tglKonfirms = tglKonfirm[index] || [];
                        console.log("Rendering Service: ", row); // Debugging line
                        console.log("Confirmation Dates: ", tglKonfirms); // Debugging line

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
                              {row.produk}{" "}
                              <span className="block">{row.merk}</span>{" "}
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
                            <td className="text-sm py-2 px-3">
                              {row.statusEnd}
                            </td>
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
                  </>
                ) : (
                  <>
                    {allService.length > 0 ? (
                      allService.map((row, index) => {
                        const tglKonfirms = tglKonfirm[index] || [];
                        console.log("Rendering All Service: ", row); // Debugging line
                        console.log("All Confirmation Dates: ", tglKonfirms); // Debugging line

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
                              {row.produk}{" "}
                              <span className="block">{row.merk}</span>{" "}
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
                            <td className="text-sm py-2 px-3">
                              {row.statusEnd}
                            </td>
                            <td className="text-sm py-2 px-3 flex items-center justify-center">
                              <div className="flex flex-row gap-3">
                                <a href={"/detail_service/" + row.idTT}>
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
                  </>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </section>
  );
}

export default DataService;
