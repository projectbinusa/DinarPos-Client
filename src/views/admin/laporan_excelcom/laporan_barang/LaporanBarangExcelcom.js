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
import ReactSelect from "react-select";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import {
  API_BARANG,
  API_RETURN_EXCELCOM,
  LAPORAN_BARANG,
} from "../../../../utils/BaseUrl";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LaporanBarangExcelcom() {
  const tableRef = useRef(null);
  const [barangs, setBarangs] = useState([]);
  const [barang, setBarang] = useState([]);
  const [barangId, setbarangId] = useState(0);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${LAPORAN_BARANG}/excelcom?bulan=` + currentMonth,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setBarangs(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  // const getAllBarang = async () => {
  //   try {
  //     const response = await axios.get(`${API_BARANG}`, {
  //       headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
  //     });
  //     setBarang(response.data.data);
  //   } catch (error) {
  //     console.log("get all", error);
  //   }
  // };

  useEffect(() => {
    getAll();
    // getAllBarang();
  }, []);

  useEffect(() => {
    if (barangs && barangs.length > 0) {
      initializeDataTable();
    }
  }, [barangs]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "transparent",
      borderBottom: "1px solid #ccc",
      border: "none",
      outline: "none",
      fontSize: "14px",
      "&:hover": {
        outline: "none",
        boxShadow: "none",
      },
      "&:focus": {
        outline: "none",
        boxShadow: "none",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
      "&:hover": {
        outline: "none",
        boxShadow: "none",
      },
      "&:focus": {
        outline: "none",
        boxShadow: "none",
      },
    }),
  };

  const [values, setvalues] = useState("");
  const [options, setoptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handle = async () => {
    if (values.trim() !== "") {
      const response = await fetch(
        `${API_BARANG}/pagination?limit=10&page=${currentPage}&search=${values}&sort=1`,
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

  const history = useHistory();

  // AKSI RETURN
  const returnBarang = async (id) => {
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
          .put(`${API_RETURN_EXCELCOM}/retur_barang_penjualan/` + id, {
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
              history.push("/laporan_barang_excelcom");
              window.location.reload();
            }, 1500);
          });
      }
    });
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            LAPORAN BARANG Excelcom
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/dashboard_admin" className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/laporan_barang_excelcom">
              <span>Laporan Barang Excelcom</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <form action="">
            <div className="w-72 lg:w-[50%] flex gap-2 items-end">
              <Input
                label="Barang"
                variant="static"
                color="blue"
                list="barang-list"
                id="barang"
                name="barang"
                onChange={(event) => {
                  handleChange(event);
                  setbarangId(event.target.value);
                }}
                placeholder="Pilih Barang"
                required
              />
              <datalist id="barang-list">
                {options.length > 0 && (
                  <>
                    {options.map((option) => (
                      <option value={option.idBarang}>
                        {option.namaBarang}
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
              {/* <label
                htmlFor="barang"
                className="text-[14px] text-blue-gray-400"
              >
                Data Barang
              </label>
              <ReactSelect
                id="barang"
                options={barang.map((down) => {
                  return {
                    value: down.idBarang,
                    label: down.barcodeBarang + " / " + down.namaBarang,
                  };
                })}
                placeholder="Pilih Barang"
                styles={customStyles}
                onChange={(selectedOption) => setbarangId(selectedOption.value)}
              />
              <hr className="mt-1 bg-gray-400 h-[0.1em]" /> */}
            </div>
            <div className="mt-8 w-72 lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Awal"
                required
              />
            </div>
            <div className="mt-8 w-72 lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Akhir"
                required
              />
            </div>
            <Button className="mt-5" color="blue">
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
                    Barcode Barang
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Nama Customer
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">Jumlah</th>
                  <th className="text-sm py-2 px-3 font-semibold">Unit</th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Harga Satuan
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Total Harga
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {barangs.length > 0 ? (
                  barangs.map((row, index) => (
                    <tr key={index}>
                      <td className="text-sm w-[4%]">{index + 1}</td>
                      <td className="text-sm py-2 px-3">{row.created_date}</td>
                      <td className="text-sm w-[15%] py-2 px-3">
                        {row.transaksi.noFaktur}
                      </td>
                      <td className="text-sm py-2 px-3">{row.barcodeBarang}</td>
                      <td className="text-sm py-2 px-3">
                        {row.transaksi.customer.nama_customer}
                      </td>
                      <td className="text-sm py-2 px-3">{row.qty}</td>
                      <td className="text-sm py-2 px-3">{row.qty}</td>
                      <td className="text-sm py-2 px-3">{row.hargaBrng}</td>
                      <td className="text-sm py-2 px-3">
                        {row.totalHargaBarang}
                      </td>
                      <td className="text-sm py-2 px-3 text-center">
                        <IconButton size="md" color="red">
                          <ArrowPathIcon
                            className="w-6 h-6 white"
                            onClick={() => returnBarang(row.idBrgTransaksi)}
                          />
                        </IconButton>
                      </td>{" "}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="10"
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

export default LaporanBarangExcelcom;
