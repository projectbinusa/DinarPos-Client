import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./../../../assets/styles/datatables.css";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Button, IconButton, Breadcrumbs, Typography, Input } from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { API_OMZET, API_SALESMAN } from "../../../utils/BaseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import formatDate from "../../../component/FormatDate";

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};

function AllByMonth({ month, year }) {
  const tableRef2 = useRef(null);
  const [omzetMonth, setOmzetMonth] = useState([]);

  const initializeDataTable2 = () => {
    if (tableRef2.current && !$.fn.DataTable.isDataTable(tableRef2.current)) {
      $(tableRef2.current).DataTable();
    }
  };

  const getAllOmzetMonth = async () => {
    try {
      const response = await axios.get(`${API_OMZET}/bulan_tahun?bulan=${month}&tahun=${year}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setOmzetMonth(response.data.data || []);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAllOmzetMonth();
  }, [month, year]);

  useEffect(() => {
    if (omzetMonth.length > 0) {
      initializeDataTable2();
    }
  }, [omzetMonth]);

  return (
    <>
      <div className="bg-green-100 w-full px-5 py-3">
        <p className="text-green-800">Omzet : <span className="font-medium">{month}-{year}</span></p>
      </div>
      <div className="rounded my-5 p-2 w-full overflow-x-auto">
        <table id="example_data2" ref={tableRef2} className="rounded-sm table-auto w-full">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="text-xs py-2 px-3">
                No
              </th>
              <th className="text-xs py-2 px-3">Nama</th>
              <th className="text-xs py-2 px-3">Omzet</th>
              <th className="text-xs py-2 px-3">Presentase Target</th>
            </tr>
          </thead>
          <tbody>
            {omzetMonth.length > 0 ? (
              omzetMonth.map((row, index) => {
                const persen = (row.total_omzet / row.target) * 100;
                return (
                  <tr key={row.id}>
                    <td className="text-sm py-2 px-3 w-[4%]">
                      {index + 1}
                    </td>
                    <td className="text-sm py-2 px-3">
                      {row.nama_salesman}
                    </td>
                    <td className="text-sm py-2 px-3">
                      {formatRupiah(row.total_omzet)}
                    </td>
                    <td className="text-sm py-2 px-3">
                      {persen} %
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan="4" className="text-xs text-center capitalize py-3 bg-gray-100">
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

function AllByMonthSalesman({ month, year, itc }) {
  const [omzetMonthSalesman, setOmzetMonthSalesman] = useState([]);

  const getAllOmzetMonthSalesman = async () => {
    try {
      const response = await axios.get(`${API_OMZET}/bulan_tahun/salesman?bulan=${month}&id_salesman=${itc}&tahun=${year}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setOmzetMonthSalesman(response.data.data[0]);
      console.log(response.data.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAllOmzetMonthSalesman();
  }, [month, year, itc]);

  const persen = (omzetMonthSalesman?.total_omzet / omzetMonthSalesman?.target) * 100;
  return (
    <>
      <div>
        <div className="bg-blue-500 p-5">
          <Typography variant="lead" className="uppercase font-poppins text-white text-center">{omzetMonthSalesman?.nama_salesman} ( {month}-{year} )</Typography>
        </div>
        <div className="border border-gray-500 text-center py-4">
          <Typography variant="h5" className="uppercase font-poppins">{formatRupiah(omzetMonthSalesman?.total_omzet)}</Typography> <br />
          <Typography variant="h5" className="font-poppins">{persen} % dari target</Typography>
        </div>
      </div>
    </>
  )
}

function Omzet() {
  const tableRef = useRef(null);
  const [omzet, setOmzet] = useState([]);
  const [month, setMonth] = useState("");
  const [itc, setItc] = useState(0);
  const [monthInput, setMonthInput] = useState("");
  const [yearInput, setYearInput] = useState("");
  const [itcInput, setItcInput] = useState(0);
  const [validasiAll, setValidasiAll] = useState(false);
  const [validasiItc, setValidasiItc] = useState(false);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }
    $(tableRef.current).DataTable();
  };

  const getAllOmzet = async () => {
    try {
      const response = await axios.get(`${API_OMZET}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setOmzet(response.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAllOmzet();
  }, []);

  useEffect(() => {
    if (omzet.length > 0) {
      initializeDataTable();
    }
  }, [omzet]);

  const hapusOmzet = async (id) => {
    Swal.fire({
      title: "Apakah Anda Ingin Menghapus?",
      text: "Perubahan data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          // Mengirim request penghapusan ke server
          .delete(`${API_OMZET}/${id}`, {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Data Berhasil Dihapus!",
              showConfirmButton: false,
              timer: 1500,
            });

            setTimeout(() => {
              window.location.reload();
            }, 1500);
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Gagal!",
              text: "Hapus data gagal!",
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(err);
          });
      }
    });
  };

  // ALL ITC
  const [values, setvalues] = useState("");
  const [options, setoptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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
  // END ALL ITC

  const filterSeacrh = async () => {
    if (month === "") {
      Swal.fire({
        icon: "warning",
        title: "Isi Form Terlebih Dahulu!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    const [years, months] = month.split('-');

    // Konversi ke integer
    setMonthInput(parseInt(months))
    setYearInput(parseInt(years))
    setItcInput(itc)

    if (itc !== 0 && itc !== "") {
      if (validasiAll) {
        setValidasiAll(false)
      }
      setValidasiItc(true)
    } else {
      if (validasiItc) {
        setValidasiItc(false)
      }
      setValidasiAll(true)
    }
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Omzet
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
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <a href="/add_omzet" className="float-right mb-5">
            <Button variant="gradient" color="blue" className="font-popins font-medium">
              Tambah
            </Button>
          </a> <br />
          <div>
            <div className="w-72 lg:w-[50%]">
              <div className="mt-8">
                <Input
                  variant="static"
                  color="blue"
                  type="month"
                  label="Bulan Tahun"
                  required
                  onChange={(e) => setMonth(e.target.value)}
                />
              </div>
              <div className="flex gap-2 items-end mt-8">
                <Input
                  label="ITC"
                  variant="static"
                  color="blue"
                  list="salesman-list"
                  id="salesman"
                  name="salesman"
                  onChange={(event) => {
                    handleChange(event);
                    setItc(event.target.value);
                  }}
                  placeholder="Pilih ITC"
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
            <Button
              className="mt-5 font-poppins font-medium"
              color="blue"
              onClick={filterSeacrh}
            >
              Cari
            </Button>
          </div> <br />
          {validasiAll ? <AllByMonth month={monthInput} year={yearInput} /> :
            validasiItc ? <AllByMonthSalesman month={monthInput} year={yearInput} itc={itcInput} /> :
              <div className="rounded my-5 p-2 w-full overflow-x-auto">
                <table id="example_data" ref={tableRef} className="rounded-sm table-auto w-full">
                  <thead className="bg-blue-500 text-white">
                    <tr>
                      <th className="text-xs py-2 px-3">
                        No
                      </th>
                      <th className="text-xs py-2 px-3">
                        Salesman
                      </th>
                      <th className="text-xs py-2 px-3">
                        Tanggal
                      </th>
                      <th className="text-xs py-2 px-3">
                        Omzet
                      </th>
                      <th className="text-xs py-2 px-3">Customer</th>
                      <th className="text-xs py-2 px-3">
                        Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {omzet.length > 0 ? (
                      omzet.map((row, index) => (
                        <tr key={row.id}>
                          <td className="text-sm py-2 px-3 w-[4%]">
                            {index + 1}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {row.salesman.namaSalesman}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {formatDate(row.tgl)}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {formatRupiah(row.omzet)}
                          </td>
                          <td className="text-sm py-2 px-3">
                            {row.customer.nama_customer}
                          </td>
                          <td className="text-sm py-2 px-3 flex items-center justify-center">
                            <IconButton size="md" color="red" onClick={() => hapusOmzet(row.id)}>
                              <TrashIcon className="w-6 h-6 text-white" />
                            </IconButton>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-xs text-center capitalize py-3 bg-gray-100">
                          Tidak ada data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
          }
        </main>
      </div>
    </section>
  );
}

export default Omzet;
