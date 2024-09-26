import { Breadcrumbs, Button, Input, Typography } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import $ from "jquery";
import { API_IJIN, API_KUNJUNGAN, API_SALESMAN, API_SYNC_KUNJUNGAN } from "../../../utils/BaseUrl";
import axios from "axios";
import Swal from "sweetalert2";

function LapDisiplin() {
    const tableRef = useRef(null);
    const [laporans, setLaporan] = useState([]);
    const [jmlKunjungan, setJmlKunjungan] = useState(0);
    const [jmlNotNullFoto, setJmlNotNullFoto] = useState(0);
    const [jmlIjin, setJmlIjin] = useState(0);

    const [tglAwal, setTglAwal] = useState("");
    const [tglAkhir, setTglAkhir] = useState("");
    const [salesmanId2, setSalesmanId2] = useState(0);
    const [salesmanId, setSalesmanId] = useState(0);

    const initializeDataTable = () => {
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable().destroy();
        }

        $(tableRef.current).DataTable({});
    };

    const formatDate = (value) => {
        const date = new Date(value);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const formattedDate = `${year}/${month}/${day}`;

        return formattedDate;
    };

    useEffect(() => {
        if (laporans && laporans.length > 0) {
            initializeDataTable();
        }
    }, [laporans]);


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
        setSalesmanId2(event.target.value);
        setCurrentPage(1);
    };
    // END ALL ITC

    // GET 
    const getAll = async () => {
        try {
            const response = await axios.get(`${API_SYNC_KUNJUNGAN}/tanggal_beetwen/salesman?id_salesman=${salesmanId}&tgl_akhir=${formatDate(tglAkhir)}&tgl_awal=${formatDate(tglAwal)}`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setLaporan(response.data.data || []);
            try {
                const res = await axios.get(`${API_KUNJUNGAN}/date/between/salesman?id_salesman=${salesmanId}&tgl_akhir=${tglAkhir}&tgl_awal=${tglAwal}`, {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                });
                setJmlKunjungan(res.data.data.length);

                const resNotNullFoto = await axios.get(`${API_KUNJUNGAN}/foto/not_null?id_salesman=${salesmanId}&tgl_akhir=${formatDate(tglAkhir)}&tgl_awal=${formatDate(tglAwal)}`, {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                });
                setJmlNotNullFoto(res.data.data.length);

                const resIjin = await axios.get(`${API_IJIN}/tanggal_beetwen/salesman?id_salesman=${salesmanId}&tgl_akhir=${formatDate(tglAkhir)}&tgl_awal=${formatDate(tglAwal)}`, {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                });
                setJmlIjin(res.data.data.length);
            } catch (err) {
                console.log('error jumlah kunjungan : ', err);
            }
        } catch (error) {
            setLaporan([]);
            console.error("Error fetching data:", error);
        }
    };

    const filterTangggal = async () => {
        if (tglAwal === "" || tglAkhir === "" || tglAwal === tglAkhir || salesmanId2 === 0) {
            Swal.fire({
                icon: "warning",
                title: "Isi Form Terlebih Dahulu!",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
        setSalesmanId(salesmanId2)
    };

    useEffect(() => {
        if (tglAkhir !== "" && tglAwal !== "" && salesmanId !== 0) {
            getAll()
        }
    }, [tglAkhir, tglAwal, salesmanId])

    const formattedNumber = (number) => {
        return number.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    };
    
    var total;
    const sel = laporans.length - total;
    const persen = (sel / laporans.length) * 100;
    const persenFoto = (jmlNotNullFoto / jmlKunjungan) * 100;
    const telat = laporans.length - sel
    return (
        <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
            <SidebarAdmin />
            <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
                <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                    <Typography variant="lead" className="uppercase font-poppins">
                        Disiplin
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
                    </div> <br />
                    {tglAkhir !== "" && tglAwal !== "" && salesmanId !== 0 ?
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="rounded p-1 overflow-x-auto">
                                <table
                                    id="example_data"
                                    ref={tableRef}
                                    className="rounded-sm table-auto w-full overflow-x-auto"
                                >
                                    <thead className="bg-blue-500 text-white w-full">
                                        <tr>
                                            <th className="text-sm py-2 px-2.5 font-semibold w-[4%]">No</th>
                                            <th className="text-sm py-2 px-2.5 font-semibold">Nama</th>
                                            <th className="text-sm py-2 px-2.5 font-semibold">Tanggal Report</th>
                                            <th className="text-sm py-2 px-2.5 font-semibold">Tanggal Input</th>
                                            <th className="text-sm py-2 px-2.5 font-semibold">Result</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {laporans.length > 0 ? (
                                            laporans.map((row, idx) => {
                                                const x = row.tanggalKunjungan;
                                                const y = row.timestamp;
                                                var r;
                                                x === y ? r = 0 : r = 1;
                                                total = total + r;
                                                return (
                                                    <tr key={idx}>
                                                        <td className="text-sm w-[4%]">{idx + 1}</td>
                                                        <td className="text-sm py-2 px-3">{row.salesman.namaSalesman}</td>
                                                        <td className="text-sm py-2 px-3">{row.tanggalKunjungan}</td>
                                                        <td className="text-sm py-2 px-3">{row.timestamp}</td>
                                                        <td className="text-sm py-2 px-3">{r}</td>
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
                            <div>
                                <div className="bg-blue-500 p-2">
                                    <Typography variant="lead" className="uppercase font-poppins text-white">Presentase</Typography>
                                </div>
                                <div className="border border-gray-500 text-center py-4">
                                    <p>Dari Tanggal {tglAwal} s/d {tglAkhir}</p> <br />
                                    <p>Tingkat Kedisiplinan</p>
                                    <Typography variant="h4" className="uppercase font-poppins">{formattedNumber(persen)}%</Typography> <br />
                                    <p>Foto Evident</p>
                                    <Typography variant="h4" className="uppercase font-poppins">{formattedNumber(persenFoto)}%</Typography>
                                    <p>{jmlNotNullFoto} dari {jmlKunjungan} Report terdapat foto evident</p> <br />
                                    <p>Jumlah Keterlambatan</p>
                                    <Typography variant="h4" className="uppercase font-poppins">{telat}</Typography> <br />
                                    <p>Jumlah Izin</p>
                                    <Typography variant="h4" className="uppercase font-poppins">{jmlIjin}</Typography> <br />
                                </div>
                            </div>
                        </div> : <></>
                    }
                </main>
            </div>
        </section>
    )
}

export default LapDisiplin;