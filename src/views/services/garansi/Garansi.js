import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./../../../assets/styles/datatables.css";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { API_GARANSI, API_PENGGUNA } from "../../../utils/BaseUrl";
import axios from "axios";
import { CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import Decrypt from "../../../component/Decrypt";

function Garansi() {
  const tableRef = useRef(null);
  const [garansi, setgaransi] = useState([]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  const getAll = async () => {
    try {
      const response = await axios.get(`${API_GARANSI}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setgaransi(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (garansi && garansi.length > 0) {
      initializeDataTable();
    }
  }, [garansi]);

  const formatDate = (value) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  // HAPUS GARANSI
  const hapusGaransi = async (id) => {
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
          .delete(`${API_GARANSI}/delete/` + id, {
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
          }).catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Gagal!",
              text: "Hapus Garansi Gagal!",
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(err);
          })
      }
    });
  };

  // UPDATE TGL JADI GARANSI
  const updateTglJadiGaransi = async (id) => {
    const request = {
      tgl_jadi: new Date(),
    };

    await axios
      .put(`${API_GARANSI}/update/tgl_jadi/` + id, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Update Tanggal Jadi Berhasil!",
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
          title: "Update Tanggal Jadi Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });

        console.log(err);
      });
  };

  const [level, setlevel] = useState("");

  const idPengguna = Decrypt()
  useEffect(() => {
    axios.get(`${API_PENGGUNA}/` + idPengguna, {
      headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
    }).then((res) => {
      const response = res.data.data;
      setlevel(response.levelPengguna)
    }).catch((err) => {
      console.log(err);
    })
  }, [idPengguna])

  let dashboard = "";

  if (level === "Superadmin") {
    dashboard = "dashboard";
  } else if (level === "AdminService") {
    dashboard = "dashboard_service"
  }

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase font-poppins">
            Data Garansi
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
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <a href="/add_garansi" className="float-right mb-5">
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
                  <th className="text-xs py-2 px-3">No</th>
                  <th className="text-xs py-2 px-3">ID TT</th>
                  <th className="text-xs py-2 px-3">
                    TGL Masuk
                  </th>
                  <th className="text-xs py-2 px-3">Barang</th>
                  <th className="text-xs py-2 px-3">Merek </th>
                  <th className="text-xs py-2 px-3">Masuk ke </th>
                  <th className="text-xs py-2 px-3">
                    Kerusakan
                  </th>
                  <th className="text-xs py-2 px-3">TGL Jadi</th>
                  <th className="text-xs py-2 px-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {garansi.length > 0 ? (
                  garansi.map((row, index) => (
                    <tr key={index}>
                      <td className="text-xs w-[4%]">{index + 1}</td>
                      <td className="text-xs py-2 px-3">
                        {row.serviceBarang.idTT}
                      </td>
                      <td className="text-xs py-2 px-3">
                        {formatDate(row.tanggalMasuk)}
                      </td>
                      <td className="text-xs py-2 px-3">{row.namaBrg}</td>
                      <td className="text-xs py-2 px-3">{row.merek}</td>
                      <td className="text-xs py-2 px-3">{row.masukKe}</td>
                      <td className="text-xs py-2 px-3">{row.kerusakan}</td>
                      <td className="text-xs py-2 px-3">
                        {row.tanggalJadi === null ? (
                          <></>
                        ) : (
                          <>{formatDate(row.tanggalJadi)}</>
                        )}
                      </td>
                      <td className="text-xs py-2 px-3 flex items-center justify-center">
                        <div className="flex flex-row gap-3">
                          {row.tanggalJadi != null ? (
                            <></>
                          ) : (
                            <>
                              <IconButton
                                size="md"
                                color="green"
                                onClick={() => updateTglJadiGaransi(row.id)}
                              >
                                <CheckIcon className="w-6 h-6 white" />
                              </IconButton>
                            </>
                          )}
                          <a href={"/edit_garansi/" + row.id}>
                            <IconButton size="md" color="light-blue">
                              <PencilIcon className="w-6 h-6 white" />
                            </IconButton>
                          </a>
                          <IconButton
                            size="md"
                            color="red"
                            onClick={() => hapusGaransi(row.id)}
                          >
                            <TrashIcon className="w-6 h-6 white" />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <>
                    <tr>
                      <td
                        colSpan="9"
                        className="text-xs text-center capitalize py-3 bg-gray-100"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </section>
  );
}

export default Garansi;
