import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../component/SidebarAdmin";
import {
  Breadcrumbs,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import {
  ChatBubbleBottomCenterIcon,
  ChevronLeftIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { API_SERVICE } from "../../utils/BaseUrl";

function DetailServicePimpinan() {
  const [datas, setdatas] = useState(null);
  const param = useParams();

  useEffect(() => {
    axios
      .get(`${API_SERVICE}/` + param.id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setdatas(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [param.id]);

  const formatDate = (value) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  const formatRupiah = (value) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return formatter.format(value);
  };

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
    allTglKonf();
  }, [param.id]);

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Detail Service
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/dashboard_pimpinan" className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <span className="cursor-default capitalize">detail Service</span>
          </Breadcrumbs>
        </div>

        <main className="bg-blue-500 border-4 border-blue-500 shadow-lg my-5 rounded">
          <div className="flex justify-between items-center p-3">
            <a href="/dashboard_pimpinan">
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
              </IconButton>
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
                <div>
                  <ol>
                    <li className="mb-3">
                      <div className="flex items-center">
                        <label htmlFor="" className="w-32 text-center text-sm">
                          Nama
                        </label>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={datas?.nama}
                          readOnly
                        />
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
                          readOnly
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={datas?.alamat}
                        ></textarea>
                      </div>
                    </li>
                    <li className="mb-3">
                      <div className="flex items-center">
                        <label htmlFor="" className="w-32 text-center text-sm">
                          CP
                        </label>
                        <input
                          readOnly
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={datas?.ket}
                          readOnly
                        ></textarea>
                      </div>
                    </li>
                  </ol>
                  <br />
                </div>
                <br />
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
                        value={formatDate(datas?.tgl_masuk)}
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
                        value={formatDate(datas?.tanggalJadi)}
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
                                <li className="mb-2 flex justify-between items-center">
                                  <span>{formatDate(row.tglKonf)}</span>
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
                        value={formatDate(datas?.tanggalAmbil)}
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
                <div>
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
                        readOnly
                        value={datas?.catatan}
                      ></textarea>
                    </div>
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
                    <p className="w-full">{formatRupiah(datas?.estimasi)}</p>
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
              <br />
              <br />
              <p class="font-semibold text-sm ">
                Aturan Pengisian Form Service:
              </p>
              <ol class="list-inside list-decimal">
                <li class="font-semibold text-sm">
                  Harap isi semua kolom dengan tepat dan jelas.
                </li>
                <li class="font-semibold text-sm">
                  Ketika barang sudah diambil / diantar ke customer / pelanggan,
                  kolom tanggal ambil HARUS DIISI.
                </li>
              </ol>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default DetailServicePimpinan;
