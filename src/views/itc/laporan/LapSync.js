import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Button, IconButton, Input, Progress, Typography } from "@material-tailwind/react";
import $ from "jquery";
import { API_SALESMAN, API_SYNC_KUNJUNGAN, API_SYNC_PLANNING } from "../../../utils/BaseUrl";
import axios from "axios";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

const totalPlanning = async (tgl, idx, salesmanId, setTotalsP) => {
    try {
        const response = await axios.get(`${API_SYNC_PLANNING}?id_salesman=${salesmanId}&tanggal=${tgl}`, {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        });
        const res = response.data.data.length;
        setTotalsP(prevTotals => {
            const newTotals = [...prevTotals];
            newTotals[idx] = res;
            return newTotals;
        });
    } catch (err) {
        console.log(err);
    }
};

const totalKunjungan = async (tgl, idx, salesmanId, setTotalsK) => {
    try {
        const response = await axios.get(`${API_SYNC_KUNJUNGAN}/tanggal/salesman?id_salesman=${salesmanId}&tgl=${tgl}`, {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        });
        const res = response.data.data.length;
        setTotalsK(prevTotals => {
            const newTotals = [...prevTotals];
            newTotals[idx] = res;
            return newTotals;
        });
    } catch (err) {
        console.log(err);
    }
};

function LapSync() {
    const tableRef = useRef(null);
    const [laporans, setLaporan] = useState([]);
    const [tglAwal, settglAwal] = useState("");
    const [tglAkhir, settglAkhir] = useState("");
    const [itcId, setitcId] = useState(0);
    const [validasi, setvalidasi] = useState(false);

    const initializeDataTable = () => {
        if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable();
        }
    }

    const formatDate = (value) => {
        const date = new Date(value);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
    };

    // ALL ITC
    const [values, setvalues] = useState("");
    const [options, setoptions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const handle = async () => {
        if (values.trim() !== "") {
            const response = await fetch(
                `${API_SALESMAN}/pagination?limit=10&page=${currentPage}&search=${values}&sort=1`,
                {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                }
            );
            const data = await response.json();
            setoptions(data.data);
        } else {
            return;
        }
    };

    useEffect(() => {
        handle();
    }, [currentPage, values]);

    const handleChange = (event) => {
        setvalues(event.target.value);
        setCurrentPage(1);
    };
    // END ALL ITC    

    // ALL SYNC
    const getKunjunganSync = async () => {
        try {
            const response = await axios.get(`${API_SYNC_KUNJUNGAN}`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            const res = response.data.data;
            setLaporan(res);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getKunjunganSync()
    }, [])

    // ALL SYNC BETWEEN
    const getKunjunganSyncBetweenTanggal = async () => {
        try {
            const response = await axios.get(`${API_SYNC_KUNJUNGAN}/tanggal?tglAkhir=${tglAkhir}&tglAwal=${tglAwal}`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            const res = response.data.data;
            setLaporan(res);
            setvalidasi(false)
        } catch (err) {
            console.log(err);
        }
    }

    // ALL SYNC BETWEEN TGL & ID SALESMAN
    const getKunjunganSyncBetweenTanggalSalesman = async () => {
        try {
            const response = await axios.get(`${API_SYNC_KUNJUNGAN}/tanggal_beetwen/salesman?id_salesman=${itcId}&tgl_akhir=${tglAkhir}&tgl_awal=${tglAwal}`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            const res = response.data.data;
            setLaporan(res);
            setvalidasi(false)
        } catch (err) {
            console.log(err);
        }
    }


    const [totalsK, setTotalsK] = useState([]);
    const [totalsP, setTotalsP] = useState([]);

    useEffect(() => {
        if (laporans.length > 0) {
            laporans.forEach((row, idx) => {
                totalPlanning(formatDate(row.tanggalKunjungan), idx, row.salesman.id, setTotalsP);
                totalKunjungan(formatDate(row.tanggalKunjungan), idx, row.salesman.id, setTotalsK);
            });
        }
    }, [laporans]);

    useEffect(() => {
        if (laporans && laporans.length > 0) {
            initializeDataTable();
        }
    }, [laporans])

    console.log(laporans);


    useEffect(() => {
        if (validasi || tglAkhir !== "" || tglAwal !== "") {
            getKunjunganSyncBetweenTanggal();
        }
        if (validasi || tglAkhir !== "" || tglAwal !== "" || itcId !== 0) {
            getKunjunganSyncBetweenTanggalSalesman();
        }
    }, [validasi]);

    const filterTangggal = async () => {
        if (tglAwal === "" || tglAkhir === "" || tglAwal === tglAkhir) {
            Swal.fire({
                icon: "warning",
                title: "Isi Form Terlebih Dahulu!",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        setvalidasi(true);
    };

    return (
        <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
            <SidebarAdmin />
            <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
                <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                    <Typography variant="lead" className="uppercase font-poppins">
                        Sync
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
                    <div>
                        <div className="w-72 lg:w-[50%]">
                            <div className="mt-8">
                                <Input
                                    variant="static"
                                    color="blue"
                                    type="date"
                                    label="Tanggal Awal"
                                    required
                                    onChange={(e) => settglAwal(e.target.value)}
                                />
                            </div>
                            <div className="mt-8">
                                <Input
                                    variant="static"
                                    color="blue"
                                    type="date"
                                    label="Tanggal Akhir"
                                    required
                                    onChange={(e) => settglAkhir(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2 items-end mt-8">
                                <Input
                                    label="ITC"
                                    variant="static"
                                    color="blue"
                                    list="salesman-list"
                                    id="salesman"
                                    name="salesman"
                                    onChange={(event) => {
                                        handleChange(event);
                                        setitcId(event.target.value);
                                    }}
                                    placeholder="Pilih ITC"
                                />
                                <datalist id="salesman-list">
                                    {options.length > 0 && (
                                        <>
                                            {options.map((option) => (
                                                <option value={option.id} key={option.id}>
                                                    {option.namaSalesman}
                                                </option>
                                            ))}
                                        </>
                                    )}
                                </datalist>

                                <div className="flex gap-2">
                                    <button
                                        className="text-sm bg-gray-400 px-1"
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        Prev
                                    </button>
                                    <button
                                        className="text-sm bg-gray-400 px-1"
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        disabled={!options.length}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                        <Button
                            className="mt-5 font-poppins font-medium"
                            color="blue"
                            onClick={filterTangggal}
                        >
                            Cari
                        </Button>
                    </div> <br />
                    <div className="rounded mb-5 p-1 mt-12 overflow-x-auto">
                        <table
                            id="example_data"
                            ref={tableRef}
                            className="rounded-sm table-auto w-full overflow-x-auto"
                        >
                            <thead className="bg-blue-500 text-white w-full">
                                <tr>
                                    <th className="text-sm py-2 px-2.5 font-semibold w-[4%]">No</th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">Tanggal</th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">Nama ITC</th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">Presentase</th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {laporans.length > 0 ? (
                                    laporans.map((row, idx) => {
                                        const persen = (totalsK[idx] / totalsP[idx]) * 100;
                                        const formattedPersen = isNaN(persen) ? 0 : persen.toFixed(1);
                                        return (
                                            <tr key={idx}>
                                                <td className="text-sm w-[4%]">{idx + 1}</td>
                                                <td className="text-sm py-2 px-2.5">{row.tanggalKunjungan}</td>
                                                <td className="text-sm py-2 px-2.5">{row.salesman.namaSalesman}</td>
                                                <td className="text-sm py-2 px-2.5">
                                                    <Progress value={formattedPersen || 0} color="green" label/>
                                                </td>
                                                <td className="text-sm py-2 px-3 flex items-center justify-center">
                                                    <a href={`/detail_sync/${row.salesman.id}/${row.tanggalKunjungan}`}>
                                                        <IconButton size="md" color="green">
                                                            <InformationCircleIcon className="w-6 h-6 white" />
                                                        </IconButton>
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : (<tr>
                                    <td
                                        colSpan="5"
                                        className="text-sm text-center capitalize py-2 bg-gray-100">
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

export default LapSync;