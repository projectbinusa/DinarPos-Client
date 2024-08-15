import React from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs, Typography } from "@material-tailwind/react";

function DealPo() {
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
          <div className="rounded mb-5 p-1 mt-12 overflow-x-auto">
            <table>
              <thead className="bg-blue-500 text-white w-full">
                <tr>
                  <th className="text-sm py-2 px-2.5 font-semibold w-[4%]">
                    No
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Tgl Input
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Marketing
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Customer
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Foto</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Keterangan
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">File_Po</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Status</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Ket_Status
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Administrasi
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </main>
      </div>
    </section>
  );
}

export default DealPo;
