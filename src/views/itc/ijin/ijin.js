import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./../../../assets/styles/datatables.css";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Button, Breadcrumbs, IconButton, Typography } from "@material-tailwind/react";
import {  TrashIcon } from "@heroicons/react/24/outline";
import { API_IJIN } from "../../../utils/BaseUrl";
import axios from "axios";
import Swal from "sweetalert2";

function Ijin() {
  const tableRef = useRef(null);
  const [ijin, setIjin] = useState([]);
  const [level, setLevel] = useState("");

  const initializeDataTable = () => {
    if (tableRef.current && $.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }
    $(tableRef.current).DataTable({
      responsive: true,
      autoWidth: false,
      searching: true,
      paging: true,
      ordering: true,
      lengthChange: true,
      pageLength: 10,
    });
  };

  const getAllIjin = async () => {
    try {
      const response = await axios.get(`${API_IJIN}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setIjin(response.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchLevel = () => {
    setLevel(localStorage.getItem("level"));
  };

  useEffect(() => {
    getAllIjin();
    fetchLevel();
  }, []);

  useEffect(() => {
    if (ijin.length > 0) {
      initializeDataTable();
    }
  }, [ijin]);

  const hapusIjin = async (id) => {
  const result = await Swal.fire({
    title: "Apakah Anda Ingin Menghapus?",
    text: "Perubahan data tidak bisa dikembalikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Hapus",
    cancelButtonText: "Batal",
  });

  if (result.isConfirmed) {
    try {
      // Mengirim request penghapusan ke server
      await axios.delete(`${API_IJIN}/${id}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });

      // Menampilkan pesan sukses
      Swal.fire({
        icon: "success",
        title: "Dihapus!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Mengupdate state ijin dengan menghapus data yang sudah dihapus
      setIjin((ijin) => ijin.filter((item) => item.id !== id));

    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Hapus Ijin Gagal!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
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
            Ijin
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
            <a href="/ijin">
              <span>Ijin</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <a href="/add_ijin" className="float-right mb-5">
            <Button variant="gradient" color="blue" className="font-popins font-medium">
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
                  <th className="text-sm py-2 px-3 font-semibold">Tanggal</th>
                  <th className="text-sm py-2 px-3 font-semibold">Keterangan</th>
                  <th className="text-sm py-2 px-3 font-semibold">Foto</th>
                  <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {ijin.length > 0 ? (
                  ijin.map((row, index) => (
                    <tr key={row.id}>
                      <td className="text-sm w-[4%]">{index + 1}</td>
                      <td className="text-sm py-2 px-3">{row.created_date}</td>
                      <td className="text-sm py-2 px-3">{row.ket}</td>
                      <td className="text-sm py-2 px-3">
                        {row.foto && (
                          <img
                            src={row.foto}
                            alt="foto"
                            className="w-16 h-16 object-cover"
                          />
                        )}
                      </td>
                      <td className="text-sm py-2 px-3 flex items-center justify-center">
                        <div className="flex flex-row gap-3">
                          <IconButton
                            size="md"
                            color="red"
                            onClick={() => hapusIjin(row.id)}
                          >
                            <TrashIcon className="w-6 h-6 white" />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-sm text-center capitalize py-3 bg-gray-100">
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

export default Ijin;
