import React, { useRef } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Button, Typography } from "@material-tailwind/react";
import $ from "jquery";
import "datatables.net";
import "./../../../assets/styles/datatables.css";

function DataItc() {
    const tableRef = useRef(null);
    const initializeDataTable = () => {
        if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable({});
        }
    };

    return (
        <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
            <SidebarAdmin />
            <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
                <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                    <Typography variant="lead" className="uppercase font-poppins">
                        Data ITC
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
                        <a href="/data_itc">
                            <span>ITC</span>
                        </a>
                    </Breadcrumbs>
                </div>
                <main className="bg-white shadow-lg p-5 my-5 rounded ">
                    <div className="block">
                        <a href="/add_itc">
                            <Button variant="gradient" color="blue" className="font-poppins font-medium">
                                Tambah
                            </Button>
                        </a>
                    </div>
                    <div className="rounded my-5 p-2 w-full overflow-auto">
                        <table
                            id="example_data"
                            ref={tableRef}
                            className="rounded-sm table-auto w-full"
                        >
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="text-sm py-2 px-3 font-semibold">No</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Nama </th>
                                    <th className="text-sm py-2 px-3 font-semibold">Username </th>
                                    <th className="text-sm py-2 px-3 font-semibold">Alamat</th>
                                    <th className="text-sm py-2 px-3 font-semibold">No Telepon</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Target</th>
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

export default DataItc;