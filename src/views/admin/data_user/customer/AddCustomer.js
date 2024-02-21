import React from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import { Breadcrumbs, Button, Input, Typography } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function AddCustomer() {
  return (
    <section className="md:flex font-popins bg-gray-50 ">
      <SidebarAdmin />
      <div className="md:ml-[18rem] ml-0 pt-24 md:pt-5 w-full md:px-7 px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            tambah Customer
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
            <a href="/data_customer">
              <span>Customer</span>
            </a>
            <span className="cursor-default capitalize">tambah Customer</span>
          </Breadcrumbs>
        </div>
        <main className="container bg-white shadow-lg p-5 my-5 rounded">
          {/* <form action="" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Input
              label="Nama Salesman"
              variant="standard"
              color="blue"
              size="lg"
              icon={<UserCircleIcon />}
            />
            <Input
              label="No Telephone"
              variant="standard"
              color="blue"
              size="lg"
              type="number"
              icon={<PhoneIcon />}
            />
            <Input
              label="Alamat"
              variant="standard"
              color="blue"
              size="lg"
              icon={<MapPinIcon />}
            />
          </form> */}
          <div className="mt-10 flex gap-4">
            <Button variant="gradient" color="blue" type="submit">
              <span>Simpan</span>
            </Button>
            <a href="/data_salesman">
              <Button variant="text" color="gray" className="mr-1">
                <span>Kembali</span>
              </Button>
            </a>
          </div>
        </main>
      </div>
    </section>
  );
}

export default AddCustomer;
