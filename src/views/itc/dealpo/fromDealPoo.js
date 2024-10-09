import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Typography } from "@material-tailwind/react";
import axios from "axios";
import { API_KUNJUNGAN } from "../../../utils/BaseUrl";
import IconButton from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/solid"; // Importing PlusIcon
import { useHistory } from "react-router-dom"; // Import useHistory for push

function FromDealPo() {
  const [dealPoData, setDealPoData] = useState([]);
  const [salesmanName, setSalesmanName] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (salesmanName) {
      axios
        .get(
          `${API_KUNJUNGAN}/deal_po/salesman?nama_salesman=${salesmanName}`,
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          const responseData = res.data.data;
          setDealPoData(responseData);
        })
        .catch((error) => {
          console.error("Error fetching Deal PO data: ", error);
        });
    }
  }, [salesmanName]);

  // const handleSalesmanNameChange = (e) => {
  //   setSalesmanName(e.target.value);
  // };

  const handleAdd = (id_kunjungan) => {
    console.log("Navigating to add_dealpo");
    history.push(`/add_dealpo/${id_kunjungan}`);
  };

  return (
    <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            From Deal Po
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/dashboard" className="opacity-60">
              {/* Breadcrumb Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011-1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
          </Breadcrumbs>
        </div>

        <main className="shadow-lg p-5 my-5 rounded">
          <div className="rounded mb-5 p-1 mt-12 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-500 text-white w-full">
                <tr>
                  <th className="text-sm py-1 px-2 font-semibold w-[4%]">No</th>
                  <th className="text-sm py-1 px-2 font-semibold">Instansi</th>
                  <th className="text-sm py-1 px-2 font-semibold">Tujuan</th>
                  <th className="text-sm py-1 px-2 font-semibold">Action</th>
                  <th className="text-sm py-1 px-2 font-semibold">
                    Info didapat
                  </th>
                  <th className="text-sm py-1 px-2 font-semibold">Cp</th>
                  <th className="text-sm py-1 px-2 font-semibold">Peluang</th>
                  <th className="text-sm py-1 px-2 font-semibold">Deal</th>
                  <th className="text-sm py-1 px-2 font-semibold">Byr_%</th>
                  <th className="text-sm py-1 px-2 font-semibold">Wkt_p</th>
                  <th className="text-sm py-1 px-2 font-semibold">Tgl_d</th>
                </tr>
              </thead>
              <tbody>
                {dealPoData.length > 0 ? (
                  dealPoData.map((deal, index) => (
                    <tr key={index} className="bg-white hover:bg-gray-100">
                      <td className="text-sm py-2 px-3 border">{index + 1}</td>
                      <td className="text-sm py-2 px-3 border">
                        {deal.instansi}
                      </td>
                      <td className="text-sm py-2 px-3 border">
                        {deal.tujuan}
                      </td>
                      <td className="text-sm py-2 px-3 border">
                        <IconButton
                          size="md"
                          color="blue"
                          onClick={() => handleAdd(deal.id_kunjungan)} // Pass the id_kunjungan
                        >
                          <PlusIcon className="w-6 h-6 white" />
                        </IconButton>
                      </td>
                      <td className="text-sm py-2 px-3 border">
                        {deal.info_didapat}
                      </td>
                      <td className="text-sm py-2 px-3 border">{deal.cp}</td>
                      <td className="text-sm py-2 px-3 border">
                        {deal.peluang}
                      </td>
                      <td className="text-sm py-2 px-3 border">{deal.deal}</td>
                      <td className="text-sm py-2 px-3 border">{deal.byr_p}</td>
                      <td className="text-sm py-2 px-3 border">{deal.wkt_p}</td>
                      <td className="text-sm py-2 px-3 border">{deal.tgl_d}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="text-center text-sm py-2 px-3">
                      No Data Found
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

export default FromDealPo;
