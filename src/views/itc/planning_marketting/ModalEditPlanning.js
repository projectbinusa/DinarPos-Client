import { Button, DialogBody, DialogFooter, DialogHeader, Input, Textarea } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { API_CUSTOMER, API_CUSTOMER_CP, API_PLANNING } from "../../../utils/BaseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ModalEditPlanning({ handleOpen, terakhirUpdate, nama, jenis, kab, kec, pihak, ket, idCustomer, idPlan, namaSalesman }) {

    // ALL CUSTOMER
    const [values, setvalues] = useState("");
    const [options, setoptions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const handle = async () => {
        if (values.trim() !== "") {
            const response = await fetch(
                `${API_CUSTOMER_CP}/pagination?id_customer=${idCustomer}&limit=10&page=${currentPage}&search=${values}&sort=1`,
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
        setbertemu(event.target.value)
        setvalues(event.target.value);
        setCurrentPage(1);
    };

    const history = useHistory();

    // FORMAT TGL
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    // PUT PLANNING
    const [keterangan, setketerangan] = useState("" || ket);
    const [bertemu, setbertemu] = useState("");

    const putPlanning = async () => {
        const data = {
            bertemu: bertemu,
            id_customer: idCustomer,
            ket: keterangan,
            nama: namaSalesman,
            tgl: formattedDate
        }

        await axios.put(`${API_PLANNING}/${idPlan}`, data, {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }).then(() => {
            Swal.fire({
                icon: "success",
                title: "Data Berhasil Diubah!",
                showConfirmButton: false,
                timer: 1500,
            });
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }).catch((error) => {
            if (error.ressponse && error.response.status === 401) {
                localStorage.clear();
                history.push("/");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Ubah Data Gagal!",
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log(error);
            }
        })
    }
    return (
        <div>
            <DialogHeader>Edit Planning</DialogHeader>
            <div>
                <DialogBody className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Input variant="static"
                        color="blue"
                        size="lg" readOnly
                        label="Terakhir Diupdate" value={terakhirUpdate} />
                    <Input variant="static"
                        color="blue"
                        size="lg" readOnly
                        label="Nama Customer" value={nama} />
                    <Input variant="static"
                        color="blue"
                        size="lg" readOnly
                        label="Jenis" value={jenis} />
                    <Input variant="static"
                        color="blue"
                        size="lg" readOnly
                        label="Daerah" value={`${kab} / ${kec}`} />
                    <div className="flex gap-2 items-end lg:col-span-2">
                        <Input
                            variant="static"
                            color="blue"
                            list="customer-list"
                            id="customer"
                            name="customer"
                            label="Pihak Dituju"
                            onChange={(event) => {
                                handleChange(event);
                            }}
                            placeholder="Pilih Customer CP"
                        />
                        <datalist id="customer-list">
                            {options.length > 0 && (
                                <>
                                    {options.map((option) => (
                                        <option value={`${option.nama_cp} / ${option.no_hp}`} key={option.id}>{option.nama_cp} ( {option.no_hp} )</option>
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
                    <div className="lg:col-span-2">
                        <Textarea
                            color="blue"
                            variant="static"
                            label="Tujuan"
                            placeholder="Masukkan Tujuan"
                            defaultValue={ket}
                            onChange={(e) => setketerangan(e.target.value)}
                            required
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="gray"
                        onClick={handleOpen}
                        className="mr-1 font-poppins font-medium"
                    >
                        <span>Kembali</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="blue"
                        onClick={() => {
                            putPlanning(); handleOpen();
                        }}
                        type="button"
                        className="font-poppins font-medium"
                    >
                        <span>Simpan</span>
                    </Button>
                </DialogFooter>
            </div>
        </div>
    )
}

export default ModalEditPlanning;