import { Breadcrumbs, Button, IconButton, Input, Option, Select, Typography } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { API_KUNJUNGAN, API_SALESMAN } from "../../../utils/BaseUrl";
import { InformationCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import $ from "jquery";
import axios from "axios";
import Swal from "sweetalert2";
import formatDate from "../../../component/FormatDate";

function AllBetweenDate({ tglAwal, tglAkhir }) {
    const tableRef2 = useRef(null);
    const initializeDataTable2 = () => {
        if (tableRef2.current && !$.fn.DataTable.isDataTable(tableRef2.current)) {
            $(tableRef2.current).DataTable({
                responsive: true
            });
        }
    }

    const [kunjunganDate, setKunjunganDate] = useState([]);

    // BETWEEN TGL
    const getBetweenTanggal = async () => {
        try {
            const response = await axios.get(`${API_KUNJUNGAN}/date/between?tanggal_akhir=${tglAkhir}&tanggal_awal=${tglAwal}`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            const res = response.data.data;
            setKunjunganDate(res);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getBetweenTanggal();
    }, [tglAkhir, tglAwal]);

    useEffect(() => {
        if (kunjunganDate && kunjunganDate.length > 0) {
            initializeDataTable2();
        }
    }, [kunjunganDate])

    return (<>
        <div className="overflow-x-auto mt-6">
            <table id="example_data2"
                ref={tableRef2} className="w-full table-auto border-collapse  overflow-x-auto">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="py-2 px-2.5 text-xs">Tgl</th>
                        <th className="py-2 px-2.5 text-xs">Timestamp</th>
                        <th className="py-2 px-2.5 text-xs">Nama</th>
                        <th className="py-2 px-2.5 text-xs">Instansi</th>
                        <th className="py-2 px-2.5 text-xs">Daerah</th>
                        <th className="py-2 px-2.5 text-xs">Tujuan</th>
                        <th className="py-2 px-2.5 text-xs">Action</th>
                        <th className="py-2 px-2.5 text-xs">Info didapat</th>
                        <th className="py-2 px-2.5 text-xs">Peluang</th>
                        <th className="py-2 px-2.5 text-xs">Visit</th>
                        <th className="py-2 px-2.5 text-xs">Tipe</th>
                        <th className="py-2 px-2.5 text-xs">Deal</th>
                        <th className="py-2 px-2.5 text-xs">Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {kunjunganDate.length > 0 ? (
                        kunjunganDate.map((row, idx) => (
                            <tr key={idx}>
                                <td>{formatDate(row.tanggalDeal)}</td>
                                <td>{formatDate(row.timestamp)}</td>
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
                                <td className="py-2 px-3 flex items-center justify-center">
                                    <div className="flex flex-col lg:flex-row gap-3">
                                        <a href={"/detail_kunjungan/" + row.idReport}>
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
                            <td colSpan="13" className="text-xs text-center py-4 text-gray-600 bg-[#f9f9f9]">
                                Tidak ada data
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </>)

}

function AllBetweenDateSalesman({ tglAwal, tglAkhir, id }) {
    const tableRef3 = useRef(null);
    const initializeDataTable3 = () => {
        if (tableRef3.current && !$.fn.DataTable.isDataTable(tableRef3.current)) {
            $(tableRef3.current).DataTable({
                responsive: true
            });
        }
    }

    const [kunjunganDateSalesman, setKunjunganDateSalesman] = useState([]);

    // BETWEEN TGL SALESMAN
    const getBetweenTanggalSalesman = async () => {
        try {
            const response = await axios.get(`${API_KUNJUNGAN}/date/between/salesman?id_salesman=${id}&tanggal_akhir=${tglAkhir}&tanggal_awal=${tglAwal}`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            const res = response.data.data;
            setKunjunganDateSalesman(res);
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        getBetweenTanggalSalesman();
    }, [tglAkhir, tglAwal]);

    useEffect(() => {
        if (kunjunganDateSalesman && kunjunganDateSalesman.length > 0) {
            initializeDataTable3();
        }
    }, [kunjunganDateSalesman])

    return (<>
        <div className="overflow-x-auto mt-6">
            <table id="example_data3"
                ref={tableRef3} className="w-full table-auto border-collapse  overflow-x-auto">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="py-2 px-2.5 text-xs">Tgl</th>
                        <th className="py-2 px-2.5 text-xs">Timestamp</th>
                        <th className="py-2 px-2.5 text-xs">Nama</th>
                        <th className="py-2 px-2.5 text-xs">Instansi</th>
                        <th className="py-2 px-2.5 text-xs">Daerah</th>
                        <th className="py-2 px-2.5 text-xs">Tujuan</th>
                        <th className="py-2 px-2.5 text-xs">Action</th>
                        <th className="py-2 px-2.5 text-xs">Info didapat</th>
                        <th className="py-2 px-2.5 text-xs">Peluang</th>
                        <th className="py-2 px-2.5 text-xs">Visit</th>
                        <th className="py-2 px-2.5 text-xs">Tipe</th>
                        <th className="py-2 px-2.5 text-xs">Deal</th>
                        <th className="py-2 px-2.5 text-xs">Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {kunjunganDateSalesman.length > 0 ? (
                        kunjunganDateSalesman.map((row, idx) => (
                            <tr key={idx}>
                                <td>{formatDate(row.tanggalDeal)}</td>
                                <td>{formatDate(row.timestamp)}</td>
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
                                <td className="py-2 px-3 flex items-center justify-center">
                                    <div className="flex flex-col lg:flex-row gap-3">
                                        <a href={"/detail_kunjungan/" + row.idReport}>
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
                            <td colSpan="13" className="text-xs text-center py-4 text-gray-600 bg-[#f9f9f9]">
                                Tidak ada data
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </>)
}

function AllDeal50({ deal }) {
    const tableRef4 = useRef(null);
    const initializeDataTable4 = () => {
        if (tableRef4.current && !$.fn.DataTable.isDataTable(tableRef4.current)) {
            $(tableRef4.current).DataTable({
                responsive: true
            });
        }
    }

    const [deals50, setDeals50] = useState([]);

    // BETWEEN TGL SALESMAN
    const getAll = async () => {
        try {
            const response = await axios.get(`${API_KUNJUNGAN}/between0and50`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            const res = response.data;
            setDeals50(res);
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        getAll();
    }, [deal]);

    useEffect(() => {
        if (deals50 && deals50.length > 0) {
            initializeDataTable4();
        }
    }, [deals50])

    return (<>
        <div className="overflow-x-auto mt-6">
            <table id="example_data4"
                ref={tableRef4} className="w-full table-auto border-collapse  overflow-x-auto">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="py-2 px-2.5 text-xs">Tgl</th>
                        <th className="py-2 px-2.5 text-xs">Timestamp</th>
                        <th className="py-2 px-2.5 text-xs">Nama</th>
                        <th className="py-2 px-2.5 text-xs">Instansi</th>
                        <th className="py-2 px-2.5 text-xs">Daerah</th>
                        <th className="py-2 px-2.5 text-xs">Tujuan</th>
                        <th className="py-2 px-2.5 text-xs">Action</th>
                        <th className="py-2 px-2.5 text-xs">Info didapat</th>
                        <th className="py-2 px-2.5 text-xs">Peluang</th>
                        <th className="py-2 px-2.5 text-xs">Visit</th>
                        <th className="py-2 px-2.5 text-xs">Tipe</th>
                        <th className="py-2 px-2.5 text-xs">Deal</th>
                        <th className="py-2 px-2.5 text-xs">Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {deals50.length > 0 ? (
                        deals50.map((row, idx) => (
                            <tr key={idx}>
                                <td>{formatDate(row.tanggalDeal)}</td>
                                <td>{formatDate(row.timestamp)}</td>
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
                                <td className="py-2 px-3 flex items-center justify-center">
                                    <div className="flex flex-col lg:flex-row gap-3">
                                        <a href={"/detail_kunjungan/" + row.idReport}>
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
                            <td colSpan="13" className="text-xs text-center py-4 text-gray-600 bg-[#f9f9f9]">
                                Tidak ada data
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </>)
}

function AllDeal80({ deal }) {
    const tableRef5 = useRef(null);
    const initializeDataTable5 = () => {
        if (tableRef5.current && !$.fn.DataTable.isDataTable(tableRef5.current)) {
            $(tableRef5.current).DataTable({
                responsive: true
            });
        }
    }

    const [deals80, setDeals80] = useState([]);

    // BETWEEN TGL SALESMAN
    const getAll = async () => {
        try {
            const response = await axios.get(`${API_KUNJUNGAN}/between51and80`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            const res = response.data;
            setDeals80(res);
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        getAll();
    }, [deal]);

    useEffect(() => {
        if (deals80 && deals80.length > 0) {
            initializeDataTable5();
        }
    }, [deals80])

    return (<>
        <div className="overflow-x-auto mt-6">
            <table id="example_data5"
                ref={tableRef5} className="w-full table-auto border-collapse  overflow-x-auto">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="py-2 px-2.5 text-xs">Tgl</th>
                        <th className="py-2 px-2.5 text-xs">Timestamp</th>
                        <th className="py-2 px-2.5 text-xs">Nama</th>
                        <th className="py-2 px-2.5 text-xs">Instansi</th>
                        <th className="py-2 px-2.5 text-xs">Daerah</th>
                        <th className="py-2 px-2.5 text-xs">Tujuan</th>
                        <th className="py-2 px-2.5 text-xs">Action</th>
                        <th className="py-2 px-2.5 text-xs">Info didapat</th>
                        <th className="py-2 px-2.5 text-xs">Peluang</th>
                        <th className="py-2 px-2.5 text-xs">Visit</th>
                        <th className="py-2 px-2.5 text-xs">Tipe</th>
                        <th className="py-2 px-2.5 text-xs">Deal</th>
                        <th className="py-2 px-2.5 text-xs">Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {deals80.length > 0 ? (
                        deals80.map((row, idx) => (
                            <tr key={idx}>
                                <td>{formatDate(row.tanggalDeal)}</td>
                                <td>{formatDate(row.timestamp)}</td>
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
                                <td className="py-2 px-3 flex items-center justify-center">
                                    <div className="flex flex-col lg:flex-row gap-3">
                                        <a href={"/detail_kunjungan/" + row.idReport}>
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
                            <td colSpan="13" className="text-xs text-center py-4 text-gray-600 bg-[#f9f9f9]">
                                Tidak ada data
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </>)
}

function AllDeal100({ deal }) {
    const tableRef6 = useRef(null);
    const initializeDataTable6 = () => {
        if (tableRef6.current && !$.fn.DataTable.isDataTable(tableRef6.current)) {
            $(tableRef6.current).DataTable({
                responsive: true
            });
        }
    }

    const [deals100, setDeals100] = useState([]);

    // BETWEEN TGL SALESMAN
    const getAll = async () => {
        try {
            const response = await axios.get(`${API_KUNJUNGAN}/deal_po`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            const res = response.data.data;
            setDeals100(res);
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        getAll();
    }, [deal]);

    useEffect(() => {
        if (deals100 && deals100.length > 0) {
            initializeDataTable6();
        }
    }, [deals100])

    return (<>
        <div className="overflow-x-auto mt-6">
            <table id="example_data6"
                ref={tableRef6} className="w-full table-auto border-collapse  overflow-x-auto">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="py-2 px-2.5 text-xs">Tgl</th>
                        <th className="py-2 px-2.5 text-xs">Timestamp</th>
                        <th className="py-2 px-2.5 text-xs">Nama</th>
                        <th className="py-2 px-2.5 text-xs">Instansi</th>
                        <th className="py-2 px-2.5 text-xs">Daerah</th>
                        <th className="py-2 px-2.5 text-xs">Tujuan</th>
                        <th className="py-2 px-2.5 text-xs">Action</th>
                        <th className="py-2 px-2.5 text-xs">Info didapat</th>
                        <th className="py-2 px-2.5 text-xs">Peluang</th>
                        <th className="py-2 px-2.5 text-xs">Visit</th>
                        <th className="py-2 px-2.5 text-xs">Tipe</th>
                        <th className="py-2 px-2.5 text-xs">Deal</th>
                        <th className="py-2 px-2.5 text-xs">Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {deals100.length > 0 ? (
                        deals100.map((row, idx) => (
                            <tr key={idx}>
                                <td>{formatDate(row.tanggalDeal)}</td>
                                <td>{formatDate(row.timestamp)}</td>
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
                                <td className="py-2 px-3 flex items-center justify-center">
                                    <div className="flex flex-col lg:flex-row gap-3">
                                        <a href={"/detail_kunjungan/" + row.idReport}>
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
                            <td colSpan="13" className="text-xs text-center py-4 text-gray-600 bg-[#f9f9f9]">
                                Tidak ada data
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </>)
}

function AllByDeal({ deal }) {
    return (
        <>
            {deal === "50" ? <AllDeal50 deal={deal} /> : deal === "80" ? <AllDeal80 deal={deal} /> : <AllDeal100 deal={deal} />}
        </>
    )
}

function LapKunjungan() {
    const [tglAwal, setTglAwal] = useState("");
    const [tglAkhir, setTglAkhir] = useState("");
    const [deal, setDeal] = useState("");
    const [salesmanId, setSalesmanId] = useState(0);

    const [tglAwalInput, settglAwalInput] = useState("");
    const [tglAkhirInput, settglAkhirInput] = useState("");
    const [idItcInput, setIdItcInput] = useState(0);
    const [dealInput, setDealInput] = useState("");

    const [validasi, setvalidasi] = useState(false);
    const [validasiIdItc, setvalidasiIdItc] = useState(false);
    const [validasiDeal, setvalidasiDeal] = useState(false);

    const tableRef = useRef(null);
    const [laporans, setLaporan] = useState([]);
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

        settglAwalInput(tglAwal);
        settglAkhirInput(tglAkhir);
        setIdItcInput(salesmanId);

        if (salesmanId !== 0 && salesmanId !== "") {
            if (validasi) { setvalidasi(false) }
            if (validasiDeal) { setvalidasiDeal(false) }
            setvalidasiIdItc(true);
        } else {
            if (validasiIdItc) { setvalidasiIdItc(false) }
            if (validasiDeal) { setvalidasiDeal(false) }
            setvalidasi(true);
        }
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
        setDealInput(deal)
        if (validasiIdItc) { setvalidasiIdItc(false) }
        if (validasi) { setvalidasi(false) }
        setvalidasiDeal(true);
    };

    console.log(`validasi ${validasi} --- validasi itc ${validasiIdItc} --- validasi deal ${validasiDeal}`);

    useEffect(() => {
        if (laporans && laporans.length > 0) {
            initializeDataTable();
        }
    }, [laporans])

    useEffect(() => {
        getAllKunjungan();
    }, []);

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
                                        className="bg-gray-400 px-1"
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        Prev
                                    </button>
                                    <button
                                        className="bg-gray-400 px-1"
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        disabled={!options.length}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div> <br />
                        <Typography className="font-poppins font-normal text-gray-800" variant="small"><span className="font-medium">Cari Semua ITC:</span> Masukkan tanggal awal dan akhir saja.</Typography>
                        <Typography className="font-poppins font-normal text-gray-800" variant="small"><span className="font-medium">Cari Per ITC:</span> Masukkan tanggal awal, akhir, dan ITC yang dipilih.</Typography>
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
                            <Option value="50" className="flex gap-1"> 50 ></Option>
                            <Option value="80" className="flex gap-1">80 ></Option>
                            <Option value="100" className="flex gap-1">100 ></Option>
                        </Select>
                        <IconButton
                            color="blue"
                            size="lg"
                            type="button"
                            onClick={filterDeal}
                        ><MagnifyingGlassIcon className="w-5 h-5 text-white" /></IconButton>
                    </div> <br /> <br />

                    {/* TABEL */}

                    {validasi ? <AllBetweenDate tglAkhir={tglAkhirInput} tglAwal={tglAwalInput} /> :
                        validasiIdItc ? <AllBetweenDateSalesman tglAkhir={tglAkhirInput} tglAwal={tglAwalInput} id={idItcInput} /> :
                            validasiDeal ? <AllByDeal deal={dealInput} /> :
                                <div className="mt-6 overflow-x-auto">
                                    <table
                                        id="example_data"
                                        ref={tableRef}
                                        className="rounded-sm table-auto w-full overflow-x-auto"
                                    >
                                        <thead className="bg-blue-500 text-white w-full">
                                            <tr>
                                                <th className="py-2 px-2.5 text-xs">Tgl</th>
                                                <th className="py-2 px-2.5 text-xs">Timestamp</th>
                                                <th className="py-2 px-2.5 text-xs">Nama</th>
                                                <th className="py-2 px-2.5 text-xs">Instansi</th>
                                                <th className="py-2 px-2.5 text-xs">Daerah</th>
                                                <th className="py-2 px-2.5 text-xs">Tujuan</th>
                                                <th className="py-2 px-2.5 text-xs">Action</th>
                                                <th className="py-2 px-2.5 text-xs">Info didapat</th>
                                                <th className="py-2 px-2.5 text-xs">Peluang</th>
                                                <th className="py-2 px-2.5 text-xs">Visit</th>
                                                <th className="py-2 px-2.5 text-xs">Tipe</th>
                                                <th className="py-2 px-2.5 text-xs">Deal</th>
                                                <th className="py-2 px-2.5 text-xs">Detail</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {laporans.length > 0 ? (
                                                laporans.map((row, idx) => (
                                                    <tr key={idx}>
                                                        <td>{formatDate(row.tanggalDeal)}</td>
                                                        <td>{formatDate(row.timestamp)}</td>
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
                                                        <td className="py-2 px-3 flex items-center justify-center">
                                                            <div className="flex flex-col lg:flex-row gap-3">
                                                                <a href={"/detail_kunjungan/" + row.idReport}>
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
                                                    <td colSpan="13" className="text-xs text-center py-4 text-gray-600 bg-[#f9f9f9]">
                                                        Tidak ada data
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                    }
                </main>
            </div>
        </section>
    )
}

export default LapKunjungan;