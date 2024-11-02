import React from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Button, Input, Typography } from "@material-tailwind/react";

function EditFinish() {
    return (
        <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
            <SidebarAdmin />
            <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
                <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                    <Typography variant="lead" className="uppercase font-poppins">
                        Edit Finish
                    </Typography>
                    <Breadcrumbs className="bg-transparent">
                        <a href="/home" className="opacity-60">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                        </a>
                        <a href="/dealfinish_marketting">
                            <span>Deal Finish</span>
                        </a>
                    </Breadcrumbs>
                </div>
                <main className="bg-white shadow-lg px-5 py-8 my-5 rounded">
                    <Input
                        variant="static"
                        color="blue"
                        size="lg"
                        label="Customer"
                        // value={customer}
                        readOnly
                    />
                    <br />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Input
                            variant="static"
                            color="blue"
                            size="lg"
                            label="Foto BAST"
                            type="file"
                            accept="image/*"
                            // onChange={(e) => setBast(e.target.files[0])}
                        />
                        <Input
                            variant="static"
                            color="blue"
                            size="lg"
                            label="Foto BAUT"
                            type="file"
                            accept="image/*"
                            // onChange={(e) => setBaut(e.target.files[0])}
                        />
                        <Input
                            variant="static"
                            color="blue"
                            size="lg"
                            label="Foto BASO"
                            type="file"
                            accept="image/*"
                            // onChange={(e) => setBaso(e.target.files[0])}
                        />
                        <div>
                            <Input
                                variant="static"
                                color="blue"
                                size="lg"
                                label="File SPK"
                                type="file"
                                // onChange={(e) => setFileSpk(e.target.files[0])}
                            />
                            <Typography variant="small" className="font-poppins font-medium">
                                Upload File SPK .doc, .docx
                            </Typography>
                        </div>
                        <Input
                            variant="static"
                            color="blue"
                            size="lg"
                            label="Foto SPK"
                            type="file"
                            accept="image/*"
                            // onChange={(e) => setSpk(e.target.files[0])}
                        />
                        <Input
                            variant="static"
                            color="blue"
                            size="lg"
                            label="Foto Envident Datang"
                            type="file"
                            accept="image/*"
                            // onChange={(e) => setEvDatang(e.target.files[0])}
                        />
                        <Input
                            variant="static"
                            color="blue"
                            size="lg"
                            label="Foto Envident Proses"
                            type="file"
                            accept="image/*"
                            // onChange={(e) => setEvProses(e.target.files[0])}
                        />
                        <Input
                            variant="static"
                            color="blue"
                            size="lg"
                            label="Foto Envident Finish"
                            type="file"
                            accept="image/*"
                            // onChange={(e) => setEvFinish(e.target.files[0])}
                        />
                    </div>
                    <br />
                    <Button
                        variant="gradient"
                        color="blue"
                        type="button"
                        // onClick={addKunjungan}
                        className="font-popins font-medium"
                    >
                        Tambah
                    </Button>
                </main>
            </div>
        </section>
    )
}

export default EditFinish;