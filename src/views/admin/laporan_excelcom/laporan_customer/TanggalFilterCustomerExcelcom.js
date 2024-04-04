import React, { useEffect, useState } from "react";
import {
  API_CUSTOMER,
  GET_BARANG_TRANSAKSI_JUAL_EXCELCOM,
  LAPORAN_CUSTOMER,
} from "../../../../utils/BaseUrl";
import axios from "axios";

function TanggalFilterCustomerExcelcom() {
  const customerId = sessionStorage.getItem("customerId");
  const tglAwal = sessionStorage.getItem("tglAwal");
  const tglAkhir = sessionStorage.getItem("tglAkhir");
  const [laporan, setlaporan] = useState([]);
  const [totalAll, setTotalAll] = useState(0);
  const [namaCustomer, setnamaCustomer] = useState(0);

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${LAPORAN_CUSTOMER}/tanggal/excelcom?id_customer=${customerId}&tanggal_akhir=${tglAkhir}&tanggal_awal=${tglAwal}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setlaporan(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  const getCustomer = async () => {
    try {
      const response = await axios.get(`${API_CUSTOMER}/` + customerId, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setnamaCustomer(response.data.data.nama_customer);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
    getCustomer();
  }, []);

  const [barang, setBarang] = useState([]);

  const barangTransaksi = async (transactionId) => {
    try {
      const response = await axios.get(
        `${GET_BARANG_TRANSAKSI_JUAL_EXCELCOM}?id_transaksi=${transactionId}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log("get all", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchBarangTransaksi = async () => {
      const barangList = await Promise.all(
        laporan.map(async (row) => {
          const barangData = await barangTransaksi(row.idTransaksi);
          return barangData;
        })
      );
      setBarang(barangList);
    };

    fetchBarangTransaksi();
  }, [laporan]);

  useEffect(() => {
    let total = 0;
    laporan.forEach((row) => {
      total += row.totalBelanja;
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
        EXCEL COM{" "}
        <span className="block">
          Jl. Bulustalan 1 No.27 Semarang 087729244899
        </span>
      </h3>
      <br /> <hr /> <br />
      <h3 className="text-center">LAPORAN PENJUALAN PER CUSTOMER EXCELCOM</h3>
      <br />
      <h3 className="text-sm">Nama Customer : {namaCustomer}</h3> <br />
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
              Nama Customer
            </th>
            <th className="text-sm py-2 border-gray-700 border-collapse border-2 px-2">
              Nama Barang
            </th>
            <th className="text-sm py-2 border-gray-700 border-collapse border-2 px-2">
              QTY
            </th>
            <th className="text-sm py-2 border-gray-700 border-collapse border-2 px-2">
              Harga Barang (Rp)
            </th>
            <th className="text-sm py-2 border-gray-700 border-collapse border-2 px-2">
              Total Harga Barang (Rp)
            </th>
            <th className="text-sm py-2 border-gray-700 border-collapse border-2 px-2">
              Potongan Harga (Rp)
            </th>
            <th className="text-sm py-2 border-gray-700 border-collapse border-2 px-2">
              Total Keseluruhan (Rp)
            </th>
          </tr>
        </thead>
        <tbody>
          {laporan.map((row, index) => {
            const barangLaporan = barang[index] || [];

            return (
              <tr key={index} className="border py-2">
                <td className="text-center text-sm py-2 border-gray-700 border-collapse border-2 px-2">
                  {index + 1}
                </td>
                <td className="text-center text-sm py-2 border-gray-700 border-collapse border-2 px-2">
                  {row.created_date}
                </td>
                <td className="text-center text-sm py-2 border-gray-700 border-collapse border-2 px-2">
                  {row.noFaktur}
                </td>
                <td className="text-center text-sm py-2 border-gray-700 border-collapse border-2 px-2">
                  {row.customer.nama_customer}
                </td>
                <td className="text-center text-sm py-2 border-gray-700 border-collapse border-2 px-2">
                  {barangLaporan.map((brg, idx) => (
                    <ul key={idx}>
                      <li>{brg.namaBarang}</li>
                    </ul>
                  ))}{" "}
                </td>
                <td className="text-center text-sm py-2 border-gray-700 border-collapse border-2 px-2">
                  {barangLaporan.map((brg, idx) => (
                    <ul key={idx}>
                      <li>{brg.qty}</li>
                    </ul>
                  ))}{" "}
                </td>
                <td className="text-center text-sm py-2 border-gray-700 border-collapse border-2 px-2">
                  {barangLaporan.map((brg, idx) => (
                    <ul key={idx}>
                      <li>{brg.hargaBrng}</li>
                    </ul>
                  ))}{" "}
                </td>
                <td className="text-center text-sm py-2 border-gray-700 border-collapse border-2 px-2">
                  {row.totalBayarBarang}
                </td>
                <td className="text-center text-sm py-2 border-gray-700 border-collapse border-2 px-2">
                  {row.potongan}
                </td>
                <td className="text-center text-sm py-2 border-gray-700 border-collapse border-2 px-2">
                  {row.totalBelanja}
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

export default TanggalFilterCustomerExcelcom;
