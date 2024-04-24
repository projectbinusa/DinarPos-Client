import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import { Breadcrumbs, Button, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import {
  API_BARANG,
  GET_BARANG_TRANSAKSI_JUAL_EXCELCOM,
  GET_TRANSAKSI_JUAL,
} from "../../../../utils/BaseUrl";

function DetailHistoriSalesmanExcelcom() {
  const [barang, setbarang] = useState([]);

  const [ttlBayarBrg, setttlBayarBrg] = useState("");
  const [pembayaran, setpembayaran] = useState("");
  const [potongan, setpotongan] = useState("");
  const [ttlBelanja, setttlBelanja] = useState("");
  const [kembalian, setkembalian] = useState("");

  const param = useParams();

  // FORMAT RUPIAH
  const formatRupiah = (value) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return formatter.format(value);
  };

  // GET BARANG TRANSAKSI
  const barangTransaksi = async () => {
    try {
      const response = await axios.get(
        `${GET_BARANG_TRANSAKSI_JUAL_EXCELCOM}?id_transaksi=` + param.id,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setbarang(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    barangTransaksi();
  }, []);

  useEffect(() => {
    axios
      .get(`${GET_TRANSAKSI_JUAL}/` + param.id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const response = res.data.data;
        setttlBayarBrg(response.totalBayarBarang);
        setpembayaran(response.pembayaran);
        setpotongan(response.potongan);
        setttlBelanja(response.totalBelanja);
        setkembalian(response.sisa);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [namaBarangList, setNamaBarangList] = useState([]);

  const fetchNamaBarangList = async () => {
    const newNamaBarangList = [];
    for (const brg of barang) {
      try {
        const response = await axios.get(
          `${API_BARANG}/barcode?barcode=${brg.barcodeBarang}`,
          {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          }
        );
        newNamaBarangList.push(response.data.data.namaBarang);
      } catch (error) {
        console.log(error);
        newNamaBarangList.push("Nama Barang Tidak Ditemukan");
      }
    }
    setNamaBarangList(newNamaBarangList);
  };

  useEffect(() => {
    fetchNamaBarangList();
  }, [barang]);

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Detail Histori LAPORAN SALESMAN Excelcom
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/dashboard" className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/laporan_salesman_excelcom">
              <span>Laporan Salesman</span>
            </a>
            <span className="cursor-default">Detail Histori</span>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <Typography variant="small">Nama Barang</Typography>
          <p className="mt-2">
            {namaBarangList.map((nama) => (
              <span>{nama} || </span>
            ))}
          </p>
          <hr /> <br />
          <Typography variant="small">Total Bayar Barang</Typography>
          <p className="mt-2">{formatRupiah(ttlBayarBrg)}</p>
          <hr /> <br />
          <Typography variant="small">Pembayaran</Typography>
          <p className="mt-2">{formatRupiah(pembayaran)}</p>
          <hr /> <br />
          <Typography variant="small">Potongan</Typography>
          <p className="mt-2">{formatRupiah(potongan)}</p>
          <hr /> <br />
          <Typography variant="small">Total Belanja</Typography>
          <p className="mt-2">{formatRupiah(ttlBelanja)}</p>
          <hr /> <br />
          <Typography variant="small">Kembalian</Typography>
          <p className="mt-2">{formatRupiah(kembalian)}</p>
          <hr /> <br />
          <a href="/laporan_salesman_excelcom">
            <Button variant="gradient" color="blue">
              Kembali
            </Button>
          </a>
        </main>
      </div>
    </section>
  );
}

export default DetailHistoriSalesmanExcelcom;
