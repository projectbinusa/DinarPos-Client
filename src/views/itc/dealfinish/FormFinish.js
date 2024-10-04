import React, { useEffect, useState } from "react";
import axios from "axios";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Typography } from "@material-tailwind/react";
import { API_KUNJUNGAN } from "../../../utils/BaseUrl";

function FormFinish() {
    const [kunjungan, setKunjungan] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_KUNJUNGAN}`, {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                });
                setKunjungan(response.data.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
            <SidebarAdmin />
            <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
                <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                    <Typography variant="lead" className="uppercase">
                        Form Finish
                    </Typography>
                    <Breadcrumbs className="bg-transparent">
                        <a href="/home" className="opacity-60">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                        </a>
                        <a href="/dealfinish">
                            <span>Deal Finish</span>
                        </a>
                    </Breadcrumbs>
                </div>
                <main className="bg-white shadow-lg p-5 my-5 rounded">
                    <div className="rounded mb-5 p-1 overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-blue-500 text-white w-full">
                                <tr>
                                    <th className="text-sm py-2 px-3 font-semibold w-[4%]">No</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Tgl Input</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Tujuan</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Action</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Info didapat</th>
                                    <th className="text-sm py-2 px-3 font-semibold">CP</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Peluang</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Deal</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Byr_%</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Wkt_p</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Tgl_d</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kunjungan.length > 0 ? (
                                    kunjungan.map((item, index) => (
                                        <tr key={index}>
                                            <td className="text-sm py-2 px-3">{index + 1}</td>
                                            <td className="text-sm py-2 px-3">{item.tgl_input}</td>
                                            <td className="text-sm py-2 px-3">{item.tujuan}</td>
                                            <td className="text-sm py-2 px-3">{item.action}</td>
                                            <td className="text-sm py-2 px-3">{item.info_didapat}</td>
                                            <td className="text-sm py-2 px-3">{item.cp}</td>
                                            <td className="text-sm py-2 px-3">{item.peluang}</td>
                                            <td className="text-sm py-2 px-3">{item.deal}</td>
                                            <td className="text-sm py-2 px-3">{item.byr_persentase}</td>
                                            <td className="text-sm py-2 px-3">{item.wkt_p}</td>
                                            <td className="text-sm py-2 px-3">{item.tgl_d}</td>
                                            <td className="text-sm py-2 px-3">
                                                <button
                                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                                    onClick
                                                >
                                                    delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="12" className="text-center text-sm py-2">
                                            No data available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </section>
    );
}

export default FormFinish;
