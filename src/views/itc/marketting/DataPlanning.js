import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import { Breadcrumbs, Button, Input, Typography } from "@material-tailwind/react";
import $ from "jquery";
import axios from "axios";
import { API_ITC, API_PENGGUNA, API_PLANNING } from "../../../../utils/BaseUrl";
import Decrypt from "../../../../component/Decrypt";

function DataPlanning() {
    const tableRef = useRef(null);
    const initializeDataTable = () => {
        if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable({});
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

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [salesmanId, setsalesmanId] = useState(0);

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

    const exportPlanning = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                `${API_PLANNING}/export/excel/salesman?id_salesman=${salesmanId}&tglAkhir=${endDate}&tglAwal=${startDate}`,
                {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `Planning Periode ${formatDate(startDate)} s.d ${formatDate(endDate)}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error("Error saat mengunduh file:", error);
        }
    }

    return (
        <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
            <SidebarAdmin />
            <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
                <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                    <Typography variant="lead" className="uppercase">
                        Data Planning
                    </Typography>
                    <Breadcrumbs className="bg-transparent">
                        <a href={"/dashboard"} className="opacity-60">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011-1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                        </a>
                        <a href="/data_planning">
                            <span>Data Planning</span>
                        </a>
                    </Breadcrumbs>
                </div>
                <main className="bg-white shadow-lg p-5 my-5 rounded">
                    <div className="flex justify-end">
                        <a href="/input_planning" className="mb-5">
                            <Button variant="gradient" color="blue" className="font-popins font-medium">
                                Input
                            </Button>
                        </a>
                    </div> <br />
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-end lg:justify-between">
                        <div className="w-full">
                            <Input
                                type="date"
                                id="startDate"
                                label="Tanggal Awal"
                                color="blue"
                                variant="outlined"
                                required
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div className="w-full">
                            <Input
                                type="date"
                                id="endDate"
                                label="Tanggal Akhir"
                                color="blue"
                                variant="outlined"
                                required
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div className="w-full lg:w-auto flex justify-start items-center">
                            <Button
                                variant="gradient"
                                color="blue"
                                onClick={exportPlanning}
                                className="font-popins font-medium"
                                size="md"
                            >export
                            </Button>
                        </div>
                    </div>
                    <div className="rounded mt-10 p-2 w-full overflow-x-auto">
                        <table
                            id="example_data"
                            ref={tableRef}
                            className="rounded-sm table-auto w-full"
                        >
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="text-sm py-2 px-3 font-semibold">No</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Tanggal</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Jumlah Planning</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </main>
            </div>
        </section>
    )
}

export default DataPlanning;