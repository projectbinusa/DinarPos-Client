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
import { API_SERVICE } from "../../../utils/BaseUrl";
import $ from "jquery";
import "datatables.net";
import "./../../../assets/styles/datatables.css";
import {
  InformationCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

function DataServiceTaken() {
  const tableRef = useRef(null);
  const [services, setservices] = useState([]);
  const [validasi, setvalidasi] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tglKonfirm, setTglKonfirm] = useState([]);

  // FILTER
  // const [tglKonfirm2, setTglKonfirm2] = useState([]);
  // const [servicesTgl, setservicesTgl] = useState([]);

  const formatDate = (value) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  // NEW
  const searchServiceTaken = async () => {
    if (endDate === "" && startDate === "" && validasi === true) {
      Swal.fire({
        icon: "warning",
        title: "Masukkan Tanggal Terlebih Dahulu!",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    try {
      if (validasi === true) {
        const response = await axios.get(
          `${API_SERVICE}/service-taken-by-date?akhir=${endDate}&awal=${startDate}`,
          {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          }
        );
        setservices(response.data);
        console.log(validasi);
        console.log(response.data);
      } else {
        const response = await axios.get(`${API_SERVICE}/taken`, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        });
        setservices(response.data.data);
        console.log(validasi);
        console.log(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    searchServiceTaken();
  }, []);

  useEffect(() => {
    if (validasi) {
      searchServiceTaken();
      setvalidasi(false);
    }
  }, [validasi, endDate, startDate]);

  const handleSearchServiceTaken = () => {
    setvalidasi(true);
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
    const fetchTglKonfirm = async () => {
      const tglList = await Promise.all(
        services.map(async (service) => {
          const tglData = await tglKonfirmasi(service.idTT);
          return tglData;
        })
      );
      setTglKonfirm(tglList);
    };

    if (services.length > 0) {
      fetchTglKonfirm();
    }
  }, [services]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable('#example_data')) {
      $('#example_data').DataTable().destroy();
    }
    $('#example_data').DataTable({});
  };

  // useEffect(() => {
  //   if (services.length > 0 && tableRef.current) {
  //     initializeDataTable();
  //   }
  // }, [services, tableRef]);

  useEffect(() => {
    if (services.length > 0) {
      initializeDataTable();
    } else {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        console.log('Destroying DataTable instance because services are empty');
        $(tableRef.current).DataTable().destroy();
        // $(tableRef.current).empty();
      }
    }
  }, [services]);
  // END NEW

  // // GET ALL
  // const getAll = async () => {
  //   try {
  //     const response = await axios.get(`${API_SERVICE}/taken`, {
  //       headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
  //     });
  //     setservices(response.data.data);
  //   } catch (error) {
  //     console.log("get all", error);
  //   }
  // };

  // useEffect(() => {
  //   if (services && services.length > 0) {
  //     initializeDataTable();
  //   }
  // }, [services]);

  // const tglKonfirmasi = async (transactionId) => {
  //   try {
  //     const response = await axios.get(
  //       `${API_SERVICE}/tgl_konfirm?id=${transactionId}`,
  //       {
  //         headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
  //       }
  //     );
  //     return response.data.data;
  //   } catch (error) {
  //     console.log("tglKonfirmasi", error);
  //     return [];
  //   }
  // };

  // useEffect(() => {
  //   const fetchTglKonfirm = async () => {
  //     const tglList = await Promise.all(
  //       services.map(async (service) => {
  //         const tglData = await tglKonfirmasi(service.idTT);
  //         return tglData;
  //       })
  //     );
  //     setTglKonfirm(tglList);
  //   };

  //   fetchTglKonfirm();
  // }, [services]);

  // // GET ALL FILTER
  // const getAllFilterTgl = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${API_SERVICE}/service-taken-by-date?akhir=${endDate}&awal=${startDate}`,
  //       {
  //         headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
  //       }
  //     );
  //     setservicesTgl(response.data);
  //   } catch (error) {
  //     console.log("get all", error);
  //   }
  // };

  // useEffect(() => {
  //   if (servicesTgl && servicesTgl.length > 0) {
  //     initializeDataTable();
  //   }
  // }, [servicesTgl]);

  // const tglKonfirmasi2 = async (transactionId) => {
  //   try {
  //     const response = await axios.get(
  //       `${API_SERVICE}/tgl_konfirm?id=${transactionId}`,
  //       {
  //         headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
  //       }
  //     );
  //     return response.data.data;
  //   } catch (error) {
  //     console.log("tglKonfirmasi", error);
  //     return [];
  //   }
  // };

  // useEffect(() => {
  //   const fetchTglKonfirm = async () => {
  //     const tglList = await Promise.all(
  //       servicesTgl.map(async (service) => {
  //         const tglData = await tglKonfirmasi2(service.idTT);
  //         return tglData;
  //       })
  //     );
  //     setTglKonfirm2(tglList);
  //   };

  //   fetchTglKonfirm();
  // }, [servicesTgl]);

  // useEffect(() => {
  //   getAll();
  // }, []);

  // useEffect(() => {
  //   if (validasi) {
  //     getAllFilterTgl();
  //   }
  // }, [validasi]);

  // const filterTangggal = () => {
  //   setvalidasi((prevValidasi) => !prevValidasi);
  // };

  const level = localStorage.getItem("level");

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Data Service Taken
          </Typography>
          <Breadcrumbs className="bg-transparent">
            {level === "Pimpinan" ? (
              <>
                <a href="/dashboard_pimpinan" className="opacity-60">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </a>
              </>
            ) : (
              <>
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
              </>
            )}

            <a href="/data_service_taken">
              <span>Service Taken</span>
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
                onClick={handleSearchServiceTaken}
                // onClick={filterTangggal}
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
                  <th className="text-sm py-2 px-3 font-semibold">No</th>
                  <th className="text-sm py-2 px-3 font-semibold">Nama</th>
                  {/* <th className="text-sm py-2 px-3 font-semibold">Alamat </th>
                  <th className="text-sm py-2 px-3 font-semibold">Produk</th>
                  <th className="text-sm py-2 px-3 font-semibold">In </th>
                  <th className="text-sm py-2 px-3 font-semibold">C </th>
                  <th className="text-sm py-2 px-3 font-semibold">Status </th>
                  <th className="text-sm py-2 px-3 font-semibold">Aksi</th> */}
                </tr>
              </thead>
              <tbody>
                {services.length > 0 ? (
                  services.map((row, index) => (
                    <tr key={index}>
                      <td className="text-sm w-[4%]">{index + 1}</td>
                      <td className="text-sm py-2 px-3">
                        {row.customer.nama_customer}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="2"
                      className="text-sm text-center capitalize py-3 bg-gray-100"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
              {/* <tbody>
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
                          {row.produk}{" "}
                          <span className="block">{row.merk}</span>{" "}
                          <span className="block">{row.type}</span>
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
                          TAKEN ({row.statusEnd})
                        </td>
                        <td className="text-sm py-2 px-3 flex items-center justify-center">
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
                      className="text-sm text-center capitalize py-3 bg-gray-100"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody> */}
              {/* <tbody>
                {validasi === true ? (
                  <>
                    {servicesTgl.length > 0 ? (
                      servicesTgl.map((row, index) => {
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
                              {row.produk}{" "}
                              <span className="block">{row.merk}</span>{" "}
                              <span className="block">{row.type}</span>
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
                              TAKEN ({row.statusEnd})
                            </td>
                            <td className="text-sm py-2 px-3 flex items-center justify-center">
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
                          className="text-sm text-center capitalize py-3 bg-gray-100"
                        >
                          Tidak ada data
                        </td>
                      </tr>
                    )}
                  </>
                ) : (
                  <>
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
                              {row.produk}{" "}
                              <span className="block">{row.merk}</span>{" "}
                              <span className="block">{row.type}</span>
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
                              TAKEN ({row.statusEnd})
                            </td>
                            <td className="text-sm py-2 px-3 flex items-center justify-center">
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
                          className="text-sm text-center capitalize py-3 bg-gray-100"
                        >
                          Tidak ada data
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody> */}
            </table>
          </div>
        </main>
      </div>
    </section>
  );
}

export default DataServiceTaken;
