import { Breadcrumbs, Button, Input, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { API_SALESMAN } from "../../../utils/BaseUrl";

function Preparation() {
    // ALL ITC
    const [values, setvalues] = useState("");
    const [options, setoptions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const handle = async () => {
        if (values.trim() !== "") {
            const response = await fetch(
                `${API_SALESMAN}/pagination?limit=10&page=${currentPage}&search=${values}&sort=1`,
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
    // END ALL ITC    
    return (
        <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
            <SidebarAdmin />
            <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
                <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                    <Typography variant="lead" className="uppercase font-poppins">
                        Preparation
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
                    <div>
                        <div className="w-72 lg:w-[50%]">
                            <div className="mt-8">
                                <Input
                                    variant="static"
                                    color="blue"
                                    type="month"
                                    label="Bulan Tahun"
                                    required
                                // value={tglAwal}
                                // onChange={(e) => setTglAwal(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2 items-end mt-8">
                                <Input
                                    label="ITC"
                                    variant="static"
                                    color="blue"
                                    list="salesman-list"
                                    id="salesman"
                                    name="salesman"
                                    onChange={(event) => {
                                        handleChange(event);
                                    }}
                                    placeholder="Pilih ITC"
                                />
                                <datalist id="salesman-list">
                                    {options.length > 0 && (
                                        <>
                                            {options.map((option) => (
                                                <option value={option.id} key={option.id}>
                                                    {option.namaSalesman}
                                                </option>
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
                        <Button
                            className="mt-5 font-poppins font-medium"
                            color="blue"
                            type="button"
                        >
                            Cari
                        </Button>
                    </div> <br />
                </main>
            </div>
        </section>
    )
}

export default Preparation;