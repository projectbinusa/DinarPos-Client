import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {
  GET_BARANG_TRANSAKSI_JUAL_DINARPOS,
  GET_TRANSAKSI_JUAL,
} from "../../../utils/BaseUrl";

function CetakStrukPenjualanDinar() {
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
        `${GET_BARANG_TRANSAKSI_JUAL_DINARPOS}?id_transaksi=` + param.id,
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
      const response = await axios.get(`${GET_TRANSAKSI_JUAL}/` + param.id, {
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
    <div className="mx-5 my-3">
      <h3 className="text-center">FAKTUR PENJUALAN</h3>
      <div className="flex justify-between items-center my-3">
        <h3 className="text-sm">
          PT. DINAR TECH SHARE-E /
          <span className="block">Excellent Computer</span>
          <span className="block">
            Jl. Bulustalan 1 No.27 Semarang (024) 3515176 Fax (024) 3546330
          </span>
        </h3>
        <div>
          <h3 className="text-sm">
            Kepada Yth.
            <span className="block">{reportData.customer.nama_customer}</span>
            <span className="block">{reportData.customer.alamat}</span>
            <span className="block">{reportData.customer.telp}</span>
          </h3>
        </div>
      </div>
      <div className="flex justify-between items-center my-3">
        <h3 className="text-sm">
          NPWP : 02.779.101.7-508.000 <span className="block">Banker's:</span>
          <span className="block">
            Bank Syariah Mandiri : 777.9696.965 a/n PT. Dinar Tech Share-E
          </span>
        </h3>
        <div>
          <ul>
            <li className="flex">
              <p>NO. FAKTUR :</p>
              <p>{reportData.noFaktur}</p>
            </li>
            <li className="flex">
              <p>TGL FAKTUR :</p>
              <p>{reportData.created_date}</p>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <table className="table-auto w-full">
        <thead>
          <tr className=" py-1">
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
            <tr key={index} className=" py-1">
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
      <hr />
      <div className="flex justify-between items-start my-3">
        <div>
          <ul className="list-inside list-decimal text-sm">
            <li>Barang yang sudah dibeli tidak dapat ditukar / dikembalikan</li>
            <li>
              Pembayaran melalui cek, giro, transfer dianggap sah jika sudah
              dapat dicairkan
            </li>
            <li>
              Tidak menjual / install software bajakan, tidak bertanggung jawab
              atas software dalam komputer
            </li>
            <li>
              Jam operasional 06.00 - 21.00 WIB ( Senin - Sabtu ), Minggu 08.00
              - 21.00 WIB
            </li>
          </ul>
        </div>
        <div>
          <ul className="text-sm">
            <li className="flex">
              <p className="w-36">Total</p>
              <p>{formatRupiah(reportData.totalBelanja)}</p>
            </li>
            <li className="flex">
              <p className="w-36">Potongan</p>
              <p>{formatRupiah(reportData.potongan)}</p>
            </li>
            <li className="flex">
              <p className="w-36">Total Bayar</p>
              <p>{formatRupiah(reportData.totalBayarBarang)}</p>
            </li>
            <li className="flex">
              <p className="w-36">Keterangan</p>
              <p>{reportData.cashKredit}</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between items-start my-5">
        <div>
          <p>Penerima</p>
          <br />
          <br />
          <br />
          <p>{reportData.customer.nama_customer}</p>
        </div>
        <div>
          <p>Hormat Kami</p>
          <br />
          <br />
          <br />
          <p>{reportData.salesman.namaSalesman}</p>
        </div>
        <div>
          <p>Catatan</p>
          <p>{reportData.keterangan}</p>
        </div>
      </div>
      <hr />
      <div className="flex justify-between items-start my-5">
        <p>Tanggal Cetak : {reportData.created_date}</p>
        <p>Dicetak Oleh : {reportData.salesman.namaSalesman}</p>
      </div>
    </div>
  );
}

export default CetakStrukPenjualanDinar;
