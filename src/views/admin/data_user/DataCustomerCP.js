import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./../../../assets/styles/datatables.css";
import axios from "axios";
import { API_CUSTOMER_CP } from "../../../utils/BaseUrl";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, IconButton, Typography } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function DataCustomerCP() {
  const tableRef = useRef(null);
  const [customerscp, setCustomerCp] = useState([]);

  const history = useHistory();

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  const getAll = async () => {
    try {
      const response = await axios.get(`${API_CUSTOMER_CP}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setCustomerCp(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (customerscp && customerscp.length > 0) {
      initializeDataTable();
    }
  }, [customerscp]);

  // DELETE CUSTOMER CP
  const deleteCustomerCp = async (id) => {
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
          .delete(`${API_CUSTOMER_CP}/` + id, {
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
              history.push("/data_customer_cp");
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
            Data Customer CP
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
            <a href="/data_customer_cp">
              <span>Customer CP</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <div className="rounded my-5 p-2 w-full overflow-auto">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto w-full"
            >
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold">No</th>
                  <th className="text-sm py-2 px-3 font-semibold">ITC </th>
                  <th className="text-sm py-2 px-3 font-semibold">Customer </th>
                  <th className="text-sm py-2 px-3 font-semibold">Nama CP</th>
                  <th className="text-sm py-2 px-3 font-semibold">Jabatan</th>
                  <th className="text-sm py-2 px-3 font-semibold">Email</th>
                  <th className="text-sm py-2 px-3 font-semibold">No Telepon</th>
                  <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {customerscp.length > 0 ? (
                  customerscp.map((down, index) => (
                    <tr key={index}>
                      <td className="text-sm w-[4%]">{index + 1}</td>
                      <td className="text-sm py-2 px-3">
                        {down.salesman.namaSalesman}
                      </td>
                      <td className="text-sm py-2 px-3">
                        {down.customer.nama_customer}
                      </td>
                      <td className="text-sm py-2 px-3">{down.nama_cp}</td>
                      <td className="text-sm py-2 px-3">{down.jabatan}</td>
                      <td className="text-sm py-2 px-3">{down.email}</td>
                      <td className="text-sm py-2 px-3">{down.no_hp}</td>
                      <td className="text-sm py-2 px-3 flex items-center justify-center">
                        <div className="flex flex-col lg:flex-row gap-3">
                          <a href={"/edit_customer_cp/" + down.id}>
                            <IconButton size="md" color="light-blue">
                              <PencilIcon className="w-6 h-6 white" />
                            </IconButton>
                          </a>
                          <IconButton
                            size="md"
                            color="red"
                            type="button"
                            onClick={() => deleteCustomerCp(down.id)}
                          >
                            <TrashIcon className="w-6 h-6 white" />
                          </IconButton>{" "}
                        </div>
                      </td>{" "}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
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

export default DataCustomerCP;
