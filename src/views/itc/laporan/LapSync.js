import React, { useRef, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Button, Input, Typography } from "@material-tailwind/react";
import $ from "jquery";

function LapSync() {
    const tableRef = useRef(null);
    const [laporans, setLaporan] = useState([]);

    const initializeDataTable = () => {
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable().destroy();
        }

        $(tableRef.current).DataTable({});
    };

    return (
        <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
            <SidebarAdmin />
            <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
                <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                    <Typography variant="lead" className="uppercase font-poppins">
                        Laporan Sync
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
                    <form>
                        <div className="w-72 lg:w-[50%]">
                            <div className="mt-8">
                                <Input
                                    variant="static"
                                    color="blue"
                                    type="date"
                                    label="Tanggal Awal"
                                    required
                                // value={tglAwal}
                                // onChange={(e) => setTglAwal(e.target.value)}
                                />
                            </div>
                            <div className="mt-8">
                                <Input
                                    variant="static"
                                    color="blue"
                                    type="date"
                                    label="Tanggal Akhir"
                                    required
                                // value={tglAkhir}
                                // onChange={(e) => setTglAkhir(e.target.value)}
                                />
                            </div>
                        </div>
                        <Button
                            className="mt-5 font-poppins font-medium"
                            color="blue"
                            type="submit"
                        >
                            Cari
                        </Button>
                    </form> <br />
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
                        </table>
                    </div>
                </main>
            </div>
        </section>
    )
}

export default LapSync;