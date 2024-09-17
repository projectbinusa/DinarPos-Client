import React from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Typography } from "@material-tailwind/react";

function DetailSync() {
    return (
        <>
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
                            <a href="/laporan_sync">
                                <span>Laporan Sync</span>
                            </a>
                            <span className="cursor-default">Detail</span>
                        </Breadcrumbs>
                    </div>
                    <main className="bg-white shadow-lg p-5 my-5 rounded">
                        <Typography variant="paragraph" className="font-medium font-poppins">Laporan Sync dinda Tanggal 2024-08-08</Typography> <br />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <Typography variant="paragraph" className="font-medium font-poppins">Report</Typography> <hr />
                            </div>
                            <div>
                                <Typography variant="paragraph" className="font-medium font-poppins">Planning</Typography> <hr />
                            </div>
                            <div className="lg:col-span-2">
                                <Typography variant="paragraph" className="font-medium font-poppins">Tingkat Kesesuaian</Typography> <hr />
                                <Typography variant="small" className="font-medium font-poppins">*Baris dengan warna merah mengartikan planning yang tidak ter-report</Typography>
                            </div>
                        </div>
                    </main>
                </div>
            </section>
        </>
    )
}

export default DetailSync;