import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import $ from "jquery";
import "datatables.net";
import axios from "axios";
import "./../../../../assets/styles/datatables.css";
import { API_KAS_HARIAN } from "../../../../utils/BaseUrl";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

function KasHarian() {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  const formatDate = (value) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  const getAll = async () => {
    try {
      const response = await axios.get(`${API_KAS_HARIAN}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
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
  }, [datas]);

  // DELETE SALDO
  const deleteSaldo = async (id) => {
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
          .delete(`${API_KAS_HARIAN}/delete/` + id, {
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
              window.location.reload();
            }, 1500);
          });
      }
    });
  };

  const kasHarian = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${API_KAS_HARIAN}/export/excel?tanggal_akhir=${endDate}&tanggal_awal=${startDate}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "KasHarian.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error saat mengunduh file:", error);
    }
  };
  return (
    <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Kas Harian
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
            <a href="/kas_harian">
              <span>Kas Harian</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded ">
          <form onSubmit={kasHarian}>
            <div className="mt-8 w-72 lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Awal"
                required
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="mt-8 w-72 lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Akhir"
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <Button className="mt-5" color="blue" type="submit">
              Export
            </Button>
          </form>
          <br />
          <hr />
          <br />
          <div className="rounded mb-5 p-1 overflow-x-auto">
            <div className="flex justify-end">
              <a href="/add_saldo">
                <Button color="blue" type="submit">
                  Tambah Saldo
                </Button>
              </a>
            </div>
            <br />
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto w-full overflow-x-auto"
            >
              <thead className="bg-blue-500 text-white w-full">
                <tr>
                  <th className="text-sm py-2 px-2.5 font-semibold w-[4%]">
                    No
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Shift</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Saldo Awal (Rp)
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Tanggal</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Setor Kas Besar (Rp)
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {datas.length > 0 ? (
                  datas.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-sm w-[4%]">{index + 1}</td>
                        <td className="text-sm py-2 px-3">{data.shift}</td>
                        <td className="text-sm py-2 px-3">{data.saldoAwal}</td>
                        <td className="text-sm py-2 px-3">
                          {formatDate(data.date)}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {data.setorKas}
                        </td>
                        <td className="text-sm py-2 px-3 flex gap-2">
                          <a href={"/edit_saldo/" + data.id}>
                            <IconButton size="md" color="blue">
                              <PencilIcon className="w-6 h-6 white" />
                            </IconButton></a>
                          <IconButton size="md" color="red" onClick={() => deleteSaldo(data.id)}>
                            <TrashIcon className="w-6 h-6 white" />
                          </IconButton>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="7"
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
    </section>
  );
}

export default KasHarian;
