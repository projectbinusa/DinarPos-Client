import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  API_ITC,
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
  const [laporans, setLaporan] = useState([]);

  const formatDate = (value) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };

  const id = Decrypt();
  useEffect(() => {
    axios
      .get(`${API_PENGGUNA}/` + id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const response = res.data.data.namaPengguna;
        try {
          axios.get(`${API_ITC}/nama?nama=` + response, {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          }).then((ress) => {
            setSalesmanId(ress.data.data.id);
          })
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

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
      setLaporan(response.data.data);
      console.log(response.data.data);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (salesmanId && tglAwal && tglAkhir) {
      getAll(tglAwal, tglAkhir);
    }
  }, [salesmanId, tglAwal, tglAkhir]);

  return (
    <div className="mx-5 my-3">
      <h1 className="text-center font-semibold">PRINT KUNJUNGAN {formatDate(tglAwal)} s.d {formatDate(tglAkhir)}  </h1>
      <br /> <br />
      <table className="table-auto w-full border border-collapse border-black">
        <thead>
          <tr className="border border-black py-1">
            <th className="text-[10px] py-2 border border-black">No</th>
            <th className="text-[10px] py-2 border border-black">Tgl</th>
            <th className="text-[10px] py-2 border border-black">Instansi</th>
            <th className="text-[10px] py-2 border border-black">Jenis</th>
            <th className="text-[10px] py-2 border border-black">Daerah</th>
            <th className="text-[10px] py-2 border border-black">Tujuan</th>
            <th className="text-[10px] py-2 border border-black">Action</th>
            <th className="text-[10px] py-2 border border-black">Info didapat	</th>
            <th className="text-[10px] py-2 border border-black">CP</th>
            <th className="text-[10px] py-2 border border-black">Visit</th>
            <th className="text-[10px] py-2 border border-black">Tipe</th>
            <th className="text-[10px] py-2 border border-black">Peluang</th>
            <th className="text-[10px] py-2 border border-black">Deal</th>
            <th className="text-[10px] py-2 border border-black">Byr_%</th>
            <th className="text-[10px] py-2 border border-black">Wkt_p</th>
            <th className="text-[10px] py-2 border border-black">Tgl_d</th>
          </tr>
        </thead>
        <tbody>
          {laporans.map((item, index) => (
            <tr key={index} className="border-b py-1">
              <td className="text-[10px] p-1 border border-black text-center">{index + 1}</td>
              <td className="text-[10px] p-1 border border-black text-center">{formatDate(item.tanggalKunjungan)}</td>
              <td className="text-[10px] p-1 border border-black text-center">{item.customer.nama_customer}</td>
              <td className="text-[10px] p-1 border border-black text-center">{item.customer.jenis}</td>
              <td className="text-[10px] p-1 border border-black text-center">{item.customer.kabKot.nama_kabkot} / {item.customer.kec.nama_kec}</td>
              <td className="text-[10px] p-1 border border-black text-center">{item.tujuan}</td>
              <td className="text-[10px] p-1 border border-black text-center">{item.action}</td>
              <td className="text-[10px] p-1 border border-black text-center">{item.infoDpt}</td>
              <td className="text-[10px] p-1 border border-black text-center">{item.cp}</td>
              <td className="text-[10px] p-1 border border-black text-center">{item.nVisit}</td>
              <td className="text-[10px] p-1 border border-black text-center">{item.visit}</td>
              <td className="text-[10px] p-1 border border-black text-center">{item.peluang}</td>
              <td className="text-[10px] p-1 border border-black text-center">{item.deal}</td>
              <td className="text-[10px] p-1 border border-black text-center">{item.pembayaran}</td>
              <td className="text-[10px] p-1 border border-black text-center">{item.waktuPengadaan}</td>
              <td className="text-[10px] p-1 border border-black text-center">{formatDate(item.tanggalDeal)}</td>
            </tr> 
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PrintKunjungan;
