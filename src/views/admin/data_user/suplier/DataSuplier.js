import React, { useRef, useState } from "react";
import { API_SUPLIER } from "../../../../utils/BaseUrl";
import { useEffect } from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  IconButton,
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
  const tableRef = useRef(null);
  const [supliers, setSupliers] = useState([]);

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
  
  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full lg:px-7 px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Data Suplier
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
            <a href="/data_suplier">
              <span>Suplier</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded overflow-auto">
          <div className="block">
            <a href="/add_suplier">
              <Button variant="gradient" color="blue">
                Tambah Suplier
              </Button>
            </a>
          </div>
          <div className="rounded my-5 w-full">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto w-full"
            >
              <thead className="border-b-2 ">
                <tr>
                  <th className="py-2 px-3 font-semibold">No</th>
                  <th className="py-2 px-3 font-semibold">Kode Suplier </th>
                  <th className="py-2 px-3 font-semibold">Nama Suplier</th>
                  <th className="py-2 px-3 font-semibold">No Telepon</th>
                  <th className="py-2 px-3 font-semibold">Alamat</th>
                  <th className="py-2 px-3 font-semibold">Keterangan</th>
                  <th className="py-2 px-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {supliers.length > 0 ? (
                  supliers.map((suplier, index) => (
                    <tr key={index}>
                      <td className="w-[4%]">{index + 1}</td>
                      <td className="py-2 px-3">{suplier.kodeSuplier}</td>
                      <td className="py-2 px-3">{suplier.namaSuplier}</td>
                      <td className="py-2 px-3">{suplier.noTelpSuplier}</td>
                      <td className="py-2 px-3">{suplier.alamatSuplier}</td>
                      <td className="py-2 px-3">{suplier.keterangan}</td>
                      <td className="py-2 px-3 flex items-center justify-center">
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
                      className="text-center capitalize py-2 bg-gray-100 "
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

export default DataSuplier;
