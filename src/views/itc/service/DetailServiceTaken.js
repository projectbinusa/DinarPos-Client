import React from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Card,
  IconButton,
  Option,
  Input,
  Select,
  Typography,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  ChatBubbleBottomCenterIcon,
  ChevronLeftIcon,
  CurrencyDollarIcon,
  PlusIcon,
  PrinterIcon,
  ReceiptPercentIcon,
} from "@heroicons/react/24/outline";

function DetailServiceTaken() {
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
            <span className="cursor-default capitalize">detail Service</span>
          </Breadcrumbs>
        </div>
        <main className="bg-blue-500 border-4 border-blue-500 shadow-lg my-5 rounded">
          <div className="flex justify-between items-center p-3">
            <a href="/data_service">
              <Typography
                variant="paragraph"
                className="capitalize font-semibold text-white flex"
              >
                <ChevronLeftIcon className="w-6 h-6 white" /> NO.
              </Typography>
            </a>
            <div>
              <IconButton
                size="md"
                color="red"
                // onClick={() => window.open("/print_service/" + datas?.idTT)}
              >
                <PrinterIcon className="w-6 h-6 white" />
              </IconButton>{" "}
              <IconButton size="md" color="green">
                <ChatBubbleBottomCenterIcon
                  className="w-6 h-6 white"
                  // onClick={() => {
                  //   const phone = encodeURIComponent(datas?.customer?.telp);
                  //   const message = encodeURIComponent(
                  //     `Hallo kak ${datas?.customer?.nama_customer} Terima Kasih Telah Service di Excellent Computer Detail Produk No. TT : ${datas?.idTT} Jenis Produk : ${datas?.produk} Merk : ${datas?.merk} Type : ${datas?.type} SN : ${datas?.sn} Dengan Keluhan : ${datas?.keluhan}`
                  //   );
                  //   window.open(
                  //     `https://api.whatsapp.com/send?phone=${phone}&text=${message}`
                  //   );
                  // }}
                />
              </IconButton>{" "}
            </div>
          </div>
          <div className="bg-white p-3 rounded">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-start">
              <div className="border border-gray-400 rounded shadow p-2">
                <h1 className="text-lg">
                  <b>Data Pelanggan</b>
                </h1>
                <hr /> <br />
                <form>
                  <ol>
                    <li className="mb-3">
                      <div className="flex items-center">
                        <label htmlFor="" className="w-32 text-center text-sm">
                          Nama
                        </label>
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Nama"
                          // value={namaCustomer}
                          // onChange={(e) => setnamaCustomer(e.target.value)}
                        />
                      </div>
                    </li>
                    <li className="mb-3">
                      <div className="flex items-center">
                        <label htmlFor="" className="w-32 text-center text-sm">
                          Alamat{" "}
                        </label>
                        <textarea
                          name="alamat"
                          id="alamat"
                          cols="30"
                          rows="3"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          // value={alamatCustomer}
                          // onChange={(e) => setalamatCustomer(e.target.value)}
                        ></textarea>
                      </div>
                    </li>
                    <li className="mb-3">
                      <div className="flex items-center">
                        <label htmlFor="" className="w-32 text-center text-sm">
                          CP
                        </label>
                        <input
                          type="number"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="CP"
                          // value={cpCustomer}
                          // onChange={(e) => setcpCustomer(e.target.value)}
                        />
                      </div>
                    </li>
                    <li className="mb-3">
                      <div className="flex items-center">
                        <label htmlFor="" className="w-32 text-center text-sm">
                          Ket
                        </label>
                        <textarea
                          name="ket"
                          id="ket"
                          cols="30"
                          rows="3"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          // value={ketCustomer}
                          // onChange={(e) => setketCustomer(e.target.value)}
                        ></textarea>
                      </div>
                    </li>
                  </ol>
                  <br />
                  <Button
                    variant="gradient"
                    color="light-blue"
                    className="float-right"
                    type="submit"
                  >
                    {/* Simpan */}
                  </Button>{" "}
                </form>
                <br /> <br /> <br />
                <h1 className="text-lg">
                  <b>Tanda Terima</b>
                </h1>
                <hr /> <br />
                <ol>
                  <li className="mb-3">
                    <div className="flex items-center">
                      <label htmlFor="" className="w-32 text-center text-sm">
                        Tgl Masuk
                      </label>
                      <input
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Tanggal Masuk"
                        readOnly
                        // value={datas?.tgl_masuk}
                      />
                    </div>
                  </li>
                  <li className="mb-3">
                    <div className="flex items-center">
                      <label htmlFor="" className="w-32 text-center text-sm">
                        Tgl Jadi
                      </label>
                      <input
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Tgl Jadi"
                        readOnly
                      />
                    </div>
                  </li>
                  <li className="mb-3">
                    <form className="flex items-center">
                      <label htmlFor="" className="w-32 text-center text-sm">
                        Tgl Konf
                      </label>
                      <div className="w-full">
                        {/* {tglKonfs.length > 0 ? (
                          <>
                            <ol>
                              {tglKonfs.map((row) => (
                                <li className="mb-2 flex justify-between items-center">
                                  <span>
                                    {new Date(row.tglKonf).toLocaleDateString()}
                                  </span>
                                  <IconButton
                                    size="sm"
                                    color="red"
                                    type="button"
                                    onClick={() => deleteTglKonf(row.id)}
                                  >
                                    <TrashIcon className="w-6 h-6 white" />
                                  </IconButton>
                                </li>
                              ))}
                            </ol>
                          </>
                        ) : (
                          <></>
                        )} */}
                        <div className="flex gap-2 w-full">
                          <input
                            type="date"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Tgl Konf"
                            // onChange={(e) => settglKonf(e.target.value)}
                          />
                          <IconButton size="lg" color="blue" type="submit">
                            <PlusIcon className="w-6 h-6 white" />
                          </IconButton>
                        </div>
                      </div>
                    </form>
                  </li>
                  <li className="mb-3">
                    <div className="flex items-center">
                      <label htmlFor="" className="w-32 text-center text-sm">
                        Tgl Ambil
                      </label>
                      <input
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Tgl Ambil"
                        readOnly
                      />
                    </div>
                  </li>
                  <li className="mb-3">
                    <div className="flex items-center">
                      <label htmlFor="" className="w-32 text-center text-sm">
                        Penerima
                      </label>
                      {/* <p className="text-sm w-full">{datas?.penerima}</p> */}
                    </div>
                  </li>
                  <li className="mb-3">
                    <div className="flex items-center">
                      <label htmlFor="" className="w-32 text-center text-sm">
                        Checker
                      </label>
                      {/* <p className="text-sm w-full">{datas?.checker}</p> */}
                    </div>
                  </li>
                </ol>
              </div>
              <div className="border border-gray-400 rounded shadow lg:col-span-2 p-2">
                <h1 className="text-lg">
                  <b>Data Barang</b>
                </h1>
                <hr /> <br />
                <table className="w-full border-collapse my-3">
                  <thead>
                    <tr>
                      <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">
                        Produk
                      </th>
                      <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">
                        Merk
                      </th>
                      <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">
                        Type
                      </th>
                      <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">
                        No Seri
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-gray-300 border bg-white p-2">
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          readOnly
                          // value={datas?.produk}
                        />
                      </td>
                      <td className="border-gray-300 border bg-white p-2">
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          readOnly
                          // value={datas?.merk}
                        />
                      </td>
                      <td className="border-gray-300 border bg-white p-2">
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          readOnly
                          // value={datas?.type}
                        />
                      </td>
                      <td className="border-gray-300 border bg-white p-2">
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          readOnly
                          // value={datas?.sn}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="border-gray-300 border bg-gray-200 text-sm text-center py-2"
                        colSpan="2"
                      >
                        Perlengkapan
                      </td>
                      <td
                        className="border-gray-300 border bg-gray-200 text-sm text-center py-2"
                        colSpan="2"
                      >
                        Keluhan
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan="2"
                        className="border-gray-300 border bg-white p-2"
                      >
                        <textarea
                          cols="30"
                          rows="3"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          readOnly
                          // value={datas?.perlengkapan}
                        ></textarea>
                      </td>
                      <td
                        colSpan="2"
                        className="border-gray-300 border bg-white p-2"
                      >
                        <textarea
                          cols="30"
                          rows="3"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          readOnly
                          // value={datas?.keluhan}
                        ></textarea>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <form>
                  <div className="mt-6">
                    <div className="flex items-center">
                      <label htmlFor="" className="w-32 text-center text-sm">
                        Note
                      </label>
                      <textarea
                        id="note"
                        cols="30"
                        rows="3"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Catatan..."
                        // value={note}
                        // onChange={(e) => setnote(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    {/* <Button variant="gradient" color="light-blue" type="submit">
                      Simpan
                    </Button> */}
                  </div>
                </form>
              </div>
            </div>
            {/* {datas?.statusEnd === "PROSES" || datas?.statusEnd === "N_A" ? ( */}
            <>
              {/* JIKA BELUM ADA DATA */}
              <div className="border-gray-400 shadow bg-white border rounded p-2 mt-5">
                <h1 className="font-semibold mt-1">Perincian Biaya</h1>
                <hr />
                <form>
                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-2">
                    <div>
                      <ol className="mt-3">
                        <li className="mb-2">
                          <div className="flex items-center">
                            <label
                              htmlFor=""
                              className="w-32 text-center text-sm"
                            >
                              Sparepart
                            </label>
                            <input
                              type="number"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Biaya Sparepart"
                              id="sparepart"
                              // onChange={(e) =>
                              //   setbiayaSparepart(e.target.value)
                              // }
                              // required
                            />
                          </div>
                        </li>
                        <li className="mb-2">
                          <div className="flex items-center">
                            <label
                              htmlFor=""
                              className="w-32 text-center text-sm"
                            >
                              Service
                            </label>
                            <input
                              type="number"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Biaya Service"
                              id="service"
                              // onChange={(e) =>
                              //   setbiayaService(e.target.value)
                              // }
                              // required
                            />
                          </div>
                        </li>
                        <li className="mb-2">
                          <div className="flex items-center">
                            <label
                              htmlFor=""
                              className="w-32 text-center text-sm"
                            >
                              Total
                            </label>
                            <input
                              type="number"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Biaya Total"
                              id="total"
                              // value={total}
                              // onChange={(e) => settotal(e.target.value)}
                              // readOnly
                            />
                          </div>
                        </li>
                      </ol>
                    </div>
                    <div>
                      <ol className="mt-3">
                        <li className="mb-2">
                          <div className="flex items-center">
                            <label
                              htmlFor=""
                              className="w-32 text-center text-sm"
                            >
                              Tgl Ready
                            </label>
                            <input
                              type="date"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              id="tgl_ready"
                              required
                            />
                          </div>
                        </li>
                        <li className="mb-2">
                          <div className="flex items-center">
                            <label
                              htmlFor=""
                              className="w-32 text-center text-sm"
                            >
                              Estimasi
                            </label>
                            <p className="w-full text-sm">
                              {/* {formatRupiah(datas?.estimasi)} */}
                            </p>
                          </div>
                        </li>
                        <li className="mb-2">
                          <div className="flex items-center">
                            <label
                              htmlFor=""
                              className="w-32 text-center text-sm"
                            >
                              Status
                            </label>
                            <select
                              id="status"
                              // value={statusEnd}
                              // onChange={(e) => setstatusEnd(e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 darkselect:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              required
                            >
                              <option value="READY_S">Ready (Sparepart)</option>
                              <option value="READY_T">Ready (Teknisi)</option>
                              <option value="CANCEL_S">
                                Cancel (Sparepart)
                              </option>
                              <option value="CANCEL_T">Cancel (Teknisi)</option>
                            </select>
                          </div>
                        </li>
                      </ol>
                      <div className="mt-3 flex justify-end">
                        <Button variant="gradient" color="green" type="submit">
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </>
            {/* : ( */}
            <>
              {/* JIKA SUDAH ADA DATA */}
              <div className="border-gray-400 shadow bg-white border rounded p-2 mt-5">
                <h1 className="font-semibold mt-1">Perincian Biaya</h1>
                <hr /> <br />
                <ol className="">
                  <li className="border border-t-gray-300 border-b-gray-300 p-2 bg-gray-50">
                    <div className="flex items-center">
                      <p className="w-36">Estimasi</p>
                      <p className="w-full">
                        {/* {formatRupiah(datas?.estimasi)} */}
                      </p>
                    </div>
                  </li>
                  <li className="border border-t-gray-300 border-b-gray-300 p-2 bg-gray-50">
                    <div className="flex items-center">
                      <p className="w-36">Sparepart</p>
                      <p className="w-full">
                        {/* {formatRupiah(datas?.biayaSparepart)} */}
                      </p>
                    </div>
                  </li>
                  <li className="border border-t-gray-300 border-b-gray-300 p-2 bg-gray-50">
                    <div className="flex items-center">
                      <p className="w-36">Service</p>
                      <p className="w-full">
                        {/* {formatRupiah(datas?.biayaService)} */}
                      </p>
                    </div>
                  </li>
                  <li className="border border-t-gray-300 border-b-gray-300 p-2 bg-gray-50">
                    <div className="flex items-center">
                      <p className="w-36">Total</p>
                      <p className="w-full"></p>
                    </div>
                  </li>
                </ol>
                <br />
                <br />
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-5">
                  <div className="col-span-2 mt-3">
                    <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-y-8">
                      <div className="lg:col-span-2">
                        <label
                          htmlFor="barang"
                          className="text-[14px] text-blue-gray-400"
                        >
                          Barang
                        </label>
                        {/* <ReactSelect
                            id="barang"
                            options={barang.map((down) => {
                              return {
                                value: down.barcodeBarang,
                                label:
                                  down.barcodeBarang + " / " + down.namaBarang,
                              };
                            })}
                            placeholder="Pilih Barang"
                            styles={customStyles}
                            value={selectedBarang}
                            onChange={handleBarangChange}
                          /> */}
                        <hr className="mt-1 bg-gray-400 h-[0.1em]" />
                      </div>
                      <Input
                        color="blue"
                        variant="static"
                        label="Harga"
                        type="number"
                        placeholder="Masukkan Harga"
                        id="hargabarang"
                        // value={hargaBrng}
                        // onChange={(e) => sethargaBrng(e.target.value)}
                      />
                      <Input
                        color="blue"
                        variant="static"
                        label="Diskon (%)"
                        type="number"
                        placeholder="Masukkan Diskon"
                        // value={diskonBarang}
                        // onChange={(e) => setdiskonBarang(e.target.value)}
                      />
                      <Input
                        color="blue"
                        variant="static"
                        label="Stok Barang"
                        id="stokbarang"
                        type="number"
                        // value={sisa}
                        // onChange={(e) => setsisa(e.target.value)}
                        // readOnly
                      />
                      <Input
                        color="blue"
                        variant="static"
                        label="Jumlah"
                        type="number"
                        placeholder="Masukkan jumlah"
                        id="jumlahBarang"
                        // value={qty}
                        // onKeyUp={checkEmpty()}
                        // onChange={(e) => setqty(e.target.value)}
                      />
                    </div>
                    <Button
                      variant="gradient"
                      color="blue"
                      className="mt-5"
                      id="tambah"
                      // onClick={checkStok}
                    >
                      {/* <span>Tambah Barang</span> */}
                    </Button>

                    <Card className="overflow-auto my-5">
                      <table
                        id="example_data"
                        className="rounded table-auto w-full"
                      >
                        <thead className="border-b-2 ">
                          <tr>
                            <th className="py-3 px-2">Barcode</th>
                            <th className="py-3 px-2">Nama</th>
                            <th className="py-3 px-2">Harga (Rp)</th>
                            <th className="py-3 px-2">Disc</th>
                            <th className="py-3 px-2">Harga Diskon (Rp)</th>
                            <th className="py-3 px-2">Jumlah</th>
                            <th className="py-3 px-2">Total Harga (Rp)</th>
                            <th className="py-3 px-2">Aksi</th>
                          </tr>
                        </thead>
                        {/* <tbody>
                            {produk.length > 0 ? (
                              produk.map((down, index) => (
                                <tr key={index}>
                                  <td className="py-3 px-2 text-center border">
                                    {down.barcode}
                                  </td>
                                  <td className="py-3 px-2 text-center border">
                                    {down.nama}
                                  </td>
                                  <td className="py-3 px-2 text-center border">
                                    {down.harga}
                                  </td>
                                  <td className="py-3 px-2 text-center border">
                                    {down.disc}
                                  </td>
                                  <td className="py-3 px-2 text-center border">
                                    {down.hargaDiskon}
                                  </td>
                                  <td className="py-3 px-2 text-center border">
                                    {down.jumlah}
                                  </td>
                                  <td className="py-3 px-2 text-center border">
                                    {down.totalHarga}
                                  </td>
                                  <td className="py-2 px-3 text-center border">
                                    <div className="flex justify-center items-center gap-2">
                                      <IconButton
                                        id={down.barcode}
                                        size="md"
                                        color="light-blue"
                                        onClick={() =>
                                          edit(
                                            down.barcode,
                                            down.nama,
                                            down.harga,
                                            down.disc,
                                            down.hargaDiskon,
                                            down.jumlah,
                                            down.totalHarga
                                          )
                                        }
                                      >
                                        <PencilIcon className="w-6 h-6 white" />
                                      </IconButton>
                                      <IconButton
                                        id={down.barcode}
                                        size="md"
                                        color="red"
                                        type="button"
                                        onClick={() => remove(down.barcode)}
                                      >
                                        <TrashIcon className="w-6 h-6 white" />
                                      </IconButton>
                                    </div>
                                  </td>{" "}
                                </tr>
                              ))
                            ) : (
                              <>
                                <tr>
                                  <td colSpan={8} className="text-center py-3">
                                    Tidak ada data
                                  </td>
                                </tr>
                              </>
                            )}
                          </tbody> */}
                      </table>
                    </Card>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 mb-12">
                      <div className="mt-6">
                        <Input
                          color="blue"
                          variant="static"
                          label="Keterangan"
                          placeholder="Masukkan Keterangan"
                          // onChange={(e) => setketerangan(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2 items-end">
                        <Input
                          label="Salesman"
                          variant="static"
                          color="blue"
                          list="salesman-list"
                          id="salesman"
                          name="salesman"
                          // onChange={(event) => {
                          //   handleChangeSalesman(event);
                          //   setmarkettingId(event.target.value);
                          // }}
                          placeholder="Pilih Salesman"
                        />
                        <datalist id="salesman-list">
                          {/* {optionsSalesman.length > 0 && (
                              <>
                                {optionsSalesman.map((option) => (
                                  <option value={option.idSalesman}>
                                    {option.namaSalesman}
                                  </option>
                                ))}
                              </>
                            )} */}
                        </datalist>

                        <div className="flex gap-2">
                          <button
                            className="text-sm bg-gray-400 px-1"
                            // onClick={() =>
                            //   setCurrentPageSalesman(currentPageSalesman - 1)
                            // }
                            // disabled={currentPageSalesman === 1}
                          >
                            Prev
                          </button>
                          <button
                            className="text-sm bg-gray-400 px-1"
                            // onClick={() =>
                            //   setCurrentPageSalesman(currentPageSalesman + 1)
                            // }
                            // disabled={!optionsSalesman.length}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                      <div className="bg-white shadow rounded px-3 py-2">
                        <Typography variant="paragraph">Anda Hemat</Typography>
                        <Typography variant="h6" id="ttl_bayar_hemat">
                          Rp 0,00
                        </Typography>
                      </div>
                      <div className="bg-white shadow rounded px-3 py-2">
                        <Typography variant="paragraph" className="capitalize">
                          total Belanja Tanpa diskon
                        </Typography>
                        <Typography variant="h6" id="total2">
                          Rp 0,00
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 shadow-lg px-4 py-6 ">
                    <Select
                      variant="static"
                      label="Cash / Kredit"
                      color="blue"
                      className="w-full"
                      id="cashKredit"
                      // onChange={(selectedOption) =>
                      //   setcashCredit(selectedOption)
                      // }
                    >
                      <Option value="Cash">Cash</Option>
                      <Option value="Kredit">Kredit</Option>
                    </Select>
                    <div className="flex flex-col gap-y-6 my-6">
                      <Input
                        color="blue"
                        variant="static"
                        label="Pembayaran"
                        type="number"
                        placeholder="Pembayaran"
                        id="pembayaran"
                        // onChange={(e) => setpembayaran(e.target.value)}
                        // onKeyUp={getDiskon}
                        // defaultValue={0}
                      />
                      <Input
                        color="blue"
                        variant="static"
                        label="Potongan"
                        type="number"
                        placeholder="Potongan"
                        id="potongan"
                        // defaultValue={0}
                        // onChange={(e) => setpotongan(e.target.value)}
                        // onKeyUp={getPotongan}
                      />
                    </div>
                    <div className="flex flex-col gap-y-4">
                      <div className="bg-white shadow rounded px-3 py-2">
                        <Typography variant="paragraph">
                          Total Belanja
                        </Typography>
                        <Typography variant="h6" id="total">
                          Rp 0,00
                        </Typography>
                      </div>
                      <div className="bg-white shadow rounded px-3 py-2">
                        <Typography variant="paragraph" id="title">
                          Kembalian / Kekurangan{" "}
                        </Typography>
                        <Typography variant="h6" id="kembalian">
                          Rp 0,00
                        </Typography>
                      </div>
                    </div>
                    <div className="bg-white shadow rounded px-3 py-2 mt-5">
                      <p className="text-base my-2">
                        <b>Nota :</b> <span></span>
                      </p>
                      <hr />
                      <h1 className="text-3xl my-3 font-medium" id="ttl_bayar">
                        Rp 0,00
                      </h1>
                    </div>
                    <Button
                      variant="gradient"
                      color="blue"
                      className="mt-5"
                      type="submit"
                      id="bayar"
                      // onClick={() => add()}
                    >
                      {/* <span>Lanjut</span> */}
                    </Button>
                  </div>
                </div>
              </div>
            </>
            {/* ) */}
          </div>
        </main>
      </div>
      {/* MODAL EDIT BARANG   */}
      <Dialog size="lg">
        <DialogBody className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
          <Input
            label="Harga Barang"
            variant="static"
            color="blue"
            size="lg"
            type="number"
            placeholder="Masukkan Harga Barang"
            // value={editHargaBarang}
            // onChange={(e) => seteditHargaBarang(e.target.value)}
            icon={<CurrencyDollarIcon />}
          />
          <Input
            label="Jumlah Barang"
            variant="static"
            color="blue"
            size="lg"
            placeholder="Masukkan Jumlah Barang"
            type="number"
            // value={editJumlah}
            // onChange={(e) => seteditJumlah(e.target.value)}
            icon={<PlusIcon />}
          />
          <Input
            label="Diskon"
            variant="static"
            color="blue"
            size="lg"
            type="number"
            placeholder="Masukkan Diskon"
            // value={editDiskon}
            // onChange={(e) => seteditDiskon(e.target.value)}
            icon={<ReceiptPercentIcon />}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="gray"
            // onClick={handleOpen3}
            className="mr-1"
          >
            {/* <span>Kembali</span> */}
          </Button>
          <Button
            variant="gradient"
            color="blue"
            id="btn-simpan-brng"
            // onClick={handleButtonClick}
          >
            {/* <span>Simpan</span> */}
          </Button>
        </DialogFooter>
      </Dialog>
      {/* END MODAL EDIT BARANG   */}
    </section>
  );
}

export default DetailServiceTaken;
