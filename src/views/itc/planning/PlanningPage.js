import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import axios from "axios";
import { API_PLANNING, API_SALESMAN } from "../../../utils/BaseUrl";
import {
  Button,
  Input,
  Typography,
  Breadcrumbs,
} from "@material-tailwind/react";
import $ from "jquery"
import Swal from "sweetalert2";

function PlanningPage() {
  const [planning, setPlanning] = useState([]);
  const [tglAwal, setTglAwal] = useState("");
  const [tglAkhir, setTglAkhir] = useState("");
  const [idItc, setIdItc] = useState(0);

  const tableRef = useRef(null);
  const [validasi, setvalidasi] = useState(false);

  const initializeDataTable = () => {
    if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable();
    }
  }

  // GET ALL
  const getAllPlanning = async () => {
    try {
      const response = await axios.get(`${API_PLANNING}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setPlanning(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // BETWEEN TGL
  const getBetweenTanggal = async () => {
    try {
      const response = await axios.get(`${API_PLANNING}/date?tanggal_akhir=${tglAkhir}&tanggal_awal=${tglAwal}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      const res = response.data.data;
      setPlanning(res);
      setvalidasi(false)
    } catch (err) {
      console.log(err);
    }
  }

  // BETWEEN TGL SALESMAN
  const getBetweenTanggalSalesman = async () => {
    try {
      const response = await axios.get(`${API_PLANNING}/tgl_between/salesman?id_salesman=${idItc}&tanggal_akhir=${tglAkhir}&tanggal_awal=${tglAwal}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      const res = response.data.data;
      setPlanning(res);
      setvalidasi(false);
    } catch (err) {
      console.log(err);
    }
  }

  const filterTangggal = async () => {
    if (tglAwal === "" || tglAkhir === "" || tglAwal === tglAkhir) {
      Swal.fire({
        icon: "warning",
        title: "Isi Form Terlebih Dahulu!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    setvalidasi(true);
  };

  useEffect(() => {
    if (planning && planning.length > 0) {
      initializeDataTable();
    }
  }, [planning])

  useEffect(() => {
    getAllPlanning();
  }, []);

  useEffect(() => {
    if (validasi || tglAkhir !== "" || tglAwal !== "") {
      getBetweenTanggal();
    }
    if (validasi || tglAkhir !== "" || tglAwal !== "" && idItc !== 0) {
      getBetweenTanggalSalesman()
    }
  }, [validasi]);

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
  console.log(planning);

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Planning
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
        <div className="bg-white shadow-lg p-5 my-5 rounded ">
          <div>
            <div className="w-72 lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Awal"
                required
                value={tglAwal}
                onChange={(e) => setTglAwal(e.target.value)}
              />
            </div>
            <div className="mt-8 w-72 lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Akhir"
                required
                value={tglAkhir}
                onChange={(e) => setTglAkhir(e.target.value)}
              />
            </div>
            <div className="flex gap-2 items-end mt-8 w-72 lg:w-[50%]">
              <Input
                label="ITC"
                variant="static"
                color="blue"
                list="salesman-list"
                id="salesman"
                name="salesman"
                onChange={(event) => {
                  handleChange(event);
                  setIdItc(event.target.value);
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
            <Button
              type="submit"
              variant="gradient"
              color="blue"
              className="mt-5 font-poppins font-medium mb-4"
              onClick={filterTangggal}
            >
              Cari
            </Button>
          </div>

          <div className="rounded mb-5 p-1 mt-12 overflow-x-auto">
            <table id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto w-full overflow-x-auto"
            >
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="text-sm py-2 px-3">No</th>
                  <th className="text-sm py-2 px-3">Tanggal</th>
                  <th className="text-sm py-2 px-3">Nama ITC</th>
                  <th className="text-sm py-2 px-3">Nama Customer</th>
                  <th className="text-sm py-2 px-3">Jenis</th>
                  <th className="text-sm py-2 px-3">Daerah</th>
                  <th className="text-sm py-2 px-3">Printer</th>
                  <th className="text-sm py-2 px-3">Jumlah Murid</th>
                  <th className="text-sm py-2 px-3">PC</th>
                  <th className="text-sm py-2 px-3">UNBK</th>
                  <th className="text-sm py-2 px-3">Jurusan</th>
                  <th className="text-sm py-2 px-3">Pihak Dituju</th>
                  <th className="text-sm py-2 px-3">Tujuan</th>
                </tr>
              </thead>
              <tbody>
                {planning.length > 0 ? (
                  planning.map((row, index) => (
                    <tr key={row.id} className="border-t hover:bg-gray-50 transition">
                      <td className="text-sm py-2 px-3">{index + 1}</td>
                      <td className="text-sm py-2 px-3">{row.created_date}</td>
                      <td className="text-sm py-2 px-3">{row.salesman.namaSalesman}</td>
                      <td className="text-sm py-2 px-3">{row.customer.nama_customer}</td>
                      <td className="text-sm py-2 px-3">{row.customer.jenis}</td>
                      <td className="text-sm py-2 px-3">{row.customer.kabKot.nama_kabkot} / {row.customer.kec.nama_kec}</td>
                      <td className="text-sm py-2 px-3">{row.customer.printer}</td>
                      <td className="text-sm py-2 px-3">{row.customer.jml}</td>
                      <td className="text-sm py-2 px-3">{row.customer.pc}</td>
                      <td className="text-sm py-2 px-3">{row.customer.unbk}</td>
                      <td className="text-sm py-2 px-3">{row.customer.jurusan}</td>
                      <td className="text-sm py-2 px-3">{row.bertemu}</td>
                      <td className="text-sm py-2 px-3">{row.ket}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="13" className="text-center py-4 text-sm text-gray-600">
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlanningPage;
