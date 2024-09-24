import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./../../../assets/styles/datatables.css";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Button, Breadcrumbs, IconButton, Typography } from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { API_IJIN, API_PENGGUNA } from "../../../utils/BaseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import Decrypt from "../../../component/Decrypt";

function Ijin() {
  const tableRef = useRef(null);
  const [ijin, setIjin] = useState([]);
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(true);

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
    setLoading(true);
    try {
      const response = await axios.get(`${API_IJIN}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setIjin(response.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Gagal memuat data ijin!",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllIjin();

    return () => {
      if (tableRef.current && $.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (ijin.length > 0) {
      initializeDataTable();
    }
  }, [ijin]);

  const hapusIjin = async (id) => {
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
          .delete(`${API_IJIN}/${id}`, {
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

  const id = Decrypt();
  useEffect(() => {
    axios
      .get(`${API_PENGGUNA}/` + id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const response = res.data.data;
        setLevel(response.levelPengguna);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Ijin
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href={"/home"} className="opacity-60">
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
          {level === 'Marketting' ?
            <a href="/add_ijin" className="float-right mb-5">
              <Button variant="gradient" color="blue" className="font-popins font-medium">
                Tambah
              </Button>
            </a>
            : <></>}
          <div className="rounded my-5 p-2 w-full overflow-x-auto">
            <table id="example_data" ref={tableRef} className="table-auto w-full border-collapse rounded-sm">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-sm py-3 px-4 font-semibold text-left">No</th>
                  <th className="text-sm py-3 px-4 font-semibold text-left">Tanggal</th>
                  <th className="text-sm py-3 px-4 font-semibold text-left">Keterangan</th>
                  <th className="text-sm py-3 px-4 font-semibold text-left">Foto</th>
                  {level === 'Marketting' ?
                    <th className="text-sm py-3 px-4 font-semibold text-left">Aksi</th> : <></>}
                </tr>
              </thead>
              <tbody>
                {ijin.map((row, index) => (
                  <tr key={row.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <td className="text-sm py-3 px-4">{index + 1}</td>
                    <td className="text-sm py-3 px-4">{row.created_date}</td>
                    <td className="text-sm py-3 px-4">{row.ket}</td>
                    <td className="text-sm py-3 px-4">
                      {row.foto ? (
                        <img
                          src={`${API_IJIN}/images/${row.foto}`} // Adjust the path according to your API structure
                          alt="foto"
                          className="w-16 h-16 object-cover"
                        />
                      ) : (
                        <span>Tidak ada foto</span>
                      )}
                    </td>
                    {level === 'Marketting' ?
                      <td className="text-sm py-3 px-4 flex items-center justify-center">
                        <IconButton size="md" color="red" onClick={() => hapusIjin(row.id)}>
                          <TrashIcon className="w-6 h-6 text-white" />
                        </IconButton>
                      </td> : <></>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </section>
  );
}

export default Ijin;
