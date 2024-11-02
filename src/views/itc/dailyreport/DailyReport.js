import React, { useState, useEffect, useRef } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Typography,
  Input,
  Button,
  Option,
  Select,
  IconButton,
} from "@material-tailwind/react";
import axios from "axios";
import { API_ITC, API_KUNJUNGAN, API_PENGGUNA } from "../../../utils/BaseUrl";
import Decrypt from "../../../component/Decrypt";
import $ from "jquery"
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

const formatDate = (value) => {
  const date = new Date(value);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

const formatDate2 = (value) => {
  const date = new Date(value);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

function AllWaktuPengadaan({ waktu, idSalesman }) {
  const tableRef2 = useRef(null);
  const initializeDataTable2 = () => {
    if (tableRef2.current && !$.fn.DataTable.isDataTable(tableRef2.current)) {
      $(tableRef2.current).DataTable({
        responsive: true
      });
    }
  }

  const destroyDataTable2 = () => {
    if (tableRef2.current && $.fn.DataTable.isDataTable(tableRef2.current)) {
      $(tableRef2.current).DataTable().destroy();
    }
  };

  const [dailyReportWaktu, setDailyReportWaktu] = useState([]);

  console.log("length : " + dailyReportWaktu.length);

  const getAllDailyReportWaktuPengadaan = async () => {
    try {
      const response = await axios.get(
        `${API_KUNJUNGAN}/waktu_pengadaan/salesman?idSalesman=${idSalesman}&waktuPengadaan=${waktu}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setDailyReportWaktu(response.data.data);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  useEffect(() => {
    getAllDailyReportWaktuPengadaan()
  }, [waktu, idSalesman])

  useEffect(() => {
    if (dailyReportWaktu && dailyReportWaktu.length > 0) {
      initializeDataTable2();
    }
  }, [dailyReportWaktu]);

  return (
    <>
      <div className="mt-12 bg-green-100 w-full px-5 py-3">
        <p className="text-green-800">Pencarian Waktu Pengadaan : <span className="font-medium">{waktu}</span></p>
      </div>
      <div className="rounded mb-5 p-1 mt-6 overflow-x-auto">
        <table
          id="example_data2"
          ref={tableRef2}
          className="rounded-sm table-auto w-full overflow-x-auto"
        >
          <thead className="bg-blue-500 text-white w-full">
            <tr>
              <th className="text-xs py-2 px-2.5 font-semibold w-[4%]">No</th>
              <th className="text-xs py-2 px-2.5 font-semibold">Tgl_Report</th>
              <th className="text-xs py-2 px-2.5 font-semibold">Instansi</th>
              <th className="text-xs py-2 px-2.5 font-semibold">Jenis</th>
              <th className="text-xs py-2 px-2.5 font-semibold">Daerah</th>
              <th className="text-xs py-2 px-2.5 font-semibold">Peluang</th>
              <th className="text-xs py-2 px-2.5 font-semibold">Info didapat</th>
              <th className="text-xs py-2 px-2.5 font-semibold">CP</th>
              <th className="text-xs py-2 px-2.5 font-semibold">Wkt_p</th>
            </tr>
          </thead>
          <tbody>
            {dailyReportWaktu.length > 0 ? (
              dailyReportWaktu.map((item, idx) => (
                <tr key={idx}>
                  <td className="text-xs py-2 px-3">{idx + 1}</td>
                  <td className="text-xs py-2 px-3">{formatDate(item.tanggalKunjungan)}</td>
                  <td className="text-xs py-2 px-3">{item.customer.nama_customer}</td>
                  <td className="text-xs py-2 px-3">{item.jenis}</td>
                  <td className="text-xs py-2 px-3">{item.customer.kabKot.nama_kabkot} / {item.customer.kec.nama_kec}</td>
                  <td className="text-xs py-2 px-3">{item.peluang}</td>
                  <td className="text-xs py-2 px-3">{item.infoDpt}</td>
                  <td className="text-xs py-2 px-3">{item.cp}</td>
                  <td className="text-xs py-2 px-3">{item.waktuPengadaan}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-xs text-center capitalize py-2 bg-gray-100">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

function DailyReport() {
  const [tglAwal, setTglAwal] = useState("");
  const [tglAkhir, setTglAkhir] = useState("");

  const [waktu, setwaktu] = useState("");
  const [waktuPengadaan, setwaktuPengadaan] = useState("");

  const [dailyReport, setDailyReport] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [idSalesman, setIdSalesman] = useState(0);

  const tableRef = useRef(null);
  const initializeDataTable = () => {
    if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable({ responsive: true });
    }
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
            setIdSalesman(ress.data.data.id);
          })
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const getAllDailyReport = async () => {
    try {
      const response = await axios.get(
        `${API_KUNJUNGAN}/by_date/salesman?id_salesman=${idSalesman}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setDailyReport(response.data.data);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  const [totals, setTotals] = useState([]);

  const totalKunjungan = async (tgl, idx) => {
    try {
      const response = await axios.get(`${API_KUNJUNGAN}/date/salesman?id_salesman=${idSalesman}&tanggal=${tgl}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      const res = response.data.data.length;
      setTotals(prevTotals => {
        const newTotals = [...prevTotals];
        newTotals[idx] = res;
        return newTotals;
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (dailyReport.length > 0) {
      dailyReport.forEach((row, idx) => {
        totalKunjungan(row.tanggalKunjungan, idx);
      });
    }
  }, [dailyReport]);

  const handlePrint = async () => {
    if (tglAwal === "" || tglAkhir === "" || tglAwal === tglAkhir) {
      Swal.fire({
        icon: "warning",
        title: "Isi Form Terlebih Dahulu!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    const url = `/print_kunjungan?tgl_awal=${tglAwal}&tgl_akhir=${tglAkhir}`;
    window.open(url, '_blank');
  };

  const filterWaktu = async () => {
    if (waktu === "") {
      Swal.fire({
        icon: "warning",
        title: "Isi Form Terlebih Dahulu!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    setwaktuPengadaan(waktu)
    if (waktu !== "") {
      setIsDataFetched(true);
    }
  }

  console.log(isDataFetched);


  useEffect(() => {
    if (dailyReport && dailyReport.length > 0) {
      initializeDataTable();
    }
  }, [dailyReport])

  useEffect(() => {
    getAllDailyReport();
  }, [idSalesman]);

  return (
    <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Daily Report
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/home" className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded ">
          <div className="flex justify-end">
            <a href="/input_kunjungan">
              <Button
                color="blue"
                className="font-poppins font-medium"
              >
                Input
              </Button>
            </a>
          </div>
          <div>
            <div className="w-72 lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Awal"
                value={tglAwal}
                onChange={(e) => setTglAwal(e.target.value)}
                required
              />
            </div>
            <div className="mt-8 w-72 lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Akhir"
                value={tglAkhir}
                onChange={(e) => setTglAkhir(e.target.value)}
                required
              />
            </div>
            <Button
              className="mt-5 font-poppins font-medium mb-4"
              color="blue"
              type="button" onClick={handlePrint}
            >
              Print
            </Button>
            <div className="w-full lg:w-1/2 mt-4">
              <Select
                id="pilih"
                label="Waktu Pengadaan"
                color="blue"
                variant="static"
                onChange={(value) => setwaktu(value)}
                className="w-full text-sm"
              >
                <Option value="Pilih Bulan">Pilih Bulan</Option>
                <Option value="Januari">Januari</Option>
                <Option value="Februari">Februari</Option>
                <Option value="Maret">Maret</Option>
                <Option value="April">April</Option>
                <Option value="Mei">Mei</Option>
                <Option value="Juni">Juni</Option>
                <Option value="Juli">Juli</Option>
                <Option value="Agustus">Agustus</Option>
                <Option value="September">September</Option>
                <Option value="Oktober">Oktober</Option>
                <Option value="November">November</Option>
                <Option value="Desember">Desember</Option>
              </Select>
            </div>
            <Button
              className="mt-5 font-poppins font-medium mb-4"
              color="blue"
              type="button" onClick={filterWaktu} >
              Cari
            </Button>
          </div>

          {isDataFetched ?
            <AllWaktuPengadaan waktu={waktuPengadaan} idSalesman={idSalesman} /> :
            <div className="rounded mb-5 p-1 mt-12 overflow-x-auto">
              <table
                id="example_data"
                ref={tableRef}
                className="rounded-sm table-auto w-full overflow-x-auto"
              >
                <thead className="bg-blue-500 text-white w-full">
                  <tr>
                    <th className="text-xs py-2 px-2.5 font-semibold w-[4%]">
                      No
                    </th>
                    <th className="text-xs py-2 px-2.5 font-semibold">Tanggal</th>
                    <th className="text-xs py-2 px-2.5 font-semibold">
                      Jumlah Report
                    </th>
                    <th className="text-xs py-2 px-2.5 font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyReport.length > 0 ? (
                    dailyReport.map((item, index) => (
                      <tr key={index}>
                        <td className="text-xs py-2 px-3">{index + 1}</td>
                        <td className="text-xs py-2 px-3">{formatDate(item.tanggalKunjungan)}</td>
                        <td className="text-xs py-2 px-3">{totals[index] !== undefined ? totals[index] : 'Loading...'}
                        </td>
                        <td className="text-xs py-2 px-3 flex items-center justify-center">
                          <a href={`/detail_kunjungan_by_tgl/${formatDate2(item.tanggalKunjungan)}`}>
                            <IconButton size="md" color="green">
                              <InformationCircleIcon className="w-6 h-6 white" />
                            </IconButton>
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-xs text-center capitalize py-2 bg-gray-100 ">
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>}
        </main>
      </div >
    </section >
  );
}

export default DailyReport;
