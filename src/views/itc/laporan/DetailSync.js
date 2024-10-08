import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Progress, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { API_SYNC_KUNJUNGAN, API_SYNC_PLANNING } from "../../../utils/BaseUrl";
import axios from "axios";

function DetailSync() {
    const param = useParams();
    const [kunjungans, setKunjungans] = useState([]);
    const [plannings, setPlannings] = useState([]);

    useEffect(() => {
        const allKunjungan = async () => {
            try {
                const response = await axios.get(`${API_SYNC_KUNJUNGAN}/tanggal/salesman?id_salesman=${param.idSalesman}&tgl=${param.tgl}`, {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                });
                const res = response.data.data;
                setKunjungans(res)
            } catch (err) {
                console.log(err);
            }
        };
        const allPlanning = async () => {
            try {
                const response = await axios.get(`${API_SYNC_PLANNING}?id_salesman=${param.idSalesman}&tanggal=${param.tgl}`, {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                });
                const res = response.data.data;
                console.log(res);
                setPlannings(res)
            } catch (err) {
                console.log(err);
            }
        };

        allKunjungan();
        allPlanning()
    }, [])

    const persen = (kunjungans.length / plannings.length) * 100;
    const formattedPersen = isNaN(persen) ? 0 : persen.toFixed(1);

    return (
        <>
            <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
                <SidebarAdmin />
                <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
                    <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                        <Typography variant="lead" className="uppercase font-poppins">
                            Detail Sync
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
                        </Breadcrumbs>
                    </div>
                    <main className="bg-white shadow-lg p-5 my-5 rounded">
                        <Typography variant="paragraph" className="font-medium font-poppins">Laporan Sync dinda Tanggal 2024-08-08</Typography> <br />
                        {plannings.length > 0 ?
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div>
                                    <Typography variant="paragraph" className="font-medium font-poppins">Report</Typography> <hr />
                                    <div>
                                        {kunjungans.length > 0 ?
                                            kunjungans.map((item) => (
                                                <p className="my-2">{item.customer.nama_customer}</p>
                                            ))
                                            : <>a</>}
                                    </div>
                                </div>
                                <div>
                                    <Typography variant="paragraph" className="font-medium font-poppins">Planning</Typography> <hr />
                                    <div>
                                        {plannings.length > 0 ?
                                            plannings.map((item) => (
                                                <p className="my-2">{item.customer.nama_customer}</p>
                                            ))
                                            : <></>}
                                    </div>
                                </div>
                                <div className="lg:col-span-2">
                                    <Typography variant="paragraph" className="font-medium font-poppins">Tingkat Kesesuaian</Typography> <hr /> <br/>
                                    {formattedPersen <= 33 ?
                                        <Progress value={formattedPersen || 0} color="red" label /> : formattedPersen <= 66 ?
                                            <Progress value={formattedPersen || 0} color="yellow" label /> :
                                            <Progress value={formattedPersen || 0} color="green" label />
                                    } <br/>
                                    <Typography variant="small" className="font-medium font-poppins">*Baris dengan warna merah mengartikan planning yang tidak ter-report</Typography>
                                </div>
                            </div> : <div>Data Tidak Ditemukan</div>}
                    </main>
                </div>
            </section>
        </>
    )
}

export default DetailSync;