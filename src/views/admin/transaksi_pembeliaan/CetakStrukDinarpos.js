import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { GET_BARANG_TRANSAKSI_BELI_DINARPOS, GET_TRANSAKSI_BELI } from "../../../utils/BaseUrl";

function CetakStrukDinarpos() {
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
          `${GET_BARANG_TRANSAKSI_BELI_DINARPOS}?id_transaksi=` + param.id,
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
    <div>CetakStrukDinarpos</div>
  )
}

export default CetakStrukDinarpos