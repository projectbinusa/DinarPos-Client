import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Chart from "react-apexcharts";
import axios from "axios";
import { API_PENGGUNA, API_POIN } from "../../../utils/BaseUrl";
import Decrypt from "../../../component/Decrypt";

function GrafikPoin() {
  const [validasi, setvalidasi] = useState(false);
  const [year, setyear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (validasi) {
      getAllPoin(year);
      setvalidasi(false);
    }
  }, [validasi, year]);

  const param = useParams();

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

  const searchHistoryPoin = () => {
    setvalidasi(true);
  };

  const getAllPoin = async () => {
    const currentYear = new Date().getFullYear();
    const years = validasi ? year : currentYear;

    try {
      // JANUARI
      const jan = await axios.get(
        `${API_POIN}/pimpinan/total-by-month-year?idTeknisi=${param.id}&month=01&year=` +
        years,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setpoinJan(jan.data.data.total_poin || 0);

      // FEBRUARI
      const feb = await axios.get(
        `${API_POIN}/pimpinan/total-by-month-year?idTeknisi=${param.id}&month=02&year=` +
        years,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setpoinFeb(feb.data.data.total_poin || 0);

      // MARET
      const mar = await axios.get(
        `${API_POIN}/pimpinan/total-by-month-year?idTeknisi=${param.id}&month=03&year=` +
        years,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setpoinMar(mar.data.data.total_poin || 0);

      // APRIL
      const apr = await axios.get(
        `${API_POIN}/pimpinan/total-by-month-year?idTeknisi=${param.id}&month=04&year=` +
        years,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setpoinApr(apr.data.data.total_poin || 0);

      // MEI
      const may = await axios.get(
        `${API_POIN}/pimpinan/total-by-month-year?idTeknisi=${param.id}&month=05&year=` +
        years,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setpoinMei(may.data.data.total_poin || 0);

      // JUNI
      const jun = await axios.get(
        `${API_POIN}/pimpinan/total-by-month-year?idTeknisi=${param.id}&month=06&year=` +
        years,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setpoinJun(jun.data.data.total_poin || 0);

      // JULI
      const jul = await axios.get(
        `${API_POIN}/pimpinan/total-by-month-year?idTeknisi=${param.id}&month=07&year=` +
        years,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setpoinJul(jul.data.data.total_poin || 0);

      // AGUSTUS
      const agus = await axios.get(
        `${API_POIN}/pimpinan/total-by-month-year?idTeknisi=${param.id}&month=08&year=` +
        years,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setpoinAgs(agus.data.data.total_poin || 0);

      // SEPTEMBER
      const sep = await axios.get(
        `${API_POIN}/pimpinan/total-by-month-year?idTeknisi=${param.id}&month=09&year=` +
        years,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setpoinSep(sep.data.data.total_poin || 0);

      // OKTOBER
      const okto = await axios.get(
        `${API_POIN}/pimpinan/total-by-month-year?idTeknisi=${param.id}&month=10&year=` +
        years,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setpoinOkto(okto.data.data.total_poin || 0);

      // NOVEMBER
      const nov = await axios.get(
        `${API_POIN}/pimpinan/total-by-month-year?idTeknisi=${param.id}&month=11&year=` +
        years,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setpoinNov(nov.data.data.total_poin || 0);

      // DESEMBER
      const des = await axios.get(
        `${API_POIN}/pimpinan/total-by-month-year?idTeknisi=${param.id}&month=12&year=` +
        years,
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
  }, [param.id]);

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
  } else if (level === "Pimpinan") {
    dashboard = "dashboard_pimpinan"
  }

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase font-poppins">
            GRAFIK Poin Teknisi
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
            <a href="/poin_teknisi">
              <span>Poin</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded overflow-auto">
          <h1 className="text-base md:text-lg font-medium capitalize">
            Grafik Poin Teknisi Udin
          </h1>
          <br />
          <div className="flex gap-2 items-center">
            <Input
              label="Tahun"
              variant="outlined"
              color="blue"
              size="md"
              placeholder="Masukkan Tahun"
              onChange={(e) => setyear(e.target.value)}
              required
            />
            <div>
              <Button
                variant="gradient"
                color="blue"
                size="md"
                className="font-popins font-medium"
                onClick={searchHistoryPoin}
              >
                GO!
              </Button>
            </div>
          </div>
          <br />
          <div className="w-full my-5 rounded">
            <Card className="shadow-none">
              <Typography variant="h5" color="black" className="font-medium">
                Grafik Poin {year}
              </Typography>
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

export default GrafikPoin;
