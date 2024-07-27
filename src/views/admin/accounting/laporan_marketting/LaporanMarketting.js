import React, { useRef } from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import { Breadcrumbs, Button, Input, Typography } from "@material-tailwind/react";
import $ from "jquery";
import "datatables.net";
import "./../../../../assets/styles/datatables.css";

function LaporanMarketting() {
    const tableRef = useRef(null);
    const initializeDataTable = () => {
        if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable({});
        }
    };
    return (
        <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
            <SidebarAdmin />
            <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
                <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                    <Typography variant="lead" className="uppercase">
                        Laporan Marketting
                    </Typography>
                    <Breadcrumbs className="bg-transparent">
                        <a href="/dashboard" className="opacity-60">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                        </a>
                        <a href="/laporan_marketting">
                            <span>Laporan Marketting</span>
                        </a>
                    </Breadcrumbs>
                </div>
                <main className="bg-white shadow-lg p-5 my-5 rounded ">
                    <form >
                        <div className="mt-8 w-72 lg:w-[50%]">
                            <Input
                                variant="static"
                                color="blue"
                                type="date"
                                label="Tanggal Awal"
                                required
                            // onChange={(e) => settglAwal(e.target.value)}
                            />
                        </div>
                        <div className="mt-8 w-72 lg:w-[50%]">
                            <Input
                                variant="static"
                                color="blue"
                                type="date"
                                label="Tanggal Akhir"
                                required
                            // onChange={(e) => settglAkhir(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col lg:flex-row items-start lg:gap-5">
                            <Button className="mt-5" color="blue" type="submit">
                                Export
                            </Button>
                            <Button className="mt-5" color="blue" type="submit">
                                Export Data Persediaan
                            </Button>
                        </div>
                    </form>

                    <div className="rounded mb-5 p-1 mt-12 overflow-x-auto">
                        <table
                            id="example_data"
                            ref={tableRef}
                            className="rounded-sm table-auto w-full overflow-x-auto"
                        >
                            <thead className="bg-blue-500 text-white w-full">
                                <tr>
                                    <th className="text-sm py-2 px-2.5 font-semibold w-[4%]">
                                        No
                                    </th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">Tanggal</th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">
                                        No Faktur
                                    </th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">
                                        Nama Salesman
                                    </th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">
                                        Nama Customer
                                    </th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">
                                        Barcode Barang
                                    </th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">Harga</th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">QTY</th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">
                                        Total Harga Barang
                                    </th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">
                                        Total Belanja
                                    </th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">
                                        Total Keseluruhan
                                    </th>
                                    <th className="text-sm py-2 px-2.5 font-semibold">Aksi</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </main>
            </div>
        </section>
    )
}
export default LaporanMarketting;