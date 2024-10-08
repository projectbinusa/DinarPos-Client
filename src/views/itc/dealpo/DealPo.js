import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { API_DEAL_PO } from "../../../utils/BaseUrl";

function DealPo() {
  const [datas, setDatas] = useState([]);

  const getAll = async () => {
    try {
      const response = await axios.get(`${API_DEAL_PO}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        params: {
          /* Tambahkan query params jika ada sesuai Swagger */
        },
      });
      setDatas(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            DealPo
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
          </Breadcrumbs>
        </div>

        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <div className="flex justify-end mb-5">
            <Button
              variant="gradient"
              color="blue"
              className="font-poppins font-medium"
            >
              <a href="/add_dealpo">Tambah</a>
            </Button>
          </div>
          <div className="rounded mb-5 p-1 mt-12 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-500 text-white w-full">
                <tr>
                  <th className="text-sm py-1 px-2 font-semibold w-[4%]">No</th>
                  <th className="text-sm py-1 px-2 font-semibold">Tgl Input</th>
                  <th className="text-sm py-1 px-2 font-semibold">Marketing</th>
                  <th className="text-sm py-1 px-2 font-semibold">Customer</th>
                  <th className="text-xs py-1 px-2 font-semibold">Foto</th>
                  <th className="text-sm py-1 px-2 font-semibold">
                    Keterangan
                  </th>
                  <th className="text-sm py-1 px-2 font-semibold">File_Po</th>
                  <th className="text-sm py-1 px-2 font-semibold">Status</th>
                  <th className="text-sm py-1 px-2 font-semibold">
                    Ket_Status
                  </th>
                  <th className="text-sm py-1 px-2 font-semibold">
                    Administrasi
                  </th>
                  <th className="text-sm py-1 px-2 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {datas.length > 0 ? (
                  datas.map((dealpo, index) => (
                    <tr key={index}>
                      <td className="text-sm w-[4%]">{index + 1}</td>
                      <td className="text-sm py-2 px-3">
                        {new Date(dealpo.tgl_input).toLocaleDateString()}
                      </td>
                      <td className="text-sm py-2 px-3">{dealpo.marketing}</td>
                      <td className="text-sm py-2 px-3">{dealpo.customer}</td>
                      <td className="text-xs py-2 px-3">
                        {dealpo.foto ? (
                          <img
                            src={dealpo.foto}
                            alt="Foto"
                            className="w-[100px] h-[50px] object-cover rounded-lg"
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                          />
                        ) : (
                          "Tidak ada foto"
                        )}
                      </td>
                      <td className="text-sm py-2 px-3">{dealpo.keterangan}</td>
                      <td className="text-sm py-2 px-3">
                        {dealpo.file_po ? (
                          <a
                            href={dealpo.file_po}
                            download
                            className="text-blue-500 underline"
                          >
                            <Button className="text-xs py-1 px-2 bg-blue-500">
                              file
                            </Button>
                          </a>
                        ) : (
                          "Tidak ada file"
                        )}
                      </td>
                      <td className="text-sm py-2 px-3">{dealpo.status}</td>
                      <td className="text-sm py-2 px-3">{dealpo.ket_status}</td>
                      <td className="text-sm py-2 px-3">
                        {dealpo.administrasi}
                      </td>
                      <td className="flex flex-row gap-3">
                        <a href={`/edit_dealpo/${dealpo.id}`}>
                          <IconButton size="md" color="light-blue">
                            <PencilIcon className="w-6 h-6 white" />
                          </IconButton>
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="11"
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

export default DealPo;
