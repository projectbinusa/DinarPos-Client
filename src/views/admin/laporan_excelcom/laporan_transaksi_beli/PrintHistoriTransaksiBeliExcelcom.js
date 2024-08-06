import React, { useEffect, useState } from "react";
import {
  GET_BARANG_TRANSAKSI_BELI_EXCELCOM,
  GET_TRANSAKSI_BELI,
} from "../../../../utils/BaseUrl";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function PrintHistoriTransaksiBeliExcelcom() {
  const [reportData, setReportData] = useState(null);
  const [barang, setbarang] = useState([]);
  const param = useParams();

  useEffect(() => {
    fetchData();
    getAllBarang();
  }, []);

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

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("id-ID");

  return (
    <div className="mx-5 my-3">
      <div className=" my-3">
        <h3 className="text-sm">
          EXCEL COM
          <span className="block">
            Jl. Bulustalan 1 No.27 Semarang 087729244899
          </span>
        </h3>
      </div>
      <hr /> <br />
      <h1 className="text-center">BUKTI PEMBELIAN</h1>
      <h1 className="underline">Printed Date : {formattedDate}</h1>
      <div className="flex justify-between items-center my-3">
        <div>
          <ul>
            <li className="flex">
              <p>NO. Transaksi :</p>
              <p className="ml-2"> {reportData.noFaktur}</p>
            </li>
            <li className="flex">
              <p>Tanggal :</p>
              <p className="ml-2"> {reportData.created_date}</p>
            </li>
            <li className="flex">
              <p>Suplier :</p>
              <p className="ml-2"> {reportData.suplier.namaSuplier}</p>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="flex">
              <p>Pembayaran :</p>
              <p className="ml-2">{reportData.cashCredit}</p>
            </li>
            <li className="flex">
              <p>Status :</p>
              <p className="ml-2">Status</p>
            </li>
            <li className="flex">
              <p>NO. Faktur :</p>
              <p className="ml-2"> {reportData.noFaktur}</p>
            </li>
          </ul>
        </div>
      </div>
      <br />
      <br />
      <table className="table-auto w-full">
        <thead>
          <tr className="border-b py-1">
            <th className="text-sm py-1">No</th>
            <th className="text-sm py-1">Kode Barang</th>
            <th className="text-sm py-1">Nama Barang</th>
            <th className="text-sm py-1">Jumlah</th>
            <th className="text-sm py-1">Harga Satuan</th>
            <th className="text-sm py-1">Diskon</th>
            <th className="text-sm py-1">Total</th>
          </tr>
        </thead>
        <tbody>
          {barang.map((down, index) => (
            <tr key={index} className="border-b py-1">
              <td className="text-center text-sm py-1">{index + 1}</td>
              <td className="text-center text-sm py-1">{down.barcodeBarang}</td>
              <td className="text-center text-sm py-1">{down.namaBarang}</td>
              <td className="text-center text-sm py-1">{down.qty}</td>
              <td className="text-center text-sm py-1">
                {formatRupiah(down.hargaBrng)}
              </td>
              <td className="text-center text-sm py-1">{down.diskon}</td>
              <td className="text-center text-sm py-1">
                {formatRupiah(down.totalHargaBarang)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <div className="flex justify-between items-center my-3">
        <div>
          <ul>
            <li className="flex">
              <p>No. Adm :</p>
              <p className="ml-2"> {reportData.noFaktur}</p>
            </li>
            <li className="flex">
              <p>Tanggal Faktur :</p>
              <p className="ml-2"> {reportData.created_date}</p>
            </li>
            <li className="flex">
              <p>Keterangan :</p>
              <p className="ml-2"> {reportData.keterangan}</p>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="flex">
              <p className="w-36">Sub Total </p>
              <p className="ml-2">: {reportData.totalBelanja}</p>
            </li>
            <li className="flex">
              <p className="w-36">Pot Lain-lain </p>
              <p className="ml-2">: {reportData.potongan}</p>
            </li>
            <li className="flex">
              <p className="w-36">Total </p>
              <p className="ml-2">: {reportData.totalBayarBarang}</p>
            </li>
            <li className="flex">
              <p className="w-36">Bayar </p>
              <p className="ml-2">: {reportData.pembayaran}</p>
            </li>
            <li className="flex">
              <p className="w-36">Kembali / Kurang </p>
              <p className="ml-2">: {reportData.sisa}</p>
            </li>
          </ul>
        </div>
      </div>
      <br />
      <br />
      <div className="flex justify-between items-start my-5">
        <div>
          <p className="text-center">Di Bukukan :</p>
          <p className="text-center">Adm. Gudang</p>
          <br />
          <br />
          <br />
          <p>(..............................................)</p>
        </div>
        <div>
          <p className="text-center">Penerima :</p>
          <p className="text-center">Ka. Gudang</p> <br />
          <br />
          <br />
          <p>(..............................................)</p>
        </div>
        <div>
          <p className="text-center">Mengetahui :</p>
          <p className="text-center">Ka. Departement</p> <br />
          <br />
          <br /> <p>(..............................................)</p>
        </div>
      </div>
    </div>
  );
}

export default PrintHistoriTransaksiBeliExcelcom;
