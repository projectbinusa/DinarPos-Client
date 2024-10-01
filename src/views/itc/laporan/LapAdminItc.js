import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { API_KUNJUNGAN, API_PLANNING, API_SALESMAN } from "../../../utils/BaseUrl";
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
    try {
      const res = await axios.get(`${API_SALESMAN}/${value}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      return res.data.data.namaSalesman;
    } catch (err) {
      console.log(err);
    }
  };

  const [tglAwal, setTglAwal] = useState("");
  const [tglAkhir, setTglAkhir] = useState("");
  const [itcKunjungan, setItcKunjungan] = useState(0);

  // ALL ITC
  const [valuesK, setvaluesK] = useState("");
  const [optionsK, setoptionsK] = useState([]);
  const [currentPageK, setCurrentPageK] = useState(1);

  const handleK = async () => {
    if (valuesK.trim() !== "") {
      const response = await fetch(
        `${API_SALESMAN}/pagination?limit=10&page=${currentPageK}&search=${valuesK}&sort=1`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setoptionsK(data.data);
    } else {
      return;
    }
  };

  useEffect(() => {
    handleK();
  }, [currentPageK, valuesK]);

  const handleChangeK = (event) => {
    setvaluesK(event.target.value);
    setCurrentPageK(1);
  };
  // END ALL ITC  

  // EXPORT KUNJUNGAN
  const exportDataKunjungan = async (e) => {
    if (tglAwal === "" || tglAkhir === "") {
      Swal.fire({
        icon: "warning",
        title: "Masukkan tanggal!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    e.preventDefault();

    if (itcKunjungan === 0) {
      try {
        const response = await axios.get(
          `${API_KUNJUNGAN}/export/kunjungan?tglAkhir=${tglAkhir}&tglAwal=${tglAwal}`,
          {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            responseType: "blob",
          }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Report Periode ${formatDate(tglAwal)} s.d ${formatDate(tglAkhir)}.xlsx`);
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
      const salesmanResponse = await namaSalesman(itcKunjungan);
      const nama = salesmanResponse || "Unknown Salesman";

      try {
        const response = await axios.get(
          `${API_KUNJUNGAN}/export/kunjungan/salesman?id_selesman=${itcKunjungan}&tglAkhir=${tglAkhir}&tglAwal=${tglAwal}`,
          {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            responseType: "blob",
          }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Report ${nama} Periode ${formatDate(tglAwal)} s.d ${formatDate(tglAkhir)}.xlsx`);
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
      const salesmanResponse = await namaSalesman(itcPlanning);
      const nama = salesmanResponse || "Unknown Salesman";

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
        link.setAttribute("download", `Planning ${nama} Periode ${formatDate(startPlanning)} s.d ${formatDate(endPlanning)}.xlsx`);
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
                <Typography className="font-poppins font-normal text-gray-800" variant="small"><span className="font-medium">Export Semua ITC:</span> Masukkan tanggal awal dan akhir saja.</Typography>
                <Typography className="font-poppins font-normal text-gray-800" variant="small"><span className="font-medium">Export Per ITC:</span> Masukkan tanggal awal, akhir, dan ITC yang dipilih.</Typography> <br />
                <Button variant="gradient" color="blue" onClick={exportPlanning} className="font-poppins font-medium" type="button">Export Planning</Button>
              </div>
            </div>
            <div id="kunjungan" hidden>
              <div>
                <Typography variant="lead" className="capitalize font-medium font-poppins">Laporan Kunjungan</Typography>
                <hr /> <br /> <br />
                <div>
                  <Input
                    label="Tanggal Awal"
                    variant="static"
                    color="blue"
                    size="lg"
                    type="date"
                    onChange={(e) => setTglAwal(e.target.value)}
                  /><br />
                  <Input
                    label="Tanggal Akhir"
                    variant="static"
                    color="blue"
                    size="lg"
                    type="date"
                    onChange={(e) => setTglAkhir(e.target.value)}
                  /> <br />
                  <div className="flex gap-2 items-end">
                    <Input
                      label="ITC"
                      variant="static"
                      color="blue"
                      list="salesmanN-list"
                      id="salesmanN"
                      name="salesmanN"
                      onChange={(event) => {
                        handleChangeK(event);
                        setItcKunjungan(event.target.value);
                      }}
                      placeholder="Pilih ITC"
                    />
                    <datalist id="salesmanN-list">
                      {optionsK.length > 0 && (
                        <>
                          {optionsK.map((option) => (
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
                        onClick={() => setCurrentPageK(currentPageK - 1)}
                        disabled={currentPageK === 1}
                      >
                        Prev
                      </button>
                      <button
                        className="text-sm bg-gray-400 px-1"
                        onClick={() => setCurrentPageK(currentPageK + 1)}
                        disabled={!optionsK.length}
                      >
                        Next
                      </button>
                    </div>
                  </div> <br />
                  <Typography className="font-poppins font-normal text-gray-800" variant="small"><span className="font-medium">Export Semua ITC:</span> Masukkan tanggal awal dan akhir saja.</Typography>
                  <Typography className="font-poppins font-normal text-gray-800" variant="small"><span className="font-medium">Export Per ITC:</span> Masukkan tanggal awal, akhir, dan ITC yang dipilih.</Typography> <br />
                  <Button variant="gradient" color="blue" onClick={exportDataKunjungan} className="font-poppins font-medium" type="button">Export Kunjungan</Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default LapAdminItc;
