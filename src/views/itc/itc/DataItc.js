import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Button, IconButton, Typography } from "@material-tailwind/react";
import $ from "jquery";
import "datatables.net";
import "./../../../assets/styles/datatables.css";
import { API_ITC, API_PENGGUNA } from "../../../utils/BaseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

function DataItc() {
    const tableRef = useRef(null);
    const history = useHistory(null);
    const initializeDataTable = () => {
        if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable({});
        }
    };

    const [itcs, setItcs] = useState([]);

    // GET ALL CUSTOMER
    const getAll = async () => {
        try {
            const response = await axios.get(`${API_ITC}`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setItcs(response.data.data);
        } catch (error) {
            console.log("get all", error);
        }
    };

    useEffect(() => {
        getAll();
    }, []);

    useEffect(() => {
        if (itcs && itcs.length > 0) {
            initializeDataTable();
        }
    }, [itcs]);

    // DELETE ITC
    const deleteItc = async (id) => {
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
                    .delete(`${API_ITC}/` + id, {
                        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                    })
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Dihapus!",
                            showConfirmButton: false,
                            timer: 1500,
                        });

                        setTimeout(() => {
                            history.push("/data_itc");
                            window.location.reload();
                        }, 1500);
                    });
            }
        });
    };

    const [pengguna, setPengguna] = useState([]);

    const penggunaList = async (nama) => {
        try {
            const response = await axios.get(`${API_PENGGUNA}/nama?nama=${nama}`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log("get all", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchPengguna = async () => {
            const penggunas = await Promise.all(
                itcs.map(async (penggunaz) => {
                    const penggunad = await penggunaList(penggunaz.namaSalesman);
                    return penggunad;
                })
            );
            setPengguna(penggunas);
        };

        fetchPengguna();
    }, [itcs]);

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
                            <tbody>
                                {itcs.length > 0 ? (
                                    itcs.map((itc, index) => {
                                        const penggunaa = pengguna[index] || [];
                                        return (
                                            <tr key={index}>
                                                <td className="text-sm w-[4%]">{index + 1}</td>
                                                <td className="text-sm py-2 px-3">
                                                    {itc.namaSalesman}
                                                </td>
                                                <td className="text-sm py-2 px-3">
                                                    {penggunaa.usernamePengguna}
                                                </td>
                                                <td className="text-sm py-2 px-3">
                                                    {itc.alamatSalesman}
                                                </td>
                                                <td className="text-sm py-2 px-3">
                                                    {itc.noTelpSalesman}
                                                </td>
                                                <td className="text-sm py-2 px-3">
                                                    {itc.target}
                                                </td>
                                                <td className="text-sm py-2 px-3 flex items-center justify-center">
                                                    <div className="flex flex-col lg:flex-row gap-3">
                                                        <a href={"/edit_itc/" + itc.id}>
                                                            <IconButton size="md" color="light-blue">
                                                                <PencilIcon className="w-6 h-6 white" />
                                                            </IconButton>
                                                        </a>
                                                        <IconButton
                                                            size="md"
                                                            color="red"
                                                            type="button"
                                                            onClick={() =>
                                                                deleteItc(itc.id)
                                                            }
                                                        >
                                                            <TrashIcon className="w-6 h-6 white" />
                                                        </IconButton>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="text-sm text-center capitalize py-2 bg-gray-100 "
                                        >
                                            Tidak ada data
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </section>
    )
}

export default DataItc;