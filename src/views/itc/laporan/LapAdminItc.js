import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import axios from "axios";
import { API_KUNJUNGAN_EXPORT_KUNJUNGAN, API_PLANNING, API_SALESMAN } from "../../../utils/BaseUrl";
import $ from "jquery";
import Swal from "sweetalert2";

function LapAdminItc() {
  const [visibleElement, setVisibleElement] = useState(null);

  const toggleElement = (elementId) => {
    if (visibleElement === elementId) {
      $("#" + elementId).hide();
      setVisibleElement(null);
    } else {
      if (visibleElement !== null) {
        $("#" + visibleElement).hide();
      }
      $("#" + elementId).show();
      setVisibleElement(elementId);
    }
  };

  const formatDate = (value) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };

  const namaSalesman = async (value) => {
    axios.get(`${API_SALESMAN}/${value}`, {
      headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
    }).then((res) => {
      const nama = res.data.data.namaSalesman;
      return nama;
    }).catch((err) => {
      console.log(err);
      return "";
    })
  };

  const [tglAwal, setTglAwal] = useState("");
  const [tglAkhir, setTglAkhir] = useState("");
  const [status, setStatus] = useState("");

  // EXPORT KUNJUNGAN
  const exportDataKunjungan = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${API_KUNJUNGAN_EXPORT_KUNJUNGAN}?tglAwal=${tglAwal}&tglAkhir=${tglAkhir}&status=${status}`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("token")}`,
          },
          responseType: "blob", // penting untuk mendownload file
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "LAPORAN_KUNJUNGAN.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error saat mengunduh file:", error);
    }
  };

  // EXPORT LAP PLANNING
  const [startPlanning, setstartPlanning] = useState("");
  const [endPlanning, setendPlanning] = useState("");
  const [itcPlanning, setitcPlanning] = useState(0);

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

  const exportPlanning = async (e) => {
    if (startPlanning === "" || endPlanning === "") {
      Swal.fire({
        icon: "warning",
        title: "Masukkan tanggal!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    e.preventDefault();

    if (itcPlanning === 0) {
      try {
        const response = await axios.get(
          `${API_PLANNING}/export/excel/planningAll?tglAkhir=${endPlanning}&tglAwal=${startPlanning}`,
          {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            responseType: "blob",
          }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Planning Periode ${formatDate(startPlanning)} s.d ${formatDate(endPlanning)}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);

        Swal.fire({
          icon: "success",
          title: "Export Berhasil!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error saat mengunduh file:",
          text: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      try {
        const response = await axios.get(
          `${API_PLANNING}/export/excel/salesman?id_salesman=${itcPlanning}&tglAkhir=${endPlanning}&tglAwal=${startPlanning}`,
          {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            responseType: "blob",
          }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Planning ${namaSalesman(itcPlanning)} Periode ${formatDate(startPlanning)} s.d ${formatDate(endPlanning)}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);

        Swal.fire({
          icon: "success",
          title: "Export Berhasil!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error saat mengunduh file:",
          text: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  }
  // END EXPORT LAP PLANNING

  return (
    <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase font-poppins">
            Laporan
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
        <main className="grid grid-cols-1 lg:grid-cols-3 items-start gap-3">
          <div className="bg-white shadow-lg p-3 my-5 rounded">
            <Typography variant="lead" className="capitalize font-medium font-poppins">
              Export Laporan
            </Typography>
            <hr />
            <ol className="mt-5">
              <li className="my-1">
                <button
                  className="text-gray-800 hover:bg-blue-50 flex items-center p-2 rounded-lg dark:text-white group w-full"
                  onClick={() => toggleElement("planning")}
                >
                  <span className=" ms-3 whitespace-nowrap">Laporan Planning</span>
                </button>
              </li>
              <li className="my-1">
                <button
                  className="text-gray-800 hover:bg-blue-50 flex items-center p-2 rounded-lg dark:text-white group w-full"
                  onClick={() => toggleElement("kunjungan")}
                >
                  <span className=" ms-3 whitespace-nowrap">Laporan Kunjungan</span>
                </button>
              </li>
            </ol>
          </div>
          <div className="bg-white shadow-lg p-3 my-5 rounded lg:col-span-2">
            <div id="planning" hidden>
              <Typography variant="lead" className="capitalize font-medium font-poppins">Laporan Planning</Typography>
              <hr /> <br /> <br />
              <div>
                <Input
                  label="Tanggal Awal"
                  variant="static"
                  color="blue"
                  size="lg"
                  type="date"
                  onChange={(e) => setstartPlanning(e.target.value)}
                /><br />
                <Input
                  label="Tanggal Akhir"
                  variant="static"
                  color="blue"
                  size="lg"
                  type="date"
                  onChange={(e) => setendPlanning(e.target.value)}
                /> <br />
                <div className="flex gap-2 items-end">
                  <Input
                    label="ITC"
                    variant="static"
                    color="blue"
                    list="salesman-list"
                    id="salesman"
                    name="salesman"
                    onChange={(event) => {
                      handleChange(event);
                      setitcPlanning(event.target.value);
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
                </div> <br />
                <Button variant="gradient" color="blue" onClick={exportPlanning} className="font-poppins font-medium" type="button">Submit</Button>
              </div>
            </div>
            <div id="kunjungan" hidden>
              <form onSubmit={exportDataKunjungan}>
                <Typography variant="lead" className="capitalize font-medium font-poppins">Laporan Kunjungan</Typography>
                <hr /> <br />
                <div className="w-full">
                  <div className="mt-8">
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
                  <div className="mt-8">
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
                  <div className="mt-8">
                    <Select
                      id="pilih"
                      label="Status"
                      color="blue"
                      variant="static"
                      required
                      value={status}
                      onChange={(value) => setStatus(value)}
                    >
                      <Option value="">Pilih Status</Option>
                      <Option value="NAMA">Nama</Option>
                      <Option value="USERNAME">Username</Option>
                      <Option value="ALAMAT">Alamat</Option>
                      <Option value="NO TELEFON">No Telefon</Option>
                      <Option value="TARGET">Target</Option>
                    </Select>
                  </div>
                </div>
                <Button
                  className="mt-5 font-poppins font-medium"
                  color="blue"
                  type="submit"
                >
                  Export Kunjungan
                </Button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default LapAdminItc;
