import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./../../../../assets/styles/datatables.css";
import axios from "axios";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  API_CUSTOMER,
  GET_BARANG_TRANSAKSI_JUAL_DINARPOS,
  LAPORAN_CUSTOMER,
} from "../../../../utils/BaseUrl";

function LaporanCustomerDinar() {
  const tableRef = useRef(null);
  const [laporans, setLaporan] = useState([]);
  const [customerId, setcustomerId] = useState(0);
  const [tglAwal, settglAwal] = useState(0);
  const [tglAkhir, settglAkhir] = useState(0);

  const initializeDataTable = () => {
    if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable({});
    }
  };

  const getAll = async () => {
    try {
      const response = await axios.get(`${LAPORAN_CUSTOMER}/dinarpos`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setLaporan(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (laporans && laporans.length > 0) {
      initializeDataTable();
    }
  }, [laporans]);

  const [barang, setBarang] = useState([]);

  const barangTransaksi = async (transactionId) => {
    try {
      const response = await axios.get(
        `${GET_BARANG_TRANSAKSI_JUAL_DINARPOS}?id_transaksi=${transactionId}`,
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
        laporans.map(async (laporan) => {
          const barangData = await barangTransaksi(laporan.idTransaksi);
          return barangData;
        })
      );
      setBarang(barangList);
    };

    fetchBarangTransaksi();
  }, [laporans]);

  const [values, setvalues] = useState("");
  const [options, setoptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handle = async () => {
    if (values.trim() !== "") {
      const response = await fetch(
        `${API_CUSTOMER}/pagination?limit=10&page=${currentPage}&search=${values}&sort=1`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setoptions(data.data);
    } else {
      return;
    }
  };

  useEffect(() => {
    handle();
  }, [currentPage, values]);

  const handleChange = (event) => {
    setvalues(event.target.value);
    setCurrentPage(1);
  };

  // FILTER TANGGAL
  const tglFilter = (e) => {
    e.preventDefault();
    sessionStorage.setItem("customerId", customerId);
    sessionStorage.setItem("tglAwal", tglAwal);
    sessionStorage.setItem("tglAkhir", tglAkhir);

    window.open("/tanggalfilter_customer_dinarpos", "_blank");
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            LAPORAN customer DINARPOS
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
            <a href="/laporan_customer_dinarpos">
              <span>Laporan Customer Dinarpos</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <br />
          <form onSubmit={tglFilter}>
            <div className="w-full lg:w-[50%] flex gap-2 items-end">
              <Input
                label="Customer"
                variant="static"
                color="blue"
                list="customer-list"
                id="customer"
                name="customer"
                onChange={(event) => {
                  handleChange(event);
                  setcustomerId(event.target.value);
                }}
                placeholder="Pilih Customer"
                required
              />
              <datalist id="customer-list">
                {options.length > 0 && (
                  <>
                    {options.map((option) => (
                      <option value={option.id} key={option.id}>
                        {option.nama_customer}
                      </option>
                    ))}
                  </>
                )}
              </datalist>

              <div className="flex gap-2">
                <button
                  className="text-sm bg-gray-400 px-1"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <button
                  className="text-sm bg-gray-400 px-1"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={!options.length}
                >
                  Next
                </button>
              </div>
            </div>
            <div className="mt-8 w-full lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Awal"
                onChange={(e) => settglAwal(e.target.value)}
                required
              />
            </div>
            <div className="mt-8 w-full lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Akhir"
                onChange={(e) => settglAkhir(e.target.value)}
                required
              />
            </div>
            <Button className="mt-5" color="blue" type="submit">
              Print
            </Button>
          </form>
          <div className="rounded mb-5 p-2 mt-12 overflow-auto">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto overflow-auto w-full"
            >
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold w-[4%]">No</th>
                  <th className="text-sm py-2 px-3 font-semibold">Tanggal</th>
                  <th className="text-sm py-2 px-3 font-semibold">No Faktur</th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Nama Customer
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Barcode Barang
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Jumlah Barang
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">Unit</th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Harga Satuan (Rp)
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Total (Rp)
                  </th>
                </tr>
              </thead>
              <tbody>
                {laporans.length > 0 ? (
                  laporans.map((laporan, index) => {
                    const barangLaporan = barang[index] || [];
                    return (
                      <tr key={index}>
                        <td className="text-sm w-[4%]">{index + 1}</td>
                        <td className="text-sm py-2 px-3">
                          {laporan.created_date}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {laporan.noFaktur}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {laporan.customer.nama_customer}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {barangLaporan.map((brg, idx) => (
                            <ul key={idx}>
                              <li>{brg.barcodeBarang}</li>
                            </ul>
                          ))}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {barangLaporan.map((brg, idx) => (
                            <ul key={idx}>
                              <li>{brg.qty}</li>
                            </ul>
                          ))}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {barangLaporan.map((brg, idx) => (
                            <ul key={idx}>
                              <li>{brg.unit}</li>
                            </ul>
                          ))}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {barangLaporan.map((brg, idx) => (
                            <ul key={idx}>
                              <li>{brg.hargaBrng}</li>
                            </ul>
                          ))}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {laporan.totalBelanja}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="text-center capitalize py-3 bg-gray-100"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </section>
  );
}

export default LaporanCustomerDinar;
