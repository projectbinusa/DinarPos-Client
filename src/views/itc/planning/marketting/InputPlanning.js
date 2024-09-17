import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import { Breadcrumbs, Button, Dialog, IconButton, Input, Textarea, Typography } from "@material-tailwind/react";
import { CheckIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { API_CUSTOMER, API_CUSTOMER_CP, API_ITC, API_PENGGUNA, API_PLANNING } from "../../../../utils/BaseUrl";
import Decrypt from "../../../../component/Decrypt";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ModalEditPlanning from "./ModalEditPlanning";

function InputPlanning() {
    const [date, setDate] = useState("");
    const [customerId, setcustomerId] = useState(0);
    const [salesmanId, setsalesmanId] = useState(0);
    const [planning, setplanning] = useState([]);
    const [customer, setcustomer] = useState({
        terakhir_update: "",
        nama: "",
        jenis: "",
        kab: "",
        kec: ""
    });

    const history = useHistory();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const [dataToEdit, setdataToEdit] = useState({
        terakhir_update: "",
        nama: "",
        jenis: "",
        kab: "",
        kec: "",
        pihak: "",
        ket: "",
        idCustomer: "",
        idPlan: "",
        namaSalesman: ""
    });

    const dataToEditPlanning = (terakhir_update, nama, jenis, kab, kec, pihak, ket, idCustomer, idPlan, namaSalesman) => {
        setdataToEdit({ terakhir_update: terakhir_update, nama: nama, jenis: jenis, kab: kab, kec: kec, pihak: pihak, ket: ket, idCustomer: idCustomer, idPlan: idPlan, namaSalesman: namaSalesman })
    }

    // ADD PLANNING
    const [customerId2, setcustomerId2] = useState(0);
    const [bertemu, setbertemu] = useState("");
    const [ket, setket] = useState("");
    const [namaSalesman, setnamaSalesman] = useState("");

    const tableRef = useRef();
    const initializeDataTable = () => {
        if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable({});
        }
    };

    // ALL CUSTOMER
    const [values, setvalues] = useState("");
    const [options, setoptions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const handle = async () => {
        if (values.trim() !== "") {
            const response = await fetch(
                `${API_CUSTOMER}/pagination?limit=10&page=${currentPage}&search=${values}&sort=1`,
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
        setCurrentPage(1);
    };

    const settingCustomer = () => {
        setcustomerId2(customerId)
    }

    // ALL CUSTOMER CP
    const [valuescp, setvaluescp] = useState("");
    const [optionscp, setoptionscp] = useState([]);
    const [currentPageCP, setCurrentPageCP] = useState(1);

    const handleCP = async () => {
        if (valuescp.trim() !== "") {
            const response = await fetch(
                `${API_CUSTOMER_CP}/pagination?id_customer=${customerId}&limit=10&page=${currentPageCP}&search=${valuescp}&sort=1`,
                {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                }
            );
            const data = await response.json();
            setoptionscp(data.data);
        } else {
            return;
        }
    };

    useEffect(() => {
        handleCP();
    }, [currentPageCP, valuescp]);

    const handleChangeCP = (event) => {
        setvaluescp(event.target.value);
        setCurrentPageCP(1);
    };

    const handleDate = () => {
        setDate("")
    }

    const formatDate = (value) => {
        const date = new Date(value);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
    };

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    // NAMA PENGGUNA
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
                        setnamaSalesman(ress.data.data.namaSalesman);
                    })
                } catch (err) {
                    console.log(err);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    // ALL PLANNING
    const getAll = async () => {
        try {
            // const response = await axios.get(`${API_PLANNING}`, {
            //     headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            // });
            const response = await axios.get(`${API_PLANNING}/salesman/date?id_salesman=${salesmanId}&tanggal=${date}`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setplanning(response.data.data);
            console.log(response.data);
        } catch (error) {
            console.log("get all", error);
        }
    };

    useEffect(() => {
        if (date !== "") {
            getAll();
        }
    }, [date]);

    // DATA CUSTOMER
    const getCustomer = async () => {
        try {
            const response = await axios.get(`${API_CUSTOMER}/${customerId2}`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            const res = response.data.data;
            setcustomer({
                terakhir_update: formatDate(res.updated_date),
                jenis: res.jenis,
                kab: res.kabKot.nama_kabkot,
                kec: res.kec.nama_kec,
                nama: res.nama_customer
            })
        } catch (error) {
            console.log("get all", error);
        }
    };

    useEffect(() => {
        if (customerId2 !== 0) {
            getCustomer();
        }
    }, [customerId2]);

    useEffect(() => {
        if (planning && planning.length > 0) {
            initializeDataTable();
        }
    }, [planning]);

    // TAMBAH PLANNING
    const addPlanning = async (e) => {
        e.preventDefault();

        const data = {
            bertemu: bertemu,
            id_customer: customerId2,
            ket: ket,
            nama: namaSalesman,
            tgl: date
        }

        console.log(data);

        try {
            await axios.post(`${API_PLANNING}/add`, data, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            })
            Swal.fire({
                icon: "success",
                title: "Data Berhasil Ditambahkan!",
                showConfirmButton: false,
                timer: 1500,
            });
            setcustomerId2(0)
        } catch (error) {
            if (error.ressponse && error.response.status === 401) {
                localStorage.clear();
                history.push("/");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Tambah Data Gagal!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                console.log(error);
            }
        }
    }

    // DELETE PLANNING
    const deletePlanning = async (id) => {
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
                    .delete(`${API_PLANNING}/delete/` + id, {
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
                            window.location.reload();
                        }, 1500);
                    }).catch((err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Hapus Data Gagal!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        console.log(err);
                    })
            }
        });
    };

    return (
        <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
            <SidebarAdmin />
            <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
                <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                    <Typography variant="lead" className="uppercase">
                        Input Planning
                    </Typography>
                    <Breadcrumbs className="bg-transparent">
                        <a href={"/home"} className="opacity-60">
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
                        <span className="cursor-default">Input</span>
                    </Breadcrumbs>
                </div>
                <main className="bg-white shadow-lg p-5 my-5 rounded">
                    <div>
                        {date === "" ? (<>
                            <div className="w-full lg:w-[50%]">
                                <p className="font-medium">Tanggal</p>
                                <Input
                                    variant="static"
                                    color="blue"
                                    size="lg"
                                    type="date"
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        </>) : (
                            <>
                                <div className="w-full lg:w-[50%]">
                                    <p className="font-medium">Tanggal</p>
                                    <div className="flex justify-between items-center mb-2">
                                        <p>{date}</p>
                                        <IconButton size="md" color="blue" onClick={handleDate}>
                                            <XMarkIcon className="w-6 h-6 white" />
                                        </IconButton>
                                    </div><hr />
                                    <br />
                                    <div>
                                        <p className="font-medium">Pilih Customer</p>
                                        <div>
                                            <div className="flex gap-2 items-end">
                                                <Input
                                                    variant="static"
                                                    color="blue"
                                                    list="customer-list"
                                                    id="customer"
                                                    name="customer"
                                                    onChange={(event) => {
                                                        handleChange(event);
                                                        setcustomerId(event.target.value);
                                                    }}
                                                    placeholder="Pilih Customer"
                                                />
                                                <datalist id="customer-list">
                                                    {options.length > 0 && (
                                                        <>
                                                            {options.map((option) => (
                                                                <option value={option.id} key={option.id}>{option.nama_customer}</option>
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
                                            <br />
                                            <Button variant="gradient" color="blue" type="button" onClick={settingCustomer} className="font-popins font-medium">
                                                Pilih
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                {customerId2 !== 0 ? (<>
                                    <br /> <br />
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <Input variant="static"
                                            color="blue"
                                            size="lg" readOnly
                                            label="Terakhir Diupdate" value={customer.terakhir_update} />
                                        <Input variant="static"
                                            color="blue"
                                            size="lg" readOnly
                                            label="Nama Customer" value={customer.nama} />
                                        <Input variant="static"
                                            color="blue"
                                            size="lg" readOnly
                                            label="Jenis" value={customer.jenis} />
                                        <Input variant="static"
                                            color="blue"
                                            size="lg" readOnly
                                            label="Daerah" value={`${customer.kab} / ${customer.kec}`} />
                                    </div>
                                    <div className="flex gap-2 items-end mt-8">
                                        <Input
                                            variant="static"
                                            color="blue"
                                            list="customer-cp-list"
                                            id="customer-cp"
                                            name="customer-cp"
                                            label="Pihak Dituju"
                                            onChange={(event) => {
                                                handleChangeCP(event);
                                                setbertemu(event.target.value);
                                            }}
                                            placeholder="Pilih Customer CP"
                                        />
                                        <datalist id="customer-cp-list">
                                            {optionscp.length > 0 && (
                                                <>
                                                    {optionscp.map((option) => (
                                                        <option value={`${option.nama_cp} / ${option.no_hp}`} key={option.id}>{option.nama_cp} ( {option.no_hp} )</option>
                                                    ))}
                                                </>
                                            )}
                                        </datalist>

                                        <div className="flex gap-2">
                                            <button
                                                className="text-sm bg-gray-400 px-1"
                                                onClick={() => setCurrentPageCP(currentPageCP - 1)}
                                                disabled={currentPageCP === 1}
                                            >
                                                Prev
                                            </button>
                                            <button
                                                className="text-sm bg-gray-400 px-1"
                                                onClick={() => setCurrentPageCP(currentPageCP + 1)}
                                                disabled={!optionscp.length}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <Textarea
                                            color="blue"
                                            variant="static"
                                            label="Tujuan"
                                            placeholder="Masukkan Tujuan"
                                            onChange={(e) => setket(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <br />
                                    <Button variant="gradient" color="blue" className="font-popins font-medium" onClick={addPlanning}>Tambah</Button>
                                </>) : (<></>)}

                                {planning.length > 0 ? (
                                    <>
                                        <br />
                                        <div className="rounded my-5 p-2 w-full overflow-auto">
                                            <table
                                                id="example_data"
                                                ref={tableRef}
                                                className="rounded-sm table-auto w-full"
                                            >
                                                <thead className="bg-blue-500 text-white">
                                                    <tr>
                                                        <th className="text-sm py-2 px-3 font-semibold">No</th>
                                                        <th className="text-sm py-2 px-3 font-semibold">Nama Customer</th>
                                                        <th className="text-sm py-2 px-3 font-semibold">Jenis</th>
                                                        <th className="text-sm py-2 px-3 font-semibold">Daerah</th>
                                                        <th className="text-sm py-2 px-3 font-semibold">Jml Murid / Kls3</th>
                                                        <th className="text-sm py-2 px-3 font-semibold">Jml PC</th>
                                                        <th className="text-sm py-2 px-3 font-semibold">UNBK</th>
                                                        <th className="text-sm py-2 px-3 font-semibold">Jurusan</th>
                                                        <th className="text-sm py-2 px-3 font-semibold">Pihak Dituju</th>
                                                        <th className="text-sm py-2 px-3 font-semibold">Tujuan</th>
                                                        <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {planning.map((res, idx) => (
                                                        <tr key={idx}>
                                                            <td className="text-sm w-[4%]">{idx + 1}</td>
                                                            <td className="text-sm py-2 px-3">{res.customer.nama_customer}</td>
                                                            <td className="text-sm py-2 px-3">{res.customer.jenis}</td>
                                                            <td className="text-sm py-2 px-3">{res.customer.kabKot.nama_kabkot} / {res.customer.kec.nama_kec}</td>
                                                            {res.customer.jenis === "Sekolah" ? (<>
                                                                <td className="text-sm py-2 px-3">{res.customer.jml} / {res.customer.kls3}</td>
                                                                <td className="text-sm py-2 px-3">{res.customer.pc}</td>
                                                                <td className="text-sm py-2 px-3">{res.customer.unbk === "Y" ? (<>
                                                                    <span><CheckIcon className="w-6 h-6 black" /></span>
                                                                </>) : (<>
                                                                    <span><XMarkIcon className="w-6 h-6 black" /></span>
                                                                </>)}</td>
                                                                <td className="text-sm py-2 px-3">{res.customer.jurusan}</td>
                                                            </>) : (<>
                                                                <td className="text-sm py-2 px-3">-</td>
                                                                <td className="text-sm py-2 px-3">-</td>
                                                                <td className="text-sm py-2 px-3">-</td>
                                                                <td className="text-sm py-2 px-3">-</td>
                                                            </>)}
                                                            <td className="text-sm py-2 px-3">{res.bertemu}</td>
                                                            <td className="text-sm py-2 px-3">{res.ket}</td>
                                                            <td className="text-sm py-2 px-3 flex items-center justify-center">
                                                                {formatDate(res.tgl) === formattedDate ? (<>
                                                                    <div className="flex flex-col lg:flex-row gap-3">
                                                                        <IconButton size="md" color="light-blue" onClick={() => {
                                                                            handleOpen();
                                                                            dataToEditPlanning(res.updated_date, res.customer.nama_customer, res.customer.jenis, res.customer.kabKot.nama_kabkot, res.customer.kec.nama_kec, res.bertemu, res.ket, res.customer.id, res.idPlan, res.salesman.namaSalesman);
                                                                        }}
                                                                        >
                                                                            <PencilIcon className="w-6 h-6 white" />
                                                                        </IconButton>
                                                                        <IconButton size="md" color="red" onClick={() => deletePlanning(res.idPlan)}>
                                                                            <TrashIcon className="w-6 h-6 white" />
                                                                        </IconButton>
                                                                    </div>
                                                                </>) : (<></>)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                ) : (<></>)}
                            </>
                        )}
                    </div>
                </main>
            </div>
            <Dialog open={open} handler={handleOpen} size="lg">
                <ModalEditPlanning handleOpen={handleOpen} terakhirUpdate={dataToEdit.terakhir_update} nama={dataToEdit.nama} jenis={dataToEdit.jenis} kab={dataToEdit.kab} kec={dataToEdit.kec} pihak={dataToEdit.pihak} ket={dataToEdit.ket} idCustomer={dataToEdit.idCustomer} idPlan={dataToEdit.idPlan} namaSalesman={dataToEdit.namaSalesman}/>
            </Dialog>
        </section>
    )
}

export default InputPlanning;