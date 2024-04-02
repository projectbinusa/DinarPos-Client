import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./../../../../assets/styles/datatables.css";
import axios from "axios";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import { Breadcrumbs, IconButton, Typography } from "@material-tailwind/react";
import { API_RETURN_EXCELCOM } from "../../../../utils/BaseUrl";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import { EyeIcon, PrinterIcon, TrashIcon } from "@heroicons/react/24/outline";

function PembelianReturn() {
  const tableRef = useRef(null);
  const [pembelian, setPembelian] = useState([]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  const getAll = async () => {
    try {
      const response = await axios.get(`${API_RETURN_EXCELCOM}/pembelian`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setPembelian(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (pembelian && pembelian.length > 0) {
      initializeDataTable();
    }
  }, [pembelian]);

  const history = useHistory();

  // DELETE
  const deleted = async (id) => {
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
          .delete(`${API_RETURN_EXCELCOM}/pembelian/` + id, {
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
              history.push("/pembelian_return_excelcom");
              window.location.reload();
            }, 1500);
          });
      }
    });
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            data transaksi pembelian return excelcom
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
            <a href="/pembelian_return_excelcom">
              <span>pembelian Return Excelcom</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded ">
          <div className="rounded my-5 p-2 w-full overflow-auto">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto overflow-auto"
            >
              <thead className="bg-blue-500 w-full text-white">
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold w-[4%]">No</th>
                  <th className="text-sm py-2 px-3 font-semibold">Tanggal</th>
                  <th className="text-sm py-2 px-3 font-semibold">No Faktur</th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Nama Suplier
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Total Belanja
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Cash / Kredit
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold w-[15%]">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {pembelian.length > 0 ? (
                  pembelian.map((pembelian, index) => (
                    <tr key={index}>
                      <td className="text-sm w-[4%]">{index + 1}</td>
                      <td className="text-sm py-2 px-3">
                        {pembelian.created_date}
                      </td>
                      <td className="text-sm py-2 px-3">
                        {pembelian.noFaktur}
                      </td>
                      <td className="text-sm py-2 px-3">
                        {pembelian.suplier.namaSuplier}
                      </td>
                      <td className="text-sm py-2 px-3">
                        {pembelian.totalBelanja}
                      </td>
                      <td className="text-sm py-2 px-3">
                        {pembelian.cashCredit}
                      </td>
                      <td className="text-sm py-2 px-3 flex flex-row justify-center items-center gap-2">
                        <a
                          href={
                            "/detail_histori_pembelian_return_excelcom/" +
                            pembelian.idTransaksiBeli
                          }
                        >
                          <IconButton size="md" color="light-blue">
                            <EyeIcon className="w-6 h-6 white" />
                          </IconButton>
                        </a>
                        <a
                          href={
                            "/print_histori_pembelian_return_excelcom/" +
                            pembelian.idTransaksiBeli
                          }
                          target="_blank"
                        >
                          <IconButton size="md" color="green">
                            <PrinterIcon className="w-6 h-6 white" />
                          </IconButton>
                        </a>
                        <IconButton
                          size="md"
                          color="red"
                          onClick={() => deleted(pembelian.idTransaksiBeli)}
                        >
                          <TrashIcon className="w-6 h-6 white" />
                        </IconButton>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
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

export default PembelianReturn;
