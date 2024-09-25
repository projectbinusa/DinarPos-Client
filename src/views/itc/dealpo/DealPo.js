import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import {
  API_DEAL_PO,
  API_DEAL_PO_MARKETTING,
  API_ITC,
  API_PENGGUNA,
} from "../../../utils/BaseUrl";
import Decrypt from "../../../component/Decrypt";

function DealPo() {
  const [datas, setDatas] = useState([]);
  const role = localStorage.getItem("role");
  const [salesmanId, setSalesmanId] = useState(0);
  const id = Decrypt();

  useEffect(() => {
    axios
      .get(`${API_PENGGUNA}/` + id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const response = res.data.data.namaPengguna;
        try {
          axios
            .get(`${API_ITC}/nama?nama=` + response, {
              headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            })
            .then((ress) => {
              setSalesmanId(ress.data.data.id);
              console.log("id: ", ress.data.data.id);
            });
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, salesmanId]);

  const getAll = async () => {
    try {
      let response;
      if (role === "USER") {
        response = await axios.get(
          `${API_DEAL_PO_MARKETTING}?id_salesman=${salesmanId}`,
          {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          }
        );
      } else {
        response = await axios.get(`${API_DEAL_PO}`, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        });
      }
      setDatas(response.data.data);
      console.log("data", response.data.data);
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
                fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <div className="rounded mb-5 p-1 mt-12 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-500 text-white w-full">
                <tr>
                  <th className="text-sm py-1 px-2 font-semibold w-[4%]">No</th>
                  <th className="text-sm py-1 px-2 font-semibold">Tgl Input</th>
                  {role != "USER" ? (
                    <th className="text-sm py-1 px-2 font-semibold">
                      Marketing
                    </th>
                  ) : (
                    <></>
                  )}
                  <th className="text-sm py-1 px-2 font-semibold">Customer</th>
                  <th className="text-sm py-1 px-2 font-semibold">Foto</th>
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
                </tr>
              </thead>
              <tbody>
                {datas.length > 0 ? (
                  datas.map((dealpo, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-sm w-[4%]">{index + 1}</td>
                        <td className="text-sm py-2 px-3">
                          {new Date(dealpo.tgl_input)}
                        </td>
                        {role != "USER" ? (
                          <td className="text-sm py-2 px-3">
                            {dealpo.marketing}
                          </td>
                        ) : (
                          <></>
                        )}
                        <td className="text-sm py-2 px-3">{dealpo.customer}</td>
                        <td className="text-sm py-2 px-3">
                          <Button
                            onClick={() => window.open(dealpo.foto, "_blank")}
                            className="bg-blue-500 text-white">
                            View
                          </Button>
                        </td>
                        <td className="text-sm py-2 px-3">
                          {dealpo.keterangan}
                        </td>
                        <td className="text-sm py-2 px-3">
                          <Button
                            onClick={() =>
                              window.open(dealpo.file_po, "_blank")
                            }
                            className="bg-blue-500 text-white">
                            View
                          </Button>
                        </td>
                        <td className="text-sm py-2 px-3">{dealpo.status}</td>
                        <td className="text-sm py-2 px-3">
                          {dealpo.ket_status}
                        </td>
                        <td className="text-sm py-2 px-3">
                          {dealpo.administrasi}
                        </td>
                        <td className="text-sm py-2 px-3 flex flex-col gap-2">
                          {/* <IconButton size="md" color="red">
                            <TrashIcon className="w-6 h-6 white" />
                          </IconButton> */}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="30"
                      className="text-center capitalize py-3 bg-gray-100"
                      x>
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
