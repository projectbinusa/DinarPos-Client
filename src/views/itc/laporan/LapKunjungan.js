import { Breadcrumbs, Button, IconButton, Input, Option, Select, Typography } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { API_KUNJUNGAN, API_SALESMAN } from "../../../utils/BaseUrl";
import { ChevronLeftIcon, InformationCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import $ from "jquery";
import axios from "axios";
import Swal from "sweetalert2";

function LapKunjungan() {
    const [tglAwal, setTglAwal] = useState("");
    const [tglAkhir, setTglAkhir] = useState("");
    const [deal, setDeal] = useState("");
    const [salesmanId, setSalesmanId] = useState(0);

    const tableRef = useRef(null);
    const [laporans, setLaporan] = useState([]);
    const [validasi, setvalidasi] = useState(false);

    const initializeDataTable = () => {
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable().destroy();
        }

        $(tableRef.current).DataTable({});
    };

    // GET ALL
    const getAllKunjungan = async () => {
        try {
            const response = await axios.get(`${API_KUNJUNGAN}`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setLaporan(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // GET ALL TANGGAL BETWEEN
    const getAllTanggal = async () => {
        try {
            const response = await axios.get(`${API_KUNJUNGAN}/date/between?tanggal_akhir=${tglAkhir}&tanggal_awal=${tglAwal}`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setLaporan(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // GET ALL TGL SALESMAN
    const getAllTanggalSalesman = async () => {
        try {
            const response = await axios.get(`${API_KUNJUNGAN}/date/between/salesman?id_salesman=${salesmanId}&tanggal_akhir=${tglAkhir}&tanggal_awal=${tglAwal}`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setLaporan(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // < 50
    const getAllKurang50 = async () => {
        try {
            const response = await axios.get(`${API_KUNJUNGAN}/between0and50`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setLaporan(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // < 80
    const getAllKurang80 = async () => {
        try {
            const response = await axios.get(`${API_KUNJUNGAN}/deal_po`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setLaporan(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // < 100
    const getAllKurang100 = async () => {
        try {
            const response = await axios.get(`${API_KUNJUNGAN}/between51and80`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setLaporan(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

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

    const filterDeal = async () => {
        if (deal === "") {
            Swal.fire({
                icon: "warning",
                title: "Pilih Deal!",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        setvalidasi(true);
    };

    useEffect(() => {
        if (laporans && laporans.length > 0) {
            initializeDataTable();
        }
    }, [laporans])

    useEffect(() => {
        getAllKunjungan();
    }, []);

    useEffect(() => {
        if (validasi || tglAkhir !== "" || tglAwal !== "") {
            getAllTanggal();
        }
        if (validasi || tglAkhir !== "" || tglAwal !== "" || salesmanId !== 0) {
            getAllTanggalSalesman();
        }
    }, [validasi, tglAkhir, tglAwal]);

    useEffect(() => {
        if (validasi && deal === "50") {
            getAllKurang50();
        }
        if (validasi && deal === "80") {
            getAllKurang80();
        }
        if (validasi && deal === "100") {
            getAllKurang100();
        }
    }, [validasi, deal]);



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
        setSalesmanId(event.target.value);
        setCurrentPage(1);
    };
    // END ALL ITC

    return (
        <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
            <SidebarAdmin />
            <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
                <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                    <Typography variant="lead" className="uppercase font-poppins">
                        Report
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
                                    onChange={(e) => setTglAwal(e.target.value)}
                                />
                            </div>
                            <div className="mt-8">
                                <Input
                                    variant="static"
                                    color="blue"
                                    type="date"
                                    label="Tanggal Akhir"
                                    required
                                    onChange={(e) => setTglAkhir(e.target.value)}
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
                            type="button" onClick={filterTangggal}
                        >
                            Cari
                        </Button>
                    </div> <br /> <br />
                    <div className="w-72 lg:w-[50%] flex gap-2">
                        <Select label="Filter Deal"
                            variant="static"
                            color="blue"
                            size="lg"
                            onChange={(selectedOption) => setDeal(selectedOption)}
                            required
                        >
                            <Option value="">Pilih</Option>
                            <Option value="50" className="flex gap-1"><ChevronLeftIcon className="w-4 h-4 text-black" /> 50</Option>
                            <Option value="80" className="flex gap-1"><ChevronLeftIcon className="w-4 h-4 text-black" /> 80</Option>
                            <Option value="100" className="flex gap-1"><ChevronLeftIcon className="w-4 h-4 text-black" /> 100</Option>
                        </Select>
                        <IconButton
                            color="blue"
                            size="lg"
                            type="button"
                            onClick={filterDeal}
                        ><MagnifyingGlassIcon className="w-5 h-5 text-white" /></IconButton>
                    </div> <br /> <br />
                    <div className="rounded mb-5 p-1 mt-12 overflow-x-auto">
                        <table
                            id="example_data"
                            ref={tableRef}
                            className="rounded-sm table-auto w-full overflow-x-auto"
                        >
                            <thead className="bg-blue-500 text-white w-full">
                                <tr>
                                    <th className="text-sm py-2 px-2.5">Tgl</th>
                                    <th className="text-sm py-2 px-2.5">Timestamp</th>
                                    <th className="text-sm py-2 px-2.5">Nama</th>
                                    <th className="text-sm py-2 px-2.5">Instansi</th>
                                    <th className="text-sm py-2 px-2.5">Daerah</th>
                                    <th className="text-sm py-2 px-2.5">Tujuan</th>
                                    <th className="text-sm py-2 px-2.5">Action</th>
                                    <th className="text-sm py-2 px-2.5">Info didapat</th>
                                    <th className="text-sm py-2 px-2.5">Peluang</th>
                                    <th className="text-sm py-2 px-2.5">Visit</th>
                                    <th className="text-sm py-2 px-2.5">Tipe</th>
                                    <th className="text-sm py-2 px-2.5">Deal</th>
                                    <th className="text-sm py-2 px-2.5">Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {laporans.length > 0 ? (
                                    laporans.map((row, idx) => (
                                        <tr key={idx}>
                                            <td>{row.tanggalDeal}</td>
                                            <td>{row.timestamp}</td>
                                            <td>{row.salesman.namaSalesman}</td>
                                            <td>{row.customer.nama_customer}</td>
                                            <td>{row.customer.kabKot.nama_kabkot} / {row.customer.kec.nama_kec}</td>
                                            <td>{row.tujuan}</td>
                                            <td>{row.action}</td>
                                            <td>{row.infoDpt}</td>
                                            <td>{row.peluang}</td>
                                            <td>{row.nVisit}</td>
                                            <td>{row.visit}</td>
                                            <td>{row.deal}</td>
                                            <td className="text-sm py-2 px-3 flex items-center justify-center">
                                                <div className="flex flex-col lg:flex-row gap-3">
                                                    <a href={"/edit_customer/" + row.idReport}>
                                                        <IconButton size="md" color="green">
                                                            <InformationCircleIcon className="w-6 h-6 white" />
                                                        </IconButton>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="13" className="text-center py-4 text-sm text-gray-600">
                                            Tidak ada data
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table> </div>
                </main>
            </div>
        </section>
    )
}

export default LapKunjungan;