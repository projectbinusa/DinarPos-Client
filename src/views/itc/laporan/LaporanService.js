import React from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  ArrowPathIcon,
  CheckIcon,
  CheckCircleIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
// import $ from "jquery";

function LaporanService() {
  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
      <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Laporan Service
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href={"dashboard_service"} className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011-1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/laporan_service">
              <span>Laporan Service</span>
            </a>
          </Breadcrumbs>
        </div>
        <br />
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-end mb-6 lg:justify-between">
          <div className="w-full">
            <Input
              variant="outlined"
              label="Tanggal Awal"
              color="blue"
              type="date"
            // onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="w-full">
            <Input
              variant="outlined"
              label="Tanggal Akhir"
              color="blue"
              type="date"
            // onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="w-full lg:w-auto flex justify-start items-center">
            <Button
              variant="gradient"
              color="blue"
              // onClick={filterTangggal}
              size="md"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          <Card className="p-0">
            <CardBody className="bg-blue-100 flex justify-between items-center rounded-t">
              <Cog6ToothIcon className="h-12 w-12 text-blue-900" />
              <Typography variant="paragraph" className="text-blue-900">
                Service Terbaru
              </Typography>
            </CardBody>
          </Card>
          <Card className="p-0">
            <CardBody className="bg-green-100 flex justify-between items-center rounded-t">
              <CheckIcon className="h-12 w-12 text-green-900" />
              <Typography variant="paragraph" className="text-green-900">
                Service Ready
              </Typography>
            </CardBody>
          </Card>
          <Card className="p-0">
            <CardBody className="bg-yellow-100 flex justify-between items-center rounded-t">
              <ArrowPathIcon className="h-12 w-12 text-yellow-900" />
              <Typography variant="paragraph" className="text-yellow-900">
                Service Proses
              </Typography>
            </CardBody>
          </Card>
        </div>
        <br />
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          <Card className="p-0">
            <CardBody className="bg-red-100 flex justify-between items-center rounded-t">
              <XMarkIcon className="h-12 w-12 text-red-900" />
              <Typography variant="paragraph" className="text-red-900">
                Service Cancel
              </Typography>
            </CardBody>
          </Card>
          <Card className="p-0">
            <CardBody className="bg-blue-100 flex justify-between items-center rounded-t">
              <CheckCircleIcon className="h-12 w-12 text-blue-900" />
              <Typography variant="paragraph" className="text-blue-900">
                Service Taken
              </Typography>
            </CardBody>
          </Card>
        </div>
        <br />
      </div>
    </section>
  );
}
export default LaporanService;
