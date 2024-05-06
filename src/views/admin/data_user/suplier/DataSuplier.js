import React, { useRef, useState } from "react";
import { API_SUPLIER } from "../../../../utils/BaseUrl";
import { useEffect } from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import $ from "jquery";
import "datatables.net";
import "./../../../../assets/styles/datatables.css";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function DataSuplier() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const tableRef = useRef(null);
  const [supliers, setSupliers] = useState([]);
  const [excel, setExcel] = useState("");

  const history = useHistory();

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  // GET ALL
  const getAll = async () => {
    try {
      const response = await axios.get(`${API_SUPLIER}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setSupliers(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (supliers && supliers.length > 0) {
      initializeDataTable();
    }
  }, [supliers]);

  // DELETE SUPLIER
  const deleteSuplier = async (id) => {
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
          .delete(`${API_SUPLIER}/` + id, {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Dihapus!",
              showConfirmButton: false,
              timer: 1500,
            });

            setTimeout(() => {
              history.push("/data_suplier");
              window.location.reload();
            }, 1500);
          });
      }
    });
  };

  // DOWNLOAD FORMAT
  const downloadFormat = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_SUPLIER}/template`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Template_Suplier.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error saat mengunduh file:", error);
    }
  };

  // EXPORT SUPLIER
  const exportDataSuplier = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_SUPLIER}/export`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Data_Suplier.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error saat mengunduh file:", error);
    }
  };

  // IMPORT SUPLIER
  const importFromExcel = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", excel);

    await axios
      .post(`${API_SUPLIER}/import`, formData, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        // responseType: "blob",
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Sukses!",
          text: " Berhasil Ditambahkan",
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
          title: "Error!",
          text: "Import Barang Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(err);
      });
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Data Suplier
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
            <a href="/data_suplier">
              <span>Suplier</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded ">
          <div className="flex justify-between">
            <div className="flex flex-col lg:flex-row gap-4">
              <div>
                <Button
                  onClick={handleOpen}
                  variant="gradient"
                  color="light-blue"
                >
                  Import
                </Button>
              </div>
              <div>
                <Button
                  variant="gradient"
                  color="light-blue"
                  onClick={exportDataSuplier}
                >
                  Export
                </Button>
              </div>
            </div>
            <a href="/add_suplier">
              <Button variant="gradient" color="blue">
                Tambah Suplier
              </Button>
            </a>
          </div>
          <div className="rounded my-5 p-2 w-full overflow-auto">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto w-full"
            >
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold">No</th>
                  <th className="text-sm py-2 px-3 font-semibold">Kode Suplier </th>
                  <th className="text-sm py-2 px-3 font-semibold">Nama Suplier</th>
                  <th className="text-sm py-2 px-3 font-semibold">No Telepon</th>
                  <th className="text-sm py-2 px-3 font-semibold">Alamat</th>
                  <th className="text-sm py-2 px-3 font-semibold">Keterangan</th>
                  <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {supliers.length > 0 ? (
                  supliers.map((suplier, index) => (
                    <tr key={index}>
                      <td className="text-sm w-[4%]">{index + 1}</td>
                      <td className="text-sm py-2 px-3">{suplier.kodeSuplier}</td>
                      <td className="text-sm py-2 px-3">{suplier.namaSuplier}</td>
                      <td className="text-sm py-2 px-3">{suplier.noTelpSuplier}</td>
                      <td className="text-sm py-2 px-3">{suplier.alamatSuplier}</td>
                      <td className="text-sm py-2 px-3">{suplier.keterangan}</td>
                      <td className="text-sm py-2 px-3 flex items-center justify-center">
                        <div className="flex flex-col lg:flex-row gap-3">
                          <a href={"/edit_suplier/" + suplier.idSuplier}>
                            <IconButton size="md" color="light-blue">
                              <PencilIcon className="w-6 h-6 white" />
                            </IconButton>
                          </a>
                          <IconButton
                            size="md"
                            color="red"
                            type="button"
                            onClick={() => deleteSuplier(suplier.idSuplier)}
                          >
                            <TrashIcon className="w-6 h-6 white" />
                          </IconButton>{" "}
                        </div>
                      </td>{" "}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-sm text-center capitalize py-2 bg-gray-100 "
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

      {/* MODAL IMPORT */}
      <Dialog open={open} handler={handleOpen} size="md">
        <DialogHeader>Import Data Suplier</DialogHeader>
        <DialogBody>
          <p className="text-black">Silahkan download format di bawah ini</p>
          <Button
            variant="gradient"
            color="blue"
            className="mt-2 mb-5"
            onClick={downloadFormat}
          >
            Download Format
          </Button>
          <hr />
        </DialogBody>
        <form onSubmit={importFromExcel}>
          <DialogBody>
            <Input
              label="Pilih File"
              variant="static"
              color="blue"
              type="file"
              required
              accept=".xlsx"
              onChange={(e) => setExcel(e.target.files[0])}
            />{" "}
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="gray"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Kembali</span>
            </Button>
            <Button
              variant="gradient"
              color="blue"
              onClick={handleOpen}
              type="submit"
            >
              <span>Import</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
      {/* END MODAL IMPORT */}
    </section>
  );
}

export default DataSuplier;
