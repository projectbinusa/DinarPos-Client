import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./../../../assets/styles/datatables.css";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Button, IconButton, Breadcrumbs, Typography } from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { API_OMZET } from "../../../utils/BaseUrl";
import axios from "axios";
import Swal from "sweetalert2";

function Omzet() {
  const tableRef = useRef(null);
  const [omzet, setOmzet] = useState([]);
  const [level, setLevel] = useState("");

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({
      paging: true,
      searching: true,
      ordering: true,
      info: true,
    });
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

  const fetchLevel = () => {
    setLevel(localStorage.getItem("level"));
  };

  useEffect(() => {
    getAllOmzet();
    fetchLevel();
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

  let dashboard = "";
  if (level === "Superadmin") {
    dashboard = "dashboard";
  } else if (level === "AdminService") {
    dashboard = "dashboard_service";
  }

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Data Omzet
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
            <a href="/omzet">
              <span>Omzet</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <a href="/add_omzet" className="float-right mb-5">
            <Button variant="gradient" color="blue" className="font-popins font-medium">
              Tambah
            </Button>
          </a>
          <div className="rounded my-5 p-2 w-full overflow-x-auto">
          <table id="example_data" ref={tableRef} className="rounded-sm table-auto w-full">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="text-sm py-2 px-3 font-semibold">No</th>
                <th className="text-sm py-2 px-3 font-semibold">Tanggal</th>
                <th className="text-sm py-2 px-3 font-semibold">Omzet</th>
                <th className="text-sm py-2 px-3 font-semibold">Salesman</th>
                <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {omzet.length > 0 ? (
                omzet.map((row, index) => (
                  <tr key={row.id}>
                    <td className="text-sm py-2 px-3">{index + 1}</td>
                    <td className="text-sm py-2 px-3">
                      {new Date(row.created_date).toLocaleDateString()}
                    </td>
                    <td className="text-sm py-2 px-3">{row.omzet}</td>
                    {/* Akses property nama dari objek salesman */}
                    <td className="text-sm py-2 px-3">{row.salesman.namaSalesman}</td>
                    {/* Kolom aksi untuk tombol hapus */}
                    <td className="text-sm py-2 px-3 flex items-center justify-center">
                      <IconButton size="md" color="red" onClick={() => hapusOmzet(row.id)}>
                        <TrashIcon className="w-6 h-6 text-white" />
                      </IconButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-sm text-center capitalize py-3 bg-gray-100">
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

export default Omzet;