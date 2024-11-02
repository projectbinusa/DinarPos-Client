import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Button, Dialog, Typography } from "@material-tailwind/react";
import { API_FINISH } from "../../../utils/BaseUrl";
import $ from "jquery";
import ModalShowBaso from "./modal/ModalShowBaso";
import ModalShowBast from "./modal/ModalShowBast";
import ModalShowBaut from "./modal/ModalShowBaut";
import ModalShowSpk from "./modal/ModalShowSpk";
import ModalShowEvDtg from "./modal/ModalShowEvDtg";
import ModalShowEvPro from "./modal/ModalShowEvPro";
import ModalShowEvFinish from "./modal/ModalShowEvFinish";

function DataFinish() {
  const [finish, setFinish] = useState([]);
  const tableRef = useRef(null);
  const initializeDataTable = () => {
    if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable({});
    }
  };

  const getAllFinish = async () => {
    try {
      const response = await axios.get(`${API_FINISH}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setFinish(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data finish:", error);
    }
  };

  useEffect(() => {
    getAllFinish();
  }, []);

  useEffect(() => {
    if (finish && finish.length > 0) {
      initializeDataTable();
    }
  }, [finish]);

  const [openBast, setOpenBast] = useState(false);
  const [openBaso, setOpenBaso] = useState(false);
  const [openBaut, setOpenBaut] = useState(false);
  const [openSpk, setOpenSpk] = useState(false);
  const [openEvDtg, setOpenEvDtg] = useState(false);
  const [openEvProses, setOpenEvProses] = useState(false);
  const [openEvFinish, setOpenEvFinish] = useState(false);

  const handleOpenBast = () => setOpenBast(!openBast);
  const handleOpenBaso = () => setOpenBaso(!openBaso);
  const handleOpenBaut = () => setOpenBaut(!openBaut);
  const handleOpenSpk = () => setOpenSpk(!openSpk);
  const handleOpenEvDtg = () => setOpenEvDtg(!openEvDtg);
  const handleOpenEvProses = () => setOpenEvProses(!openEvProses);
  const handleOpenEvFinish = () => setOpenEvFinish(!openEvFinish);

  // FOTO
  const [fotoBast, setFotoBast] = useState("");
  const [fotoBaso, setFotoBaso] = useState("");
  const [fotoBaut, setFotoBaut] = useState("");
  const [fotoSpk, setFotoSpk] = useState("");
  const [fotoEvDtg, setFotoEvDtg] = useState("");
  const [fotoEvProses, setFotoEvProses] = useState("");
  const [fotoEvFinish, setFotoEvFinish] = useState("");

  const modalBaso = (foto) => { setFotoBaso(foto); handleOpenBaso() }
  const modalBast = (foto) => { setFotoBast(foto); handleOpenBast() }
  const modalBaut = (foto) => { setFotoBaut(foto); handleOpenBaut() }
  const modalEvDtg = (foto) => { setFotoEvDtg(foto); handleOpenEvDtg() }
  const modalEvProses = (foto) => { setFotoEvProses(foto); handleOpenEvProses() }
  const modalEvFinish = (foto) => { setFotoEvFinish(foto); handleOpenEvFinish() }
  const modalSpk = (foto) => { setFotoSpk(foto); handleOpenSpk() }

  // FILE SPK
  const downloadFile = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = `FILESPK.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Deal Finish
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
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse" ref={tableRef}>
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-xs py-3 px-4">No</th>
                  <th className="text-xs py-3 px-4">Customer</th>
                  <th className="text-xs py-3 px-4">Bast</th>
                  <th className="text-xs py-3 px-4">Baut</th>
                  <th className="text-xs py-3 px-4">Baso</th>
                  <th className="text-xs py-3 px-4">Spk</th>
                  <th className="text-xs py-3 px-4">Ev_Datang</th>
                  <th className="text-xs py-3 px-4">Ev_Proses</th>
                  <th className="text-xs py-3 px-4">Ev_Finish</th>
                </tr>
              </thead>
              <tbody>
                {finish.length > 0 ? (
                  finish.map((row, index) => (
                    <tr key={row.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                      <td className="text-xs py-2 px-4">{index + 1}</td>
                      <td className="text-xs py-2 px-4">{row.kunjungan?.customer?.nama_customer}</td>
                      <td className="text-xs py-2 px-4 text-center ">
                        <Button variant="outlined"
                          color="blue"
                          type="button"
                          onClick={() => modalBast(row.bast)}
                          className="font-popins font-medium" size="sm">View</Button>
                      </td>
                      <td className="text-xs py-2 px-4 text-center">
                        <Button variant="outlined"
                          color="blue"
                          type="button"
                          onClick={() => modalBaut(row.baut)}
                          className="font-popins font-medium" size="sm">View</Button>
                      </td>
                      <td className="text-xs py-2 px-4 text-center">
                        <Button variant="outlined"
                          color="blue"
                          type="button"
                          onClick={() => modalBaso(row.basp)}
                          className="font-popins font-medium" size="sm">View</Button>
                      </td>
                      <td className="text-xs py-2 px-4 text-center">
                        <Button variant="gradient"
                          color="blue"
                          type="button"
                          onClick={() => downloadFile(row.file_spk)}
                          className="font-popins font-medium" size="sm">Doc</Button>
                        <Button variant="outlined"
                          color="blue"
                          type="button"
                          onClick={() => modalSpk(row.spk)}
                          className="font-popins font-medium ml-3" size="sm">View</Button>
                      </td>
                      <td className="text-xs py-2 px-4 text-center">
                        <Button variant="outlined"
                          color="blue"
                          type="button"
                          onClick={() => modalEvDtg(row.ev_dtg)}
                          className="font-popins font-medium" size="sm">View</Button>
                      </td>
                      <td className="text-xs py-2 px-4 text-center">
                        <Button variant="outlined"
                          color="blue"
                          type="button"
                          onClick={() => modalEvProses(row.ev_pro)}
                          className="font-popins font-medium" size="sm">View</Button>
                      </td>
                      <td className="text-xs py-2 px-4 text-center">
                        <Button variant="outlined"
                          color="blue"
                          type="button"
                          onClick={() => modalEvFinish(row.ev_fin)}
                          className="font-popins font-medium" size="sm">View</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center text-xs py-3 bg-gray-200 border">
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      {/* MODAL BAST START */}
      <Dialog open={openBast} handler={handleOpenBast} size="md">
        <ModalShowBast handleOpen={handleOpenBast} foto={fotoBast} />
      </Dialog>
      {/* MODAL BAST END */}

      {/* MODAL BAUT START */}
      <Dialog open={openBaut} handler={handleOpenBaut} size="md">
        <ModalShowBaut handleOpen={handleOpenBaut} foto={fotoBaut} />
      </Dialog>
      {/* MODAL BAUT END */}

      {/* MODAL BASO START */}
      <Dialog open={openBaso} handler={handleOpenBaso} size="md">
        <ModalShowBaso handleOpen={handleOpenBaso} foto={fotoBaso} />
      </Dialog>
      {/* MODAL BASO END */}

      {/* MODAL SPK START */}
      <Dialog open={openSpk} handler={handleOpenSpk} size="md">
        <ModalShowSpk handleOpen={handleOpenSpk} foto={fotoSpk} />
      </Dialog>
      {/* MODAL SPK END */}

      {/* MODAL EV DATANG START */}
      <Dialog open={openEvDtg} handler={handleOpenEvDtg} size="md">
        <ModalShowEvDtg handleOpen={handleOpenEvDtg} foto={fotoEvDtg} />
      </Dialog>
      {/* MODAL EV DATANG END */}

      {/* MODAL EV PROSES START */}
      <Dialog open={openEvProses} handler={handleOpenEvProses} size="md">
        <ModalShowEvPro handleOpen={handleOpenEvProses} foto={fotoEvProses} />
      </Dialog>
      {/* MODAL EV PROSES END */}

      {/* MODAL EV FINISH START */}
      <Dialog open={openEvFinish} handler={handleOpenEvFinish} size="md">
        <ModalShowEvFinish handleOpen={handleOpenEvFinish} foto={fotoEvFinish} />
      </Dialog>
      {/* MODAL EV FINISH END */}
    </section>
  );
}

export default DataFinish;
