import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import $ from "jquery";
import { Breadcrumbs, Typography } from "@material-tailwind/react";
import Decrypt from "../../../component/Decrypt";
import axios from "axios";
import { API_ITC, API_PENGGUNA, API_PLANNING } from "../../../utils/BaseUrl";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

function DetailPlanning() {
    const tableRef = useRef(null);
    const initializeDataTable = () => {
        if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable({});
        }
    };

    const param = useParams();
    const [salesmanId, setsalesmanId] = useState(0);
    const [planning, setplanning] = useState([]);

    const formatDate = (value) => {
        const date = new Date(value);

        const year = date.getFullYear();
        const month = date.getMonth();
        const day = String(date.getDate()).padStart(2, "0");
        const months = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];

        const formattedDate = `${day} ${months[month]} ${year}`;
        return formattedDate;
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
                    axios.get(`${API_ITC}/nama?nama=` + response, {
                        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                    }).then((ress) => {
                        setsalesmanId(ress.data.data.id);
                    })
                } catch (err) {
                    console.log(err);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    // ALL PLANNING
    const getAll = async () => {
        try {
            const response = await axios.get(`${API_PLANNING}/salesman/date?id_salesman=${salesmanId}&tanggal=${param.tgl}`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setplanning(response.data.data);
        } catch (error) {
            console.log("get all", error);
        }
    };

    useEffect(() => {
        if (salesmanId) {
            getAll()
        }
    }, [salesmanId])

    useEffect(() => {
        if (planning && planning.length > 0) {
            initializeDataTable();
        }
    }, [planning]);


    return (
        <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
            <SidebarAdmin />
            <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
                <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                    <Typography variant="lead" className="uppercase">
                        Detail Planning
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
                        <a href="/planning_marketting">
                            <span>Planning</span>
                        </a>
                    </Breadcrumbs>
                </div>
                <main className="bg-white shadow-lg p-5 my-5 rounded">
                    <Typography variant="lead" className="capitalize">
                        Detail Planning {formatDate(param.tgl)}
                    </Typography>
                    <hr />
                    <div className="rounded mt-10 p-2 w-full overflow-x-auto">
                        <table
                            id="example_data"
                            ref={tableRef}
                            className="rounded-sm table-auto w-full"
                        >
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="text-sm py-2 px-3 font-semibold">No</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Nama Customer</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Jenis</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Daerah</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Printer / Projector</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Murid / KLS 3</th>
                                    <th className="text-sm py-2 px-3 font-semibold">PC</th>
                                    <th className="text-sm py-2 px-3 font-semibold">UNBK</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Jurusan</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Pihak Dituju</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Tujuan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {planning.length > 0 ? (
                                    planning.map((row, idx) => (
                                        <tr key={idx}>
                                            <td className="text-sm w-[4%]">{idx + 1}</td>
                                            <td className="text-sm py-2 px-3">{row.customer.nama_customer}</td>
                                            <td className="text-sm py-2 px-3">{row.customer.jenis}</td>
                                            <td className="text-sm py-2 px-3">{row.customer.kabKot.nama_kabkot} / {row.customer.kec.nama_kec}</td>
                                            <td className="text-sm py-2 px-3">{row.customer.printer} / {row.customer.proyektor}</td>
                                            {row.customer.jenis === "Sekolah" ? (<>
                                                <td className="text-sm py-2 px-3">{row.customer.jml} / {row.customer.kls3}</td>
                                                <td className="text-sm py-2 px-3">{row.customer.pc}</td>
                                                <td className="text-sm py-2 px-3">{row.customer.unbk === "Y" ? (<>
                                                    <span><CheckIcon className="w-6 h-6 black" /></span>
                                                </>) : (<>
                                                    <span><XMarkIcon className="w-6 h-6 black" /></span>
                                                </>)}</td>
                                                <td className="text-sm py-2 px-3">{row.customer.jurusan}</td>
                                            </>) : (<>
                                                <td className="text-sm py-2 px-3">-</td>
                                                <td className="text-sm py-2 px-3">-</td>
                                                <td className="text-sm py-2 px-3">-</td>
                                                <td className="text-sm py-2 px-3">-</td>
                                            </>)}
                                            <td className="text-sm py-2 px-3">{row.bertemu}</td>
                                            <td className="text-sm py-2 px-3">{row.ket}</td>
                                        </tr>
                                    ))
                                ) : (<tr>
                                    <td colSpan="12" className="text-center capitalize py-3 bg-gray-100">
                                        Tidak ada data
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </section>
    )
}

export default DetailPlanning;