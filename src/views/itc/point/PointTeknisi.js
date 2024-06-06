import React, { useState, useEffect, useRef } from 'react';
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Button, Input, Typography } from "@material-tailwind/react";
import axios from 'axios';
import { API_SERVICE } from "../../../utils/BaseUrl";
import Swal from 'sweetalert2';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net';

const PointTeknisi = () => {
    const [idTT, setIdTT] = useState(0);
    const [month, setMonth] = useState('');
    const [data, setData] = useState([]);
    const [points, setPoints] = useState([]);
    const tableRef = useRef(null);

    const searchTT = async () => {
        try {
            const response = await axios.get(`${API_SERVICE}/` + idTT, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setData(response.data.data);
        } catch (error) {
            if (error.response && error.response.data.code === 404) {
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
        axios.post(`${API_SERVICE}/admin/finish_filter`, { month })
            .then((res) => {
                const responseData = res.data;
                setPoints(responseData);

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
                <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between w-full">
                    <Typography variant="lead" className="uppercase">
                        Point Teknisi
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
                            <span>Point Teknisi</span>
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
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                            />
                            <Button variant="gradient" color="blue" onClick={filterMonth}>
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
                                        <th className="text-sm py-2 px-3 font-semibold">Nominal(Rp)</th>
                                        <th className="text-sm py-2 px-3 font-semibold">Graph</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {points.length > 0 ? (
                                        points.map((row, index) => (
                                            <tr key={index}>
                                                <td className="text-sm py-2 px-3">{index + 1}</td>
                                                <td className="text-sm py-2 px-3">{row.teknisi}</td>
                                                <td className="text-sm py-2 px-3">{row.poin}</td>
                                                <td className="text-sm py-2 px-3">{row.nominal}</td>
                                                <td className="text-sm py-2 px-3">{row.Graph}</td>
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
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PointTeknisi;
