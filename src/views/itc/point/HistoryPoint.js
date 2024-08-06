import React, { useState, useEffect, useRef } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Card,
  CardBody,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import $ from "jquery";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { API_PENGGUNA, API_POIN, API_TEKNISI } from "../../../utils/BaseUrl";
import axios from "axios";
import Chart from "react-apexcharts";
import Swal from "sweetalert2";
import Decrypt from "../../../component/Decrypt";

function HistoryPoint() {
  const [tanggalAwal, settanggalAwal] = useState("");
  const [tanggalAkhir, settanggalAkhir] = useState("");
  const [idTeknisi, setidTeknisi] = useState(0);
  const [points, setPoints] = useState([]);

  const [validasi, setValidasi] = useState(false);
  const currentYear = new Date().getFullYear();
  const tableRef = useRef(null);

  // PENGGUNA TEKNISI
  const [username, setusername] = useState("");

  const idPengguna = Decrypt()
  useEffect(() => {
    axios.get(`${API_PENGGUNA}/` + idPengguna, {
      headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
    }).then((res) => {
      const response = res.data.data;
      setusername(response?.usernamePengguna || "")
    }).catch((err) => {
      console.log(err);
    })
  }, [idPengguna])


  useEffect(() => {
    if (username) {
      axios
        .get(
          `${API_TEKNISI}/username?username=` + username,
          {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          }
        )
        .then((res) => {
          setidTeknisi(res.data.data.id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [username]);

  const initializeDataTable = () => {
    if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable();
    }
  };

  // GET ALL
  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_POIN}/teknisi?id_teknisi=${idTeknisi}`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("token")}`,
          },
        }
      );
      setPoints(response.data.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // GET ALL BY DATE
  const getAllByDate = async () => {
    try {
      const response = await axios.get(
        `${API_POIN}/filter?akhir=${tanggalAkhir}&awal=${tanggalAwal}&idTeknisi=${idTeknisi}`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("token")}`,
          },
        }
      );
      setPoints(response.data.data);
      setValidasi(false);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getAll();
  }, [idTeknisi]);

  useEffect(() => {
    if (points.length > 0) {
      initializeDataTable();
    }
  }, [points]);

  useEffect(() => {
    if (validasi || tanggalAwal !== "" || tanggalAkhir !== "") {
      getAllByDate();
    }
  }, [validasi, idTeknisi]);

  const searchHistoryPoin = () => {
    if (tanggalAwal === "" || tanggalAkhir === "" || tanggalAwal === tanggalAkhir) {
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

  const formatDate = (value) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  const [poinJan, setpoinJan] = useState(0);
  const [poinFeb, setpoinFeb] = useState(0);
  const [poinMar, setpoinMar] = useState(0);
  const [poinApr, setpoinApr] = useState(0);
  const [poinMei, setpoinMei] = useState(0);
  const [poinJun, setpoinJun] = useState(0);
  const [poinJul, setpoinJul] = useState(0);
  const [poinAgs, setpoinAgs] = useState(0);
  const [poinSep, setpoinSep] = useState(0);
  const [poinOkto, setpoinOkto] = useState(0);
  const [poinNov, setpoinNov] = useState(0);
  const [poinDes, setpoinDes] = useState(0);

  const getAllPoin = async () => {
    try {
      // JANUARI
      const jan = await axios.get(
        `${API_POIN}/pimpinan/total-by-month-year?idTeknisi=${idTeknisi}&month=01&year=` +
        currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setpoinJan(jan.data.data.total_poin || 0);

      // FEBRUARI
      const feb = await axios.get(
        `${API_POIN}/pimpinan/total-by-month-year?idTeknisi=${idTeknisi}&month=02&year=` +
        currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setpoinFeb(feb.data.data.total_poin || 0);

      // MARET
      const mar = await axios.get(
        `${API_POIN}/pimpinan/total-by-month-year?idTeknisi=${idTeknisi}&month=03&year=` +
        currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setpoinMar(mar.data.data.total_poin || 0);

      // APRIL
      const apr = await axios.get(
        `${API_POIN}/pimpinan/total-by-month-year?idTeknisi=${idTeknisi}&month=04&year=` +
        currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setpoinApr(apr.data.data.total_poin || 0);

      // MEI
      const may = await axios.get(
        `${API_POIN}/pimpinan/total-by-month-year?idTeknisi=${idTeknisi}&month=05&year=` +
        currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setpoinMei(may.data.data.total_poin || 0);

      // JUNI
      const jun = await axios.get(
        `${API_POIN}/pimpinan/total-by-month-year?idTeknisi=${idTeknisi}&month=06&year=` +
        currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setpoinJun(jun.data.data.total_poin || 0);

      // JULI
      const jul = await axios.get(
        `${API_POIN}/pimpinan/total-by-month-year?idTeknisi=${idTeknisi}&month=07&year=` +
        currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setpoinJul(jul.data.data.total_poin || 0);

      // AGUSTUS
      const agus = await axios.get(
        `${API_POIN}/pimpinan/total-by-month-year?idTeknisi=${idTeknisi}&month=08&year=` +
        currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setpoinAgs(agus.data.data.total_poin || 0);

      // SEPTEMBER
      const sep = await axios.get(
        `${API_POIN}/pimpinan/total-by-month-year?idTeknisi=${idTeknisi}&month=09&year=` +
        currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setpoinSep(sep.data.data.total_poin || 0);

      // OKTOBER
      const okto = await axios.get(
        `${API_POIN}/pimpinan/total-by-month-year?idTeknisi=${idTeknisi}&month=10&year=` +
        currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setpoinOkto(okto.data.data.total_poin || 0);

      // NOVEMBER
      const nov = await axios.get(
        `${API_POIN}/pimpinan/total-by-month-year?idTeknisi=${idTeknisi}&month=11&year=` +
        currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setpoinNov(nov.data.data.total_poin || 0);

      // DESEMBER
      const des = await axios.get(
        `${API_POIN}/pimpinan/total-by-month-year?idTeknisi=${idTeknisi}&month=12&year=` +
        currentYear,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setpoinDes(des.data.data.total_poin || 0);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllPoin();
  }, [idTeknisi, API_POIN]);

  const chartConfigPoin = {
    type: "area",
    height: 260,
    series: [
      {
        name: "Jumlah Poin",
        data: [
          poinJan,
          poinFeb,
          poinMar,
          poinApr,
          poinMei,
          poinJun,
          poinJul,
          poinAgs,
          poinSep,
          poinOkto,
          poinNov,
          poinDes,
        ],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#2196f3", "#4caf50"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Poin Teknisi
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
            <a href="/take_over">
              <span>Poin</span>
            </a>
          </Breadcrumbs>
        </div>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
          <div className="bg-white shadow-lg p-5 my-5 rounded overflow-auto">
            <Typography
              variant="paragraph"
              className="capitalize font-semibold"
            >
              History Poin
            </Typography>
            <br />
            <hr /> <br />
            <div className="flex gap-2 items-center">
              <Input
                label="Tanggal Awal"
                variant="static"
                color="blue"
                size="md"
                onChange={(e) => settanggalAwal(e.target.value)}
                placeholder="Tanggal Awal"
                type="date"
                required
              />
              <Input
                label="Tanggal Akhir"
                variant="static"
                color="blue"
                size="md"
                onChange={(e) => settanggalAkhir(e.target.value)}
                placeholder="Tanggal Akhir"
                type="date"
                required
              />
              <div>
                <IconButton
                  size="md"
                  color="blue"
                  onClick={searchHistoryPoin}
                >
                  <MagnifyingGlassIcon className="w-6 h-6 white" />
                </IconButton>
              </div>
            </div>{" "}
            <br />
            <div className="rounded p-1 w-full overflow-x-auto mt-5">
              <table
                ref={tableRef}
                id="example_data"
                className="rounded-sm w-full"
              >
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="py-2 px-3 font-semibold">No</th>
                    <th className="py-2 px-3 font-semibold">Tanggal</th>
                    <th className="py-2 px-3 font-semibold">Poin</th>
                    <th className="py-2 px-3 font-semibold">Keterangan </th>
                  </tr>
                </thead>
                <tbody>
                  {points.length > 0 ? (
                    points.map((point, index) => (
                      <tr key={index}>
                        <td className="text-sm w-[4%]">{index + 1}</td>
                        <td className="text-sm py-2 px-3 text-center">
                          {formatDate(point.tanggal)}
                        </td>
                        <td className="text-sm py-2 px-3 text-center">
                          {point.poin}
                        </td>
                        <td className="text-sm py-2 px-3 text-center">
                          {point.keterangan}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
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

          <div className="w-full my-5 rounded">
            <Card className="rounded p-5">
              <Typography variant="h6" color="black">
                Grafik Poin {currentYear}
              </Typography>
              <br />
              <hr /> <br />
              <CardBody className="px-2 pb-0">
                <Chart {...chartConfigPoin} />
              </CardBody>
            </Card>
          </div>
        </main>
      </div>
    </section>
  );
}

export default HistoryPoint;
