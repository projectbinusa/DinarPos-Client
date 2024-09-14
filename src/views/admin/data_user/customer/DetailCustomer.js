import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import { Breadcrumbs, Button, Dialog, Typography } from "@material-tailwind/react";
import axios from "axios";
import { API_CUSTOMER } from "../../../../utils/BaseUrl";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import $ from "jquery";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ModalTambahCustomerCp from "../../modal/ModalTambahCustomerCp";

function DetailCustomer() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const tableRef = useRef();
    const initializeDataTable = () => {
        if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable({});
        }
    };

    const param = useParams();
    const [customer, setcustomer] = useState({
        alamat: "", nama: "", jenis: "", kab: "", kec: "", email: "", no_hp: "", printer: "", proyektor: "",
        kls3: 0, murid: 0, internet: "", web: "", pc: "", unbk: "", jurusan: ""
    });


    // DATA CUSTOMER
    const getCustomer = async () => {
        try {
            const response = await axios.get(`${API_CUSTOMER}/${param.id}`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            const res = response.data.data;
            setcustomer({
                jenis: res.jenis,
                kab: res.kabKot.nama_kabkot,
                kec: res.kec.nama_kec,
                nama: res.nama_customer,
                alamat: res.alamat,
                email: res.email,
                no_hp: res.telp,
                printer: res.printer,
                proyektor: res.proyektor,
                kls3: res.kls3,
                murid: res.murid,
                internet: res.internet,
                web: res.web,
                pc: res.pc,
                unbk: res.unbk,
                jurusan: res.jurusan
            })
            console.log(response.data.data);

        } catch (error) {
            console.log("get all", error);
        }
    };

    useEffect(() => {
        if (param.id) {
            getCustomer();
        }
    }, [param.id]);


    return (
        <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
            <SidebarAdmin />
            <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
                <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                    <Typography variant="lead" className="uppercase">
                        Detail Customer
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
                        <a href="/data_customer">
                            <span>Customer</span>
                        </a>
                        <span className="cursor-default capitalize">Detail Customer</span>
                    </Breadcrumbs>
                </div>
                <main className="bg-white shadow-lg px-5 py-8 my-5 rounded">
                    <Typography variant="paragraph" className="uppercase font-poppins font-normal">
                        detail CUSTOMER
                    </Typography> <br />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5">
                        <div>
                            <Typography variant="small" className="font-poppins font-normal">Nama Customer</Typography>
                            <p className="mt-2">{customer.nama}</p>
                            <hr /> <br />
                        </div>
                        <div>
                            <Typography variant="small" className="font-poppins font-normal">Jenis</Typography>
                            <p className="mt-2">{customer.jenis}</p>
                            <hr /> <br />
                        </div>
                        <div>
                            <Typography variant="small" className="font-poppins font-normal">Daerah</Typography>
                            <p className="mt-2">{customer.kab} / {customer.kec}</p>
                            <hr /> <br />
                        </div>
                        <div>
                            <Typography variant="small" className="font-poppins font-normal">Alamat</Typography>
                            <p className="mt-2">{customer.alamat}</p>
                            <hr /> <br />
                        </div>
                        <div>
                            <Typography variant="small" className="font-poppins font-normal">Email</Typography>
                            <p className="mt-2">{customer.email}</p>
                            <hr /> <br />
                        </div>
                        <div>
                            <Typography variant="small" className="font-poppins font-normal">No Telp / HP</Typography>
                            <p className="mt-2">{customer.no_hp}</p>
                            <hr /> <br />
                        </div>
                        <div>
                            <Typography variant="small" className="font-poppins font-normal">Printer / Proyektor</Typography>
                            <p className="mt-2">{customer.printer} / {customer.proyektor}</p>
                            <hr /> <br />
                        </div>
                        <div>
                            <Typography variant="small" className="font-poppins font-normal">Internet / Web</Typography>
                            <div className="mt-2 flex gap-2">
                                <p>{customer.internet === "Y" ? (<span><CheckIcon className="w-6 h-6 black" /></span>)
                                    : customer.internet === "T" ? (<span><XMarkIcon className="w-6 h-6 black" /></span>) : (<span>-</span>)
                                }</p> / <p>{customer.web === "Y" ? (<span><CheckIcon className="w-6 h-6 black" /></span>)
                                    : customer.web === "T" ? (<span><XMarkIcon className="w-6 h-6 black" /></span>) : (<span>-</span>)}</p>
                            </div>
                            <hr /> <br />
                        </div>
                        <div>
                            <Typography variant="small" className="font-poppins font-normal">Jumlah Murid / Kls3</Typography>
                            <p className="mt-2">{customer.murid} / {customer.kls3}</p>
                            <hr /> <br />
                        </div>
                        <div>
                            <Typography variant="small" className="font-poppins font-normal">PC</Typography>
                            <p className="mt-2">{customer.pc}</p>
                            <hr /> <br />
                        </div>
                        <div>
                            <Typography variant="small" className="font-poppins font-normal">UNBK</Typography>
                            <p className="mt-2">{customer.unbk === "Y" ? (<>Sudah</>) : customer.unbk === "T" ? (<>Belum</>) : (<>-</>)}</p>
                            <hr /> <br />
                        </div>
                        <div>
                            <Typography variant="small" className="font-poppins font-normal">Jurusan</Typography>
                            <p className="mt-2">{customer.jurusan}</p>
                            <hr /> <br />
                        </div>
                    </div> <br />
                    <div className="flex justify-between align-center">
                        <Typography variant="paragraph" className="uppercase font-poppins font-normal">
                            Data CUSTOMER CP
                        </Typography>
                        <Button variant="gradient" color="blue" className="font-poppins font-medium" onClick={handleOpen}>Tambah customer CP</Button>
                    </div>  <br />
                    <div className="rounded my-5 p-2 w-full overflow-auto">
                        <table
                            id="example_data"
                            ref={tableRef}
                            className="rounded-sm table-auto w-full"
                        >
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="text-sm py-2 px-3 font-semibold">No</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Nama</th>
                                    <th className="text-sm py-2 px-3 font-semibold">ITC</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Jabatan</th>
                                    <th className="text-sm py-2 px-3 font-semibold">No HP / Telp</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Email</th>
                                    <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                                </tr>
                            </thead>
                        </table></div>
                </main>
            </div>
            {/* MODAL TAMBAH CUSTOMER CP */}
            <Dialog open={open} handler={handleOpen} size="lg">
                <ModalTambahCustomerCp handleOpen={handleOpen} />
            </Dialog>
            {/* END MODAL TAMBAH CUSTOMER CP */}
        </section>
    )
}

export default DetailCustomer;