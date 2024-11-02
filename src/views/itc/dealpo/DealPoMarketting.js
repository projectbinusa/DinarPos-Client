import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Button, Dialog, Typography } from "@material-tailwind/react";
import $ from "jquery"
import SalesmanId from "../../../utils/SalesmanId";
import { API_DEAL } from "../../../utils/BaseUrl";
import axios from "axios";
import formatDate from "../../../component/FormatDate";
import ModalFotoDealPO from "./ModalFotoDealPO.js";

function DealPoMarketting() {
    const [deal, setDeal] = useState([]);
    const tableRef = useRef(null);
    const initializeDataTable = () => {
        if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable({});
        }
    };

    const salesmanId = SalesmanId();

    // MODAL OPEN
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const [foto, setFoto] = useState("");
    const modalOpen = (picture) => { setFoto(picture); handleOpen() }

    const getDealPo = async () => {
        try {
            const response = await axios.get(`${API_DEAL}/po/salesman?id_salesman=${salesmanId}`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            const res = response.data.data;
            console.log(res);
            setDeal(res);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (salesmanId) {
            getDealPo()
        }
    }, [salesmanId])

    useEffect(() => {
        if (deal && deal.length > 0) {
            initializeDataTable();
        }
    }, [deal])

    const downloadFile = (fileUrl) => {
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = `FILEDEALPO.docx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (<section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
        <SidebarAdmin />
        <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
            <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                <Typography variant="lead" className="uppercase">
                    DealPo
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
                    <a href="/form_dealpo">
                        <Button
                            variant="gradient"
                            color="blue"
                            className="font-poppins font-medium">
                            Tambah</Button> </a>
                </div> <br />
                <div className="rounded mb-5 p-1 overflow-x-auto">
                    <table className="w-full" ref={tableRef}>
                        <thead className="bg-blue-500 text-white w-full">
                            <tr>
                                <th className="text-xs p-2 w-[4%]">No</th>
                                <th className="text-xs p-2">Tgl Input</th>
                                <th className="text-xs p-2">Customer</th>
                                <th className="text-xs p-2">Foto</th>
                                <th className="text-xs p-2">Keterangan</th>
                                <th className="text-xs p-2">File_Po</th>
                                <th className="text-xs p-2">Status</th>
                                <th className="text-xs p-2">Ket_Status</th>
                                <th className="text-xs p-2">Administrasi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deal.length > 0 ? (
                                deal.map((dealpo, index) => (
                                    <tr key={index}>
                                        <td className="text-xs w-[4%]">{index + 1}</td>
                                        <td className="text-xs py-2 px-3">
                                            {formatDate(dealpo.tanggal_input)}
                                        </td>
                                        <td className="text-xs py-2 px-3">{dealpo?.kunjungan?.customer?.nama_customer}</td>
                                        <td className="text-xs py-2 px-4 text-center ">
                                            <Button variant="outlined"
                                                color="blue"
                                                type="button"
                                                onClick={() => modalOpen(dealpo.foto)}
                                                className="font-popins font-medium" size="sm">View</Button>
                                        </td>
                                        <td className="text-xs py-2 px-3">{dealpo.ket}</td>
                                        <td className="text-xs py-2 px-3">
                                            <Button variant="gradient"
                                                color="blue"
                                                type="button"
                                                onClick={() => downloadFile(dealpo.file_po)}
                                                className="font-popins font-medium" size="sm">File</Button>
                                        </td>
                                        <td className="text-xs py-2 px-3">{dealpo.status}</td>
                                        <td className="text-xs py-2 px-3">{dealpo.ket_status}</td>
                                        <td className="text-xs py-2 px-3">{dealpo.administrasi}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="9"
                                        className="text-center text-xs py-3 bg-gray-100"
                                    >
                                        Tidak ada data
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
        {/* MODAL START */}
        <Dialog open={open} handler={handleOpen} size="md">
            <ModalFotoDealPO handleOpen={handleOpen} foto={foto} />
        </Dialog>
        {/* MODAL END */}
    </section>
    )
}

export default DealPoMarketting;