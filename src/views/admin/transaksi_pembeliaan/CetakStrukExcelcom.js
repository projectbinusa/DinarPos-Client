import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {
  GET_BARANG_TRANSAKSI_BELI_EXCELCOM,
  GET_TRANSAKSI_BELI,
} from "../../../utils/BaseUrl";

function CetakStrukExcelcom() {
  const [reportData, setReportData] = useState(null);
  const [barang, setbarang] = useState([]);
  const param = useParams();

  useEffect(() => {
    fetchData();
    getAllBarang();
  }, []);

  const getAllBarang = async () => {
    try {
      const response = await axios.get(
        `${GET_BARANG_TRANSAKSI_BELI_EXCELCOM}?id_transaksi=` + param.id,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setbarang(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`${GET_TRANSAKSI_BELI}/` + param.id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setReportData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (!reportData) {
    return <div>Loading...</div>;
  }

  // FORMAT RUPIAH
  const formatRupiah = (value) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return formatter.format(value);
  };

  return (
    <div className="m-12">
      <h1 className="text-lg font-semibold">EXCEL COM</h1>
      <h1>
        Jl. Bulustalan I No 27 Semarang <br /> Semarang <br /> 0877 2924 4899
      </h1>
      <br />
      <hr className="h-2 text-black" />
      <br />
      <h1 className="text-center font-semibold">BUKTI PEMBELIAN EXCEL COM</h1>
      <br />
      <div className="flex justify-between items-center">
        <ul>
          <li className="flex">
            <h2 className="w-40">No Transaksi</h2>
            <h2>: {reportData.noFaktur}</h2>
          </li>
          <li className="flex">
            <h2 className="w-40">Tanggal</h2>
            <h2>: {reportData.tanggal}</h2>
          </li>
          <li className="flex">
            <h2 className="w-40">Suplier</h2>
            <h2>: {reportData.suplier.namaSuplier}</h2>
          </li>
        </ul>
        <ul>
          <li className="flex">
            <h2 className="w-40">Pembayaran</h2>
            <h2>: {reportData.cashCredit}</h2>
          </li>
          <li className="flex">
            <h2 className="w-40">Status</h2>
            <h2>: Status</h2>
          </li>
          <li className="flex">
            <h2 className="w-40">No Faktur</h2>
            <h2>: {reportData.noFaktur}</h2>
          </li>
        </ul>
      </div>
      <br /> <br />
      <table className="table-auto border-collapse border border-black w-full">
        <thead>
          <tr className="border border-black py-1">
            <th className="border border-black py-1">No</th>
            <th className="border border-black py-1">Kode</th>
            <th className="border border-black py-1">Nama Barang</th>
            <th className="border border-black py-1">QTY</th>
            <th className="border border-black py-1">Harga Beli</th>
            <th className="border border-black py-1">Diskon</th>
            <th className="border border-black py-1">Netto</th>
            <th className="border border-black py-1">Total</th>
          </tr>
        </thead>
        <tbody>
          {barang.map((down, index) => (
            <tr key={index} className="border border-black py-1">
              <td className="text-center border border-black py-1">
                {index + 1}
              </td>
              <td className="text-center border border-black py-1">
                {down.barcodeBarang}
              </td>
              <td className="text-center border border-black py-1">
                {down.namaBarang}
              </td>
              <td className="text-center border border-black py-1">
                {down.qty}
              </td>
              <td className="text-center border border-black py-1">
                {formatRupiah(down.hargaBrng)}
              </td>
              <td className="text-center border border-black py-1">
                {down.diskon}
              </td>
              <td className="text-center border border-black py-1">
                {formatRupiah(down.hargaBrng)}
              </td>
              <td className="text-center border border-black py-1">
                {formatRupiah(down.totalHargaBarang)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br /> <br />
      <div className="flex justify-between">
        <ul>
          <li className="flex">
            <h2 className="w-40">No Administrasi</h2>
            <h2>: {reportData.noFaktur}</h2>
          </li>
          <li className="flex">
            <h2 className="w-40">Tanggal Faktur</h2>
            <h2>: {reportData.tanggal}</h2>
          </li>
          <li className="flex">
            <h2 className="w-40">Keterangan</h2>
            <h2>: {reportData.keterangan}</h2>
          </li>
        </ul>
        <ul>
          <li className="flex">
            <h2 className="w-40">Sub. Total</h2>
            <h2>: {formatRupiah(reportData.totalBelanja)}</h2>
          </li>
          <li className="flex">
            <h2 className="w-40">Potongan Lain</h2>
            <h2>: {formatRupiah(reportData.potongan)}</h2>
          </li>
          <li className="flex">
            <h2 className="w-40">Total</h2>
            <h2>: {formatRupiah(reportData.totalBayarBarang)}</h2>
          </li>
          <li className="flex">
            <h2 className="w-40">Bayar</h2>
            <h2>: {formatRupiah(reportData.pembayaran)}</h2>
          </li>
          <li className="flex">
            <h2 className="w-40">Kembali / Kurang</h2>
            <h2>: {formatRupiah(reportData.sisa)}</h2>
          </li>
        </ul>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="grid grid-cols-3 items-center">
        <div>
          <h2 className="text-center">
            Di Bukukan: <br /> Adm. Gudang
          </h2>
          <br />
          <br />
          <br />
          <h2 className="text-center">
            (..........................................)
          </h2>
        </div>
        <div>
          <h2 className="text-center">
            Penerima : <br /> Ka. Gudang
          </h2>
          <br />
          <br />
          <br />
          <h2 className="text-center">
            (..........................................)
          </h2>
        </div>
        <div>
          <h2 className="text-center">
            Mengetahui: <br /> Ka. Departement
          </h2>
          <br />
          <br />
          <br />
          <h2 className="text-center">
            (..........................................)
          </h2>
        </div>
      </div>
    </div>
  );
}

export default CetakStrukExcelcom;
