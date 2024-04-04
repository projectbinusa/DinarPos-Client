import React, { useEffect, useState } from "react";
import { API_BARANG, LAPORAN_BARANG } from "../../../../utils/BaseUrl";
import axios from "axios";

function TanggalFilterBarangDinarpos() {
  const barcode_barang = sessionStorage.getItem("barcode_barang");
  const tglAwal = sessionStorage.getItem("tglAwal");
  const tglAkhir = sessionStorage.getItem("tglAkhir");
  const [laporan, setlaporan] = useState([]);
  const [totalAll, setTotalAll] = useState(0);
  const [namaBarang, setnamaBarang] = useState("");

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${LAPORAN_BARANG}/tanggal/dinarpos?barcode_barang=${barcode_barang}&tanggal_akhir=${tglAkhir}&tanggal_awal=${tglAwal}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setlaporan(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  const getBarang = async () => {
    try {
      const response = await axios.get(
        `${API_BARANG}/barcode?barcode=${barcode_barang}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setnamaBarang(response.data.data.namaBarang);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
    getBarang();
  }, []);

  useEffect(() => {
    let total = 0;
    laporan.forEach((row) => {
      total += row.totalHargaBarang;
    });
    setTotalAll(total);
  }, [laporan]);

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
      <h3 className="text-sm">
        PT DINARTECH SHARE-E
        <span className="block">Jl. Bulustalan I No 27 Semarang</span>
        <span className="block">(024) 3511176. Fax (024) 3546330</span>
        <span className="block">PT. DINARTECH SHARE-E</span>
      </h3>
      <br /> <hr /> <br />
      <h3 className="text-center">LAPORAN PENJUALAN PER BARANG DINARPOS</h3>
      <br />
      <h3 className="text-sm">Nama Barang : {namaBarang}</h3> <br />
      <h3 className="text-sm">
        Periode {tglAwal} sampai {tglAkhir}
      </h3>
      <br />
      <table className="table-auto w-full">
        <thead>
          <tr className="border py-2">
            <th className="text-sm py-2 border-gray-700 border-collapse border-2 px-2">
              No
            </th>
            <th className="text-sm py-2 border-gray-700 border-collapse border-2 px-2">
              Tanggal
            </th>
            <th className="text-sm py-2 border-gray-700 border-collapse border-2 px-2">
              No Faktur
            </th>
            <th className="text-sm py-2 border-gray-700 border-collapse border-2 px-2">
              Nama Barang
            </th>
            <th className="text-sm py-2 border-gray-700 border-collapse border-2 px-2">
              Nama Customer
            </th>
            <th className="text-sm py-2 border-gray-700 border-collapse border-2 px-2">
              Jumlah
            </th>
            <th className="text-sm py-2 border-gray-700 border-collapse border-2 px-2">
              Unit{" "}
            </th>
            <th className="text-sm py-2 border-gray-700 border-collapse border-2 px-2">
              Harga Satuan (Rp)
            </th>
            <th className="text-sm py-2 border-gray-700 border-collapse border-2 px-2">
              Total Harga (Rp)
            </th>
          </tr>
        </thead>
        <tbody>
          {laporan.map((row, index) => {
            return (
              <tr key={index} className="border py-2">
                <td className="text-center text-sm py-2 border-gray-700 border-collapse border-2 px-2">
                  {index + 1}
                </td>
                <td className="text-center text-sm py-2 border-gray-700 border-collapse border-2 px-2">
                  {row.created_date}
                </td>
                <td className="text-center text-sm py-2 border-gray-700 border-collapse border-2 px-2">
                  {row.transaksi.noFaktur}
                </td>
                <td className="text-center text-sm py-2 border-gray-700 border-collapse border-2 px-2">
                  {row.namaBarang}
                </td>
                <td className="text-center text-sm py-2 border-gray-700 border-collapse border-2 px-2">
                  {row.transaksi.customer.nama_customer}
                </td>
                <td className="text-center text-sm py-2 border-gray-700 border-collapse border-2 px-2">
                  {row.qty}
                </td>
                <td className="text-center text-sm py-2 border-gray-700 border-collapse border-2 px-2">
                  {row.unit}
                </td>
                <td className="text-center text-sm py-2 border-gray-700 border-collapse border-2 px-2">
                  {row.hargaBrng}
                </td>
                <td className="text-center text-sm py-2 border-gray-700 border-collapse border-2 px-2">
                  {row.totalHargaBarang}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <h3 className="text-center">
        Total Keseluruhan : {formatRupiah(totalAll)}
      </h3>
    </div>
  );
}

export default TanggalFilterBarangDinarpos;
