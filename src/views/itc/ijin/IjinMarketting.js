import React, { useEffect, useRef, useState } from "react";
import { API_IJIN, API_ITC, API_PENGGUNA } from "../../../utils/BaseUrl";
import axios from "axios";
import Decrypt from "../../../component/Decrypt";
import $ from "jquery"
import Swal from "sweetalert2";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Button, IconButton, Typography } from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import formatDate from "../../../component/FormatDate";

function IjinMarketting() {
    const tableRef = useRef(null);
    const [ijins, setIjins] = useState([]);
    const [salesmanId, setsalesmanId] = useState(0);

    const id = Decrypt();
    useEffect(() => {
        axios
            .get(`${API_PENGGUNA}/` + id, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            })
            .then((res) => {
                const response = res.data.data;

                if (response?.levelPengguna == "Marketting") {
                    const nama = response.namaPengguna;
                    try {
                        axios.get(`${API_ITC}/nama?nama=` + nama, {
                            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                        }).then((ress) => {
                            setsalesmanId(ress.data.data.id || 0);
                        })
                    } catch (err) {
                        console.log(err);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const initializeDataTable = () => {
        if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable({});
        }
    };

    // BY ID SALESMAN
    const getAllIjinSalesman = async () => {
        try {
            const response = await axios.get(`${API_IJIN}/salesman/${salesmanId}`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setIjins(response.data.data || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getAllIjinSalesman();
    }, [salesmanId]);

    const hapusIjin = async (id) => {
        Swal.fire({
            title: "Apakah Anda Ingin Menghapus?",
            text: "Perubahan data tidak bisa dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`${API_IJIN}/${id}`, {
                        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                    })
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Data Berhasil Dihapus!",
                            showConfirmButton: false,
                            timer: 1500,
                        });

                        setTimeout(() => {
                            window.location.reload();
                        }, 1500);
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Gagal!",
                            text: "Hapus data gagal!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        console.log(err);
                    });
            }
        });
    };

    useEffect(() => {
        if (ijins && ijins.length > 0) {
            initializeDataTable();
        }
    }, [ijins]);

    return (
        <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
            <SidebarAdmin />
            <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
                <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                    <Typography variant="lead" className="uppercase">
                        Ijin
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
                    <a href="/add_ijin" className="float-right mb-5">
                        <Button variant="gradient" color="blue" className="font-popins font-medium">
                            Tambah
                        </Button>
                    </a>
                    <div className="rounded my-5 p-2 w-full overflow-x-auto">
                        <table id="example_data" ref={tableRef} className="table-auto w-full border-collapse rounded-sm">
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="text-xs py-3 px-4">No</th>
                                    <th className="text-xs py-3 px-4">Durasi</th>
                                    <th className="text-xs py-3 px-4">Tanggal Awal</th>
                                    <th className="text-xs py-3 px-4">Tanggal Akhir</th>
                                    <th className="text-xs py-2 px-3">Salesman</th>
                                    <th className="text-xs py-3 px-4">Keterangan</th>
                                    <th className="text-xs py-3 px-4">Foto</th>
                                    <th className="text-xs py-3 px-4">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ijins.length > 0 ? (
                                    ijins.map((row, index) => (
                                        <tr key={index} className="border-b border-gray-200">
                                            <td className="py-3 px-4">{index + 1}</td>
                                            <td className="py-3 px-4">{row.jenis}</td>
                                            <td className="py-3 px-4">{formatDate(row.tgl_a)}</td>
                                            <td className="py-3 px-4">{formatDate(row.tgl_b)}</td>
                                            <td className="py-3 px-4">{index + 1}</td>
                                            <td className="py-3 px-4">{index + 1}</td>
                                            <td className="py-3 px-4">
                                                <img src={row.foto} alt="foto" className="h-24 w-24 rounded object-cover" />
                                            </td>
                                            <td className="py-2 px-3 flex items-center justify-center">
                                                <a href={"/detail_kunjungan/" + row.id}>
                                                    <IconButton size="md" color="green">
                                                        <TrashIcon className="w-6 h-6 white" />
                                                    </IconButton>
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center py-4 bg-gray-100 text-xs">
                                            Tidak Ada Data
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                </main>
            </div>
        </section>
    );
}

export default IjinMarketting;