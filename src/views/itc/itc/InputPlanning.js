import React, { useEffect, useState } from "react";
import $ from "jquery";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, IconButton, Input, Typography } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { API_CUSTOMER } from "../../../utils/BaseUrl";

function InputPlanning() {
    const [date, setDate] = useState("");
    const [customerId, setcustomerId] = useState(0);

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

    console.log(customerId);
    
    return (
        <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
            <SidebarAdmin />
            <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
                <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                    <Typography variant="lead" className="uppercase">
                        Input Planning
                    </Typography>
                    <Breadcrumbs className="bg-transparent">
                        <a href={"/dashboard"} className="opacity-60">
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
                    <div className="w-full lg:w-[50%]">
                        <div>
                            <p className="font-medium">Tanggal</p>
                            {date === "" ? (<>
                                <Input
                                    variant="static"
                                    color="blue"
                                    size="lg"
                                    type="date"
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </>) : (
                                <>
                                    <div className="flex justify-between items-center mb-2">
                                        <p>{date}</p>
                                        <IconButton size="md" color="blue">
                                            <XMarkIcon className="w-6 h-6 white" />
                                        </IconButton>
                                    </div><hr />
                                    <br />
                                    <div>
                                        <p className="font-medium">Pilih Customer</p>
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
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                </main>
            </div>
        </section>
    )
}

export default InputPlanning;