import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./../../../assets/styles/datatables.css";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { API_OMZET } from "../../../utils/BaseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

function Omzet() {
  const tableRef = useRef(null);
  const [omzet, setOmzet] = useState([]);
  const history = useHistory();
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
      console.log("Data Omzet:", response.data.data);
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Lakukan request DELETE ke API dengan ID
          await axios.delete(`${API_OMZET}/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
  
          // Tampilkan pesan sukses
          Swal.fire({
            icon: "success",
            title: "Data Berhasil Dihapus!",
            showConfirmButton: false,
            timer: 1500,
          });
  
          // Hapus item dari state omzet
          setOmzet((omzet) => omzet.filter((item) => item.id !== id));
  
        } catch (err) {
          // Tampilkan pesan error
          Swal.fire({
            icon: "error",
            title: "Gagal Menghapus!",
            text: "Hapus Omzet Gagal!",
            showConfirmButton: false,
            timer: 1500,
          });
          console.error(err);
        }
      }
    });
  };
  
  const navigateToAddOmzet = () => {
    history.push("/add_omzet");
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Data Omzet
          </Typography>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
        <a href="/add_omzet" className="float-right mb-5">
          <Button variant="gradient" color="blue" onClick={navigateToAddOmzet}>
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
                  <th className="text-sm py-2 px-3 font-semibold">ITC</th>
                  <th className="text-sm py-2 px-3 font-semibold">Tanggal</th>
                  <th className="text-sm py-2 px-3 font-semibold">Omzet</th>
                  <th className="text-sm py-2 px-3 font-semibold">Customer</th>
                  <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {omzet.length > 0 ? (
                  omzet.map((row, index) => (
                    <tr key={row.id}>
                      <td className="text-sm w-[4%]">{index + 1}</td>
                      <td className="text-sm py-2 px-3">{row.itc}</td>
                      <td className="text-sm py-2 px-3">{row.tgl}</td>
                      <td className="text-sm py-2 px-3">{row.omzet}</td>
                      <td className="text-sm py-2 px-3">{row.customer}</td>
                      <td className="text-sm py-2 px-3 flex items-center justify-center">
                        <div className="flex flex-row gap-3">
                          <IconButton
                            size="md"
                            color="red"
                            onClick={() => hapusOmzet(row.id)}
                          >
                            <TrashIcon className="w-6 h-6 white" />
                          </IconButton>
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

export default Omzet;
