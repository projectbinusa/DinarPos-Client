import React from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import { Breadcrumbs, Button, Typography } from "@material-tailwind/react";

function DataSalesman() {
  return (
    <section className="md:flex font-popins bg-gray-50 ">
      <SidebarAdmin />
      <div className="md:ml-[18rem] ml-0 pt-24 md:pt-5 w-full md:px-7 px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Data Salesman
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
            <a href="/data_salesman">
              <span>Salesman</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="container bg-white shadow-lg p-5 my-5 rounded">
          <div>
            <a href="/add_salesman">
              <Button variant="gradient" color="blue">
                Tambah Salesman
              </Button>
            </a>
          </div>
        </main>
      </div>
    </section>
  );
}

export default DataSalesman;
