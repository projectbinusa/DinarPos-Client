import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./../../../../assets/styles/datatables.css";
import axios from "axios";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  API_PENGGUNA,
  API_RETURN_DINARPOS,
  API_SALESMAN,
  GET_BARANG_TRANSAKSI_JUAL_DINARPOS,
  LAPORAN_SALESMAN,
} from "../../../../utils/BaseUrl";
import {
  ArrowPathIcon,
  EyeIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Decrypt from "../../../../component/Decrypt";

function LaporanSalesmanDinar() {
  const tableRef = useRef(null);
  const [laporans, setLaporan] = useState([]);
  const [salesmanId, setsalesmanId] = useState(0);
  const [tglAwal, settglAwal] = useState("");
  const [tglAkhir, settglAkhir] = useState("");

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  const getAll = async () => {
    try {
      const response = await axios.get(`${LAPORAN_SALESMAN}/dinarpos`, {
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

  const history = useHistory();

  // AKSI RETURN
  const returnSalesman = async (id) => {
    Swal.fire({
      title: "Apakah Anda Ingin Return?",
      text: "Perubahan data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Return",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`${API_RETURN_DINARPOS}/retur_penjualan/` + id, null, {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Berhasil Return!",
              showConfirmButton: false,
              timer: 1500,
            });

            setTimeout(() => {
              history.push("/laporan_salesman_dinarpos");
              window.location.reload();
            }, 1500);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const [values, setvalues] = useState("");
  const [options, setoptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // SELECT
  const handle = async () => {
    if (values.trim() !== "") {
      const response = await fetch(
        `${API_SALESMAN}/pagination?limit=10&page=${currentPage}&search=${values}&sort=1`,
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

  const tglFilter = (e) => {
    e.preventDefault();
    sessionStorage.setItem("salesmanId", salesmanId);
    sessionStorage.setItem("tglAwal", tglAwal);
    sessionStorage.setItem("tglAkhir", tglAkhir);

    window.open("/tanggalfilter_salesman_dinarpos", "_blank");
  };

  const [level, setlevel] = useState("");

  const idPengguna = Decrypt()
  useEffect(() => {
    axios.get(`${API_PENGGUNA}/` + idPengguna, {
      headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
    }).then((res) => {
      const response = res.data.data;
      setlevel(response.levelPengguna)
    }).catch((err) => {
      console.log(err);
    })
  }, [idPengguna])

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen overflow-x-auto">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            LAPORAN SALESMAN DINARPOS
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
            <a href="/laporan_salesman_dinarpos">
              <span>Laporan Salesman Dinarpos</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <br />
          <form onSubmit={tglFilter}>
            <div className="w-full lg:w-[50%]">
              <div className="flex gap-2 items-end">
                <Input
                  label="Salesman"
                  variant="static"
                  color="blue"
                  list="salesman-list"
                  id="salesman"
                  name="salesman"
                  onChange={(event) => {
                    handleChange(event);
                    setsalesmanId(event.target.value);
                  }}
                  placeholder="Pilih Salesman"
                  required
                />
                <datalist id="salesman-list">
                  {options.length > 0 && (
                    <>
                      {options.map((option) => (
                        <option value={option.id} key={option.id}>
                          {option.namaSalesman}
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
            </div>
            <div className="mt-8 w-full lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Awal"
                required
                onChange={(e) => settglAwal(e.target.value)}
              />
            </div>
            <div className="mt-8 w-full lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Akhir"
                required
                onChange={(e) => settglAkhir(e.target.value)}
              />
            </div>
            <Button className="mt-5 font-poppins font-medium" color="blue" type="submit">
              Print
            </Button>
          </form>
          <div className="rounded mb-5 p-1 mt-12 overflow-x-auto">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto w-full overflow-x-auto"
            >
              <thead className="bg-blue-500 text-white w-full">
                <tr>
                  <th className="text-sm py-2 px-2.5 font-semibold w-[4%]">
                    No
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Tanggal</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    No Faktur
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Nama Salesman
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Nama Customer
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Barcode Barang
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Harga</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">QTY</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Total Harga Barang
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Total Belanja
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Total Keseluruhan
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Aksi</th>
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
                        <td className="text-sm w-[15%] py-2 px-3">
                          {laporan.noFaktur}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {laporan.salesman.namaSalesman}
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
                              <li>{brg.hargaBrng}</li>
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
                              <li>{brg.totalHargaBarang}</li>
                            </ul>
                          ))}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {laporan.totalBelanja}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {laporan.totalBelanja}
                        </td>
                        <td className="text-sm py-2 px-3 flex flex-col gap-2 justify-center items-center">
                          <a
                            href={
                              "/detail_histori_salesman_dinarpos/" +
                              laporan.idTransaksi
                            }
                          >
                            <IconButton size="md" color="light-blue">
                              <EyeIcon className="w-6 h-6 white" />
                            </IconButton>
                          </a>
                          <a
                            href={
                              "/print_histori_laporan_salesman_dinarpos/" +
                              laporan.idTransaksi
                            }
                            target="_blank"
                          >
                            <IconButton size="md" color="green">
                              <PrinterIcon className="w-6 h-6 white" />
                            </IconButton>
                          </a>
                          {level === "Superadmin" || level === "Admin" || level === "Accounting" ? (
                            <>
                              <IconButton size="md" color="red" onClick={() =>
                                returnSalesman(laporan.idTransaksi)
                              }
                              >
                                <ArrowPathIcon
                                  className="w-6 h-6 white"
                                />
                              </IconButton>
                            </>
                          ) : (
                            <></>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="12"
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

export default LaporanSalesmanDinar;
