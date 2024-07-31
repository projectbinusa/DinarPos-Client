import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  CheckIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
// import $ from "jquery";

function LaporanService() {
  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Dashboard{" "}
          </Typography>
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
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
          <Card className="p-0">
            <CardBody className="bg-blue-100 flex justify-between items-center rounded-t">
              <Cog6ToothIcon className="h-12 w-12 text-blue-900" />
              <div>
                <Typography variant="h3" className="text-blue-900 text-right">
                  {/* {naAll.length} */}
                </Typography>
                <Typography variant="paragraph" className="text-blue-900">
                  Service Terbaru
                </Typography>
              </div>
            </CardBody>
            {/* <CardFooter className="py-3 px-6">
              <button onClick={() => toggleElement("na")}>
                <div className="flex justify-between items-center">
                  <div>
                    <Typography variant="paragraph" color="blue-gray">
                      Lihat Detail
                    </Typography>
                  </div>
                  <div>
                    <ChevronRightIcon className="h-5 w-6" color="blue-gray" />
                  </div>
                </div>
              </button>
            </CardFooter> */}
          </Card>
          <Card className="p-0">
            <CardBody className="bg-green-100 flex justify-between items-center rounded-t">
              <CheckIcon className="h-12 w-12 text-green-900" />
              <div>
                <Typography variant="h3" className="text-green-900 text-right">
                  {/* {readyAll.length} */}
                </Typography>
                <Typography variant="paragraph" className="text-green-900">
                  Service Ready
                </Typography>
              </div>
            </CardBody>
            {/* <CardFooter className="py-3 px-6">
              <button onClick={() => toggleElement("ready")}>
                <div className="flex justify-between items-center">
                  <div>
                    <Typography variant="paragraph" color="blue-gray">
                      Lihat Detail
                    </Typography>
                  </div>
                  <div>
                    <ChevronRightIcon className="h-5 w-6" color="blue-gray" />
                  </div>
                </div>
              </button>
            </CardFooter> */}
          </Card>
          <Card className="p-0">
            <CardBody className="bg-yellow-100 flex justify-between items-center rounded-t">
              <ArrowPathIcon className="h-12 w-12 text-yellow-900" />
              <div>
                <Typography variant="h3" className="text-yellow-900 text-right">
                  {/* {prosesAll.length} */}
                </Typography>
                <Typography variant="paragraph" className="text-yellow-900">
                  Service Proses
                </Typography>
              </div>
            </CardBody>
            {/* <CardFooter className="py-3 px-6">
              <button onClick={() => toggleElement("proses")}>
                <div className="flex justify-between items-center">
                  <div>
                    <Typography variant="paragraph" color="blue-gray">
                      Lihat Detail
                    </Typography>
                  </div>
                  <div>
                    <ChevronRightIcon className="h-5 w-6" color="blue-gray" />
                  </div>
                </div>
              </button>
            </CardFooter> */}
          </Card>
          <Card className="p-0">
            <CardBody className="bg-red-100 flex justify-between items-center rounded-t">
              <ArrowsRightLeftIcon className="h-12 w-12 text-red-900" />
              <div>
                <Typography variant="h3" className="text-red-900 text-right">
                  {/* {returAll.length} */}
                </Typography>
                <Typography variant="paragraph" className="text-red-900">
                  Service Retur
                </Typography>
              </div>
            </CardBody>
            {/* <CardFooter className="py-3 px-6">
              <button onClick={() => toggleElement("retur")}>
                <div className="flex justify-between items-center">
                  <div>
                    <Typography variant="paragraph" color="blue-gray">
                      Lihat Detail
                    </Typography>
                  </div>
                  <div>
                    <ChevronRightIcon className="h-5 w-6" color="blue-gray" />
                  </div>
                </div>
              </button>
            </CardFooter> */}
          </Card>
        </div>
        <br />
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
          <Card className="p-0">
            <CardBody className="bg-red-100 flex justify-between items-center rounded-t">
              <XMarkIcon className="h-12 w-12 text-red-900" />
              <div>
                <Typography variant="h3" className="text-red-900 text-right">
                  {/* {cancelAll.length} */}
                </Typography>
                <Typography variant="paragraph" className="text-red-900">
                  Service Cancel
                </Typography>
              </div>
            </CardBody>
            {/* <CardFooter className="py-3 px-6">
              <button onClick={() => toggleElement("cancel")}>
                <div className="flex justify-between items-center">
                  <div>
                    <Typography variant="paragraph" color="blue-gray">
                      Lihat Detail
                    </Typography>
                  </div>
                  <div>
                    <ChevronRightIcon className="h-5 w-6" color="blue-gray" />
                  </div>
                </div>
              </button>
            </CardFooter> */}
          </Card>
          <Card className="p-0">
            <CardBody className="bg-yellow-100 flex justify-between items-center rounded-t">
              <ClockIcon className="h-12 w-12 text-yellow-900" />
              <div>
                <Typography variant="h3" className="text-yellow-900 text-right">
                  {/* {semingguAll.length} */}
                </Typography>
                {/* <Typography variant="paragraph" className="text-yellow-900">Service > 1 Minggu
                                </Typography> */}
              </div>
            </CardBody>
            {/* <CardFooter className="py-3 px-6">
              <button onClick={() => toggleElement("seminggu")}>
                <div className="flex justify-between items-center">
                  <div>
                    <Typography variant="paragraph" color="blue-gray">
                      Lihat Detail
                    </Typography>
                  </div>
                  <div>
                    <ChevronRightIcon className="h-5 w-6" color="blue-gray" />
                  </div>
                </div>
              </button>
            </CardFooter> */}
          </Card>
          <Card className="p-0">
            <CardBody className="bg-blue-100 flex justify-between items-center rounded-t">
              <CheckCircleIcon className="h-12 w-12 text-blue-900" />
              <div>
                <Typography variant="h3" className="text-blue-900 text-right">
                  {/* {takenAll.length} */}
                </Typography>
                <Typography variant="paragraph" className="text-blue-900">
                  Service Taken
                </Typography>
              </div>
            </CardBody>
            {/* <CardFooter className="py-3 px-6">
              <button onClick={() => toggleElement("taken")}>
                <div className="flex justify-between items-center">
                  <div>
                    <Typography variant="paragraph" color="blue-gray">
                      Lihat Detail
                    </Typography>
                  </div>
                  <div>
                    <ChevronRightIcon className="h-5 w-6" color="blue-gray" />
                  </div>
                </div>
              </button>
            </CardFooter> */}
          </Card>
        </div>
        <br />
        <div>
          <div id="na" className="bg-white shadow-lg p-3 my-5 rounded" hidden>
            <Typography variant="h5">Service Terbaru</Typography>
            <hr /> <br />
            <div className="w-full overflow-x-auto">
              <table
                id="example_data"
                // ref={tableRef}
                className="rounded-sm table-auto w-full"
              >
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="text-sm py-2 px-3 font-semibold">No</th>
                    <th className="text-sm py-2 px-3 font-semibold">Nama</th>
                    <th className="text-sm py-2 px-3 font-semibold">Alamat </th>
                    <th className="text-sm py-2 px-3 font-semibold">Produk</th>
                    <th className="text-sm py-2 px-3 font-semibold">In </th>
                    <th className="text-sm py-2 px-3 font-semibold">C </th>
                    <th className="text-sm py-2 px-3 font-semibold">Status </th>
                    <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                  </tr>
                </thead>
                {/* <tbody>
                  {naAll.length > 0 ? (
                    naAll.map((row, index) => {
                      const tglKonfirms = naTglKonf[index] || [];

                      return (
                        <tr key={index}>
                          <td className="text-sm w-[4%]">{index + 1}</td>
                          <td className="text-sm py-2 px-3">
                            {row.customer.nama_customer}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {row.customer.alamat}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {row.produk}{" "}
                            <span className="block">{row.merk}</span>{" "}
                            <span className="block">{row.type}</span>{" "}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {formatDate(row.tanggalMasuk)}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {tglKonfirms.map((down, idx) => (
                              <ul key={idx}>
                                <li>{formatDate(down.tglKonf)}</li>
                              </ul>
                            ))}{" "}
                          </td>
                          <td className="text-sm py-2 px-3">{row.statusEnd}</td>
                          <td className="text-sm py-2 px-3 flex items-center justify-center">
                            <div className="flex flex-row gap-3">
                              <a href={"/detail_service/" + row.idTT}>
                                <IconButton size="md" color="light-blue">
                                  <InformationCircleIcon className="w-6 h-6 white" />
                                </IconButton>
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-sm text-center capitalize py-3 bg-gray-100"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody> */}
              </table>
            </div>
          </div>
          <div
            id="ready"
            className="bg-white shadow-lg p-3 my-5 rounded"
            hidden
          >
            <Typography variant="h5">Service Ready</Typography>
            <hr /> <br />
            <div className="w-full overflow-x-auto">
              <table
                id="example_data2"
                // ref={tableRef2}
                className="rounded-sm table-auto w-full"
              >
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="text-sm py-2 px-3 font-semibold">No</th>
                    <th className="text-sm py-2 px-3 font-semibold">Nama</th>
                    <th className="text-sm py-2 px-3 font-semibold">Alamat </th>
                    <th className="text-sm py-2 px-3 font-semibold">Produk</th>
                    <th className="text-sm py-2 px-3 font-semibold">In </th>
                    <th className="text-sm py-2 px-3 font-semibold">C </th>
                    <th className="text-sm py-2 px-3 font-semibold">Status </th>
                    <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                  </tr>
                </thead>
                {/* <tbody>
                  {readyAll.length > 0 ? (
                    readyAll.map((row, index) => {
                      const tglKonfirms = readyTglKonf[index] || [];

                      return (
                        <tr key={index}>
                          <td className="text-sm w-[4%]">{index + 1}</td>
                          <td className="text-sm py-2 px-3">
                            {row.customer.nama_customer}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {row.customer.alamat}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {row.produk}{" "}
                            <span className="block">{row.merk}</span>{" "}
                            <span className="block">{row.type}</span>{" "}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {formatDate(row.tanggalMasuk)}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {tglKonfirms.map((down, idx) => (
                              <ul key={idx}>
                                <li>{formatDate(down.tglKonf)}</li>
                              </ul>
                            ))}{" "}
                          </td>
                          <td className="text-sm py-2 px-3">{row.statusEnd}</td>
                          <td className="text-sm py-2 px-3 flex items-center justify-center">
                            <div className="flex flex-row gap-3">
                              <a href={"/detail_service/" + row.idTT}>
                                <IconButton size="md" color="light-blue">
                                  <InformationCircleIcon className="w-6 h-6 white" />
                                </IconButton>
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-sm text-center capitalize py-3 bg-gray-100"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody> */}
              </table>
            </div>
          </div>
          <div
            id="proses"
            className="bg-white shadow-lg p-3 my-5 rounded"
            hidden
          >
            <Typography variant="h5">Service Proses</Typography>
            <hr /> <br />
            <div className="w-full overflow-x-auto">
              <table
                id="example_data3"
                // ref={tableRef3}
                className="rounded-sm table-auto w-full"
              >
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="text-sm py-2 px-3 font-semibold">No</th>
                    <th className="text-sm py-2 px-3 font-semibold">Nama</th>
                    <th className="text-sm py-2 px-3 font-semibold">Alamat </th>
                    <th className="text-sm py-2 px-3 font-semibold">Produk</th>
                    <th className="text-sm py-2 px-3 font-semibold">In </th>
                    <th className="text-sm py-2 px-3 font-semibold">C </th>
                    <th className="text-sm py-2 px-3 font-semibold">Status </th>
                    <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                  </tr>
                </thead>
                {/* <tbody>
                  {prosesAll.length > 0 ? (
                    prosesAll.map((row, index) => {
                      const tglKonfirms = prosesTglKonf[index] || [];

                      return (
                        <tr key={index}>
                          <td className="text-sm w-[4%]">{index + 1}</td>
                          <td className="text-sm py-2 px-3">
                            {row.customer.nama_customer}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {row.customer.alamat}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {row.produk}{" "}
                            <span className="block">{row.merk}</span>{" "}
                            <span className="block">{row.type}</span>{" "}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {formatDate(row.tanggalMasuk)}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {tglKonfirms.map((down, idx) => (
                              <ul key={idx}>
                                <li>{formatDate(down.tglKonf)}</li>
                              </ul>
                            ))}{" "}
                          </td>
                          <td className="text-sm py-2 px-3">{row.statusEnd}</td>
                          <td className="text-sm py-2 px-3 flex items-center justify-center">
                            <div className="flex flex-row gap-3">
                              <a href={"/detail_service/" + row.idTT}>
                                <IconButton size="md" color="light-blue">
                                  <InformationCircleIcon className="w-6 h-6 white" />
                                </IconButton>
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-sm text-center capitalize py-3 bg-gray-100"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody> */}
              </table>
            </div>
          </div>
          <div
            id="retur"
            className="bg-white shadow-lg p-3 my-5 rounded"
            hidden
          >
            <Typography variant="h5">Service Retur</Typography>
            <hr /> <br />
            <div className="w-full overflow-x-auto">
              <table
                id="example_data4"
                // ref={tableRef4}
                className="rounded-sm table-auto w-full"
              >
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="text-sm py-2 px-3 font-semibold">No</th>
                    <th className="text-sm py-2 px-3 font-semibold">Nama</th>
                    <th className="text-sm py-2 px-3 font-semibold">Alamat </th>
                    <th className="text-sm py-2 px-3 font-semibold">Produk</th>
                    <th className="text-sm py-2 px-3 font-semibold">In </th>
                    <th className="text-sm py-2 px-3 font-semibold">C </th>
                    <th className="text-sm py-2 px-3 font-semibold">Status </th>
                    <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                  </tr>
                </thead>
                {/* <tbody>
                  {returAll.length > 0 ? (
                    returAll.map((row, index) => {
                      const tglKonfirms = returTglKonf[index] || [];

                      return (
                        <tr key={index}>
                          <td className="text-sm w-[4%]">{index + 1}</td>
                          <td className="text-sm py-2 px-3">
                            {row.customer?.nama_customer}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {row.customer?.alamat}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {row.produk}{" "}
                            <span className="block">{row.merk}</span>{" "}
                            <span className="block">{row.type}</span>{" "}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {formatDate(row.tanggalMasuk)}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {tglKonfirms.map((down, idx) => (
                              <ul key={idx}>
                                <li>{formatDate(down.tglKonf)}</li>
                              </ul>
                            ))}{" "}
                          </td>
                          <td className="text-sm py-2 px-3">{row.statusEnd}</td>
                          <td className="text-sm py-2 px-3 flex items-center justify-center">
                            <div className="flex flex-row gap-3">
                              <a href={"/detail_service/" + row.idTT}>
                                <IconButton size="md" color="light-blue">
                                  <InformationCircleIcon className="w-6 h-6 white" />
                                </IconButton>
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-sm text-center capitalize py-3 bg-gray-100"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody> */}
              </table>
            </div>
          </div>
          <div
            id="cancel"
            className="bg-white shadow-lg p-3 my-5 rounded"
            hidden
          >
            <Typography variant="h5">Service Cancel</Typography>
            <hr /> <br />
            <div className="w-full overflow-x-auto">
              <table
                id="example_data5"
                // ref={tableRef5}
                className="rounded-sm table-auto w-full"
              >
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="text-sm py-2 px-3 font-semibold">No</th>
                    <th className="text-sm py-2 px-3 font-semibold">Nama</th>
                    <th className="text-sm py-2 px-3 font-semibold">Alamat </th>
                    <th className="text-sm py-2 px-3 font-semibold">Produk</th>
                    <th className="text-sm py-2 px-3 font-semibold">In </th>
                    <th className="text-sm py-2 px-3 font-semibold">C </th>
                    <th className="text-sm py-2 px-3 font-semibold">Status </th>
                    <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                  </tr>
                </thead>
                {/* <tbody>
                  {cancelAll.length > 0 ? (
                    cancelAll.map((row, index) => {
                      const tglKonfirms = cancelTglKonf[index] || [];

                      return (
                        <tr key={index}>
                          <td className="text-sm w-[4%]">{index + 1}</td>
                          <td className="text-sm py-2 px-3">
                            {row.customer.nama_customer}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {row.customer.alamat}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {row.produk}{" "}
                            <span className="block">{row.merk}</span>{" "}
                            <span className="block">{row.type}</span>{" "}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {formatDate(row.tanggalMasuk)}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {tglKonfirms.map((down, idx) => (
                              <ul key={idx}>
                                <li>{formatDate(down.tglKonf)}</li>
                              </ul>
                            ))}{" "}
                          </td>
                          <td className="text-sm py-2 px-3">{row.statusEnd}</td>
                          <td className="text-sm py-2 px-3 flex items-center justify-center">
                            <div className="flex flex-row gap-3">
                              <a href={"/detail_service/" + row.idTT}>
                                <IconButton size="md" color="light-blue">
                                  <InformationCircleIcon className="w-6 h-6 white" />
                                </IconButton>
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-sm text-center capitalize py-3 bg-gray-100"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody> */}
              </table>
            </div>
          </div>
          <div
            id="seminggu"
            className="bg-white shadow-lg p-3 my-5 rounded"
            hidden
          >
            {/* <Typography variant="h5">Service > 1 Minggu</Typography> */}
            <hr /> <br />
            <div className="w-full overflow-x-auto">
              <table
                id="example_data6"
                // ref={tableRef6}
                className="rounded-sm table-auto w-full"
              >
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="text-sm py-2 px-3 font-semibold">No</th>
                    <th className="text-sm py-2 px-3 font-semibold">Nama</th>
                    <th className="text-sm py-2 px-3 font-semibold">Alamat </th>
                    <th className="text-sm py-2 px-3 font-semibold">Produk</th>
                    <th className="text-sm py-2 px-3 font-semibold">In </th>
                    <th className="text-sm py-2 px-3 font-semibold">C </th>
                    <th className="text-sm py-2 px-3 font-semibold">Status </th>
                    <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                  </tr>
                </thead>
                {/* <tbody>
                  {semingguAll.length > 0 ? (
                    semingguAll.map((row, index) => {
                      const tglKonfirms = semingguTglKonf[index] || [];

                      return (
                        <tr key={index}>
                          <td className="text-sm w-[4%]">{index + 1}</td>
                          <td className="text-sm py-2 px-3">
                            {row.customer.nama_customer}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {row.customer.alamat}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {row.produk}{" "}
                            <span className="block">{row.merk}</span>{" "}
                            <span className="block">{row.type}</span>{" "}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {formatDate(row.tanggalMasuk)}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {tglKonfirms.map((down, idx) => (
                              <ul key={idx}>
                                <li>{formatDate(down.tglKonf)}</li>
                              </ul>
                            ))}{" "}
                          </td>
                          <td className="text-sm py-2 px-3">{row.statusEnd}</td>
                          <td className="text-sm py-2 px-3 flex items-center justify-center">
                            <div className="flex flex-row gap-3">
                              <a href={"/detail_service/" + row.idTT}>
                                <IconButton size="md" color="light-blue">
                                  <InformationCircleIcon className="w-6 h-6 white" />
                                </IconButton>
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-sm text-center capitalize py-3 bg-gray-100"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody> */}
              </table>
            </div>
          </div>
          <div
            id="taken"
            className="bg-white shadow-lg p-3 my-5 rounded"
            hidden
          >
            <Typography variant="h5">Service Taken</Typography>
            <hr /> <br />
            <div className="w-full overflow-x-auto">
              <table
                id="example_data7"
                // ref={tableRef7}
                className="rounded-sm table-auto w-full"
              >
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="text-sm py-2 px-3 font-semibold">No</th>
                    <th className="text-sm py-2 px-3 font-semibold">Nama</th>
                    <th className="text-sm py-2 px-3 font-semibold">Alamat </th>
                    <th className="text-sm py-2 px-3 font-semibold">Produk</th>
                    <th className="text-sm py-2 px-3 font-semibold">In </th>
                    <th className="text-sm py-2 px-3 font-semibold">C </th>
                    <th className="text-sm py-2 px-3 font-semibold">Status </th>
                    <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                  </tr>
                </thead>
                {/* <tbody>
                  {takenAll.length > 0 ? (
                    takenAll.map((row, index) => {
                      const tglKonfirms = takenTglKonf[index] || [];

                      return (
                        <tr key={index}>
                          <td className="text-sm w-[4%]">{index + 1}</td>
                          <td className="text-sm py-2 px-3">
                            {row.customer.nama_customer}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {row.customer.alamat}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {row.produk}{" "}
                            <span className="block">{row.merk}</span>{" "}
                            <span className="block">{row.type}</span>{" "}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {formatDate(row.tanggalMasuk)}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {tglKonfirms.map((down, idx) => (
                              <ul key={idx}>
                                <li>{formatDate(down.tglKonf)}</li>
                              </ul>
                            ))}{" "}
                          </td>
                          <td className="text-sm py-2 px-3">{row.statusEnd}</td>
                          <td className="text-sm py-2 px-3 flex items-center justify-center">
                            <div className="flex flex-row gap-3">
                              <a href={"/detail_service_taken/" + row.idTT}>
                                <IconButton size="md" color="light-blue">
                                  <InformationCircleIcon className="w-6 h-6 white" />
                                </IconButton>
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-sm text-center capitalize py-3 bg-gray-100"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody> */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default LaporanService;
