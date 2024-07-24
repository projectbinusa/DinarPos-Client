import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { API_SERVICE, API_TEKNISI } from "../../utils/BaseUrl";
import $ from "jquery";
import "../../assets/styles/datatables.css";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import {
  Breadcrumbs,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import SidebarAdmin from "../../component/SidebarAdmin";

function ServiceReturTeknisi() {
  const tableRef = useRef(null);
  const [services, setservices] = useState([]);
  const [idTeknisi, setidTeknisi] = useState(0);

  useEffect(() => {
    axios
      .get(
        `${API_TEKNISI}/username?username=` + localStorage.getItem("username"),
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setidTeknisi(res.data.data.id);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  // GET ALL
  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_SERVICE}/my-service-retur?teknisiId=${idTeknisi}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setservices(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
  }, [idTeknisi]);

  useEffect(() => {
    if (services && services.length > 0) {
      initializeDataTable();
    }
  }, [services]);

  const [tglKonfirm, setTglKonfirm] = useState([]);

  const tglKonfirmasi = async (transactionId) => {
    try {
      const response = await axios.get(
        `${API_SERVICE}/tgl_konfirm?id=${transactionId}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      return response.data.data;
    } catch (error) {
      console.log("get all", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchTglKonfirm = async () => {
      const tglList = await Promise.all(
        services.map(async (service) => {
          const tglData = await tglKonfirmasi(service.idTT);
          return tglData;
        })
      );
      setTglKonfirm(tglList);
    };

    fetchTglKonfirm();
  }, [services]);

  const formatDate = (value) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Service Retur
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/dashboard_teknisi" className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/service_teknisi">
              <span>My Service</span>
            </a>
            <span className="cursor-default capitalize">retur</span>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <Typography variant="lead" className="uppercase">
            Data Service retur
          </Typography>
          <div className="rounded my-5 p-2 w-full overflow-x-auto">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto w-full"
            >
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold">No</th>
                  <th className="text-sm py-2 px-3 font-semibold">Nama</th>
                  <th className="text-sm py-2 px-3 font-semibold">Alamat </th>
                  <th className="text-sm py-2 px-3 font-semibold">Produk</th>
                  <th className="text-sm py-2 px-3 font-semibold">In </th>
                  <th className="text-sm py-2 px-3 font-semibold">C </th>
                  <th className="text-sm py-2 px-3 font-semibold">Status </th>
                  <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {services.length > 0 ? (
                  services.map((row, index) => {
                    const tglKonfirms = tglKonfirm[index] || [];

                    return (
                      <tr key={index}>
                        <td className="text-sm w-[4%]">{index + 1}</td>
                        <td className="text-sm py-2 px-3">
                          {row.customer.nama_customer}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {row.customer.alamat}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {row.produk} <span className="block">{row.merk}</span>{" "}
                          <span className="block">{row.type}</span>{" "}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {formatDate(row.tanggalMasuk)}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {tglKonfirms.map((down, idx) => (
                            <ul key={idx}>
                              <li>{formatDate(down.tglKonf)}</li>
                            </ul>
                          ))}{" "}
                        </td>
                        <td className="text-sm py-2 px-3">{row.statusEnd}</td>
                        <td className="text-sm py-2 px-3 flex items-center justify-center">
                          <div className="flex flex-row gap-3">
                            <a href={"/detail_service_teknisi/" + row.idTT}>
                              <IconButton size="md" color="light-blue">
                                <InformationCircleIcon className="w-6 h-6 white" />
                              </IconButton>
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })
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

export default ServiceReturTeknisi;
