import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import {
  ChatBubbleBottomCenterIcon,
  ChevronLeftIcon,
  CurrencyDollarIcon,
  PlusIcon,
  PrinterIcon,
  ReceiptPercentIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { API_PENGGUNA, API_SERVICE, API_TRANSAKSI } from "../../../utils/BaseUrl";
import Decrypt from "../../../component/Decrypt";

function DetailServiceTaken() {
  const [datas, setdatas] = useState(null);
  const param = useParams();

  const formatDate = (value) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  // FORMAT RUPIAH
  const formatRupiah = (value) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return formatter.format(value);
  };

  const [namaCustomer, setnamaCustomer] = useState(
    datas?.customer?.nama_customer
  );
  const [alamatCustomer, setalamatCustomer] = useState("");
  const [cpCustomer, setcpCustomer] = useState("");
  const [ketCustomer, setketCustomer] = useState("");

  useEffect(() => {
    axios
      .get(`${API_SERVICE}/` + param.id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setdatas(res.data.data);
        setketCustomer(res.data.data.ket);
        setnamaCustomer(res.data.data.nama);
        setcpCustomer(res.data.data.cp);
        setalamatCustomer(res.data.data.alamat);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [param.id]);

  // TRANSAKSI 
  const [dataTransaksi, setDataTransaksi] = useState(null);
  const [idTransaksi, setIdTransaksi] = useState(0);

  useEffect(() => {
    axios
      .get(`${API_TRANSAKSI}/get-transaksi-by-id-tt/` + param.id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const respon = res.data[0];
        setDataTransaksi(respon);
        setIdTransaksi(respon.idTransaksi);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [param.id]);

  // ALL BARANG TRANSAKSI
  const [brgTransaksi, setBrgTransaksi] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_TRANSAKSI}/barang/penjualan/dinarpos?id_transaksi=` + idTransaksi, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const respon = res.data.data;
        setBrgTransaksi(respon);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [idTransaksi]);


  // GET ALL TGL KONF
  const [tglKonfs, settglKonfs] = useState([]);

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
    allTglKonf()
  }, [])

  const [level, setlevel] = useState("");

  const idPengguna = Decrypt()
  useEffect(() => {
    axios.get(`${API_PENGGUNA}/` + idPengguna, {
      headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
    }).then((res) => {
      const response = res.data.data;
      setlevel(response.levelPengguna)
    }).catch((err) => {
      console.log(err);
    })
  }, [idPengguna])

  // GET ALL STATUS SERVICE
  const [allStatus, setallStatus] = useState([]);

  const getAllStatus = async () => {
    try {
      const response = await axios.get(
        `${API_SERVICE}/status/` + param.id,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setallStatus(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllStatus()
  }, [param.id])

  let dashboard = "";

  if (level === "Pimpinan") {
    dashboard = "dashboard_pimpinan";
  } else if (level === "Teknisi") {
    dashboard = "dashboard_teknisi"
  } else if (level === "AdminService") {
    dashboard = "dashboard_service"
  } else {
    dashboard = "dashboard"
  }

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase font-poppins">
            Detail Service
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href={'/' + dashboard} className="opacity-60">
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
            <a href="/data_service_taken">
              <span>Taken</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-blue-500 border-4 border-blue-500 shadow-lg my-5 rounded">
          <div className="flex justify-between items-center p-3">
            <a href="/data_service_taken">
              <Typography
                variant="paragraph"
                className="capitalize font-semibold text-white flex font-poppins"
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
              </IconButton>
              <IconButton size="md" color="green" className="ml-3">
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
              </IconButton>
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
                        defaultValue={datas?.customer?.nama_customer}
                        readOnly />
                    </div>
                  </li>
                  <li className="mb-3">
                    <div className="flex items-center">
                      <label htmlFor="" className="w-32 text-center text-sm">
                        Alamat
                      </label>
                      <textarea
                        name="alamat"
                        id="alamat"
                        cols="30"
                        rows="3"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        readOnly
                        value={alamatCustomer}
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
                        defaultValue={datas?.cp}
                        readOnly />
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
                        readOnly
                        value={ketCustomer}
                      ></textarea>
                    </div>
                  </li>
                </ol>
                <br /> <br />
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
                      <p className="w-full text-sm">{datas?.tgl_masuk}</p>
                    </div>
                  </li>
                  <li className="mb-3">
                    <div className="flex items-center">
                      <label htmlFor="" className="w-32 text-center text-sm">
                        Tgl Jadi
                      </label>
                      <p className="w-full text-sm">{datas?.tgl_jadi}</p>
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
                              {tglKonfs.map((row, idx) => (
                                <li className="mb-2 flex justify-between items-center" key={idx}>
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
                      <p className="w-full text-sm">{datas?.tgl_ambil}</p>
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
                          defaultValue={datas?.produk}
                        />
                      </td>
                      <td className="border-gray-300 border bg-white p-2">
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          readOnly
                          defaultValue={datas?.merk}
                        />
                      </td>
                      <td className="border-gray-300 border bg-white p-2">
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          readOnly
                          defaultValue={datas?.type}
                        />
                      </td>
                      <td className="border-gray-300 border bg-white p-2">
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          readOnly
                          defaultValue={datas?.sn}
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
                <div>
                  <br />
                  <h1 className="text-lg">
                    <b>
                      Status dan Laporan {datas?.statusEnd}
                    </b>
                  </h1>
                  <hr />
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse my-3">
                      <thead>
                        <tr>
                          <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2 w-24">Tanggal</th>
                          <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">Teknisi</th>
                          <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">Status</th>
                          <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">Solusi</th>
                          <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">Ket</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allStatus.length > 0 ? (allStatus.map((row, idx) => (
                          <tr key={idx}>
                            <td className="text-sm text-center p-2 border-gray-300 border">{formatDate(row.created_date)}</td>
                            <td className="text-sm text-center p-2 border-gray-300 border">{row.teknisi?.nama}</td>
                            <td className="text-sm text-center p-2 border-gray-300 border">{row.status}</td>
                            <td className="text-sm text-center p-2 border-gray-300 border">{row.solusi}</td>
                            <td className="text-sm text-center p-2 border-gray-300 border">{row.ket}</td>
                          </tr>
                        ))) : (<>
                          <tr>
                            <td colSpan="5" className="text-center text-xs border-gray-300 border bg-white p-2">Data Belum Ada !</td>
                          </tr></>)}
                      </tbody>
                    </table>
                  </div>
                </div>
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
                      readOnly
                      value={datas?.catatan}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-gray-400 shadow bg-white border rounded p-2 mt-5">
              <h1 className="font-semibold mt-1">Perincian Biaya</h1>
              <hr /> <br />
              <ol className="">
                <li className="border border-t-gray-300 border-b-gray-300 p-2 bg-gray-50">
                  <div className="flex items-center">
                    <p className="w-36">Estimasi</p>
                    <p className="w-full">
                      {formatRupiah(datas?.estimasi)}
                    </p>
                  </div>
                </li>
                <li className="border border-t-gray-300 border-b-gray-300 p-2 bg-gray-50">
                  <div className="flex items-center">
                    <p className="w-36">Sparepart</p>
                    <p className="w-full">
                      {formatRupiah(datas?.biayaSparepart)}
                    </p>
                  </div>
                </li>
                <li className="border border-t-gray-300 border-b-gray-300 p-2 bg-gray-50">
                  <div className="flex items-center">
                    <p className="w-36">Service</p>
                    <p className="w-full">
                      {formatRupiah(datas?.biayaService)}
                    </p>
                  </div>
                </li>
                <li className="border border-t-gray-300 border-b-gray-300 p-2 bg-gray-50">
                  <div className="flex items-center">
                    <p className="w-36">Total</p>
                    <p className="w-full">{formatRupiah(datas?.total)}</p>
                  </div>
                </li>
              </ol>
              {dataTransaksi ? (<>
                <div>
                  <br />
                  <h1 className="text-base lg:text-xl font-medium">
                    No Faktur : {dataTransaksi?.noFaktur}
                  </h1>
                  <hr /> <br />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
                    <ol>
                      <li className="mb-3">
                        <div className="flex items-center">
                          <p className="text-sm lg:text-base font-medium w-28">Tanggal</p> :
                          <p className="text-sm lg:text-base ml-2">{dataTransaksi?.tanggal}</p>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div className="flex items-center">
                          <p className="text-sm lg:text-base font-medium w-28">Customer</p>:
                          <p className="text-sm lg:text-base ml-2">
                            {dataTransaksi.customer?.nama_customer}
                          </p>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div className="flex items-center">
                          <p className="text-sm lg:text-base font-medium w-28">Salesman</p>:
                          <p className="text-sm lg:text-base ml-2">
                            {dataTransaksi.salesman?.namaSalesman}
                          </p>
                        </div>
                      </li>
                    </ol>
                    <ol>
                      <li className="mb-3">
                        <div className="flex items-center">
                          <p className="text-sm lg:text-base font-medium w-28">Total Belanja</p>:
                          <p className="text-sm lg:text-base ml-2">
                            {dataTransaksi.totalBelanja !== null ? formatRupiah(dataTransaksi.totalBelanja) : ""}
                          </p>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div className="flex items-center">
                          <p className="text-sm lg:text-base font-medium w-28">Potongan</p>:
                          <p className="text-sm lg:text-base ml-2">
                            {formatRupiah(dataTransaksi.potongan)}
                          </p>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div className="flex items-center">
                          <p className="text-sm lg:text-base font-medium w-28">Pembayaran</p>:
                          <p className="text-sm lg:text-base ml-2">
                            {formatRupiah(dataTransaksi.pembayaran)}
                          </p>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div className="flex items-center">
                          <p className="text-sm lg:text-base font-medium w-28">Kembalian</p>:
                          <p className="text-sm lg:text-base ml-2">
                            {formatRupiah(dataTransaksi.sisa)}
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse my-3">
                      <thead>
                        <tr>
                          <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2 px-1">
                            Barcode
                          </th>
                          <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2 px-1">
                            Nama Barang
                          </th>
                          <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2 px-1">
                            Harga Barang (Rp)
                          </th>
                          <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2 px-1">
                            QTY
                          </th>
                          <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2 px-1">
                            Total Harga Barang (Rp)
                          </th>
                          <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2 px-1">
                            Diskon
                          </th>
                          <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2 px-1">
                            Total Harga (Rp)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {brgTransaksi.length > 0 ? (
                          <>
                            {brgTransaksi.map((row, idx) => (
                              <tr key={idx}>
                                <td className="text-sm text-center p-2 border-gray-300 border">{row.barcodeBarang}</td>
                                <td className="text-sm text-center p-2 border-gray-300 border">{row.namaBarang}</td>
                                <td className="text-sm text-center p-2 border-gray-300 border">{row.hargaBrng}</td>
                                <td className="text-sm text-center p-2 border-gray-300 border">{row.qty}</td>
                                <td className="text-sm text-center p-2 border-gray-300 border">{row.totalHargaBarang}</td>
                                <td className="text-sm text-center p-2 border-gray-300 border">{row.diskon}</td>
                                <td className="text-sm text-center p-2 border-gray-300 border">{row.totalHarga}</td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <>
                            <tr>
                              <td colSpan="7" className="text-center text-xs border-gray-300 border bg-white p-2">Tidak Ada Barang !</td>
                            </tr>
                          </>)}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <a
                      href={`/print_histori_dinarpos/${dataTransaksi.idTransaksi}`}
                    >
                      <Button variant="gradient" size="md" color="blue" className="font-poppins font-medium">
                        Print
                      </Button>
                    </a>
                  </div>
                  <br />
                  <br />
                </div>
              </>) : (<></>)}
              <br />
              <div>
                <p className="font-semibold text-sm ">
                  Aturan Pengisian Form Service:
                </p>
                <ol className="list-inside list-decimal">
                  <li className="font-semibold text-sm">
                    Harap isi semua kolom dengan tepat dan jelas.
                  </li>
                  <li className="font-semibold text-sm">
                    Ketika barang sudah diambil / diantar ke customer / pelanggan,
                    kolom tanggal ambil HARUS DIISI.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default DetailServiceTaken;
