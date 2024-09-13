import React, { useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Button, Input, Typography } from "@material-tailwind/react";
import { KeyIcon, MapPinIcon, PhoneIcon, ReceiptPercentIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import { API_ITC } from "../../../utils/BaseUrl";
import axios from "axios";

function AddItc() {
    const [nama, setNama] = useState("");
    const [notelephone, setNotelephone] = useState("");
    const [alamat, setAlamat] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    const [target, setTarget] = useState("");

    const history = useHistory();

    const addItc = async (e) => {
        e.preventDefault();
        const itc = {
            alamat: alamat,
            nama: nama,
            no_hp: notelephone,
            password: password,
            target: target,
            username: user
        };
        try {
            await axios.post(`${API_ITC}/add`, itc, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            Swal.fire({
                icon: "success",
                title: "Data Berhasil Ditambahkan!",
                showConfirmButton: false,
                timer: 1500,
            });
            history.push("/data_itc");
            setTimeout(() => {
                window.location.reload();
            }, 1500);
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
    };

    return (
        <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
            <SidebarAdmin />
            <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
                <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                    <Typography variant="lead" className="uppercase font-poppins">
                        Tambah ITC
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
                        <span className="cursor-default">Tambah ITC</span>
                    </Breadcrumbs>
                </div>
                <main className="bg-white shadow-lg px-5 py-8 my-5 rounded">
                    <div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <Input
                                label="Nama ITC"
                                variant="static"
                                color="blue"
                                size="lg"
                                placeholder="Masukkan Nama ITC"
                                onChange={(e) => setNama(e.target.value)}
                                icon={<UserCircleIcon />}
                            />
                            <Input
                                label="Username"
                                variant="static"
                                color="blue"
                                size="lg"
                                placeholder="Masukkan Username"
                                onChange={(e) => setUser(e.target.value)}
                                icon={<UserCircleIcon />}
                            />
                            <Input
                                label="No Telephone"
                                variant="static"
                                color="blue"
                                size="lg"
                                type="number"
                                placeholder="Masukkan No Telephone"
                                onChange={(e) => setNotelephone(e.target.value)}
                                icon={<PhoneIcon />}
                            />
                            <Input
                                label="Alamat"
                                variant="static"
                                color="blue"
                                size="lg"
                                placeholder="Masukkan Alamat"
                                onChange={(e) => setAlamat(e.target.value)}
                                icon={<MapPinIcon />}
                            />
                            <Input
                                label="Target"
                                variant="static"
                                color="blue"
                                size="lg"
                                placeholder="Masukkan Target"
                                onChange={(e) => setTarget(e.target.value)}
                                icon={<ReceiptPercentIcon />}
                            />
                            <Input
                                label="Password"
                                variant="static"
                                color="blue"
                                size="lg"
                                placeholder="Masukkan Password"
                                onChange={(e) => setPassword(e.target.value)}
                                icon={<KeyIcon />}
                            />
                            <Typography variant="small" className="text-red-400 font-poppins">
                                * Password minimal 8 karakter dengan kombinasi angka, huruf besar
                                dan kecil
                            </Typography>
                        </div>
                        <div className="mt-10 flex gap-4">
                            <Button variant="gradient" color="blue" type="button" className="font-poppins font-medium" onClick={addItc}>
                                <span>Simpan</span>
                            </Button>
                            <a href="/data_itc">
                                <Button variant="text" color="gray" className="mr-1 font-poppins font-medium">
                                    <span>Kembali</span>
                                </Button>
                            </a>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    )
}

export default AddItc;