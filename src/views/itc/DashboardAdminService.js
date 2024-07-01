import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../component/SidebarAdmin";
import { Breadcrumbs, Button, Card, CardBody, CardFooter, Input, Typography } from "@material-tailwind/react";
import { CheckBadgeIcon, ChevronRightIcon, Cog6ToothIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function DashboardAdminService() {
    return (<section className="lg:flex font-poppins bg-gray-50 min-h-screen">
        <SidebarAdmin />
        <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
            <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                <Typography variant="lead" className="uppercase">
                    Dashboard                </Typography>
                <Breadcrumbs className="bg-transparent">
                    <a href="/dashboard_service" className="opacity-60">
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
            <br />
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-end mb-6 lg:justify-between">
                <div className="w-full">
                    <Input variant="outline" label="Tanggal Awal" color="blue" type="date" />
                </div>
                <div className="w-full">
                    <Input variant="outline" label="Tanggal Akhir" color="blue" type="date" />
                </div>
                <div className="w-full lg:w-auto flex justify-start items-center">
                    <Button
                        variant="gradient"
                        color="blue"
                        // onClick={handleSearchByMonth}
                        size="md"
                    >
                        <MagnifyingGlassIcon className="w-5 h-5" />
                    </Button>
                </div>
            </div>
            <div className="grid lg:grid-cols-4 grid-cols-1 gap-6 lg:mr-4 mx-5 lg:mx-0">
                <Card className="p-0">
                    <CardBody className="bg-blue-100 flex justify-between items-center rounded-t">
                        <Cog6ToothIcon className="h-12 w-12 text-blue-800" />
                        <div>
                            <Typography variant="h3" className="text-blue-800 text-right">
                                12
                            </Typography>
                            <Typography variant="paragraph" className="text-blue-800">Service Terbaru
                            </Typography>
                        </div>
                    </CardBody>
                    <CardFooter className="py-3 px-6">
                        <a className="flex justify-between items-center">
                            <Typography variant="paragraph" color="blue-gray">Lihat Detail
                            </Typography>
                            <ChevronRightIcon className="h-5 w-6" color="blue-gray" />
                        </a>
                    </CardFooter>
                </Card>
                <Card className="p-0">
                    <CardBody className="bg-green-100 flex justify-between items-center rounded-t">
                        <CheckBadgeIcon className="h-12 w-12 text-green-800" />
                        <div>
                            <Typography variant="h3" className="text-green-800 text-right">
                                12
                            </Typography>
                            <Typography variant="paragraph" className="text-green-800">Service Ready
                            </Typography>
                        </div>
                    </CardBody>
                    <CardFooter className="py-3 px-6">
                        <a className="flex justify-between items-center">
                            <Typography variant="paragraph" color="blue-gray">Lihat Detail
                            </Typography>
                            <ChevronRightIcon className="h-5 w-6" color="blue-gray" />
                        </a>
                    </CardFooter>
                </Card>
                <Card className="p-0">
                    <CardBody className="bg-blue-100 flex justify-between items-center rounded-t">
                        <Cog6ToothIcon className="h-12 w-12 text-blue-800" />
                        <div>
                            <Typography variant="h3" className="text-blue-800 text-right">
                                12
                            </Typography>
                            <Typography variant="paragraph" className="text-blue-800">Service Proses
                            </Typography>
                        </div>
                    </CardBody>
                    <CardFooter className="py-3 px-6">
                        <a className="flex justify-between items-center">
                            <Typography variant="paragraph" color="blue-gray">Lihat Detail
                            </Typography>
                            <ChevronRightIcon className="h-5 w-6" color="blue-gray" />
                        </a>
                    </CardFooter>
                </Card>
                <Card className="p-0">
                    <CardBody className="bg-blue-100 flex justify-between items-center rounded-t">
                        <Cog6ToothIcon className="h-12 w-12 text-blue-800" />
                        <div>
                            <Typography variant="h3" className="text-blue-800 text-right">
                                12
                            </Typography>
                            <Typography variant="paragraph" className="text-blue-800">Service Retur
                            </Typography>
                        </div>
                    </CardBody>
                    <CardFooter className="py-3 px-6">
                        <a className="flex justify-between items-center">
                            <Typography variant="paragraph" color="blue-gray">Lihat Detail
                            </Typography>
                            <ChevronRightIcon className="h-5 w-6" color="blue-gray" />
                        </a>
                    </CardFooter>
                </Card>
            </div>
            <div className="grid lg:grid-cols-4 grid-cols-1 gap-6 lg:mr-4 mx-5 lg:mx-0">
                <Card className="p-0">
                    <CardBody className="bg-green-100 flex justify-between items-center rounded-t">
                        <CheckBadgeIcon className="h-12 w-12 text-green-800" />
                        <div>
                            <Typography variant="h3" className="text-green-800 text-right">
                                12
                            </Typography>
                            <Typography variant="paragraph" className="text-green-800">Service Cancel
                            </Typography>
                        </div>
                    </CardBody>
                    <CardFooter className="py-3 px-6">
                        <a className="flex justify-between items-center">
                            <Typography variant="paragraph" color="blue-gray">Lihat Detail
                            </Typography>
                            <ChevronRightIcon className="h-5 w-6" color="blue-gray" />
                        </a>
                    </CardFooter>
                </Card>
                <Card className="p-0">
                    <CardBody className="bg-blue-100 flex justify-between items-center rounded-t">
                        <Cog6ToothIcon className="h-12 w-12 text-blue-800" />
                        <div>
                            <Typography variant="h3" className="text-blue-800 text-right">
                                12
                            </Typography>
                            <Typography variant="paragraph" className="text-blue-800">Service > 1 Minggu
                            </Typography>
                        </div>
                    </CardBody>
                    <CardFooter className="py-3 px-6">
                        <a className="flex justify-between items-center">
                            <Typography variant="paragraph" color="blue-gray">Lihat Detail
                            </Typography>
                            <ChevronRightIcon className="h-5 w-6" color="blue-gray" />
                        </a>
                    </CardFooter>
                </Card>
                <Card className="p-0">
                    <CardBody className="bg-blue-100 flex justify-between items-center rounded-t">
                        <Cog6ToothIcon className="h-12 w-12 text-blue-800" />
                        <div>
                            <Typography variant="h3" className="text-blue-800 text-right">
                                12
                            </Typography>
                            <Typography variant="paragraph" className="text-blue-800">Service Taken
                            </Typography>
                        </div>
                    </CardBody>
                    <CardFooter className="py-3 px-6">
                        <a className="flex justify-between items-center">
                            <Typography variant="paragraph" color="blue-gray">Lihat Detail
                            </Typography>
                            <ChevronRightIcon className="h-5 w-6" color="blue-gray" />
                        </a>
                    </CardFooter>
                </Card>
            </div>
        </div>
    </section>
    )
}
export default DashboardAdminService;