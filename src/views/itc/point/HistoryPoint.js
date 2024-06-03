import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-bs4';
import { UserCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { API_TEKNISI } from "../../../utils/BaseUrl";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js';
// import 'datatables.net';
// import 'datatables.net-bs4';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

function HistoryPoint() {
  // const [points, setPoints] = useState([]);
  // const [filteredPoints, setFilteredPoints] = useState([]);
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  // const currentYear = new Date().getFullYear();
  // const [searchTerm, setSearchTerm] = useState("");


  // useEffect(() => {
  //   const fetchPoints = async () => {
  //     try {
  //       const response = await axios.get(`${API_TEKNISI}/history_point`, {
  //         headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
  //       });
  //       setPoints(response.data);
  //       setFilteredPoints(response.data);
  //     } catch (error) {
  //       console.error("Error fetching points data:", error);
  //     }
  //   };
  //   fetchPoints();
  // }, []);

  // const handleFilter = () => {
  //   if (startDate && endDate) {
  //     const filtered = points.filter(point => {
  //       const pointDate = new Date(point.tanggal);
  //       return pointDate >= new Date(startDate) && pointDate <= new Date(endDate);
  //     });
  //     setFilteredPoints(filtered);
  //   } else {
  //     setFilteredPoints(points);
  //   }
  // };

  // // Mengelompokkan poin berdasarkan bulan
  // const monthlyPoints = Array(12).fill(0);
  // filteredPoints.forEach((point) => {
  //   const month = new Date(point.tanggal).getMonth();
  //   monthlyPoints[month] += point.poin;
  // });

  // // Menghitung total poin
  // const totalPoints = monthlyPoints.reduce((acc, cur) => acc + cur, 0);

  // const chartData = {
  //   labels: [
  //     "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
  //     "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  //   ],
  //   datasets: [
  //     {
  //       label: "Poin",
  //       data: monthlyPoints,
  //       borderColor: "rgba(75, 192, 192, 1)",
  //       backgroundColor: "rgba(75, 192, 192, 0.2)",
  //     },
  //   ],
  // };

  // const chartOptions = {
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  // };

  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value);
  // };
  

  // useEffect(() => {
  //   $('#tables').DataTable();
  // }, [filteredPoints]);

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[19rem] pt-20 lg:pt-3 w-full">
        {/* <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Riwayat Poin
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
            <a href="/history_point">
              <span>Riwayat Poin</span>
            </a>
            <span className="cursor-default capitalize">Ikhtisar</span>
            </Breadcrumbs>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="bg-white p-5 mt-5 shadow-lg rounded lg:col-span-2 w-full md:w-auto">
            <Typography variant="h6" color="blue-gray">
              History Poin
            </Typography>
            <hr />
            <br />
            <div className="flex flex-col md:flex-row gap-3 items-end">
              <div className="w-full">
                <label className="text-sm font-medium">Tanggal Awal</label>
                <input
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="text-sm font-medium">Tanggal Akhir</label>
                <input
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div>
                <button
                  className="block text-white bg-primary hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium text-sm px-5 py-2.5 text-center rounded-lg"
                  type="button"
                  onClick={handleFilter}
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
            <br />
            <input
                    type="text"
                    placeholder="Cari Data..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="px-3 py-2 border rounded-md"
                    />
                    <br />
            <div className="rounded p-1 w-full overflow-x-auto mt-5">
                <table id="example_data" className="rounded-sm w-full">
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
                            points
                                .filter((row) => {
                                // Filter berdasarkan pencarian
                                return (
                                    row.tanggal.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    row.poin.toString().includes(searchTerm.toLowerCase()) ||
                                    row.keterangan.toLowerCase().includes(searchTerm.toLowerCase())
                                );
                                })
                                .map((row, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-3">{index + 1}</td>
                                    <td className="py-2 px-3">{row.tanggal}</td>
                                    <td className="py-2 px-3">{row.poin}</td>
                                    <td className="py-2 px-3">{row.keterangan}</td>
                                </tr>
                                ))
                            ) : (
                        <tr>
                        <td colSpan="5" className="text-center py-3 bg-gray-100">
                            Tidak ada data
                        </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>
          </div>

          <div className="w-full md:w-[calc(100%-330px)]">
            <Card>
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="flex flex-col gap-4 rounded-none lg:flex-row lg:items-center"
              >
                <div>
                  <Typography variant="h6" color="blue-gray">
                    Grafik Poin {currentYear}
                  </Typography>
                </div>
              </CardHeader>
              <CardBody className="px-2 pb-0">
                <Line data={chartData} options={chartOptions} />
              </CardBody>
            </Card>
          </div>
        </div> */}
        <br />
      </div>
    </section>
  );
}

export default HistoryPoint;

