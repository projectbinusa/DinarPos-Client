import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { API_SERVICE } from "../../../utils/BaseUrl";

const DataFinish = () => {
  const [month, setMonth] = useState("");
  const today = new Date();
  const monthss = today.getMonth() + 1;
  const year = today.getFullYear();
  const currentMonths = (monthss < 10 ? `0${monthss}` : monthss) + "-" + year;

  const months = year + "-" + (monthss < 10 ? `0${monthss}` : monthss);

  const formatMonth = (value) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${month}-${year}`;

    return formattedDate;
  };

  const [datas, setdatas] = useState([]);
  const [totalElektro, setTotalElektro] = useState(0);
  const [successElektro, setSuccessElektro] = useState(0);
  const [notElektro, setNotElektro] = useState(0);

  const [totalCpu, setTotalCpu] = useState(0);
  const [successCpu, setSuccessCpu] = useState(0);
  const [notCpu, setNotCpu] = useState(0);

  let currentMonth = month;
  if (month === "") {
    currentMonth = months;
    setMonth(currentMonth);
  }

  const dataFinish = async () => {
    await axios
      .get(`${API_SERVICE}/data-service?months=` + currentMonth, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setdatas(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const totalServiceCpu = async () => {
    await axios
      .get(`${API_SERVICE}/total-service-cpu?months=` + currentMonth, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setTotalCpu(res.data.data);
      })
      .catch((err) => {
        console.log("Error total service cpu : " + err);
      });
  };

  const totalServiceElektro = async () => {
    await axios
      .get(`${API_SERVICE}/total-service-elektro?months=` + currentMonth, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setTotalElektro(res.data.data);
      })
      .catch((err) => {
        console.log("Error total service elektro : " + err);
      });
  };

  const successServiceCpu = async () => {
    await axios
      .get(`${API_SERVICE}/total-service-success-cpu?months=` + currentMonth, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setSuccessCpu(res.data.data);
      })
      .catch((err) => {
        console.log("Error total service success cpu : " + err);
      });
  };

  const successServiceElektro = async () => {
    await axios
      .get(
        `${API_SERVICE}/total-service-success-elektro?months=` + currentMonth,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setSuccessElektro(res.data.data);
      })
      .catch((err) => {
        console.log("Error total service success elektro : " + err);
      });
  };

  const notServiceCpu = async () => {
    await axios
      .get(`${API_SERVICE}/total-service-not-cpu?months=` + currentMonth, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setNotCpu(res.data.data);
      })
      .catch((err) => {
        console.log("Error total service not cpu : " + err);
      });
  };

  const notServiceElektro = async () => {
    await axios
      .get(`${API_SERVICE}/total-service-not-elektro?months=` + currentMonth, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setNotElektro(res.data.data);
      })
      .catch((err) => {
        console.log("Error total service not elektro : " + err);
      });
  };

  useEffect(() => {
    dataFinish();
    totalServiceCpu();
    totalServiceElektro();
    successServiceCpu();
    successServiceElektro();
    notServiceCpu();
    notServiceElektro();
  }, []);

  const handleClick = () => {
    dataFinish();
    totalServiceCpu();
    totalServiceElektro();
    successServiceCpu();
    successServiceElektro();
    notServiceCpu();
    notServiceElektro();
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase font-poppins">
            Finish
          </Typography>
          <Breadcrumbs className="bg-transparent">
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
          </Breadcrumbs>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 items-start">
          <div className="bg-white p-5 mt-5 shadow-lg rounded lg:col-span-2">
            <h1 className="font-semibold text-lg">Finish Success</h1>
            <hr />
            <br />
            <div className="flex gap-2">
              <Input
                type="month"
                label="Bulan"
                variant="outlined"
                color="blue"
                onChange={(e) => setMonth(e.target.value)}
              />
              <Button variant="gradient" color="blue" onClick={handleClick} className="font-popins font-medium">
                GO!
              </Button>
            </div>
            <br />
            <h1 id="mont" className="text-lg font-medium">
              {month === "" ? currentMonths : formatMonth(month)}
            </h1>
            <br />
            <div className="overflow-x-auto" id="tables_finish">
              <table
                className="border border-collapse w-full"
                id="table_finish"
              >
                <thead>
                  <tr>
                    <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">
                      No
                    </th>
                    <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">
                      Nama
                    </th>
                    <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">
                      Service Bulan Ini
                    </th>
                    <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">
                      Sukses
                    </th>
                    <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">
                      Tidak Sukses
                    </th>
                    <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">
                      %
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datas.length > 0 ? (
                    datas.map((row, index) => {
                      const all = row.ttl;
                      const scs = row.success;
                      const percent = scs !== 0 ? (scs / all) * 100 : 0;

                      return (
                        <tr key={index}>
                          <td className="text-sm text-center py-2 px-2 border-gray-300 border">
                            {index + 1}
                          </td>
                          <td className="text-sm text-center py-2 px-2 border-gray-300 border">
                            {row.nama}
                          </td>
                          <td className="text-sm text-center py-2 px-2 border-gray-300 border">
                            {row.ttl}
                          </td>
                          <td className="text-sm text-center py-2 px-2 border-gray-300 border">
                            <span className="bg-blue-500 py-1 px-2 text-white rounded">
                              {row.success}
                            </span>
                          </td>
                          <td className="text-sm text-center py-2 px-2 border-gray-300 border">
                            <span className="bg-red-500 py-1 px-2 text-white rounded">
                              {row.nots}
                            </span>
                          </td>
                          <td className="text-sm text-center py-2 px-2 border-gray-300 border">
                            {percent.toFixed(2)} %
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <>
                      <tr>
                        <td
                          colSpan="6"
                          className="text-sm text-center capitalize py-3 bg-gray-100"
                        >
                          Tidak ada data
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="bg-green-100 border-2 border-green-100 mt-5 shadow-lg rounded">
              <h1 className="text-medium text-green-500 p-5">Team Elektro</h1>
              <div className="bg-white px-2 rounded">
                <br />
                <p className="text-sm text-center">Bulan Ini</p>
                <h1 className="text-3xl font-semibold text-center">
                  {totalElektro}
                </h1>
                <br />
                <hr />
                <br />
                <div className="flex items-center justify-center gap-2">
                  <p className="bg-blue-500 py-1 px-2 text-white rounded">
                    {successElektro}
                  </p>
                  <p className="bg-red-500 py-1 px-2 text-white rounded">
                    {notElektro}
                  </p>
                  <p className="bg-green-500 py-1 px-2 text-white rounded">
                    {totalElektro !== 0
                      ? ((successElektro / totalElektro) * 100).toFixed(2)
                      : 0}
                    %
                  </p>
                </div>
                <br />
              </div>
            </div>
            <div className="mt-5 shadow-lg rounded-lg">
              <div className="px-5 py-2 flex bg-yellow-200 justify-between items-center text-yellow-800">
                <p>Total Service</p>
                <p>{totalCpu + totalElektro}</p>
              </div>
              <div className="px-5 py-2 bg-blue-500 flex justify-between items-center text-white">
                <p>Finish Success Total</p>
                <p>{successCpu + successElektro}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-100 border-2 border-green-100 mt-5 shadow-lg rounded">
            <h1 className="text-medium text-green-500 p-5">Team CPU</h1>
            <div className="bg-white px-2 rounded">
              <br />
              <p className="text-sm text-center">Bulan Ini</p>
              <h1 className="text-3xl font-semibold text-center">{totalCpu}</h1>
              <br />
              <hr />
              <br />
              <div className="flex items-center justify-center gap-2">
                <p className="bg-blue-500 py-1 px-2 text-white rounded">
                  {successCpu}
                </p>
                <p className="bg-red-500 py-1 px-2 text-white rounded">
                  {notCpu}
                </p>
                <p className="bg-green-500 py-1 px-2 text-white rounded">
                  {totalCpu !== 0
                    ? ((successCpu / totalCpu) * 100).toFixed(2)
                    : 0}
                  %
                </p>
              </div>
              <br />
            </div>
          </div>
          <br />
        </div>
      </div>
    </section>
  );
};

export default DataFinish;
