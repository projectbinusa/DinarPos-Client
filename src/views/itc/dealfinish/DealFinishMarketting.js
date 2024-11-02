import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Button, Dialog, IconButton, Typography } from "@material-tailwind/react";
import $ from "jquery";
import Decrypt from "../../../component/Decrypt";
import axios from "axios";
import { API_DEAL, API_ITC, API_PENGGUNA } from "../../../utils/BaseUrl";
import ModalShowBaso from "./modal/ModalShowBaso";
import ModalShowBast from "./modal/ModalShowBast";
import ModalShowBaut from "./modal/ModalShowBaut";
import ModalShowSpk from "./modal/ModalShowSpk";
import ModalShowEvDtg from "./modal/ModalShowEvDtg";
import ModalShowEvPro from "./modal/ModalShowEvPro";
import ModalShowEvFinish from "./modal/ModalShowEvFinish";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

function DealFinishMarketting() {
    const [openBast, setOpenBast] = useState(false);
    const [openBaso, setOpenBaso] = useState(false);
    const [openBaut, setOpenBaut] = useState(false);
    const [openSpk, setOpenSpk] = useState(false);
    const [openEvDtg, setOpenEvDtg] = useState(false);
    const [openEvProses, setOpenEvProses] = useState(false);
    const [openEvFinish, setOpenEvFinish] = useState(false);

    const handleOpenBast = () => setOpenBast(!openBast);
    const handleOpenBaso = () => setOpenBaso(!openBaso);
    const handleOpenBaut = () => setOpenBaut(!openBaut);
    const handleOpenSpk = () => setOpenSpk(!openSpk);
    const handleOpenEvDtg = () => setOpenEvDtg(!openEvDtg);
    const handleOpenEvProses = () => setOpenEvProses(!openEvProses);
    const handleOpenEvFinish = () => setOpenEvFinish(!openEvFinish);

    // FOTO
    const [fotoBast, setFotoBast] = useState("");
    const [fotoBaso, setFotoBaso] = useState("");
    const [fotoBaut, setFotoBaut] = useState("");
    const [fotoSpk, setFotoSpk] = useState("");
    const [fotoEvDtg, setFotoEvDtg] = useState("");
    const [fotoEvProses, setFotoEvProses] = useState("");
    const [fotoEvFinish, setFotoEvFinish] = useState("");

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
            console.log(res);
            setFinish(res);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (salesmanId) {
            getFinish()
        }
    }, [salesmanId])

    useEffect(() => {
        if (finish && finish.length > 0) {
            initializeDataTable();
        }
    }, [finish])

    const modalBaso = (foto) => { setFotoBaso(foto); handleOpenBaso() }
    const modalBast = (foto) => { setFotoBast(foto); handleOpenBast() }
    const modalBaut = (foto) => { setFotoBaut(foto); handleOpenBaut() }
    const modalEvDtg = (foto) => { setFotoEvDtg(foto); handleOpenEvDtg() }
    const modalEvProses = (foto) => { setFotoEvProses(foto); handleOpenEvProses() }
    const modalEvFinish = (foto) => { setFotoEvFinish(foto); handleOpenEvFinish() }
    const modalSpk = (foto) => { setFotoSpk(foto); handleOpenSpk() }

    // FILE SPK
    const downloadFile = (fileUrl) => {
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = `FILESPK.docx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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
                        <table className="w-full table-auto border-collapse" ref={tableRef}>
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="text-xs py-3 px-4">No</th>
                                    <th className="text-xs py-3 px-4">Customer</th>
                                    <th className="text-xs py-3 px-4">BASP</th>
                                    <th className="text-xs py-3 px-4">BAUT</th>
                                    <th className="text-xs py-3 px-4">BASO</th>
                                    <th className="text-xs py-3 px-4">SPK</th>
                                    <th className="text-xs py-3 px-4">Ev_Datang</th>
                                    <th className="text-xs py-3 px-4">Ev_Proses</th>
                                    <th className="text-xs py-3 px-4">Ev_Finish</th>
                                    <th className="text-xs py-3 px-4">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {finish.length > 0 ? (
                                    finish.map((row, index) => (
                                        <tr key={row.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                            <td className="text-xs py-2 px-4">{index + 1}</td>
                                            <td className="text-xs py-2 px-4">{row.kunjungan?.customer?.nama_customer}</td>
                                            <td className="text-xs py-2 px-4 text-center ">
                                                <Button variant="outlined"
                                                    color="blue"
                                                    type="button"
                                                    onClick={() => modalBast(row.bast)}
                                                    className="font-popins font-medium" size="sm">View</Button>
                                            </td>
                                            <td className="text-xs py-2 px-4 text-center">
                                                <Button variant="outlined"
                                                    color="blue"
                                                    type="button"
                                                    onClick={() => modalBaut(row.baut)}
                                                    className="font-popins font-medium" size="sm">View</Button>
                                            </td>
                                            <td className="text-xs py-2 px-4 text-center">
                                                <Button variant="outlined"
                                                    color="blue"
                                                    type="button"
                                                    onClick={() => modalBaso(row.basp)}
                                                    className="font-popins font-medium" size="sm">View</Button>
                                            </td>
                                            <td className="text-xs py-2 px-4 flex items-center justify-center">
                                                <div className="flex flex-row gap-2">
                                                    <Button variant="gradient"
                                                        color="blue"
                                                        type="button"
                                                        onClick={() => downloadFile(row.file_spk)}
                                                        className="font-popins font-medium" size="sm">Doc</Button>
                                                    <Button variant="outlined"
                                                        color="blue"
                                                        type="button"
                                                        onClick={() => modalSpk(row.spk)}
                                                        className="font-popins font-medium" size="sm">View</Button>
                                                </div>
                                            </td>
                                            <td className="text-xs py-2 px-4 text-center">
                                                <Button variant="outlined"
                                                    color="blue"
                                                    type="button"
                                                    onClick={() => modalEvDtg(row.ev_dtg)}
                                                    className="font-popins font-medium" size="sm">View</Button>
                                            </td>
                                            <td className="text-xs py-2 px-4 text-center">
                                                <Button variant="outlined"
                                                    color="blue"
                                                    type="button"
                                                    onClick={() => modalEvProses(row.ev_pro)}
                                                    className="font-popins font-medium" size="sm">View</Button>
                                            </td>
                                            <td className="text-xs py-2 px-4 text-center">
                                                <Button variant="outlined"
                                                    color="blue"
                                                    type="button"
                                                    onClick={() => modalEvFinish(row.ev_fin)}
                                                    className="font-popins font-medium" size="sm">View</Button>
                                            </td>
                                            <td className="text-xs py-2 px-4 flex items-center justify-center">
                                                <div className="flex flex-row gap-2">
                                                    <a href={"/edit_finish/" + row.id}>
                                                        <IconButton size="sm" color="light-blue">
                                                            <PencilIcon className="w-6 h-6 white" />
                                                        </IconButton></a>
                                                    <IconButton size="sm" color="red" className="ml-2">
                                                        <TrashIcon className="w-6 h-6 white" />
                                                    </IconButton>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10" className="text-center text-xs py-3 bg-gray-200 border">
                                            Tidak ada data
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
            {/* MODAL BAST START */}
            <Dialog open={openBast} handler={handleOpenBast} size="md">
                <ModalShowBast handleOpen={handleOpenBast} foto={fotoBast} />
            </Dialog>
            {/* MODAL BAST END */}

            {/* MODAL BAUT START */}
            <Dialog open={openBaut} handler={handleOpenBaut} size="md">
                <ModalShowBaut handleOpen={handleOpenBaut} foto={fotoBaut} />
            </Dialog>
            {/* MODAL BAUT END */}

            {/* MODAL BASO START */}
            <Dialog open={openBaso} handler={handleOpenBaso} size="md">
                <ModalShowBaso handleOpen={handleOpenBaso} foto={fotoBaso} />
            </Dialog>
            {/* MODAL BASO END */}

            {/* MODAL SPK START */}
            <Dialog open={openSpk} handler={handleOpenSpk} size="md">
                <ModalShowSpk handleOpen={handleOpenSpk} foto={fotoSpk} />
            </Dialog>
            {/* MODAL SPK END */}

            {/* MODAL EV DATANG START */}
            <Dialog open={openEvDtg} handler={handleOpenEvDtg} size="md">
                <ModalShowEvDtg handleOpen={handleOpenEvDtg} foto={fotoEvDtg} />
            </Dialog>
            {/* MODAL EV DATANG END */}

            {/* MODAL EV PROSES START */}
            <Dialog open={openEvProses} handler={handleOpenEvProses} size="md">
                <ModalShowEvPro handleOpen={handleOpenEvProses} foto={fotoEvProses} />
            </Dialog>
            {/* MODAL EV PROSES END */}

            {/* MODAL EV FINISH START */}
            <Dialog open={openEvFinish} handler={handleOpenEvFinish} size="md">
                <ModalShowEvFinish handleOpen={handleOpenEvFinish} foto={fotoEvFinish} />

            </Dialog>
            {/* MODAL EV FINISH END */}
        </section>
    )
}

export default DealFinishMarketting;