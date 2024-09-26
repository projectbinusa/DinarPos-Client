import { Breadcrumbs, Button, Input, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../component/SidebarAdmin";
import $ from "jquery";
import { API_CUSTOMER, API_CUSTOMER_CP, API_IZIN, API_KUNJUNGAN, API_OMZET, API_PLANNING, API_SALESMAN } from "../../utils/BaseUrl";
import Swal from "sweetalert2";
import axios from "axios";

function ExportLaporan() {
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

    const formatDate = (value) => {
        const date = new Date(value);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const formattedDate = `${day}-${month}-${year}`;

        return formattedDate;
    };

    const namaSalesman = async (value) => {
        axios.get(`${API_SALESMAN}/${value}`, {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }).then((res) => {
            const nama = res.data.data.namaSalesman;
            console.log(nama);
            return nama;
        }).catch((err) => {
            console.log(err);
            return "";
        })
    };    

    // EXPORT LAP PLANNING
    const [startPlanning, setstartPlanning] = useState("");
    const [endPlanning, setendPlanning] = useState("");
    const [itcPlanning, setitcPlanning] = useState(0);

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

    const exportPlanning = async (e) => {
        if (startPlanning === "" || endPlanning === "") {
            Swal.fire({
                icon: "warning",
                title: "Masukkan tanggal!",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        e.preventDefault();

        if (itcPlanning === 0) {
            try {
                const response = await axios.get(
                    `${API_PLANNING}/export/excel/planningAll?tglAkhir=${endPlanning}&tglAwal=${startPlanning}`,
                    {
                        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                        responseType: "blob",
                    }
                );

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `Planning Periode ${formatDate(startPlanning)} s.d ${formatDate(endPlanning)}.xlsx`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);

                Swal.fire({
                    icon: "success",
                    title: "Export Berhasil!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error saat mengunduh file:",
                    text: error.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } else {
            try {
                const response = await axios.get(
                    `${API_PLANNING}/export/excel/salesman?id_salesman=${itcPlanning}&tglAkhir=${endPlanning}&tglAwal=${startPlanning}`,
                    {
                        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                        responseType: "blob",
                    }
                );

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `Planning ${namaSalesman(itcPlanning)} Periode ${formatDate(startPlanning)} s.d ${formatDate(endPlanning)}.xlsx`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);

                Swal.fire({
                    icon: "success",
                    title: "Export Berhasil!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error saat mengunduh file:",
                    text: error.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
    }
    // END EXPORT LAP PLANNING


    // EXPORT LAP KUNJUNGAN
    const [startReport, setstartReport] = useState("");
    const [endReport, setendReport] = useState("");
    const [itcReport, setitcReport] = useState(0);

    // ALL ITC
    const [valuesReport, setvaluesReport] = useState("");
    const [optionsReport, setoptionsReport] = useState([]);
    const [currentPageReport, setCurrentPageReport] = useState(1);

    const handleReport = async () => {
        if (valuesReport.trim() !== "") {
            const response = await fetch(
                `${API_SALESMAN}/pagination?limit=10&page=${currentPageReport}&search=${valuesReport}&sort=1`,
                {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                }
            );
            const data = await response.json();
            setoptionsReport(data.data);
        } else {
            return;
        }
    };

    useEffect(() => {
        handleReport();
    }, [currentPageReport, valuesReport]);

    const handleChangeReport = (event) => {
        setvaluesReport(event.target.value);
        setCurrentPageReport(1);
    };
    // END ALL ITC    

    const exportReport = async (e) => {
        if (startReport === "" || endReport === "") {
            Swal.fire({
                icon: "warning",
                title: "Masukkan tanggal!",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        e.preventDefault();

        if (itcReport === 0) {
            try {
                const response = await axios.get(
                    `${API_KUNJUNGAN}/export/kunjungan?tglAkhir=${endReport}&tglAwal=${startReport}`,
                    {
                        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                        responseType: "blob",
                    }
                );

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `Report Periode ${formatDate(startReport)} s.d ${formatDate(endReport)}.xlsx`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);

                Swal.fire({
                    icon: "success",
                    title: "Export Berhasil!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error saat mengunduh file:",
                    text: error.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } else {
            try {
                const response = await axios.get(
                    `${API_KUNJUNGAN}/export/kunjungan/salesman?id_salesman=${itcReport}&tglAkhir=${endReport}&tglAwal=${startReport}`,
                    {
                        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                        responseType: "blob",
                    }
                );

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `Report ${namaSalesman(itcReport)} Periode ${formatDate(startReport)} s.d ${formatDate(endReport)}.xlsx`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);

                Swal.fire({
                    icon: "success",
                    title: "Export Berhasil!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error saat mengunduh file:",
                    text: error.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
    }
    // AND EXPORT LAP REPORT

    // EXPORT LAP SYNC
    const [startSync, setstartSync] = useState("");
    const [endSync, setendSync] = useState("");
    const [itcSync, setitcSync] = useState(0);

    // ALL ITC
    const [valuesSync, setvaluesSync] = useState("");
    const [optionsSync, setoptionsSync] = useState([]);
    const [currentPageSync, setCurrentPageSync] = useState(1);

    const handleSync = async () => {
        if (valuesSync.trim() !== "") {
            const response = await fetch(
                `${API_SALESMAN}/pagination?limit=10&page=${currentPageSync}&search=${valuesSync}&sort=1`,
                {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                }
            );
            const data = await response.json();
            setoptionsSync(data.data);
        } else {
            return;
        }
    };

    useEffect(() => {
        handleSync();
    }, [currentPageSync, valuesSync]);

    const handleChangeSync = (event) => {
        setvaluesSync(event.target.value);
        setCurrentPageSync(1);
    };
    // END ALL ITC 

    const exportSync = async (e) => {
        if (startSync === "" || endSync === "") {
            Swal.fire({
                icon: "warning",
                title: "Masukkan tanggal!",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        e.preventDefault();


        try {
            const response = await axios.get(
                `${API_KUNJUNGAN}/export/laporan/sync?id_selesman=${itcSync}&tglAkhir=${endSync}&tglAwal=${startSync}`,
                {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `Laporan Sync Report ${namaSalesman(itcSync)} Periode ${formatDate(startSync)} s.d ${formatDate(endSync)}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            Swal.fire({
                icon: "success",
                title: "Export Berhasil!",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error saat mengunduh file:",
                text: error.message,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }
    // END EXPORT LAP SYNC

    // EXPORT LAP OMZET
    const [startOmzet, setstartOmzet] = useState("");
    const [endOmzet, setendOmzet] = useState("");
    const [itcOmzet, setitcOmzet] = useState(0);

    // ALL ITC
    const [valuesOmzet, setvaluesOmzet] = useState("");
    const [optionsOmzet, setoptionsOmzet] = useState([]);
    const [currentPageOmzet, setCurrentPageOmzet] = useState(1);

    const handleOmzet = async () => {
        if (valuesOmzet.trim() !== "") {
            const response = await fetch(
                `${API_SALESMAN}/pagination?limit=10&page=${currentPageOmzet}&search=${valuesOmzet}&sort=1`,
                {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                }
            );
            const data = await response.json();
            setoptionsOmzet(data.data);
        } else {
            return;
        }
    };

    useEffect(() => {
        handleOmzet();
    }, [currentPageOmzet, valuesOmzet]);

    const handleChangeOmzet = (event) => {
        setvaluesOmzet(event.target.value);
        setCurrentPageOmzet(1);
    };
    // END ALL ITC

    const exportOmzet = async (e) => {
        if (startOmzet === "" || endOmzet === "") {
            Swal.fire({
                icon: "warning",
                title: "Masukkan tanggal!",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        e.preventDefault();

        try {
            const response = await axios.get(
                `${API_OMZET}/export/pimpinan?id_salesman=${itcOmzet}&tglAkhir=${endOmzet}&tglAwal=${startOmzet}`,
                {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `Laporan Omzet ${namaSalesman(itcReport)} Periode ${formatDate(startReport)} s.d ${formatDate(endReport)}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            Swal.fire({
                icon: "success",
                title: "Export Berhasil!",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error saat mengunduh file:",
                text: error.message,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }
    // END EXPORT LAP OMZET

    // EXPORT LAP REVIEW
    const [startReview, setstartReview] = useState("");
    const [endReview, setendReview] = useState("");

    // EXPORT LAP IZIN
    const [startIzin, setstartIzin] = useState("");
    const [endIzin, setendIzin] = useState("");

    const exportIzin = async (e) => {
        if (startIzin === "" || endIzin === "") {
            Swal.fire({
                icon: "warning",
                title: "Masukkan tanggal!",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        e.preventDefault();

        try {
            const response = await axios.get(
                `${API_IZIN}/export?tglAkhir=${endIzin}&tglAwal=${startIzin}`,
                {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `Rekap Izin Periode ${formatDate(startIzin)} s.d ${formatDate(endIzin)}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            Swal.fire({
                icon: "success",
                title: "Export Berhasil!",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error saat mengunduh file:",
                text: error.message,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }

    // EXPORT LAP SALESMAN CUSTOMER
    const [startSalesmanC, setstartSalesmanC] = useState("");
    const [endSalesmanC, setendSalesmanC] = useState("");

    const exportSalesmanC = async (e) => {
        if (startSalesmanC === "" || endSalesmanC === "") {
            Swal.fire({
                icon: "warning",
                title: "Masukkan tanggal!",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        e.preventDefault();

        try {
            const response = await axios.get(
                `${API_CUSTOMER}/export/excel?tglAkhir=${endSalesmanC}&tglAwal=${startSalesmanC}`,
                {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `Rekap Salesman Customer Periode ${formatDate(startSalesmanC)} s.d ${formatDate(endSalesmanC)}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            Swal.fire({
                icon: "success",
                title: "Export Berhasil!",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error saat mengunduh file:",
                text: error.message,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }

    // EXPORT LAP SALESMAN CUSTOMER CP
    const [startSalesmanCP, setstartSalesmanCP] = useState("");
    const [endSalesmanCP, setendSalesmanCP] = useState("");

    const exportSalesmanCP = async (e) => {
        if (startSalesmanCP === "" || endSalesmanCP === "") {
            Swal.fire({
                icon: "warning",
                title: "Masukkan tanggal!",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        e.preventDefault();

        try {
            const response = await axios.get(
                `${API_CUSTOMER_CP}/export/excel?tglAkhir=${endSalesmanCP}&tglAwal=${startSalesmanCP}`,
                {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `Report Customer CP.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            Swal.fire({
                icon: "success",
                title: "Export Berhasil!",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error saat mengunduh file:",
                text: error.message,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }

    // EXPORT GOOGLE CUSTOMER
    const exportGoogleCustomer = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(
                `${API_CUSTOMER}/export/customer/google`,
                {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `Report Google Contact Customer.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            Swal.fire({
                icon: "success",
                title: "Export Berhasil!",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error saat mengunduh file:",
                text: error.message,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }

    // EXPORT GOOGLE CUSTOMER CP
    const exportGoogleCustomerCP = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(
                `${API_CUSTOMER}/export/customer_cp/google`,
                {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `Report Google Contact Customer CP.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            Swal.fire({
                icon: "success",
                title: "Export Berhasil!",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error saat mengunduh file:",
                text: error.message,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }

    return (
        <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
            <SidebarAdmin />
            <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
                <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                    <Typography variant="lead" className="uppercase font-poppins">
                        Export Laporan
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

                <main className="grid grid-cols-1 lg:grid-cols-3 items-start gap-3">
                    <div className="bg-white shadow-lg p-3 my-5 rounded">
                        <Typography variant="lead" className="capitalize font-medium font-poppins">
                            Export Laporan
                        </Typography>
                        <hr />
                        <ol className="mt-5">
                            <li className="my-1">
                                <button
                                    className="text-gray-800 hover:bg-blue-50 flex items-center p-2 rounded-lg dark:text-white group w-full"
                                    onClick={() => toggleElement("planning")}
                                >
                                    <span className=" ms-3 whitespace-nowrap">Laporan Planning</span>
                                </button>
                            </li>
                            <li className="my-1">
                                <button
                                    className="text-gray-800 hover:bg-blue-50 flex items-center p-2 rounded-lg dark:text-white group w-full"
                                    onClick={() => toggleElement("report")}
                                >
                                    <span className=" ms-3 whitespace-nowrap">Laporan Report</span>
                                </button>
                            </li>
                            <li className="my-1">
                                <button
                                    className="text-gray-800 hover:bg-blue-50 flex items-center p-2 rounded-lg dark:text-white group w-full"
                                    onClick={() => toggleElement("sync")}
                                >
                                    <span className=" ms-3 whitespace-nowrap">Laporan Sync</span>
                                </button>
                            </li>
                            <li className="my-1">
                                <button
                                    className="text-gray-800 hover:bg-blue-50 flex items-center p-2 rounded-lg dark:text-white group w-full"
                                    onClick={() => toggleElement("omzet")}
                                >
                                    <span className=" ms-3 whitespace-nowrap">Laporan Omzet</span>
                                </button>
                            </li>
                            <li className="my-1">
                                <button
                                    className="text-gray-800 hover:bg-blue-50 flex items-center p-2 rounded-lg dark:text-white group w-full"
                                    onClick={() => toggleElement("review")}
                                >
                                    <span className=" ms-3 whitespace-nowrap">Review</span>
                                </button>
                            </li>
                            <li className="my-1">
                                <button
                                    className="text-gray-800 hover:bg-blue-50 flex items-center p-2 rounded-lg dark:text-white group w-full"
                                    onClick={() => toggleElement("ijin")}
                                >
                                    <span className=" ms-3 whitespace-nowrap">Laporan Ijin</span>
                                </button>
                            </li>
                            <li className="my-1">
                                <button
                                    className="text-gray-800 hover:bg-blue-50 flex items-center p-2 rounded-lg dark:text-white group w-full"
                                    onClick={() => toggleElement("salesman_customer")}
                                >
                                    <span className=" ms-3 whitespace-nowrap">Salesman Customer</span>
                                </button>
                            </li>
                            <li className="my-1">
                                <button
                                    className="text-gray-800 hover:bg-blue-50 flex items-center p-2 rounded-lg dark:text-white group w-full"
                                    onClick={() => toggleElement("salesman_customer_cp")}
                                >
                                    <span className=" ms-3 whitespace-nowrap">Salesman Customer CP</span>
                                </button>
                            </li>
                            <li className="my-1">
                                <button
                                    className="text-gray-800 hover:bg-blue-50 flex items-center p-2 rounded-lg dark:text-white group w-full"
                                    onClick={() => toggleElement("google_contact_customer")}
                                >
                                    <span className=" ms-3 whitespace-nowrap">Google Contact Customer</span>
                                </button>
                            </li>
                            <li className="my-1">
                                <button
                                    className="text-gray-800 hover:bg-blue-50 flex items-center p-2 rounded-lg dark:text-white group w-full"
                                    onClick={() => toggleElement("google_contact_customer_cp")}
                                >
                                    <span className=" ms-3 whitespace-nowrap">Google Contact Customer CP</span>
                                </button>
                            </li>
                        </ol>
                    </div>
                    <div className="bg-white shadow-lg p-3 my-5 rounded lg:col-span-2">
                        {/* PLANNING */}
                        <div id="planning" hidden>
                            <Typography variant="lead" className="capitalize font-medium font-poppins">Laporan Planning</Typography>
                            <hr /> <br /> <br />
                            <div>
                                <Input
                                    label="Tanggal Awal"
                                    variant="static"
                                    color="blue"
                                    size="lg"
                                    type="date"
                                    onChange={(e) => setstartPlanning(e.target.value)}
                                /><br />
                                <Input
                                    label="Tanggal Akhir"
                                    variant="static"
                                    color="blue"
                                    size="lg"
                                    type="date"
                                    onChange={(e) => setendPlanning(e.target.value)}
                                /> <br />
                                <div className="flex gap-2 items-end">
                                    <Input
                                        label="ITC"
                                        variant="static"
                                        color="blue"
                                        list="salesman-list"
                                        id="salesman"
                                        name="salesman"
                                        onChange={(event) => {
                                            handleChange(event);
                                            setitcPlanning(event.target.value);
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
                                </div> <br />
                                <Typography className="font-poppins font-normal text-gray-800" variant="small"><span className="font-medium">Export Semua ITC:</span> Masukkan tanggal awal dan akhir saja.</Typography>
                                <Typography className="font-poppins font-normal text-gray-800" variant="small"><span className="font-medium">Export Per ITC:</span> Masukkan tanggal awal, akhir, dan ITC yang dipilih.</Typography> <br />
                                <Button variant="gradient" color="blue" onClick={exportPlanning} className="font-poppins font-medium" type="button">Submit</Button>
                            </div>
                        </div>

                        {/* REPORT */}
                        <div id="report" hidden>
                            <Typography variant="lead" className="capitalize font-medium font-poppins">Laporan Report</Typography>
                            <hr /> <br /> <br />
                            <div>
                                <Input
                                    label="Tanggal Awal"
                                    variant="static"
                                    color="blue"
                                    size="lg"
                                    type="date"
                                    onChange={(e) => setstartReport(e.target.value)}
                                /><br />
                                <Input
                                    label="Tanggal Akhir"
                                    variant="static"
                                    color="blue"
                                    size="lg"
                                    type="date"
                                    onChange={(e) => setendReport(e.target.value)}
                                /> <br />
                                <div className="flex gap-2 items-end">
                                    <Input
                                        label="ITC"
                                        variant="static"
                                        color="blue"
                                        list="salesmanr-list"
                                        id="salesmanr"
                                        name="salesmanr"
                                        onChange={(event) => {
                                            handleChangeReport(event);
                                            setitcReport(event.target.value);
                                        }}
                                        placeholder="Pilih ITC"
                                    />
                                    <datalist id="salesmanr-list">
                                        {optionsReport.length > 0 && (
                                            <>
                                                {optionsReport.map((option) => (
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
                                            onClick={() => setCurrentPageReport(currentPageReport - 1)}
                                            disabled={currentPageReport === 1}
                                        >
                                            Prev
                                        </button>
                                        <button
                                            className="text-sm bg-gray-400 px-1"
                                            onClick={() => setCurrentPageReport(currentPageReport + 1)}
                                            disabled={!optionsReport.length}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div> <br />
                                <Typography className="font-poppins font-normal text-gray-800" variant="small"><span className="font-medium">Export Semua ITC:</span> Masukkan tanggal awal dan akhir saja.</Typography>
                                <Typography className="font-poppins font-normal text-gray-800" variant="small"><span className="font-medium">Export Per ITC:</span> Masukkan tanggal awal, akhir, dan ITC yang dipilih.</Typography> <br />
                                <Button variant="gradient" color="blue" type="button" onClick={exportReport} className="font-poppins font-medium">Submit</Button>
                            </div>
                        </div>

                        {/* SYNC */}
                        <div id="sync" hidden>
                            <Typography variant="lead" className="capitalize font-medium font-poppins">Laporan Sync</Typography>
                            <hr /> <br /> <br />
                            <div>
                                <Input
                                    label="Tanggal Awal"
                                    variant="static"
                                    color="blue"
                                    size="lg"
                                    type="date"
                                    onChange={(e) => setstartSync(e.target.value)}
                                /><br />
                                <Input
                                    label="Tanggal Akhir"
                                    variant="static"
                                    color="blue"
                                    size="lg"
                                    type="date"
                                    onChange={(e) => setendSync(e.target.value)}
                                /> <br />
                                <div className="flex gap-2 items-end">
                                    <Input
                                        label="ITC"
                                        variant="static"
                                        color="blue"
                                        list="salesmansync-list"
                                        id="salesmansync"
                                        name="salesmansync"
                                        onChange={(event) => {
                                            handleChangeSync(event);
                                            setitcSync(event.target.value);
                                        }}
                                        placeholder="Pilih ITC"
                                    />
                                    <datalist id="salesmansync-list">
                                        {optionsSync.length > 0 && (
                                            <>
                                                {optionsSync.map((option) => (
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
                                            onClick={() => setCurrentPageSync(currentPageSync - 1)}
                                            disabled={currentPageSync === 1}
                                        >
                                            Prev
                                        </button>
                                        <button
                                            className="text-sm bg-gray-400 px-1"
                                            onClick={() => setCurrentPageSync(currentPageSync + 1)}
                                            disabled={!optionsSync.length}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div> <br />
                                <Button variant="gradient" color="blue" type="button" className="font-poppins font-medium" onClick={exportSync}>Submit</Button>
                            </div>
                        </div>

                        {/* OMZET */}
                        <div id="omzet" hidden>
                            <Typography variant="lead" className="capitalize font-medium font-poppins">Laporan Omzet</Typography>
                            <hr /> <br /> <br />
                            <div>
                                <Input
                                    label="Tanggal Awal"
                                    variant="static"
                                    color="blue"
                                    size="lg"
                                    type="date"
                                    onChange={(e) => setstartOmzet(e.target.value)}
                                /><br />
                                <Input
                                    label="Tanggal Akhir"
                                    variant="static"
                                    color="blue"
                                    size="lg"
                                    type="date"
                                    onChange={(e) => setendOmzet(e.target.value)}
                                /> <br />
                                <div className="flex gap-2 items-end">
                                    <Input
                                        label="ITC"
                                        variant="static"
                                        color="blue"
                                        list="salesmano-list"
                                        id="salesmano"
                                        name="salesmano"
                                        onChange={(event) => {
                                            handleChangeOmzet(event);
                                            setitcOmzet(event.target.value);
                                        }}
                                        placeholder="Pilih ITC"
                                    />
                                    <datalist id="salesmano-list">
                                        {optionsOmzet.length > 0 && (
                                            <>
                                                {optionsOmzet.map((option) => (
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
                                            onClick={() => setCurrentPageOmzet(currentPageOmzet - 1)}
                                            disabled={currentPageOmzet === 1}
                                        >
                                            Prev
                                        </button>
                                        <button
                                            className="text-sm bg-gray-400 px-1"
                                            onClick={() => setCurrentPageOmzet(currentPageOmzet + 1)}
                                            disabled={!optionsOmzet.length}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div> <br />
                                <Typography className="font-poppins font-normal text-gray-800" variant="small"><span className="font-medium">Export Semua ITC:</span> Masukkan tanggal awal dan akhir saja.</Typography>
                                <Typography className="font-poppins font-normal text-gray-800" variant="small"><span className="font-medium">Export Per ITC:</span> Masukkan tanggal awal, akhir, dan ITC yang dipilih.</Typography> <br />
                                <Button variant="gradient" color="blue" type="button" onClick={exportOmzet} className="font-poppins font-medium">Submit</Button>
                            </div>
                        </div>

                        {/* REVIEW */}
                        <div id="review" hidden>
                            <Typography variant="lead" className="capitalize font-medium font-poppins">Review Report</Typography>
                            <hr /> <br /> <br />
                            <div>
                                <Input
                                    label="Tanggal Awal"
                                    variant="static"
                                    color="blue"
                                    size="lg"
                                    type="date"
                                    onChange={(e) => setstartReview(e.target.value)}
                                /><br />
                                <Input
                                    label="Tanggal Akhir"
                                    variant="static"
                                    color="blue"
                                    size="lg"
                                    type="date"
                                    onChange={(e) => setendReview(e.target.value)}
                                /> <br />
                                <Button variant="gradient" color="blue" type="button" className="font-poppins font-medium">Submit</Button>
                            </div>
                        </div>

                        {/* IJIN */}
                        <div id="ijin" hidden>
                            <Typography variant="lead" className="capitalize font-medium font-poppins">Laporan Ijin</Typography>
                            <hr /> <br /> <br />
                            <div>
                                <Input
                                    label="Tanggal Awal"
                                    variant="static"
                                    color="blue"
                                    size="lg"
                                    type="date"
                                    onChange={(e) => setstartIzin(e.target.value)}
                                /><br />
                                <Input
                                    label="Tanggal Akhir"
                                    variant="static"
                                    color="blue"
                                    size="lg"
                                    type="date"
                                    onChange={(e) => setendIzin(e.target.value)}
                                /> <br />
                                <Button variant="gradient" color="blue" type="button" className="font-poppins font-medium" onClick={exportIzin}>Submit</Button>
                            </div>
                        </div>

                        {/* SALESMAN CUSTOMER */}
                        <div id="salesman_customer" hidden>
                            <Typography variant="lead" className="capitalize font-medium font-poppins">Salesman Customer</Typography>
                            <hr /> <br /> <br />
                            <div>
                                <Input
                                    label="Tanggal Awal"
                                    variant="static"
                                    color="blue"
                                    size="lg"
                                    type="date"
                                    onChange={(e) => setstartSalesmanC(e.target.value)}
                                /><br />
                                <Input
                                    label="Tanggal Akhir"
                                    variant="static"
                                    color="blue"
                                    size="lg"
                                    type="date"
                                    onChange={(e) => setendSalesmanC(e.target.value)}
                                /> <br />
                                <Button variant="gradient" color="blue" type="button" className="font-poppins font-medium" onClick={exportSalesmanC}>Submit</Button>
                            </div>
                        </div>

                        {/* SALESMAN CUSTOMER CP */}
                        <div id="salesman_customer_cp" hidden>
                            <Typography variant="lead" className="capitalize font-medium font-poppins">Salesman Customer CP</Typography>
                            <hr /> <br /> <br />
                            <div>
                                <Input
                                    label="Tanggal Awal"
                                    variant="static"
                                    color="blue"
                                    size="lg"
                                    type="date"
                                    onChange={(e) => setstartSalesmanCP(e.target.value)}
                                /><br />
                                <Input
                                    label="Tanggal Akhir"
                                    variant="static"
                                    color="blue"
                                    size="lg"
                                    type="date"
                                    onChange={(e) => setendSalesmanCP(e.target.value)}
                                /> <br />
                                <Button variant="gradient" color="blue" type="button" onClick={exportSalesmanCP} className="font-poppins font-medium">Submit</Button>
                            </div>
                        </div>

                        {/* GOOGLE CONTACT CUSTOMER */}
                        <div id="google_contact_customer" hidden>
                            <Typography variant="lead" className="capitalize font-medium font-poppins">Google Contact Customer</Typography>
                            <hr /> <br /> <br />
                            <div>
                                <Button variant="gradient" color="blue" type="button" onClick={exportGoogleCustomer} className="font-poppins font-medium">Submit</Button>
                            </div>
                        </div>

                        {/* GOOGLE CONTACT CUSTOMER CP */}
                        <div id="google_contact_customer_cp" hidden>
                            <Typography variant="lead" className="capitalize font-medium font-poppins">Google Contact Customer CP</Typography>
                            <hr /> <br /> <br />
                            <div>
                                <Button variant="gradient" color="blue" type="button" onClick={exportGoogleCustomerCP} className="font-poppins font-medium">Submit</Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    )
}

export default ExportLaporan;