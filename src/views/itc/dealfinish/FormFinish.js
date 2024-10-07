import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, IconButton, Typography } from "@material-tailwind/react";
import { API_KUNJUNGAN, API_PENGGUNA } from "../../../utils/BaseUrl";
import $ from "jquery";
import Decrypt from "../../../component/Decrypt";
import formatDate from "../../../component/FormatDate";
import { PlusIcon } from "@heroicons/react/24/outline";

function FormFinish() {
    const [kunjungan, setKunjungan] = useState([]);
    const [nama, setNama] = useState("");
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
                setNama(response)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    useEffect(() => {
        if (nama && nama !== "") {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${API_KUNJUNGAN}/deal_finish/salesman?nama_salesman=${nama}`, {
                        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                    });
                    setKunjungan(response.data.data);
                    console.log(response.data.data);
                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
            };

            fetchData();
        }
    }, [nama]);

    useEffect(() => {
        if (kunjungan && kunjungan.length > 0) {
            initializeDataTable();
        }
    }, [kunjungan]);

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
                        <table className="w-full" ref={tableRef}>
                            <thead className="bg-blue-500 text-white w-full">
                                <tr>
                                    <th className="text-xs py-2 px-3 w-[4%]">No</th>
                                    <th className="text-xs py-2 px-3">Tgl Input</th>
                                    <th className="text-xs py-2 px-3">Tujuan</th>
                                    <th className="text-xs py-2 px-3">Action</th>
                                    <th className="text-xs py-2 px-3">Info didapat</th>
                                    <th className="text-xs py-2 px-3">CP</th>
                                    <th className="text-xs py-2 px-3">Peluang</th>
                                    <th className="text-xs py-2 px-3">Deal</th>
                                    <th className="text-xs py-2 px-3">Byr_%</th>
                                    <th className="text-xs py-2 px-3">Wkt_p</th>
                                    <th className="text-xs py-2 px-3">Tgl_d</th>
                                    <th className="text-xs py-2 px-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kunjungan.length > 0 ? (
                                    kunjungan.map((item, index) => (
                                        <tr key={index}>
                                            <td className="text-xs py-2 px-3">{index + 1}</td>
                                            <td className="text-xs py-2 px-3">{formatDate(item.created_date)}</td>
                                            <td className="text-xs py-2 px-3">{item.tujuan}</td>
                                            <td className="text-xs py-2 px-3">{item.action}</td>
                                            <td className="text-xs py-2 px-3">{item.infoDpt}</td>
                                            <td className="text-xs py-2 px-3">{item.cp}</td>
                                            <td className="text-xs py-2 px-3">{item.peluang}</td>
                                            <td className="text-xs py-2 px-3">{item.deal}</td>
                                            <td className="text-xs py-2 px-3">{item.pembayaran}</td>
                                            <td className="text-xs py-2 px-3">{item.waktuPengadaan}</td>
                                            <td className="text-xs py-2 px-3">{formatDate(item.tanggalDeal)}</td>
                                            <td>
                                                <div className="py-2 px-3 flex items-center justify-center">
                                                    <a href={"/add_finish/" + item.idReport}>
                                                        <IconButton size="md" color="blue">
                                                            <PlusIcon className="w-6 h-6 white" />
                                                        </IconButton>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="12" className="text-center text-xs py-2">
                                            Tidak ada data                                          </td>
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
