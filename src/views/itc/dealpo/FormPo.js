import React, { useEffect, useRef, useState } from "react";
import Decrypt from "../../../component/Decrypt";
import axios from "axios";
import { API_KUNJUNGAN, API_PENGGUNA } from "../../../utils/BaseUrl";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, IconButton, Typography } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import $ from "jquery"
import formatDate from "../../../component/FormatDate";

function FormPo() {
    const [datas, setDatas] = useState([]);
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
                    const response = await axios.get(`${API_KUNJUNGAN}/deal_po/salesman?nama_salesman=${nama}`, {
                        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                    });
                    setDatas(response.data.data);
                    console.log(response.data.data);
                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
            };

            fetchData();
        }
    }, [nama]);

    useEffect(() => {
        if (datas && datas.length > 0) {
            initializeDataTable();
        }
    }, [datas]);

    return (
        <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
            <SidebarAdmin />
            <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
                <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                    <Typography variant="lead" className="uppercase">
                        Form Deal Po
                    </Typography>
                    <Breadcrumbs className="bg-transparent">
                        <a href="/home" className="opacity-60">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                        </a>
                        <a href="/dealpo_marketting">
                            <span>Deal PO</span>
                        </a>
                    </Breadcrumbs>
                </div>

                <main className="bg-white shadow-lg p-5 my-5 rounded">
                    <div className="rounded mb-5 p-1 overflow-x-auto">
                        <table className="w-full" ref={tableRef}>
                            <thead className="bg-blue-500 text-white w-full">
                                <tr>
                                    <th className="text-xs p-2 w-[4%]">No</th>
                                    <th className="text-xs p-2">Instansi</th>
                                    <th className="text-xs p-2">Tujuan</th>
                                    <th className="text-xs p-2">Action</th>
                                    <th className="text-xs p-2">Info didapat</th>
                                    <th className="text-xs p-2">Cp</th>
                                    <th className="text-xs p-2">Peluang</th>
                                    <th className="text-xs p-2">Deal</th>
                                    <th className="text-xs p-2">Byr_%</th>
                                    <th className="text-xs p-2">Wkt_p</th>
                                    <th className="text-xs p-2">Tgl_d</th>
                                    <th className="text-xs p-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datas.length > 0 ? (
                                    datas.map((deal, index) => (
                                        <tr key={index}>
                                            <td className="text-sm py-2 px-3">{index + 1}</td>
                                            <td className="text-sm py-2 px-3">{deal.customer?.nama_customer}</td>
                                            <td className="text-sm py-2 px-3">{deal.tujuan}</td>
                                            <td className="text-sm py-2 px-3">{deal.action}</td>
                                            <td className="text-sm py-2 px-3">{deal.infoDpt}</td>
                                            <td className="text-sm py-2 px-3">{deal.cp}</td>
                                            <td className="text-sm py-2 px-3">{deal.peluang}</td>
                                            <td className="text-sm py-2 px-3">{deal.deal}</td>
                                            <td className="text-sm py-2 px-3">{deal.pembayaran}</td>
                                            <td className="text-sm py-2 px-3">{deal.waktuPengadaan}</td>
                                            <td className="text-sm py-2 px-3">{formatDate(deal.tanggalDeal)}</td>
                                            <td>
                                                <div className="py-2 px-3 flex items-center justify-center">
                                                    <a href={"/add_dealpo/" + deal.idReport}>
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
                                        <td colSpan="11" className="text-center text-sm py-2 px-3">
                                            No Data Found
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

export default FormPo