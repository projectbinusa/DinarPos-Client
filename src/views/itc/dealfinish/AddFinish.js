import { Breadcrumbs, Typography } from "@material-tailwind/react";
import React from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";

function AddFinish() {
    return (
        <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
            <SidebarAdmin />
            <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
                <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                    <Typography variant="lead" className="uppercase font-poppins">
                        Add Finish
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
                        <a href="/dealfinish">
                            <span>Deal Finish</span>
                        </a>
                    </Breadcrumbs>
                </div>
                <main className="bg-white shadow-lg px-5 py-8 my-5 rounded">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    </div>
                </main>
            </div>
        </section>
    )
}

export default AddFinish;