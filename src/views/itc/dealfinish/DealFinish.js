import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";
import axios from "axios";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Typography } from "@material-tailwind/react";
import { API_FINISH } from "../../../utils/BaseUrl";
import Swal from "sweetalert2";

function DataFinish() {
  const tableRef = useRef(null);
  const [finish, setfinish] = useState([]);
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

  const getAllFinish = async () => {
    try {
      const response = await axios.get(`${API_FINISH}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setfinish(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  const fetchLevel = () => {
    setLevel(localStorage.getItem("level"));
  };

  useEffect(() => {
    getAllFinish();
    fetchLevel();
  }, []);

  useEffect(() => {
    if (finish.length > 0) {
      initializeDataTable();
    }
  }, [finish]);

  const hapusFinish = async (id) => {
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
        await axios.delete(`${API_FINISH}/${id}`, {
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
        setfinish((ijin) => ijin.filter((item) => item.id !== id));
  
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
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen overflow-x-auto">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <Typography variant="lead" className="uppercase text-gray-700 mb-4">
          Data Finish
        </Typography>

        <div className="bg-white shadow-lg p-6 rounded-lg">
          <div className="overflow-x-auto">
            <table
              ref={tableRef}
              id="dataTable"
              className="min-w-full bg-white border border-gray-300 rounded-lg"
            >
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-sm py-3 px-4 font-semibold">No</th>
                  <th className="text-sm py-3 px-4 font-semibold">Basp</th>
                  <th className="text-sm py-3 px-4 font-semibold">Baut</th>
                 <th className="text-sm py-3 px-4 font-semibold">Spk</th>
                  <th className="text-sm py-3 px-4 font-semibold">Ev_Datang</th>
                  <th className="text-sm py-3 px-4 font-semibold">Ev_Proses</th>
                  <th className="text-sm py-3 px-4 font-semibold">Ev_Finish</th>
                  <th className="text-sm py-3 px-4 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {finish.length > 0 ? (
                  finish.map((row, index) => (
                    <tr key={row.id}>
                      <td className="text-sm py-2 px-2.5">{index + 1}</td>
                      <td className="text-sm py-2 px-2.5">{row.basp}</td>
                      <td className="text-sm py-2 px-2.5">{row.baut}</td>
                      <td className="text-sm py-2 px-2.5">{row.file_spk}</td>
                      <td className="text-sm py-2 px-2.5">{row.ev_dtg}</td>
                      <td className="text-sm py-2 px-2.5">{row.ev_pro}</td>
                      <td className="text-sm py-2 px-2.5">{row.ev_fin}</td>
                      <td className="text-sm py-2 px-2.5">
                        <button
                          onClick={() => hapusFinish(row.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="11"
                      className="text-center capitalize py-3 bg-gray-200"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DataFinish;
