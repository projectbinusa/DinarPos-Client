import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Typography,
  Button,
  IconButton,
  Dialog,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { API_DEAL_PO } from "../../../utils/BaseUrl";
import $ from "jquery"
import formatDate from "../../../component/FormatDate";
import LevelPengguna from "../../../utils/LevelPengguna";
import ModalFotoDealPO from "./ModalFotoDealPO";
import EditDealPO from "./EditDealPo";

function DealPo() {
  const [datas, setDatas] = useState([]);
  const level = LevelPengguna();
  const tableRef = useRef(null);
  const initializeDataTable = () => {
    if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable({});
    }
  };

  const getAll = async () => {
    try {
      const response = await axios.get(`${API_DEAL_PO}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      console.log(response.data.data);
      setDatas(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (datas && datas.length > 0) {
      initializeDataTable();
    }
  }, [datas])

  // MODAL OPEN FOTO
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [foto, setFoto] = useState("");
  const modalOpen = (picture) => { setFoto(picture); handleOpen() }

  // MODAL EDIT
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(!openEdit);
  const [idDeal, setIdDeal] = useState(0);
  const modalOpenEdit = (id) => { setIdDeal(id); handleOpenEdit() }

  const downloadFile = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = `FILEDEALPO.docx`;
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
            Deal Po
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
          </Breadcrumbs>
        </div>

        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <div className="rounded mb-5 p-1 overflow-x-auto">
            <table className="w-full" ref={tableRef}>
              <thead className="bg-blue-500 text-white w-full">
                <tr>
                  <th className="text-xs py-1 px-2 w-[4%]">No</th>
                  <th className="text-xs py-1 px-2">Tgl Input</th>
                  <th className="text-xs py-1 px-2">Marketing</th>
                  <th className="text-xs py-1 px-2">Customer</th>
                  <th className="text-xs py-1 px-2">Foto</th>
                  <th className="text-xs py-1 px-2">Keterangan</th>
                  <th className="text-xs py-1 px-2">File_Po</th>
                  <th className="text-xs py-1 px-2">Status</th>
                  <th className="text-xs py-1 px-2">Ket_Status</th>
                  <th className="text-xs py-1 px-2">Administrasi</th>
                  {level === "GudangItc" &&
                    <th className="text-xs py-1 px-2">Action</th>}
                </tr>
              </thead>
              <tbody>
                {datas.length > 0 ? (
                  datas.map((dealpo, index) => (
                    <tr key={index}>
                      <td className="text-xs w-[4%]">{index + 1}</td>
                      <td className="text-xs py-2 px-3">{formatDate(dealpo.tanggal_input)}</td>
                      <td className="text-xs py-2 px-3">{dealpo.kunjungan?.salesman?.namaSalesman}</td>
                      <td className="text-xs py-2 px-3">{dealpo.kunjungan?.customer?.nama_customer}</td>
                      <td className="text-xs py-2 px-4 text-center ">
                        <Button variant="outlined"
                          color="blue"
                          type="button"
                          onClick={() => modalOpen(dealpo.foto)}
                          className="font-popins font-medium" size="sm">View</Button>
                      </td>
                      <td className="text-xs py-2 px-3">{dealpo.ket}</td>
                      <td className="text-xs py-2 px-3">
                        <Button variant="gradient"
                          color="blue"
                          type="button"
                          onClick={() => downloadFile(dealpo.file_po)}
                          className="font-popins font-medium" size="sm">File</Button>
                      </td>
                      <td className="text-xs py-2 px-3">{dealpo.status}</td>
                      <td className="text-xs py-2 px-3">{dealpo.ket_status}</td>
                      <td className="text-xs py-2 px-3">
                        {dealpo.administrasi}
                      </td>
                      {level === "GudangItc" &&
                        <td className="flex flex-row gap-3">
                          <IconButton size="md" color="blue" onClick={() => modalOpenEdit(dealpo.id)}>
                            <PencilIcon className="w-5 h-5 white" />
                          </IconButton>
                        </td>}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="11"
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
      {/* MODAL START */}
      <Dialog open={open} handler={handleOpen} size="md">
        <ModalFotoDealPO handleOpen={handleOpen} foto={foto} />
      </Dialog>
      {/* MODAL END */}

      {/* MODAL EDIT START */}
      <Dialog open={openEdit} handler={handleOpenEdit} size="md">
        <EditDealPO handleOpen={handleOpenEdit} idDeal={idDeal} />
      </Dialog>
      {/* MODAL EDIT END */}
    </section>
  );
}

export default DealPo;
