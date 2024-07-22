import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./../../../assets/styles/datatables.css";
import {
  Breadcrumbs,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { API_TEKNISI } from "../../../utils/BaseUrl";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import SidebarAdmin from "../../../component/SidebarAdmin";
import Swal from "sweetalert2";

function DataTeknisi() {
  const tableRef = useRef(null);
  const [teknisis, setteknisis] = useState([]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  // GET ALL
  const getAll = async () => {
    try {
      const response = await axios.get(`${API_TEKNISI}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setteknisis(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (teknisis && teknisis.length > 0) {
      initializeDataTable();
    }
  }, [teknisis]);

  // DELETE TEKNISI
  const deleteTeknisi = async (id) => {
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
        try {
          axios
            .delete(`${API_TEKNISI}/` + id, {
              headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            })
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Dihapus!",
                showConfirmButton: false,
                timer: 1500,
              });

              // setTimeout(() => {
              //   window.location.reload();
              // }, 1500);
            });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const level = localStorage.getItem("level");
  let dashboard = "";

  if (level === "Pimpinan") {
    dashboard = "dashboard_pimpinan";
  } else if (level === "AdminService") {
    dashboard = "dashboard_service"
  } else {
    dashboard = "dashboard"
  }

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Data Teknisi
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href={"/" + dashboard} className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/data_teknisi">
              <span>Teknisi</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded ">
          <a href="/add_teknisi" className="float-right mb-5">
            <Button variant="gradient" color="blue">
              Tambah
            </Button>
          </a>
          <div className="rounded my-5 p-2 w-full overflow-x-auto">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto w-full"
            >
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold">No</th>
                  <th className="text-sm py-2 px-3 font-semibold">Nama</th>
                  <th className="text-sm py-2 px-3 font-semibold">Alamat </th>
                  <th className="text-sm py-2 px-3 font-semibold">No HP </th>
                  <th className="text-sm py-2 px-3 font-semibold">Bagian </th>
                  <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {teknisis.length > 0 ? (
                  teknisis.map((teknisi, index) => (
                    <tr key={index}>
                      <td className="text-sm w-[4%]">{index + 1}</td>
                      <td className="text-sm py-2 px-3">{teknisi.nama}</td>
                      <td className="text-sm py-2 px-3">{teknisi.alamat}</td>
                      <td className="text-sm py-2 px-3">{teknisi.nohp}</td>
                      <td className="text-sm py-2 px-3">{teknisi.bagian}</td>
                      <td className="text-sm py-2 px-3 flex items-center justify-center">
                        <div className="flex flex-row gap-3">
                          <a href={"/edit_teknisi/" + teknisi.id}>
                            <IconButton size="md" color="light-blue">
                              <PencilIcon className="w-6 h-6 white" />
                            </IconButton>
                          </a>
                          <IconButton
                            size="md"
                            color="red"
                            type="button"
                            onClick={() => deleteTeknisi(teknisi.id)}
                          >
                            <TrashIcon className="w-6 h-6 white" />
                          </IconButton>{" "}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-sm text-center capitalize py-3 bg-gray-100"
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

export default DataTeknisi;
