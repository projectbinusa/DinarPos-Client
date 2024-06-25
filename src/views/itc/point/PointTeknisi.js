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
  const [points, setPoints] = useState([]);
  const [teknisi, setTeknisi] = useState([]);
  const tableRef = useRef(null);

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

  // GET ALL
  const getAll = async () => {
    try {
      const response = await axios.get(`${API_POIN}/pimpinan`, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      });
      setPoints(response.data);
      console.log();
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

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
    getAll();
    getAllTeknisi();
  }, []);

  const formatCurrency = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);
  };

  //   const filterMonth = () => {
  //     axios
  //       .post(`${API_SERVICE}/admin/finish_filter`, { month })
  //       .then((res) => {
  //         const responseData = res.data;
  //         setPoints(responseData);

  //         let totalElektro = 0,
  //           successElektro = 0,
  //           notElektro = 0;
  //         let totalCpu = 0,
  //           successCpu = 0,
  //           notCpu = 0;

  //         responseData.forEach((item) => {
  //           if (item.team === "Elektro") {
  //             totalElektro += item.ttl;
  //             successElektro += item.success;
  //             notElektro += item.nots;
  //           } else if (item.team === "CPU") {
  //             totalCpu += item.ttl;
  //             successCpu += item.success;
  //             notCpu += item.nots;
  //           }
  //         });
  //       })
  //       .catch((err) => {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Gagal!",
  //           text: "Terjadi kesalahan saat mengambil data!",
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //       });
  //   };

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
              <Button variant="gradient" color="blue">
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
                {/* <tbody>
                  {points.length > 0 ? (
                    points.map((row, index) => (
                      <tr key={index}>
                        <td className="text-sm py-2 px-3">{index + 1}</td>
                        <td className="text-sm py-2 px-3">
                          {row.teknisi.nama}
                        </td>
                        <td className="text-sm py-2 px-3">{row.poin}</td>
                        <td className="text-sm py-2 px-3 text-right">
                          {formatCurrency(row.poin * 90000)}
                        </td>
                        <td className="text-sm py-2 px-3">
                          <a href={"/grafik_poin/" + row.teknisi.id}>
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
                  {points.length > 0 ? (
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
                          {points.reduce((total, row) => total + row.poin, 0)}
                        </td>
                        <td
                          className="text-sm py-2 px-3"
                          style={{ textAlign: "center" }}
                          colSpan="1"
                        >
                          {formatCurrency(
                            points.reduce(
                              (total, row) => total + row.poin * 90000,
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
                          {points.reduce((total, row) => total + row.poin, 0) /
                            teknisi.length}
                        </td>
                        <td
                          className="text-sm py-2 px-3"
                          style={{ textAlign: "center" }}
                          colSpan="1"
                        >
                          {formatCurrency(
                            points.reduce(
                              (total, row) => total + row.poin * 90000,
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
                </tfoot> */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PointTeknisi;
