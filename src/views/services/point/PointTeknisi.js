import React, { useState, useEffect, useRef } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { API_POIN, API_TEKNISI } from "../../../utils/BaseUrl";
import Swal from "sweetalert2";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net";
import { ChartBarIcon } from "@heroicons/react/24/outline";

const PointTeknisi = () => {
  const [month, setMonth] = useState("");
  const [poins, setpoins] = useState([]);
  const [teknisi, setTeknisi] = useState([]);
  const tableRef = useRef(null);
  const [validasi, setvalidasi] = useState(false);

  const initializeDataTable = () => {
    if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable();
    }
  };

  // THIS MONTH 
  const getAll = async () => {
    try {
      const date = new Date();
      const year = date.getFullYear();
      const months = String(date.getMonth() + 1).padStart(2, "0");
      const formattedDate = `${year}-${months}-01`;

      const response = await axios.get(`${API_POIN}/month?month=${formattedDate}`, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      });
      setpoins(response.data.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // BY MONTH
  const getAllByDate = async () => {
    try {
      const response = await axios.get(`${API_POIN}/month?month=${month}-01`, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      });
      setpoins(response.data.data);
      setvalidasi(false);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getAll()
  }, [])

  useEffect(() => {
    if (poins && poins.length > 0) {
      initializeDataTable();
    }
  }, [poins]);

  useEffect(() => {
    if (validasi || month !== "") {
      getAllByDate();
    }
  }, [validasi]);

  const handleSearchPoinByMonth = () => {
    if (month === "") {
      Swal.fire({
        icon: "warning",
        title: "Isi Form Terlebih Dahulu!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    setvalidasi(true);
  };

  // TOTAL POIN PER BULAN

  // const searchPoinByMonth = async () => {
  //   const date = new Date();
  //   const year = date.getFullYear();
  //   const months = String(date.getMonth() + 1).padStart(2, "0");
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const formattedDate = `${year}-${months}-01`;
  //   const month2 = `${month}-01`;

  //   const bulan = validasi ? month2 : formattedDate;

  //   if (month === "" && validasi === true) {
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Masukkan Bulan Terlebih Dahulu!",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //   }

  //   console.log(bulan);

  //   try {
  //     const response = await axios.get(`${API_POIN}/month?month=${bulan}`, {
  //       headers: {
  //         "auth-tgh": `jwt ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     setpoins(response.data.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data", error);
  //   }
  // };

  // useEffect(() => {
  //   if (validasi || month === "") {
  //     searchPoinByMonth();
  //     setvalidasi(false);
  //   }
  // }, [validasi]);

  // useEffect(() => {
  //   searchPoinByMonth();
  // }, []);

  // const handleSearchPoinByMonth = () => {
  //   setvalidasi(true);
  // };

  console.log(validasi);

  const getAllTeknisi = async () => {
    try {
      const response = await axios.get(`${API_TEKNISI}`, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      });
      setTeknisi(response.data.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getAllTeknisi();
  }, []);

  const formatCurrency = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between w-full">
          <Typography variant="lead" className="uppercase">
            Poin Teknisi
          </Typography>
          <Breadcrumbs className="bg-transparent">
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
            <a href="/poin_teknisi">
              <span>Poin Teknisi</span>
            </a>
          </Breadcrumbs>
        </div>
        <div className="flex flex-col w-full gap-5 items-start">
          <div className="bg-white p-5 mt-5 shadow-lg rounded w-full">
            <h1 className="font-semibold text-lg">History Point</h1>
            <hr />
            <br />
            <div className="flex gap-2 w-full">
              <Input
                type="month"
                variant="outlined"
                label="Bulan"
                color="blue"
                onChange={(e) => setMonth(e.target.value)}
              />
              <Button variant="gradient" color="blue" onClick={handleSearchPoinByMonth} className="font-popins font-medium">
                GO!
              </Button>
            </div>
            <br />
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
                    <th className="text-sm py-2 px-3 font-semibold">Poin</th>
                    <th className="text-sm py-2 px-3 font-semibold">
                      Nominal (Rp)
                    </th>
                    <th className="text-sm py-2 px-3 font-semibold">Graph</th>
                  </tr>
                </thead>
                <tbody>
                  {poins.length > 0 ? (
                    poins.map((row, index) => (
                      <tr key={index}>
                        <td className="text-sm py-2 px-3">{index + 1}</td>
                        <td className="text-sm py-2 px-3">
                          {row.teknisiNama}
                        </td>
                        <td className="text-sm py-2 px-3">{row.totalPoin}</td>
                        <td className="text-sm py-2 px-3 text-right">
                          {formatCurrency(row.totalPoin * 90000)}
                        </td>
                        <td className="text-sm py-2 px-3">
                          <a href={"/grafik_poin/" + row.teknisiId}>
                            <IconButton
                              variant="gradient"
                              color="blue"
                              size="md"
                            >
                              <ChartBarIcon className="w-6 h-6 white" />
                            </IconButton>
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-sm text-center capitalize py-3 bg-gray-100"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  {poins.length > 0 ? (
                    <>
                      <tr>
                        <td
                          className="text-sm py-2 px-3"
                          style={{ textAlign: "right" }}
                          colSpan="2"
                        >
                          Total
                        </td>
                        <td
                          className="text-sm py-2 px-3"
                          style={{ textAlign: "center" }}
                          colSpan="1"
                        >
                          {poins.reduce((total, row) => total + row.totalPoin, 0)}
                        </td>
                        <td
                          className="text-sm py-2 px-3"
                          style={{ textAlign: "center" }}
                          colSpan="1"
                        >
                          {formatCurrency(
                            poins.reduce(
                              (total, row) => total + row.totalPoin * 90000,
                              0
                            )
                          )}
                        </td>
                        <td className="text-sm py-2 px-3" colSpan="1"></td>
                      </tr>
                      <tr>
                        <td
                          className="text-sm py-2 px-3"
                          style={{ textAlign: "right" }}
                          colSpan="2"
                        >
                          Rata-rata
                        </td>
                        <td
                          className="text-sm py-2 px-3"
                          style={{ textAlign: "center" }}
                          colSpan="1"
                        >
                          {poins.reduce((total, row) => total + row.totalPoin, 0) /
                            teknisi.length}
                        </td>
                        <td
                          className="text-sm py-2 px-3"
                          style={{ textAlign: "center" }}
                          colSpan="1"
                        >
                          {formatCurrency(
                            poins.reduce(
                              (total, row) => total + row.totalPoin * 90000,
                              0
                            ) / teknisi.length
                          )}
                        </td>
                        <td className="text-sm py-2 px-3" colSpan="1"></td>
                      </tr>
                    </>
                  ) : (
                    <></>
                  )}
                </tfoot>
              </table>
            </div>
          </div> <br />
        </div>
      </div>
    </section>
  );
};

export default PointTeknisi;
