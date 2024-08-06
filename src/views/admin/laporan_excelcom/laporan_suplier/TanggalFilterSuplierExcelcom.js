import React, { useEffect, useState } from "react";
import { API_SUPLIER, GET_BARANG_TRANSAKSI_BELI_EXCELCOM, LAPORAN_SUPLIER } from "../../../../utils/BaseUrl";
import axios from "axios";

function TanggalFilterSuplierExcelcom() {
  const suplierId = sessionStorage.getItem("suplierId");
  const tglAwal = sessionStorage.getItem("tglAwal");
  const tglAkhir = sessionStorage.getItem("tglAkhir");
  const [laporan, setlaporan] = useState([]);
  const [totalAll, setTotalAll] = useState(0);
  const [namaSuplier, setnamaSuplier] = useState(0);

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${LAPORAN_SUPLIER}/tanggal/excelcom?id_suplier=${suplierId}&tanggal_akhir=${tglAkhir}&tanggal_awal=${tglAwal}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setlaporan(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  const getSuplier = async () => {
    try {
      const response = await axios.get(`${API_SUPLIER}/` + suplierId, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setnamaSuplier(response.data.data.namaSuplier);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
    getSuplier();
  }, []);

  const [barang, setBarang] = useState([]);

  const barangTransaksi = async (transactionId) => {
    try {
      const response = await axios.get(
        `${GET_BARANG_TRANSAKSI_BELI_EXCELCOM}?id_transaksi=${transactionId}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
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
          const barangData = await barangTransaksi(row.idTransaksiBeli);
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
        EXCEL COM
        <span className="block">
          Jl. Bulustalan 1 No.27 Semarang 087729244899
        </span>
      </h3>
      <br /> <hr /> <br />
      <h3 className="text-center">LAPORAN PEMBELIAN PER SUPLIER EXCELCOM</h3>
      <br />
      <h3 className="text-sm">Nama Suplier : {namaSuplier}</h3> <br />
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
              Nama Suplier
            </th>
            <th className="text-sm py-2 border-gray-700 border-collapse border-2 px-2">
              Nama Barang
            </th>
            <th className="text-sm py-2 border-gray-700 border-collapse border-2 px-2">
              Jumlah Barang
            </th>
            <th className="text-sm py-2 border-gray-700 border-collapse border-2 px-2">
              Unit Barang
            </th>
            <th className="text-sm py-2 border-gray-700 border-collapse border-2 px-2">
              Harga Satuan (Rp)
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
                  {row.suplier.namaSuplier}
                </td>
                <td className="text-center text-sm py-2 border-gray-700 border-collapse border-2 px-2">
                  {barangLaporan.map((brg, idx) => (
                    <ul key={idx}>
                      <li>{brg.namaBarang}</li>
                    </ul>
                  ))}
                </td>
                <td className="text-center text-sm py-2 border-gray-700 border-collapse border-2 px-2">
                  {barangLaporan.map((brg, idx) => (
                    <ul key={idx}>
                      <li>{brg.qty}</li>
                    </ul>
                  ))}
                </td>
                <td className="text-center text-sm py-2 border-gray-700 border-collapse border-2 px-2">
                  {barangLaporan.map((brg, idx) => (
                    <ul key={idx}>
                      <li>{brg.unit}</li>
                    </ul>
                  ))}
                </td>
                <td className="text-center text-sm py-2 border-gray-700 border-collapse border-2 px-2">
                  {barangLaporan.map((brg, idx) => (
                    <ul key={idx}>
                      <li>{brg.hargaBrng}</li>
                    </ul>
                  ))}
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

export default TanggalFilterSuplierExcelcom;
