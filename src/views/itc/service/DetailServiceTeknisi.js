import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, IconButton, Typography } from "@material-tailwind/react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { API_SERVICE } from "../../../utils/BaseUrl";
import {
  ArrowUpTrayIcon,
  ChatBubbleBottomCenterIcon,
  ChevronLeftIcon,
  PlusIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

function DetailServiceTeknisi() {
  const [datas, setdatas] = useState(null);
  const param = useParams();
  const history = useHistory();

  // FORMAT RUPIAH
  const formatRupiah = (value) => {
    const htmlFormatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return htmlFormatter.format(value);
  };

  useEffect(() => {
    axios
      .get(`${API_SERVICE}/` + param.id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setdatas(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [tglKonfs, settglKonfs] = useState([]);

  // GET ALL BARANG
  const allTglKonf = async () => {
    try {
      const response = await axios.get(
        `${API_SERVICE}/tgl_konfirm?id=` + param.id,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      settglKonfs(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    allTglKonf();
  }, []);

  //   ADD STATUS
  const [validasi, setvalidasi] = useState("");
  const [solusi, setsolusi] = useState("");
  const [status, setstatus] = useState("");
  const [ket, setket] = useState("");
  const [idTeknisi, setidTeknisi] = useState(0);

  const addStatus = async (e) => {
    e.preventDefault();

    const request = {
      id_teknisi: 1,
      ket: ket,
      solusi: solusi,
      status: status,
      type: validasi,
    };

    await axios
      .post(`${API_SERVICE}/tambah_status`, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Tambah Status Berhasil!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        console.log("Error : " + err);
        // Swal.fire({
        //   icon: "error",
        //   title: "Tambah Status Gagal!",
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1500);
      });
  };

  const [pictureBefore, setPictureBefore] = useState();

  const updatePictureBefore = async (e) => {
    e.persist();
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", pictureBefore);
    await axios
      .put(`${API_SERVICE}/foto_before/`, formData, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

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
                <ChevronLeftIcon className="w-6 h-6 white" /> NO. {datas?.idTT}
              </Typography>
            </a>
            <div>
              <IconButton
                size="md"
                color="red"
                onClick={() => window.open("/print_service/" + datas?.idTT)}
              >
                <PrinterIcon className="w-6 h-6 white" />
              </IconButton>{" "}
              <IconButton size="md" color="green">
                <ChatBubbleBottomCenterIcon
                  className="w-6 h-6 white"
                  onClick={() => {
                    const phone = encodeURIComponent(datas?.customer?.telp);
                    const message = encodeURIComponent(
                      `Hallo kak ${datas?.customer?.nama_customer} Terima Kasih Telah Service di Excellent Computer Detail Produk No. TT : ${datas?.idTT} Jenis Produk : ${datas?.produk} Merk : ${datas?.merk} Type : ${datas?.type} SN : ${datas?.sn} Dengan Keluhan : ${datas?.keluhan}`
                    );
                    window.open(
                      `https://api.whatsapp.com/send?phone=${phone}&text=${message}`
                    );
                  }}
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
                        readOnly
                        value={datas?.nama}
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
                        readOnly
                        value={datas?.alamat}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                        readOnly
                        value={datas?.cp}
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
                        readOnly
                        value={datas?.ket}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      ></textarea>
                    </div>
                  </li>
                </ol>
                <br />
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
                        value={datas?.tgl_masuk}
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
                    <div className="flex items-center">
                      <label htmlFor="" className="w-32 text-center text-sm">
                        Tgl Konf
                      </label>
                      <div className="w-full">
                        {tglKonfs.length > 0 ? (
                          <>
                            <ol>
                              {tglKonfs.map((row) => (
                                <li className="mb-2">
                                  <span>
                                    {new Date(row.tglKonf).toLocaleDateString()}
                                  </span>
                                </li>
                              ))}
                            </ol>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
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
                      <p className="text-sm w-full">{datas?.penerima}</p>
                    </div>
                  </li>
                  <li className="mb-3">
                    <div className="flex items-center">
                      <label htmlFor="" className="w-32 text-center text-sm">
                        Checker
                      </label>
                      <p className="text-sm w-full">{datas?.checker}</p>
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
                          value={datas?.produk}
                        />
                      </td>
                      <td className="border-gray-300 border bg-white p-2">
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          readOnly
                          value={datas?.merk}
                        />
                      </td>
                      <td className="border-gray-300 border bg-white p-2">
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          readOnly
                          value={datas?.type}
                        />
                      </td>
                      <td className="border-gray-300 border bg-white p-2">
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          readOnly
                          value={datas?.sn}
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
                          value={datas?.perlengkapan}
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
                          value={datas?.keluhan}
                        ></textarea>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <h1 className="font-semibold mt-3 text-lg">
                  Status dan Laporan ({datas?.statusEnd})
                </h1>
                <hr /> <br />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex items-center justify-between">
                    <form className="flex gap-2 items-end">
                      <div>
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          htmlFor="small_size"
                        >
                          Picture Before
                        </label>
                        <input
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          onChange={(e) => setPictureBefore(e.target.files[0])}
                          id="small_size"
                          name="imageb"
                          type="file"
                          accept="image/*"
                        />
                      </div>
                      <IconButton size="md" color="blue">
                        <ArrowUpTrayIcon className="w-6 h-6 white" />
                      </IconButton>
                    </form>
                    <br />
                  </div>
                  <div className="flex items-center justify-between">
                    <form className="flex gap-2 items-end">
                      <div>
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          htmlFor="small_size"
                        >
                          Picture After
                        </label>
                        <input
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          id="small_size"
                          name="imagea"
                          type="file"
                          accept="image/*"
                        />
                      </div>
                      <IconButton size="md" color="blue">
                        <ArrowUpTrayIcon className="w-6 h-6 white" />
                      </IconButton>
                    </form>
                    <br />
                  </div>
                </div>
                <table className="w-full border-collapse my-3">
                  <thead>
                    <tr>
                      <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2 w-24">
                        Tanggal
                      </th>
                      <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">
                        Teknisi
                      </th>
                      <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">
                        Status
                      </th>
                      <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">
                        Solusi
                      </th>
                      <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">
                        Ket
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-sm text-center py-2 border-gray-300 border">
                        {" "}
                        <IconButton color="blue" size="md" onClick={addStatus}>
                          <PlusIcon className="w-6 h-6 white" />
                        </IconButton>
                      </td>
                      <td className="text-sm text-left py-2 px-3 border-gray-300 border">
                        Type <br />
                        <input
                          type="radio"
                          id="validasi_U"
                          name="validasi"
                          value="U"
                          onChange={(e) => setvalidasi(e.target.value)}
                        />
                        <label htmlFor="validasi_U">U</label>
                        <br />
                        <input
                          type="radio"
                          id="validasi_I"
                          name="validasi"
                          value="I"
                          onChange={(e) => setvalidasi(e.target.value)}
                        />
                        <label htmlFor="validasi_I">I</label>
                        <br />
                      </td>
                      <td className="text-sm text-left py-2 px-3 border-gray-300 border">
                        <textarea
                          cols="30"
                          rows="3"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                          placeholder="Status"
                          id="status"
                          onChange={(e) => setstatus(e.target.value)}
                        ></textarea>
                      </td>
                      <td className="text-sm text-left py-2 px-3 border-gray-300 border">
                        <textarea
                          cols="30"
                          rows="3"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                          placeholder="Solusi"
                          id="solusi"
                          onChange={(e) => setsolusi(e.target.value)}
                        ></textarea>
                      </td>
                      <td className="text-sm text-left py-2 px-3 border-gray-300 border">
                        <select
                          id="ket"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                          required
                          onChange={(e) => setket(e.target.value)}
                        >
                          <option value="WT">WT</option>
                          <option value="WS">WS</option>
                          <option value="WC">WC</option>
                        </select>
                      </td>
                      {/* <input hidden type="text" id="id_tt2" value="<?php echo $service->id_tt ?>" /> */}
                    </tr>
                  </tbody>
                </table>
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
                  <div className="flex items-center">
                    <label htmlFor="" className="w-32 text-center text-sm">
                      Note
                    </label>
                    <textarea
                      id="note"
                      cols="30"
                      rows="3"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                      disabled
                    >
                      {datas?.catatan}
                    </textarea>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <label htmlFor="" className="w-32 text-center text-sm">
                        Estimasi
                      </label>
                      <p>{formatRupiah(datas?.estimasi)}</p>
                    </div>
                    <div className="flex items-center">
                      <label htmlFor="" className="w-32 text-center text-sm">
                        Biaya Max.{" "}
                      </label>
                      <p>{formatRupiah(datas?.bmax)}</p>
                    </div>
                  </div>
                </div>
              </div>
              {datas?.statusEnd === "READY_T" ||
              datas?.statusEnd === "READY_S" ? (
                <>
                  <div className="border-gray-500 bg-white border rounded p-3 mt-5">
                    <h1 className="font-semibold text-lg mt-1">
                      Perincian Biaya
                    </h1>
                    <hr /> <br />
                    <div>
                      <ol>
                        <li className="mb-5">
                          <div className="flex items-center">
                            <label
                              htmlFor=""
                              className="w-32 text-center text-sm"
                            >
                              Estimasi
                            </label>
                            <p className="text-sm">
                              {formatRupiah(datas?.estimasi)}
                            </p>
                          </div>
                        </li>
                        <li className="mb-5">
                          <div className="flex items-center">
                            <label
                              htmlFor=""
                              className="w-32 text-center text-sm"
                            >
                              Sparepart
                            </label>
                            <p className="text-sm">
                              {formatRupiah(datas?.biayaSparepart)}
                            </p>
                          </div>
                        </li>
                        <li className="mb-5">
                          <div className="flex items-center">
                            <label
                              htmlFor=""
                              className="w-32 text-center text-sm"
                            >
                              Service
                            </label>
                            <p className="text-sm">
                              {formatRupiah(datas?.biayaService)}
                            </p>
                          </div>
                        </li>
                        <li className="mb-5">
                          <div className="flex items-center">
                            <label
                              htmlFor=""
                              className="w-32 text-center text-sm"
                            >
                              Total
                            </label>
                            <p className="text-sm">
                              {formatRupiah(datas?.total)}
                            </p>
                          </div>
                        </li>
                      </ol>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default DetailServiceTeknisi;
