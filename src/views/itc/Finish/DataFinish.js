import React, { useState, useEffect } from 'react';
import SidebarAdmin from "../../../component/SidebarAdmin";
import { 
    Breadcrumbs, 
    Button ,
    Input ,
    Typography ,
 } from "@material-tailwind/react";
import axios from 'axios';
import { API_SERVICE } from "../../../utils/BaseUrl";
import Swal from 'sweetalert2';

const Finish = () => {
    const [idTT, setidTT] = useState(0);
  const [month, setMonth] = useState('');
  const [data, setData] = useState([]);
  const [totalElektro, setTotalElektro] = useState(0);
  const [successElektro, setSuccessElektro] = useState(0);
  const [notElektro, setNotElektro] = useState(0);
  const [totalCpu, setTotalCpu] = useState(0);
  const [successCpu, setSuccessCpu] = useState(0);
  const [notCpu, setNotCpu] = useState(0);

   // Function to search for TT
   const searchTT = async () => {
    try {
      const response = await axios.get(`${API_SERVICE}/` + idTT, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      // Update state variables using setters
      setData(response.data.data);
    } catch (error) {
      if (error.response.data.code === 404) {
        Swal.fire({
          icon: "info",
          title: "Data Tidak Ada!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log("get all", error.response.data.code);
    }
  };



  const Month = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agust', 'Sep', 'Okt', 'Nov', 'Des'
  ];

  const indonesianDate = (months) => {
    const year = months.substring(0, 4);
    const month = parseInt(months.substring(5, 7), 10);

    if (month < 1 || month > 12) {
      return '';
    }

    return `${Month[month - 1]} ${year}`;
  };
  

  const filterMonth = () => {
    axios.post('/admin/finish_filter', { month })
      .then((res) => {
        const responseData = res.data;
        setData(responseData);

        let totalElektro = 0, successElektro = 0, notElektro = 0;
        let totalCpu = 0, successCpu = 0, notCpu = 0;

        responseData.forEach(item => {
          if (item.team === 'Elektro') {
            totalElektro += item.ttl;
            successElektro += item.success;
            notElektro += item.nots;
          } else if (item.team === 'CPU') {
            totalCpu += item.ttl;
            successCpu += item.success;
            notCpu += item.nots;
          }
        });

        setTotalElektro(totalElektro);
        setSuccessElektro(successElektro);
        setNotElektro(notElektro);
        setTotalCpu(totalCpu);
        setSuccessCpu(successCpu);
        setNotCpu(notCpu);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: 'Terjadi kesalahan saat mengambil data!',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
        <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
          <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                <Typography variant="lead" className="uppercase">
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
                <a href="/data_service">
                    <span>Finish</span>
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    value={month} 
                    onChange={(e) => setMonth(e.target.value)} 
                    />
                    <Button variant="gradient" color="blue" onClick={searchTT}>
                    GO!
                    </Button>
                </div>
                <br />
                <h1 id="mont" className="text-lg font-medium">{indonesianDate(month)}</h1>
                <br />
                <div className="overflow-x-auto" id="tables_finish">
                    <table className="border border-collapse w-full" id="table_finish">
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
                        {data.map((row, index) => {
                        const all = row.ttl;
                        const scs = row.success;
                        const percent = (scs !== 0) ? (scs / all) * 100 : 0;

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
                            <span className="bg-primary py-1 px-2 text-white rounded">
                            {row.success}
                            </span></td>
                            <td className="text-sm text-center py-2 px-2 border-gray-300 border">
                            <span className="bg-red-500 py-1 px-2 text-white rounded">
                            {row.nots}
                            </span></td>
                            <td className="text-sm text-center py-2 px-2 border-gray-300 border">
                            {percent.toFixed(2)} %</td>
                            </tr>
                        );
                        })}
                    </tbody>
                    </table>
                </div>
                </div>
                <div>
                <div className="bg-green-100 border-2 border-green-100 mt-5 shadow-lg rounded">
                    <h1 className="text-medium text-green-500 p-5">Team Elektro</h1>
                    <div class="bg-white px-2 rounded">
                        <br />
                        <p class="text-sm text-center">Bulan Ini</p>
                        <h1 class="text-3xl font-semibold text-center">{totalElektro}</h1>
                        <br />
                        <hr />
                        <br />
                        <div class="flex items-center justify-center gap-2">
                            <p class="bg-blue-500 py-1 px-2 text-white rounded">{successElektro}</p>
                            <p class="bg-red-500 py-1 px-2 text-white rounded">{notElektro}</p>
                            <p class="bg-green-500 py-1 px-2 text-white rounded">
                                {totalElektro !== 0 ? ((successElektro / totalElektro) * 100).toFixed(2) : 0} %
                            </p>
                    </div>
                    <br />
                    </div>
                </div>
                  <div class="mt-5 shadow-lg rounded-lg">
                        <div class="px-5 py-2 flex bg-yellow-200 justify-between items-center text-yellow-800">
                            <p>Total Service</p>
                            <p>{totalCpu + totalElektro}</p>
                        </div>
                        <div class="px-5 py-2 bg-blue-500 flex justify-between items-center text-white">
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
                    <div class="flex items-center justify-center gap-2">
                            <p class="bg-blue-500 py-1 px-2 text-white rounded">{successElektro}</p>
                            <p class="bg-red-500 py-1 px-2 text-white rounded">{notElektro}</p>
                            <p class="bg-green-500 py-1 px-2 text-white rounded">
                                {totalElektro !== 0 ? ((successElektro / totalElektro) * 100).toFixed(2) : 0} %
                            </p>
                    </div>
                    <br />
                </div>
            </div>
         </div>
       </div>
     </section>
  );
};

export default Finish;
