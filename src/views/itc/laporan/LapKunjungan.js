import { Breadcrumbs, Button, IconButton, Input, Option, Select, Typography } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { API_SALESMAN } from "../../../utils/BaseUrl";
import { ChevronLeftIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import $ from "jquery";

function LapKunjungan() {
    const [tglAwal, setTglAwal] = useState("");
    const [tglAkhir, setTglAkhir] = useState("");
    const [salesmanId, setSalesmanId] = useState(0);

    const tableRef = useRef(null);
    const [laporans, setLaporan] = useState([]);

    const initializeDataTable = () => {
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable().destroy();
        }

        $(tableRef.current).DataTable({});
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
                        Laporan Report
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
                            type="submit"
                        >
                            Cari
                        </Button>
                    </div> <br /> <br />
                    <div className="w-72 lg:w-[50%] flex gap-2">
                        <Select label="Filter Deal"
                            variant="static"
                            color="blue"
                            size="lg"
                            // onChange={(selectedOption) => setShift(selectedOption)}
                            required
                        >
                            <Option value="">Pilih</Option>
                            <Option value="< 50" className="flex gap-1"><ChevronLeftIcon className="w-4 h-4 text-black" /> 50</Option>
                            <Option value="< 80" className="flex gap-1"><ChevronLeftIcon className="w-4 h-4 text-black" /> 80</Option>
                            <Option value="< 100" className="flex gap-1"><ChevronLeftIcon className="w-4 h-4 text-black" /> 100</Option>
                        </Select>
                        <IconButton
                            color="blue"
                            size="lg"
                            type="button"
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
                                    <th className="text-sm py-2 px-2.5 font-semibold">Tgl</th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">Timestamp</th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">Nama</th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">Instansi</th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">Daerah</th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">Tujuan</th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">Action</th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">Info didapat</th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">Peluang</th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">Visit</th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">Tipe</th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">Deal</th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">Detail</th>
                                </tr>
                            </thead> </table> </div>
                </main>
            </div>
        </section>
    )
}

export default LapKunjungan;