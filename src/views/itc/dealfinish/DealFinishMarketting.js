import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Button, Typography } from "@material-tailwind/react";
import $ from "jquery";
import Decrypt from "../../../component/Decrypt";
import axios from "axios";
import { API_DEAL, API_ITC, API_PENGGUNA } from "../../../utils/BaseUrl";

function DealFinishMarketting() {
    const [finish, setFinish] = useState([]);
    const [salesmanId, setsalesmanId] = useState(0);
    const tableRef = useRef(null);
    const initializeDataTable = () => {
        if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable({});
        }
    };

    const id = Decrypt();
    useEffect(() => {
        axios
            .get(`${API_PENGGUNA}/` + id, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            })
            .then((res) => {
                const response = res.data.data.namaPengguna;
                try {
                    axios
                        .get(`${API_ITC}/nama?nama=` + response, {
                            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                        })
                        .then((ress) => {
                            setsalesmanId(ress.data.data.id);
                        });
                } catch (err) {
                    console.log(err);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const getFinish = async () => {
        try {
            const response = await axios.get(`${API_DEAL}/finish/salesman?id_salesman=${salesmanId}`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            const res = response.data.data;
            setFinish(res);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getFinish()
    }, [])

    useEffect(() => {
        if (finish && finish.length > 0) {
            initializeDataTable();
        }
    }, [finish])

    return (
        <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
            <SidebarAdmin />
            <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
                <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                    <Typography variant="lead" className="uppercase">
                        Deal Finish
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
                    </Breadcrumbs>
                </div>
                <main className="bg-white shadow-lg p-5 my-5 rounded">
                    <div className="flex justify-end mb-5">
                        <a href="/form_finish">
                            <Button variant="gradient" color="blue" className="font-poppins font-medium">
                                Tambah
                            </Button>
                        </a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse">
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="text-xs py-3 px-4">No</th>
                                    <th className="text-xs py-3 px-4">Basp</th>
                                    <th className="text-xs py-3 px-4">Baut</th>
                                    <th className="text-xs py-3 px-4">Spk</th>
                                    <th className="text-xs py-3 px-4">Ev_Datang</th>
                                    <th className="text-xs py-3 px-4">Ev_Proses</th>
                                    <th className="text-xs py-3 px-4">Ev_Finish</th>
                                </tr>
                            </thead>
                            <tbody>
                                {finish.length > 0 ? (
                                    finish.map((row, index) => (
                                        <tr key={row.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                            <td className="text-xs py-2 px-4 border">{index + 1}</td>
                                            <td className="text-xs py-2 px-4 border">{row.basp}</td>
                                            <td className="text-xs py-2 px-4 border">{row.baut}</td>
                                            <td className="text-xs py-2 px-4 border">{row.file_spk}</td>
                                            <td className="text-xs py-2 px-4 border">{row.ev_dtg}</td>
                                            <td className="text-xs py-2 px-4 border">{row.ev_pro}</td>
                                            <td className="text-xs py-2 px-4 border">{row.ev_fin}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center text-xs py-3 bg-gray-200 border">
                                            Tidak ada data
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </section>
    )
}

export default DealFinishMarketting;