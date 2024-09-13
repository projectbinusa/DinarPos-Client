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
  const [finish, setFinish] = useState([]);

  // Fungsi inisialisasi DataTables
  const initializeDataTable = () => {
    // Hancurkan tabel jika sudah diinisialisasi sebelumnya
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    // Inisialisasi ulang DataTables dengan data terbaru
    $(tableRef.current).DataTable({
      data: finish.map((row, index) => [
        index + 1,
        row.bast,
        row.baut,
        row.baso,
        row.spk,
        row.ev_dtg,
        row.ev_pro,
        row.ev_fin,
        null, // Ini untuk kolom aksi (hapus)
      ]),
      columns: [
        { title: "No" },
         { title: "Bast" },
        { title: "Baut" },
        { title: "Baso" },
        { title: "Spk" },
        { title: "Ev_Datang" },
        { title: "Ev_Proses" },
        { title: "Ev_Finish" },
        { title: "Aksi" },
      ],
      columnDefs: [
        {
          targets: -1,
          data: null,
          defaultContent:
            "<button class='hapus-btn text-red-500 hover:text-red-700'>Hapus</button>",
        },
      ],
    });

    // Event listener untuk tombol hapus
    $(tableRef.current).on("click", ".hapus-btn", function () {
      const row = $(this).closest("tr");
      const rowData = $(tableRef.current).DataTable().row(row).data();
      hapusFinish(rowData[0]); // Menggunakan ID dari data row
    });
  };

  const GetAllFinish = async () => {
    try {
      const response = await axios.get(`${API_FINISH}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      if (response.status === 200) {
        setFinish(response.data.data || []); // Pastikan response.data.data ada
      } else {
        console.error("Error fetching data:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    GetAllFinish();
  }, []);

 useEffect(() => {
  if (finish.length > 0) {
    initializeDataTable(); 
  }
}, [finish]);

  // Fungsi hapus data
  const hapusFinish = async (id) => {
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
          .delete(`${API_FINISH}/delete/${id}`, {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` }
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Dihapus!",
              showConfirmButton: false,
              timer: 1500,
            });
            // Update state setelah menghapus data
            setFinish(finish.filter((item) => item.id !== id));
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Gagal!",
              text: "Hapus Data Finish Gagal!",
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(err);
          });
      }
    });
  };

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
