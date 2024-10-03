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
import Swal from "sweetalert2";
import $ from "jquery";
import formatDate from "../../../component/FormatDate";

function AllBetweenDate({ tglAwal, tglAkhir }) {
  const tableRef2 = useRef(null);
  const initializeDataTable2 = () => {
    if (tableRef2.current && !$.fn.DataTable.isDataTable(tableRef2.current)) {
      $(tableRef2.current).DataTable({
        responsive: true
      });
    }
  }

  const [planningDate, setPlanningDate] = useState([]);

  // BETWEEN TGL
  const getBetweenTanggal = async () => {
    try {
      const response = await axios.get(`${API_PLANNING}/date?tanggal_akhir=${tglAkhir}&tanggal_awal=${tglAwal}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      const res = response.data.data;
      setPlanningDate(res);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getBetweenTanggal();
  }, [tglAkhir, tglAwal]);

  useEffect(() => {
    if (planningDate && planningDate.length > 0) {
      initializeDataTable2();
    }
  }, [planningDate])

  return (<>
    <div className="overflow-x-auto mt-6">
      <table id="example_data2"
        ref={tableRef2} className="w-full table-auto border-collapse  overflow-x-auto">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-3">Tanggal</th>
            <th className="py-2 px-3">Nama ITC</th>
            <th className="py-2 px-3">Nama Customer</th>
            <th className="py-2 px-3">Jenis</th>
            <th className="py-2 px-3">Daerah</th>
            <th className="py-2 px-3">
              Printer / Projector
            </th>
            <th className="py-2 px-3">
              Jumlah Murid / KLS 3
            </th>
            <th className="py-2 px-3">PC</th>
            <th className="py-2 px-3">UNBK</th>
            <th className="py-2 px-3">Jurusan</th>
            <th className="py-2 px-3">Pihak dituju</th>
            <th className="py-2 px-3">Tujuan</th>
          </tr>
        </thead>
        <tbody>
          {planningDate.length > 0 ? (
            planningDate.map((row, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 transition">
                <td data-header="Tanggal">{formatDate(row.tgl)}</td>
                <td data-header="Nama ITC">{row.salesman.namaSalesman}</td>
                <td data-header="Nama Customer">{row.customer.nama_customer}</td>
                <td data-header="Jenis">{row.customer.jenis}</td>
                <td data-header="Daerah">{row.customer.kabKot.nama_kabkot} / {row.customer.kec.nama_kec}</td>
                <td data-header="Printer / Projector">{row.customer.printer} / {row.customer.proyektor}</td>
                <td data-header="Jumlah Murid / KLS 3">{row.customer.jml} / {row.customer.kls3}</td>
                <td data-header="PC">{row.customer.pc}</td>
                <td data-header="UNBK">{row.customer.unbk}</td>
                <td data-header="Jurusan">{row.customer.jurusan}</td>
                <td data-header="Pihak dituju">{row.bertemu}</td>
                <td data-header="Tujuan">{row.ket}</td>
              </tr>))
          ) : (
            <tr>
              <td colSpan="13" className="text-center py-4 text-gray-600">
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </>)

}

function AllBetweenDateSalesman({ tglAwal, tglAkhir, id }) {
  const tableRef3 = useRef(null);
  const initializeDataTable3 = () => {
    if (tableRef3.current && !$.fn.DataTable.isDataTable(tableRef3.current)) {
      $(tableRef3.current).DataTable({
        responsive: true
      });
    }
  }

  const [planningDateSalesman, setPlanningDateSalesman] = useState([]);

  // BETWEEN TGL SALESMAN
  const getBetweenTanggalSalesman = async () => {
    try {
      const response = await axios.get(`${API_PLANNING}/tgl_between/salesman?id_salesman=${id}&tglAkhir=${tglAkhir}&tglAwal=${tglAwal}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      const res = response.data.data;
      setPlanningDateSalesman(res);
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    getBetweenTanggalSalesman();
  }, [tglAkhir, tglAwal]);

  useEffect(() => {
    if (planningDateSalesman && planningDateSalesman.length > 0) {
      initializeDataTable3();
    }
  }, [planningDateSalesman])

  return (<>
    <div className="overflow-x-auto mt-6">
      <table id="example_data3"
        ref={tableRef3} className="w-full table-auto border-collapse  overflow-x-auto">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-3">Tanggal</th>
            <th className="py-2 px-3">Nama ITC</th>
            <th className="py-2 px-3">Nama Customer</th>
            <th className="py-2 px-3">Jenis</th>
            <th className="py-2 px-3">Daerah</th>
            <th className="py-2 px-3">
              Printer / Projector
            </th>
            <th className="py-2 px-3">
              Jumlah Murid / KLS 3
            </th>
            <th className="py-2 px-3">PC</th>
            <th className="py-2 px-3">UNBK</th>
            <th className="py-2 px-3">Jurusan</th>
            <th className="py-2 px-3">Pihak dituju</th>
            <th className="py-2 px-3">Tujuan</th>
          </tr>
        </thead>
        <tbody>
          {planningDateSalesman.length > 0 ? (
            planningDateSalesman.map((row, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 transition">
                <td data-header="Tanggal">{formatDate(row.tgl)}</td>
                <td data-header="Nama ITC">{row.salesman.namaSalesman}</td>
                <td data-header="Nama Customer">{row.customer.nama_customer}</td>
                <td data-header="Jenis">{row.customer.jenis}</td>
                <td data-header="Daerah">{row.customer.kabKot.nama_kabkot} / {row.customer.kec.nama_kec}</td>
                <td data-header="Printer / Projector">{row.customer.printer} / {row.customer.proyektor}</td>
                <td data-header="Jumlah Murid / KLS 3">{row.customer.jml} / {row.customer.kls3}</td>
                <td data-header="PC">{row.customer.pc}</td>
                <td data-header="UNBK">{row.customer.unbk}</td>
                <td data-header="Jurusan">{row.customer.jurusan}</td>
                <td data-header="Pihak dituju">{row.bertemu}</td>
                <td data-header="Tujuan">{row.ket}</td>
              </tr>))
          ) : (
            <tr>
              <td colSpan="13" className="text-center py-4 text-gray-600">
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </>)

}

function PlanningPage() {
  const [planning, setPlanning] = useState([]);
  const [tglAwal, settglAwal] = useState("");
  const [tglAkhir, settglAkhir] = useState("");
  const [idItc, setIdItc] = useState(0);

  const [tglAwalInput, settglAwalInput] = useState("");
  const [tglAkhirInput, settglAkhirInput] = useState("");
  const [idItcInput, setIdItcInput] = useState(0);

  const [validasi, setvalidasi] = useState(false);
  const [validasiIdItc, setvalidasiIdItc] = useState(false);

  const tableRef = useRef(null);
  const initializeDataTable = () => {
    if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable({
        responsive: true
      });
    }
  }

  // Mengambil data dari API
  const getAllPlanning = async () => {
    try {
      const response = await axios.get(`${API_PLANNING}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setPlanning(response.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

    settglAwalInput(tglAwal);
    settglAkhirInput(tglAkhir);
    setIdItcInput(idItc);

    if (idItc !== 0 && idItc !== "") {
      setvalidasiIdItc(true)
    } else {
      setvalidasi(true);
    }
  };

  useEffect(() => {
    if (planning && planning.length > 0) {
      initializeDataTable();
    }
  }, [planning])

  useEffect(() => {
    getAllPlanning();
  }, []);

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
        <div className="bg-white shadow-lg p-5 my-5 rounded">
          <div>
            <div className="w-72 lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Awal"
                required
                value={tglAwal}
                onChange={(e) => settglAwal(e.target.value)}
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
                onChange={(e) => settglAkhir(e.target.value)}
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
                  className="bg-gray-400 px-1"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <button
                  className="bg-gray-400 px-1"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={!options.length}
                >
                  Next
                </button>
              </div>
            </div> <br />
            <Typography className="font-poppins font-normal text-gray-800" variant="small"><span className="font-medium">Cari Semua ITC:</span> Masukkan tanggal awal dan akhir saja.</Typography>
            <Typography className="font-poppins font-normal text-gray-800" variant="small"><span className="font-medium">Cari Per ITC:</span> Masukkan tanggal awal, akhir, dan ITC yang dipilih.</Typography>
            <Button
              type="button"
              variant="gradient"
              color="blue"
              className="mt-5 font-poppins font-medium mb-4"
              onClick={filterTangggal}
            >
              Cari
            </Button>
          </div>

          {validasi ? <AllBetweenDate tglAkhir={tglAkhirInput} tglAwal={tglAwalInput} /> :
            validasiIdItc ? <AllBetweenDateSalesman tglAkhir={tglAkhirInput} tglAwal={tglAwalInput} id={idItcInput} /> :
              <div className="overflow-x-auto mt-6">
                <table id="example_data"
                  ref={tableRef} className="w-full table-auto border-collapse  overflow-x-auto">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="py-2 px-3">Tanggal</th>
                      <th className="py-2 px-3">Nama ITC</th>
                      <th className="py-2 px-3">Nama Customer</th>
                      <th className="py-2 px-3">Jenis</th>
                      <th className="py-2 px-3">Daerah</th>
                      <th className="py-2 px-3">
                        Printer / Projector
                      </th>
                      <th className="py-2 px-3">
                        Jumlah Murid / KLS 3
                      </th>
                      <th className="py-2 px-3">PC</th>
                      <th className="py-2 px-3">UNBK</th>
                      <th className="py-2 px-3">Jurusan</th>
                      <th className="py-2 px-3">Pihak dituju</th>
                      <th className="py-2 px-3">Tujuan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {planning.length > 0 ? (
                      planning.map((row, index) => (
                        <tr key={index} className="border-t hover:bg-gray-50 transition">
                          <td data-header="Tanggal">{formatDate(row.tgl)}</td>
                          <td data-header="Nama ITC">{row.salesman.namaSalesman}</td>
                          <td data-header="Nama Customer">{row.customer.nama_customer}</td>
                          <td data-header="Jenis">{row.customer.jenis}</td>
                          <td data-header="Daerah">{row.customer.kabKot.nama_kabkot} / {row.customer.kec.nama_kec}</td>
                          <td data-header="Printer / Projector">{row.customer.printer} / {row.customer.proyektor}</td>
                          <td data-header="Jumlah Murid / KLS 3">{row.customer.jml} / {row.customer.kls3}</td>
                          <td data-header="PC">{row.customer.pc}</td>
                          <td data-header="UNBK">{row.customer.unbk}</td>
                          <td data-header="Jurusan">{row.customer.jurusan}</td>
                          <td data-header="Pihak dituju">{row.bertemu}</td>
                          <td data-header="Tujuan">{row.ket}</td>
                        </tr>))
                    ) : (
                      <tr>
                        <td colSpan="13" className="text-center py-4 text-gray-600">
                          Tidak ada data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
          }
        </div>
      </div>
    </section>
  );
}

export default PlanningPage;
