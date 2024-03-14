import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./../../../../assets/styles/datatables.css";
import axios from "axios";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import ReactSelect from "react-select";
import { API_CUSTOMER, LAPORAN_CUSTOMER } from "../../../../utils/BaseUrl";

function LaporanCustomerExcelcom() {
  const tableRef = useRef(null);
  const [laporans, setLaporan] = useState([]);
  const [customer, setcustomer] = useState([]);
  const [customerId, setcustomerId] = useState(0);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  const getAll = async () => {
    try {
      const response = await axios.get(`${LAPORAN_CUSTOMER}/excelcom`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setLaporan(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  const getAllCustomer = async () => {
    try {
      const response = await axios.get(`${API_CUSTOMER}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setcustomer(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
    getAllCustomer();
  }, []);

  useEffect(() => {
    if (laporans && laporans.length > 0) {
      initializeDataTable();
    }
  }, [laporans]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "transparent",
      borderBottom: "1px solid #ccc",
      border: "none",
      outline: "none",
      fontSize: "14px",
      "&:hover": {
        outline: "none",
        boxShadow: "none",
      },
      "&:focus": {
        outline: "none",
        boxShadow: "none",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
      "&:hover": {
        outline: "none",
        boxShadow: "none",
      },
      "&:focus": {
        outline: "none",
        boxShadow: "none",
      },
    }),
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            LAPORAN customer Excelcom
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
            <a href="/laporan_customer_excelcom">
              <span>Laporan Customer Excelcom</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <form action="">
            <div className="w-72 lg:w-[50%]">
              <label
                htmlFor="customer"
                className="text-[14px] text-blue-gray-400"
              >
                Data Customer
              </label>
              <ReactSelect
                id="customer"
                options={customer.map((down) => {
                  return {
                    value: down.id,
                    label: down.nama_customer,
                  };
                })}
                placeholder="Pilih Customer"
                styles={customStyles}
                onChange={(selectedOption) =>
                  setcustomerId(selectedOption.value)
                }
              />
              <hr className="mt-1 bg-gray-400 h-[0.1em]" />
            </div>
            <div className="mt-8 w-72 lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Awal"
              />
            </div>
            <div className="mt-8 w-72 lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Akhir"
              />
            </div>
            <Button className="mt-5" color="blue">
              Print
            </Button>
          </form>
          <div className="rounded mb-5 mt-12 overflow-auto">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto overflow-auto"
            >
              <thead className="border-b-2">
                <tr>
                  <th className="py-2 px-3 font-semibold w-[4%]">No</th>
                  <th className="py-2 px-3 font-semibold">Tanggal</th>
                  <th className="py-2 px-3 font-semibold">No Faktur</th>
                  <th className="py-2 px-3 font-semibold">Nama Customer</th>
                  <th className="py-2 px-3 font-semibold">Nama Barang</th>
                  <th className="py-2 px-3 font-semibold">Jumlah Barang</th>
                  <th className="py-2 px-3 font-semibold">Unit</th>
                  <th className="py-2 px-3 font-semibold">Harga Satuan</th>
                  <th className="py-2 px-3 font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {laporans.length > 0 ? (
                  laporans.map((laporan, index) => (
                    <tr key={index}>
                      <td className="w-[4%]">{index + 1}</td>
                      <td className="py-2 px-3">{laporan.created_date}</td>
                      <td className="w-[15%] py-2 px-3">{laporan.noFaktur}</td>
                      <td className="py-2 px-3">{laporan.namaCustomer}</td>
                      <td className="py-2 px-3">{laporan.namaSalesman}</td>
                      <td className="py-2 px-3">{laporan.namaSalesman}</td>
                      <td className="py-2 px-3">{laporan.namaSalesman}</td>
                      <td className="py-2 px-3">{laporan.namaSalesman}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
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

export default LaporanCustomerExcelcom;
