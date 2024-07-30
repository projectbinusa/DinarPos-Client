import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../component/SidebarAdmin";
import { Breadcrumbs, Button, Card, CardBody, CardFooter, IconButton, Input, Typography } from "@material-tailwind/react";
import { ArrowPathIcon, ArrowsRightLeftIcon, CheckIcon, CheckCircleIcon, ChevronRightIcon, ClockIcon, Cog6ToothIcon, MagnifyingGlassIcon, XMarkIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import $ from "jquery";
import { API_SERVICE, API_SERVICE_RETUR } from "../../utils/BaseUrl";
import axios from "axios";
import Swal from "sweetalert2";

function DashboardAdminService() {
    const [visibleElement, setVisibleElement] = useState(null);

    const toggleElement = (elementId) => {
        if (visibleElement === elementId) {
            $("#" + elementId).hide();
            setVisibleElement(null);
        } else {
            if (visibleElement !== null) {
                $("#" + visibleElement).hide();
            }
            $("#" + elementId).show();
            setVisibleElement(elementId);
        }
    };

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [validasi, setValidasi] = useState(false);

    // SERVICE NA
    const [naAll, setNAAll] = useState([])
    const [naTglKonf, setNATglKonf] = useState([])
    const tableRef = useRef(null);
    const initializeDataTable = () => {
        if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable();
        }
    };

    const getAllNA = async () => {
        try {
            const response = await axios.get(`${API_SERVICE}/dashboard/teknisi/filter/status?status=N_A`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setNAAll(response.data.data);
        } catch (error) {
            console.log("get all", error);
        }
    };

    const getAllNATgl = async () => {
        try {
            const response = await axios.get(`${API_SERVICE}/dashboard/teknisi/filter?akhir=${endDate}&awal=${startDate}&status=N_A`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setNAAll(response.data.data);
        } catch (error) {
            console.log("get all", error);
        }
    };

    const tglKonfirmasiNA = async (transactionId) => {
        try {
            const response = await axios.get(
                `${API_SERVICE}/tgl_konfirm?id=${transactionId}`,
                {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                }
            );
            return response.data.data;
        } catch (error) {
            console.log("tglKonfirmasi", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchTglKonfirm = async () => {
            const tglList = await Promise.all(
                naAll.map(async (service) => {
                    const tglData = await tglKonfirmasiNA(service.idTT);
                    return tglData;
                })
            );
            setNATglKonf(tglList);
        };

        fetchTglKonfirm();
    }, [naAll]);

    useEffect(() => {
        if (naAll.length > 0) {
            initializeDataTable();
        }
    }, [naAll]);
    // END SERVICE NA

    // SERVICE READY
    const [readyAll, setReadyAll] = useState([])
    const [readyTglKonf, setReadyTglKonf] = useState([])
    const tableRef2 = useRef(null);
    const initializeDataTable2 = () => {
        if (tableRef2.current && !$.fn.DataTable.isDataTable(tableRef2.current)) {
            $(tableRef2.current).DataTable();
        }
    };

    const getAllReady = async () => {
        try {
            const response = await axios.get(`${API_SERVICE}/dashboard/teknisi/filter/status?status=READY`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setReadyAll(response.data.data);
        } catch (error) {
            console.log("get all", error);
        }
    };

    const getAllReadyTgl = async () => {
        try {
            const response = await axios.get(`${API_SERVICE}/dashboard/teknisi/filter?akhir=${endDate}&awal=${startDate}&status=READY`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setReadyAll(response.data.data);
        } catch (error) {
            console.log("get all", error);
        }
    };

    const tglKonfirmasiReady = async (transactionId) => {
        try {
            const response = await axios.get(
                `${API_SERVICE}/tgl_konfirm?id=${transactionId}`,
                {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                }
            );
            return response.data.data;
        } catch (error) {
            console.log("tglKonfirmasi", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchTglKonfirm = async () => {
            const tglList = await Promise.all(
                readyAll.map(async (service) => {
                    const tglData = await tglKonfirmasiReady(service.idTT);
                    return tglData;
                })
            );
            setNATglKonf(tglList);
        };

        fetchTglKonfirm();
    }, [readyAll]);

    useEffect(() => {
        if (readyAll.length > 0) {
            initializeDataTable2();
        }
    }, [readyAll]);
    // END SERVICE READY

    // SERVICE PROSES
    const [prosesAll, setProsesAll] = useState([]);
    const [prosesTglKonf, setProsesTglKonf] = useState([])
    const tableRef3 = useRef(null);
    const initializeDataTable3 = () => {
        if (tableRef3.current && !$.fn.DataTable.isDataTable(tableRef3.current)) {
            $(tableRef3.current).DataTable();
        }
    };

    const getAllProses = async () => {
        try {
            const response = await axios.get(`${API_SERVICE}/dashboard/teknisi/filter/status?status=PROSES`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setProsesAll(response.data.data);
        } catch (error) {
            console.log("get all", error);
        }
    };

    const getAllProsesTgl = async () => {
        try {
            const response = await axios.get(`${API_SERVICE}/dashboard/teknisi/filter?akhir=${endDate}&awal=${startDate}&status=PROSES`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setProsesAll(response.data.data);
        } catch (error) {
            console.log("get all", error);
        }
    };

    const tglKonfirmasiProses = async (transactionId) => {
        try {
            const response = await axios.get(
                `${API_SERVICE}/tgl_konfirm?id=${transactionId}`,
                {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                }
            );
            return response.data.data;
        } catch (error) {
            console.log("tglKonfirmasi", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchTglKonfirm = async () => {
            const tglList = await Promise.all(
                prosesAll.map(async (service) => {
                    const tglData = await tglKonfirmasiProses(service.idTT);
                    return tglData;
                })
            );
            setProsesTglKonf(tglList);
        };

        fetchTglKonfirm();
    }, [prosesAll]);

    useEffect(() => {
        if (prosesAll.length > 0) {
            initializeDataTable3();
        }
    }, [prosesAll]);
    // END SERVICE PROSES

    // SERVICE RETUR
    const [returAll, setReturAll] = useState([]);
    const [returTglKonf, setReturTglKonf] = useState([])
    const tableRef4 = useRef(null);
    const initializeDataTable4 = () => {
        if (tableRef4.current && !$.fn.DataTable.isDataTable(tableRef4.current)) {
            $(tableRef4.current).DataTable();
        }
    };

    const getAllRetur = async () => {
        try {
            const response = await axios.get(`${API_SERVICE_RETUR}`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setReturAll(response.data.data);
        } catch (error) {
            console.log("get all", error);
        }
    };

    const getAllReturTgl = async () => {
        try {
            const response = await axios.get(`${API_SERVICE_RETUR}/retur?tglakhir=${endDate}&tglawal=${startDate}`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setReturAll(response.data);
        } catch (error) {
            console.log("get all", error);
        }
    };

    const tglKonfirmasiRetur = async (transactionId) => {
        try {
            const response = await axios.get(
                `${API_SERVICE}/tgl_konfirm?id=${transactionId}`,
                {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                }
            );
            return response.data.data;
        } catch (error) {
            console.log("tglKonfirmasi", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchTglKonfirm = async () => {
            const tglList = await Promise.all(
                returAll.map(async (service) => {
                    const tglData = await tglKonfirmasiRetur(service.idTT);
                    return tglData;
                })
            );
            setReturTglKonf(tglList);
        };

        fetchTglKonfirm();
    }, [returAll]);

    useEffect(() => {
        if (returAll.length > 0) {
            initializeDataTable4();
        }
    }, [returAll]);
    // END SERVICE RETUR

    // SERVICE CANCEL
    const [cancelAll, setCancelAll] = useState([]);
    const [cancelTglKonf, setCancelTglKonf] = useState([])
    const tableRef5 = useRef(null);
    const initializeDataTable5 = () => {
        if (tableRef5.current && !$.fn.DataTable.isDataTable(tableRef5.current)) {
            $(tableRef5.current).DataTable();
        }
    };

    const getAllCancel = async () => {
        try {
            const response = await axios.get(`${API_SERVICE}/cancel`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setCancelAll(response.data.data);
        } catch (error) {
            console.log("get all", error);
        }
    };

    const getAllCancelTgl = async () => {
        try {
            const response = await axios.get(`${API_SERVICE}/cancel/filter?akhir=${endDate}&awal=${startDate}`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setCancelAll(response.data.data);
        } catch (error) {
            console.log("get all", error);
        }
    };

    const tglKonfirmasiCancel = async (transactionId) => {
        try {
            const response = await axios.get(
                `${API_SERVICE}/tgl_konfirm?id=${transactionId}`,
                {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                }
            );
            return response.data.data;
        } catch (error) {
            console.log("tglKonfirmasi", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchTglKonfirm = async () => {
            const tglList = await Promise.all(
                cancelAll.map(async (service) => {
                    const tglData = await tglKonfirmasiCancel(service.idTT);
                    return tglData;
                })
            );
            setCancelTglKonf(tglList);
        };

        fetchTglKonfirm();
    }, [cancelAll]);

    useEffect(() => {
        if (cancelAll.length > 0) {
            initializeDataTable5();
        }
    }, [cancelAll]);
    // END SERVICE CANCEL

    // SERVICE LEBIH DARI SEMINGGU
    const [semingguAll, setSemingguAll] = useState([])
    const [semingguTglKonf, setSemingguTglKonf] = useState([])
    const tableRef6 = useRef(null);
    const initializeDataTable6 = () => {
        if (tableRef6.current && !$.fn.DataTable.isDataTable(tableRef6.current)) {
            $(tableRef6.current).DataTable();
        }
    };

    const getAllSeminggu = async () => {
        try {
            const response = await axios.get(`${API_SERVICE}/lebih-dari-seminggu`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setSemingguAll(response.data.data);
        } catch (error) {
            console.log("get all", error);
        }
    };

    const tglKonfirmasiSeminggu = async (transactionId) => {
        try {
            const response = await axios.get(
                `${API_SERVICE}/tgl_konfirm?id=${transactionId}`,
                {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                }
            );
            return response.data.data;
        } catch (error) {
            console.log("tglKonfirmasi", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchTglKonfirm = async () => {
            const tglList = await Promise.all(
                semingguAll.map(async (service) => {
                    const tglData = await tglKonfirmasiSeminggu(service.idTT);
                    return tglData;
                })
            );
            setSemingguTglKonf(tglList);
        };

        fetchTglKonfirm();
    }, [semingguAll]);

    useEffect(() => {
        if (semingguAll.length > 0) {
            initializeDataTable6();
        }
    }, [semingguAll]);

    // END SERVICE LEBIH DARI SEMINGGU

    // SERVICE TAKEN
    const [takenAll, setTakenAll] = useState([])
    const [takenTglKonf, setTakenTglKonf] = useState([])
    const tableRef7 = useRef(null);
    const initializeDataTable7 = () => {
        if (tableRef7.current && !$.fn.DataTable.isDataTable(tableRef7.current)) {
            $(tableRef7.current).DataTable();
        }
    };

    const getAllTaken = async () => {
        try {
            const response = await axios.get(`${API_SERVICE}/service-taken`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setTakenAll(response.data.data);
        } catch (error) {
            console.log("get all", error);
        }
    };

    const getAllTakenTgl = async () => {
        try {
            const response = await axios.get(`${API_SERVICE}/service-taken-by-date?akhir=${endDate}&awal=${startDate}`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setTakenAll(response.data);
        } catch (error) {
            console.log("get all", error);
        }
    };

    const tglKonfirmasiTaken = async (transactionId) => {
        try {
            const response = await axios.get(
                `${API_SERVICE}/tgl_konfirm?id=${transactionId}`,
                {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                }
            );
            return response.data.data;
        } catch (error) {
            console.log("tglKonfirmasi", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchTglKonfirm = async () => {
            const tglList = await Promise.all(
                takenAll.map(async (service) => {
                    const tglData = await tglKonfirmasiTaken(service.idTT);
                    return tglData;
                })
            );
            setTakenTglKonf(tglList);
        };

        fetchTglKonfirm();
    }, [takenAll]);

    useEffect(() => {
        if (takenAll.length > 0) {
            initializeDataTable7();
        }
    }, [takenAll]);
    // END SERVICE TAKEN

    useEffect(() => {
        if (validasi || endDate !== "" || startDate !== "") {
            setValidasi(false);
            getAllNATgl();
            getAllReadyTgl();
            getAllProsesTgl();
            getAllCancelTgl();
            getAllTakenTgl();
            getAllReturTgl();
            getAllSeminggu()
        } else {
            getAllNA();
            getAllReady();
            getAllProses();
            getAllCancel();
            getAllTaken();
            getAllRetur();
            getAllSeminggu()
        }
    }, [validasi]);

    const filterTangggal = () => {
        if (startDate === "" || endDate === "" || startDate === endDate) {
            Swal.fire({
                icon: "warning",
                title: "Isi Form Terlebih Dahulu!",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        setValidasi(true);
    };

    const formatDate = (value) => {
        const date = new Date(value);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
    };

    return (
        <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
            <SidebarAdmin />
            <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
                <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                    <Typography variant="lead" className="uppercase">
                        Dashboard                </Typography>
                    <Breadcrumbs className="bg-transparent">
                        <a href="/dashboard_service" className="opacity-60">
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
                <br />
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-end mb-6 lg:justify-between">
                    <div className="w-full">
                        <Input variant="outlined" label="Tanggal Awal" color="blue" type="date" onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="w-full">
                        <Input variant="outlined" label="Tanggal Akhir" color="blue" type="date" onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    <div className="w-full lg:w-auto flex justify-start items-center">
                        <Button
                            variant="gradient"
                            color="blue"
                            onClick={filterTangggal}
                            size="md"
                        >
                            <MagnifyingGlassIcon className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
                <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
                    <Card className="p-0">
                        <CardBody className="bg-blue-100 flex justify-between items-center rounded-t">
                            <Cog6ToothIcon className="h-12 w-12 text-blue-900" />
                            <div>
                                <Typography variant="h3" className="text-blue-900 text-right">
                                    {naAll.length}
                                </Typography>
                                <Typography variant="paragraph" className="text-blue-900">Service Terbaru
                                </Typography>
                            </div>
                        </CardBody>
                        <CardFooter className="py-3 px-6">
                            <button onClick={() => toggleElement("na")} >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <Typography variant="paragraph" color="blue-gray">Lihat Detail</Typography>
                                    </div>
                                    <div>
                                        <ChevronRightIcon className="h-5 w-6" color="blue-gray" />
                                    </div>
                                </div>
                            </button>
                        </CardFooter>
                    </Card>
                    <Card className="p-0">
                        <CardBody className="bg-green-100 flex justify-between items-center rounded-t">
                            <CheckIcon className="h-12 w-12 text-green-900" />
                            <div>
                                <Typography variant="h3" className="text-green-900 text-right">
                                    {readyAll.length}
                                </Typography>
                                <Typography variant="paragraph" className="text-green-900">Service Ready
                                </Typography>
                            </div>
                        </CardBody>
                        <CardFooter className="py-3 px-6">
                            <button onClick={() => toggleElement("ready")} >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <Typography variant="paragraph" color="blue-gray">Lihat Detail</Typography>
                                    </div>
                                    <div>
                                        <ChevronRightIcon className="h-5 w-6" color="blue-gray" />
                                    </div>
                                </div>
                            </button>
                        </CardFooter>
                    </Card>
                    <Card className="p-0">
                        <CardBody className="bg-yellow-100 flex justify-between items-center rounded-t">
                            <ArrowPathIcon className="h-12 w-12 text-yellow-900" />
                            <div>
                                <Typography variant="h3" className="text-yellow-900 text-right">
                                    {prosesAll.length}
                                </Typography>
                                <Typography variant="paragraph" className="text-yellow-900">Service Proses
                                </Typography>
                            </div>
                        </CardBody>
                        <CardFooter className="py-3 px-6">
                            <button onClick={() => toggleElement("proses")} >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <Typography variant="paragraph" color="blue-gray">Lihat Detail</Typography>
                                    </div>
                                    <div>
                                        <ChevronRightIcon className="h-5 w-6" color="blue-gray" />
                                    </div>
                                </div>
                            </button>
                        </CardFooter>
                    </Card>
                    <Card className="p-0">
                        <CardBody className="bg-red-100 flex justify-between items-center rounded-t">
                            <ArrowsRightLeftIcon className="h-12 w-12 text-red-900" />
                            <div>
                                <Typography variant="h3" className="text-red-900 text-right">
                                    {returAll.length}
                                </Typography>
                                <Typography variant="paragraph" className="text-red-900">Service Retur
                                </Typography>
                            </div>
                        </CardBody>
                        <CardFooter className="py-3 px-6">
                            <button onClick={() => toggleElement("retur")} >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <Typography variant="paragraph" color="blue-gray">Lihat Detail</Typography>
                                    </div>
                                    <div>
                                        <ChevronRightIcon className="h-5 w-6" color="blue-gray" />
                                    </div>
                                </div>
                            </button>
                        </CardFooter>
                    </Card>
                </div>
                <br />
                <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
                    <Card className="p-0">
                        <CardBody className="bg-red-100 flex justify-between items-center rounded-t">
                            <XMarkIcon className="h-12 w-12 text-red-900" />
                            <div>
                                <Typography variant="h3" className="text-red-900 text-right">
                                    {cancelAll.length}
                                </Typography>
                                <Typography variant="paragraph" className="text-red-900">Service Cancel
                                </Typography>
                            </div>
                        </CardBody>
                        <CardFooter className="py-3 px-6">
                            <button onClick={() => toggleElement("cancel")} >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <Typography variant="paragraph" color="blue-gray">Lihat Detail</Typography>
                                    </div>
                                    <div>
                                        <ChevronRightIcon className="h-5 w-6" color="blue-gray" />
                                    </div>
                                </div>
                            </button>
                        </CardFooter>
                    </Card>
                    <Card className="p-0">
                        <CardBody className="bg-yellow-100 flex justify-between items-center rounded-t">
                            <ClockIcon className="h-12 w-12 text-yellow-900" />
                            <div>
                                <Typography variant="h3" className="text-yellow-900 text-right">
                                    {semingguAll.length}
                                </Typography>
                                <Typography variant="paragraph" className="text-yellow-900">Service > 1 Minggu
                                </Typography>
                            </div>
                        </CardBody>
                        <CardFooter className="py-3 px-6">
                            <button onClick={() => toggleElement("seminggu")} >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <Typography variant="paragraph" color="blue-gray">Lihat Detail</Typography>
                                    </div>
                                    <div>
                                        <ChevronRightIcon className="h-5 w-6" color="blue-gray" />
                                    </div>
                                </div>
                            </button>
                        </CardFooter>
                    </Card>
                    <Card className="p-0">
                        <CardBody className="bg-blue-100 flex justify-between items-center rounded-t">
                            <CheckCircleIcon className="h-12 w-12 text-blue-900" />
                            <div>
                                <Typography variant="h3" className="text-blue-900 text-right">
                                    {takenAll.length}
                                </Typography>
                                <Typography variant="paragraph" className="text-blue-900">Service Taken
                                </Typography>
                            </div>
                        </CardBody>
                        <CardFooter className="py-3 px-6">
                            <button onClick={() => toggleElement("taken")} >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <Typography variant="paragraph" color="blue-gray">Lihat Detail</Typography>
                                    </div>
                                    <div>
                                        <ChevronRightIcon className="h-5 w-6" color="blue-gray" />
                                    </div>
                                </div>
                            </button>
                        </CardFooter>
                    </Card>
                </div>
                <br />
                <div>
                    <div id="na" className="bg-white shadow-lg p-3 my-5 rounded" hidden>
                        <Typography variant="h5">Service Terbaru</Typography>
                        <hr /> <br />
                        <div className="w-full overflow-x-auto">
                            <table
                                id="example_data"
                                ref={tableRef}
                                className="rounded-sm table-auto w-full"
                            >
                                <thead className="bg-blue-500 text-white">
                                    <tr>
                                        <th className="text-sm py-2 px-3 font-semibold">No</th>
                                        <th className="text-sm py-2 px-3 font-semibold">Nama</th>
                                        <th className="text-sm py-2 px-3 font-semibold">Alamat </th>
                                        <th className="text-sm py-2 px-3 font-semibold">Produk</th>
                                        <th className="text-sm py-2 px-3 font-semibold">In </th>
                                        <th className="text-sm py-2 px-3 font-semibold">C </th>
                                        <th className="text-sm py-2 px-3 font-semibold">Status </th>
                                        <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {naAll.length > 0 ? (
                                        naAll.map((row, index) => {
                                            const tglKonfirms = naTglKonf[index] || [];

                                            return (
                                                <tr key={index}>
                                                    <td className="text-sm w-[4%]">{index + 1}</td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.customer.nama_customer}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.customer.alamat}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.produk}{" "}
                                                        <span className="block">{row.merk}</span>{" "}
                                                        <span className="block">{row.type}</span>{" "}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {formatDate(row.tanggalMasuk)}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {tglKonfirms.map((down, idx) => (
                                                            <ul key={idx}>
                                                                <li>{formatDate(down.tglKonf)}</li>
                                                            </ul>
                                                        ))}{" "}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.statusEnd}
                                                    </td>
                                                    <td className="text-sm py-2 px-3 flex items-center justify-center">
                                                        <div className="flex flex-row gap-3">
                                                            <a href={"/detail_service/" + row.idTT}>
                                                                <IconButton size="md" color="light-blue">
                                                                    <InformationCircleIcon className="w-6 h-6 white" />
                                                                </IconButton>
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="text-sm text-center capitalize py-3 bg-gray-100"
                                            >
                                                Tidak ada data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div id="ready" className="bg-white shadow-lg p-3 my-5 rounded" hidden>
                        <Typography variant="h5">Service Ready</Typography>
                        <hr /> <br />
                        <div className="w-full overflow-x-auto">
                            <table
                                id="example_data2"
                                ref={tableRef2}
                                className="rounded-sm table-auto w-full"
                            >
                                <thead className="bg-blue-500 text-white">
                                    <tr>
                                        <th className="text-sm py-2 px-3 font-semibold">No</th>
                                        <th className="text-sm py-2 px-3 font-semibold">Nama</th>
                                        <th className="text-sm py-2 px-3 font-semibold">Alamat </th>
                                        <th className="text-sm py-2 px-3 font-semibold">Produk</th>
                                        <th className="text-sm py-2 px-3 font-semibold">In </th>
                                        <th className="text-sm py-2 px-3 font-semibold">C </th>
                                        <th className="text-sm py-2 px-3 font-semibold">Status </th>
                                        <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {readyAll.length > 0 ? (
                                        readyAll.map((row, index) => {
                                            const tglKonfirms = readyTglKonf[index] || [];

                                            return (
                                                <tr key={index}>
                                                    <td className="text-sm w-[4%]">{index + 1}</td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.customer.nama_customer}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.customer.alamat}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.produk}{" "}
                                                        <span className="block">{row.merk}</span>{" "}
                                                        <span className="block">{row.type}</span>{" "}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {formatDate(row.tanggalMasuk)}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {tglKonfirms.map((down, idx) => (
                                                            <ul key={idx}>
                                                                <li>{formatDate(down.tglKonf)}</li>
                                                            </ul>
                                                        ))}{" "}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.statusEnd}
                                                    </td>
                                                    <td className="text-sm py-2 px-3 flex items-center justify-center">
                                                        <div className="flex flex-row gap-3">
                                                            <a href={"/detail_service/" + row.idTT}>
                                                                <IconButton size="md" color="light-blue">
                                                                    <InformationCircleIcon className="w-6 h-6 white" />
                                                                </IconButton>
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="text-sm text-center capitalize py-3 bg-gray-100"
                                            >
                                                Tidak ada data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div id="proses" className="bg-white shadow-lg p-3 my-5 rounded" hidden>
                        <Typography variant="h5">Service Proses</Typography>
                        <hr /> <br />
                        <div className="w-full overflow-x-auto">
                            <table
                                id="example_data3"
                                ref={tableRef3}
                                className="rounded-sm table-auto w-full"
                            >
                                <thead className="bg-blue-500 text-white">
                                    <tr>
                                        <th className="text-sm py-2 px-3 font-semibold">No</th>
                                        <th className="text-sm py-2 px-3 font-semibold">Nama</th>
                                        <th className="text-sm py-2 px-3 font-semibold">Alamat </th>
                                        <th className="text-sm py-2 px-3 font-semibold">Produk</th>
                                        <th className="text-sm py-2 px-3 font-semibold">In </th>
                                        <th className="text-sm py-2 px-3 font-semibold">C </th>
                                        <th className="text-sm py-2 px-3 font-semibold">Status </th>
                                        <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prosesAll.length > 0 ? (
                                        prosesAll.map((row, index) => {
                                            const tglKonfirms = prosesTglKonf[index] || [];

                                            return (
                                                <tr key={index}>
                                                    <td className="text-sm w-[4%]">{index + 1}</td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.customer.nama_customer}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.customer.alamat}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.produk}{" "}
                                                        <span className="block">{row.merk}</span>{" "}
                                                        <span className="block">{row.type}</span>{" "}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {formatDate(row.tanggalMasuk)}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {tglKonfirms.map((down, idx) => (
                                                            <ul key={idx}>
                                                                <li>{formatDate(down.tglKonf)}</li>
                                                            </ul>
                                                        ))}{" "}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.statusEnd}
                                                    </td>
                                                    <td className="text-sm py-2 px-3 flex items-center justify-center">
                                                        <div className="flex flex-row gap-3">
                                                            <a href={"/detail_service/" + row.idTT}>
                                                                <IconButton size="md" color="light-blue">
                                                                    <InformationCircleIcon className="w-6 h-6 white" />
                                                                </IconButton>
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="text-sm text-center capitalize py-3 bg-gray-100"
                                            >
                                                Tidak ada data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div id="retur" className="bg-white shadow-lg p-3 my-5 rounded" hidden>
                        <Typography variant="h5">Service Retur</Typography>
                        <hr /> <br />
                        <div className="w-full overflow-x-auto">
                            <table
                                id="example_data4"
                                ref={tableRef4}
                                className="rounded-sm table-auto w-full"
                            >
                                <thead className="bg-blue-500 text-white">
                                    <tr>
                                        <th className="text-sm py-2 px-3 font-semibold">No</th>
                                        <th className="text-sm py-2 px-3 font-semibold">Nama</th>
                                        <th className="text-sm py-2 px-3 font-semibold">Alamat </th>
                                        <th className="text-sm py-2 px-3 font-semibold">Produk</th>
                                        <th className="text-sm py-2 px-3 font-semibold">In </th>
                                        <th className="text-sm py-2 px-3 font-semibold">C </th>
                                        <th className="text-sm py-2 px-3 font-semibold">Status </th>
                                        <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {returAll.length > 0 ? (
                                        returAll.map((row, index) => {
                                            const tglKonfirms = returTglKonf[index] || [];

                                            return (
                                                <tr key={index}>
                                                    <td className="text-sm w-[4%]">{index + 1}</td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.customer?.nama_customer}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.customer?.alamat}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.produk}{" "}
                                                        <span className="block">{row.merk}</span>{" "}
                                                        <span className="block">{row.type}</span>{" "}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {formatDate(row.tanggalMasuk)}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {tglKonfirms.map((down, idx) => (
                                                            <ul key={idx}>
                                                                <li>{formatDate(down.tglKonf)}</li>
                                                            </ul>
                                                        ))}{" "}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.statusEnd}
                                                    </td>
                                                    <td className="text-sm py-2 px-3 flex items-center justify-center">
                                                        <div className="flex flex-row gap-3">
                                                            <a href={"/detail_service/" + row.idTT}>
                                                                <IconButton size="md" color="light-blue">
                                                                    <InformationCircleIcon className="w-6 h-6 white" />
                                                                </IconButton>
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="text-sm text-center capitalize py-3 bg-gray-100"
                                            >
                                                Tidak ada data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div id="cancel" className="bg-white shadow-lg p-3 my-5 rounded" hidden>
                        <Typography variant="h5">Service Cancel</Typography>
                        <hr /> <br />
                        <div className="w-full overflow-x-auto">
                            <table
                                id="example_data5"
                                ref={tableRef5}
                                className="rounded-sm table-auto w-full"
                            >
                                <thead className="bg-blue-500 text-white">
                                    <tr>
                                        <th className="text-sm py-2 px-3 font-semibold">No</th>
                                        <th className="text-sm py-2 px-3 font-semibold">Nama</th>
                                        <th className="text-sm py-2 px-3 font-semibold">Alamat </th>
                                        <th className="text-sm py-2 px-3 font-semibold">Produk</th>
                                        <th className="text-sm py-2 px-3 font-semibold">In </th>
                                        <th className="text-sm py-2 px-3 font-semibold">C </th>
                                        <th className="text-sm py-2 px-3 font-semibold">Status </th>
                                        <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cancelAll.length > 0 ? (
                                        cancelAll.map((row, index) => {
                                            const tglKonfirms = cancelTglKonf[index] || [];

                                            return (
                                                <tr key={index}>
                                                    <td className="text-sm w-[4%]">{index + 1}</td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.customer.nama_customer}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.customer.alamat}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.produk}{" "}
                                                        <span className="block">{row.merk}</span>{" "}
                                                        <span className="block">{row.type}</span>{" "}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {formatDate(row.tanggalMasuk)}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {tglKonfirms.map((down, idx) => (
                                                            <ul key={idx}>
                                                                <li>{formatDate(down.tglKonf)}</li>
                                                            </ul>
                                                        ))}{" "}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.statusEnd}
                                                    </td>
                                                    <td className="text-sm py-2 px-3 flex items-center justify-center">
                                                        <div className="flex flex-row gap-3">
                                                            <a href={"/detail_service/" + row.idTT}>
                                                                <IconButton size="md" color="light-blue">
                                                                    <InformationCircleIcon className="w-6 h-6 white" />
                                                                </IconButton>
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="text-sm text-center capitalize py-3 bg-gray-100"
                                            >
                                                Tidak ada data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div id="seminggu" className="bg-white shadow-lg p-3 my-5 rounded" hidden>
                        <Typography variant="h5">Service > 1 Minggu</Typography>
                        <hr /> <br />
                        <div className="w-full overflow-x-auto">
                            <table
                                id="example_data6"
                                ref={tableRef6}
                                className="rounded-sm table-auto w-full"
                            >
                                <thead className="bg-blue-500 text-white">
                                    <tr>
                                        <th className="text-sm py-2 px-3 font-semibold">No</th>
                                        <th className="text-sm py-2 px-3 font-semibold">Nama</th>
                                        <th className="text-sm py-2 px-3 font-semibold">Alamat </th>
                                        <th className="text-sm py-2 px-3 font-semibold">Produk</th>
                                        <th className="text-sm py-2 px-3 font-semibold">In </th>
                                        <th className="text-sm py-2 px-3 font-semibold">C </th>
                                        <th className="text-sm py-2 px-3 font-semibold">Status </th>
                                        <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {semingguAll.length > 0 ? (
                                        semingguAll.map((row, index) => {
                                            const tglKonfirms = semingguTglKonf[index] || [];

                                            return (
                                                <tr key={index}>
                                                    <td className="text-sm w-[4%]">{index + 1}</td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.customer.nama_customer}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.customer.alamat}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.produk}{" "}
                                                        <span className="block">{row.merk}</span>{" "}
                                                        <span className="block">{row.type}</span>{" "}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {formatDate(row.tanggalMasuk)}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {tglKonfirms.map((down, idx) => (
                                                            <ul key={idx}>
                                                                <li>{formatDate(down.tglKonf)}</li>
                                                            </ul>
                                                        ))}{" "}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.statusEnd}
                                                    </td>
                                                    <td className="text-sm py-2 px-3 flex items-center justify-center">
                                                        <div className="flex flex-row gap-3">
                                                            <a href={"/detail_service/" + row.idTT}>
                                                                <IconButton size="md" color="light-blue">
                                                                    <InformationCircleIcon className="w-6 h-6 white" />
                                                                </IconButton>
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="text-sm text-center capitalize py-3 bg-gray-100"
                                            >
                                                Tidak ada data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div id="taken" className="bg-white shadow-lg p-3 my-5 rounded" hidden>
                        <Typography variant="h5">Service Taken</Typography>
                        <hr /> <br />
                        <div className="w-full overflow-x-auto">
                            <table
                                id="example_data7"
                                ref={tableRef7}
                                className="rounded-sm table-auto w-full"
                            >
                                <thead className="bg-blue-500 text-white">
                                    <tr>
                                        <th className="text-sm py-2 px-3 font-semibold">No</th>
                                        <th className="text-sm py-2 px-3 font-semibold">Nama</th>
                                        <th className="text-sm py-2 px-3 font-semibold">Alamat </th>
                                        <th className="text-sm py-2 px-3 font-semibold">Produk</th>
                                        <th className="text-sm py-2 px-3 font-semibold">In </th>
                                        <th className="text-sm py-2 px-3 font-semibold">C </th>
                                        <th className="text-sm py-2 px-3 font-semibold">Status </th>
                                        <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {takenAll.length > 0 ? (
                                        takenAll.map((row, index) => {
                                            const tglKonfirms = takenTglKonf[index] || [];

                                            return (
                                                <tr key={index}>
                                                    <td className="text-sm w-[4%]">{index + 1}</td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.customer.nama_customer}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.customer.alamat}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.produk}{" "}
                                                        <span className="block">{row.merk}</span>{" "}
                                                        <span className="block">{row.type}</span>{" "}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {formatDate(row.tanggalMasuk)}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {tglKonfirms.map((down, idx) => (
                                                            <ul key={idx}>
                                                                <li>{formatDate(down.tglKonf)}</li>
                                                            </ul>
                                                        ))}{" "}
                                                    </td>
                                                    <td className="text-sm py-2 px-3">
                                                        {row.statusEnd}
                                                    </td>
                                                    <td className="text-sm py-2 px-3 flex items-center justify-center">
                                                        <div className="flex flex-row gap-3">
                                                            <a href={"/detail_service_taken/" + row.idTT}>
                                                                <IconButton size="md" color="light-blue">
                                                                    <InformationCircleIcon className="w-6 h-6 white" />
                                                                </IconButton>
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="text-sm text-center capitalize py-3 bg-gray-100"
                                            >
                                                Tidak ada data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default DashboardAdminService;