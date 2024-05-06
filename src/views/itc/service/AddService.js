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

function AddService() {
  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Data Service
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
            <a href="/data_service">
              <span>Service</span>
            </a>
            <span className="cursor-default capitalize">tambah Service</span>
          </Breadcrumbs>
        </div>
        <main className="my-5 grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          <Card className="bg-blue-50 border border-blue-50 shadow-lg rounded p-1">
            <Typography
              variant="paragraph"
              className="capitalize font-medium text-blue-900 p-3"
            >
              Data Pelanggan
            </Typography>
            <CardBody className="bg-white rounded p-3">
              <ol className="mt-5">
                <li>
                  <Input
                    label="Nama Customer"
                    variant="static"
                    color="blue"
                    size="lg"
                    placeholder="Masukkan Nama Customer"
                  />{" "}
                </li>
                <br />
                <li>
                  <Input
                    label="Alamat"
                    variant="static"
                    color="blue"
                    size="lg"
                    placeholder="Masukkan Alamat"
                  />{" "}
                </li>
                <br />
                <li>
                  <Input
                    label="CP"
                    variant="static"
                    color="blue"
                    size="lg"
                    placeholder="Masukkan CP"
                  />{" "}
                </li>
                <br />
                <li>
                  <Input
                    label="Keterangan"
                    variant="static"
                    color="blue"
                    size="lg"
                    placeholder="Masukkan Keterangan"
                  />{" "}
                </li>
              </ol>
            </CardBody>
          </Card>
          <Card className="bg-yellow-50 border border-yellow-50 shadow-lg rounded p-1">
            <Typography
              variant="paragraph"
              className="capitalize font-medium text-yellow-900 p-3"
            >
              Data Barang
            </Typography>
            <CardBody className="bg-white rounded p-3">
              <ol className="mt-5">
                <li>
                  <Input
                    label="Jenis Produk"
                    variant="static"
                    color="blue"
                    size="lg"
                    placeholder="Masukkan Jenis Produk"
                  />{" "}
                </li>
                <br />
                <li>
                  <Input
                    label="Merk"
                    variant="static"
                    color="blue"
                    size="lg"
                    placeholder="Masukkan Merk"
                  />{" "}
                </li>
                <br />
                <li>
                  <Input
                    label="Type"
                    variant="static"
                    color="blue"
                    size="lg"
                    placeholder="Masukkan Type"
                  />{" "}
                </li>
                <br />
                <li>
                  <Input
                    label="No Seri"
                    variant="static"
                    color="blue"
                    size="lg"
                    placeholder="Masukkan No Seri"
                  />{" "}
                </li>
                <br />
                <li>
                  <Input
                    label="Perlengkapan"
                    variant="static"
                    color="blue"
                    size="lg"
                    placeholder="Masukkan Perlengkapan"
                  />{" "}
                </li>
                <br />
                <li>
                  <Input
                    label="Keluhan"
                    variant="static"
                    color="blue"
                    size="lg"
                    placeholder="Masukkan Keluhan"
                  />{" "}
                </li>
              </ol>
            </CardBody>
          </Card>
          <Card className="bg-green-50 border border-green-50 shadow-lg rounded p-1">
            <Typography
              variant="paragraph"
              className="capitalize font-medium text-green-900 p-3"
            >
              Data Tanda Terima
            </Typography>
            <CardBody className="bg-white rounded p-3">
              <ol className="mt-5">
                <li>
                  <Input
                    label="Penerima"
                    variant="static"
                    color="blue"
                    size="lg"
                    placeholder="Masukkan Penerima"
                  />{" "}
                </li>
                <br />
                <li>
                  <Input
                    label="Tgl Masuk"
                    variant="static"
                    color="blue"
                    size="lg"
                    type="date"
                  />{" "}
                </li>
                <br />
                <li>
                  <Input
                    label="Biaya Maksimal"
                    variant="static"
                    color="blue"
                    size="lg"
                    placeholder="Masukkan Biaya Maksimal"
                  />{" "}
                </li>
                <br />
                <li>
                  <Input
                    label="Estimasi Biaya"
                    variant="static"
                    color="blue"
                    size="lg"
                    placeholder="Masukkan Estimasi Biaya"
                  />{" "}
                </li>
                <br />
                <li>
                  <Input
                    label="Checker"
                    variant="static"
                    color="blue"
                    size="lg"
                    placeholder="Masukkan Checker"
                  />{" "}
                </li>
              </ol>
              <br />
              <Button variant="gradient" color="blue">
                Simpan{" "}
              </Button>
            </CardBody>
          </Card>
        </main>
      </div>
    </section>
  );
}

export default AddService;
