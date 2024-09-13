import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  API_ITC_NAMA,
  API_KUNJUNGAN_DATE_BETWEEN_SALESMAN,
  API_PENGGUNA,
} from "../../../utils/BaseUrl";
import Decrypt from "../../../component/Decrypt";

function PrintKunjungan({ param }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tglAwal = queryParams.get("tgl_awal");
  const tglAkhir = queryParams.get("tgl_akhir");

  const [salesmanId, setSalesmanId] = useState(null);
  const [supliers, setSupliers] = useState([]);
  const [searchName, setSearchName] = useState(""); // Add state for searchName
  const [salesmanData, setSalesmanData] = useState(null); // Add state for salesman data

  // GET ALL with Param
  const getAll = async (tglAwal, tglAkhir) => {
    if (!salesmanId) {
      console.error("Salesman ID belum tersedia.");
      return;
    }

    try {
      const response = await axios.get(
        `${API_KUNJUNGAN_DATE_BETWEEN_SALESMAN}?id_salesman=${salesmanId}&tanggal_awal=${tglAwal}&tanggal_akhir=${tglAkhir}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setSupliers(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // GET BY NAMA
  const getByNama = async (nama) => {
    try {
      const response = await axios.get(`${API_ITC_NAMA}?nama=${nama}`, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      });

      setSalesmanData(response.data.data); // Set the returned salesman data
    } catch (err) {
      console.error("Failed to fetch salesman by name:", err.message);
      setSalesmanData(null);
    }
  };

  const id = Decrypt();
  useEffect(() => {
    axios
      .get(`${API_PENGGUNA}/${id}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const response = res.data.data;
        setSalesmanId(response.id_salesman);
      })
      .catch((err) => {
        console.error("Failed to fetch salesman ID:", err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    getByNama(searchName); // Use searchName from state
  };

  useEffect(() => {
    if (salesmanId && tglAwal && tglAkhir) {
      getAll(tglAwal, tglAkhir);
    }
  }, [salesmanId, tglAwal, tglAkhir]);

  return (
    <div className="mx-5 my-3">
      <div className="my-3">
        {/* <h3 className="text-sm">
          Print Kunjungan
          <span className="block">
            Jl. Bulustalan 1 No.27 Semarang 087729244899
          </span>
        </h3> */}
      </div>
      <hr /> <br />
      <h1 className="text-center">BUKTI PEMBELIAN</h1>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)} // Set searchName on change
          placeholder="Search by name"
        />
        <button type="submit">Search</button>
      </form>
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
          {supliers.map((item, index) => (
            <tr key={index} className="border-b py-1">
              <td className="text-sm py-1">{index + 1}</td>
              <td className="text-sm py-1">{item.kodeBarang}</td>
              <td className="text-sm py-1">{item.namaBarang}</td>
              <td className="text-sm py-1">{item.jumlah}</td>
              <td className="text-sm py-1">{item.hargaSatuan}</td>
              <td className="text-sm py-1">{item.diskon}</td>
              <td className="text-sm py-1">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PrintKunjungan;
