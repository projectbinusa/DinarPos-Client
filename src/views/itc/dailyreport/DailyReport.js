import React from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Typography,
  Input,
  Button,
  Option,
  Select,
} from "@material-tailwind/react";

function DailyRepost() {
  return (
    <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Daily Report
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
            <a href="/daily_repost">
              <span>Daily Report</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded ">
          <div className="flex justify-end">
            <a href="/add_daily">
              <Button
                color="blue"
                type="submit"
                className="font-poppins font-medium"
              >
                Tambah
              </Button>
            </a>
          </div>
          <form>
            <div className="mt-1 w-72 lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Awal"
                required
              />
            </div>
            <div className="mt-3 w-72 lg:w-[50%]">
              <Input
                variant="static"
                color="blue"
                type="date"
                label="Tanggal Akhir"
                required
              />
            </div>
            <Button
              className="mt-5 font-poppins font-medium"
              color="blue"
              type="submit"
            >
              Print
            </Button>
            <div className="w-full lg:w-1/4 mt-4">
              <Select
                id="pilih"
                label="Status"
                color="blue"
                variant="outlined"
                required
                className="w-full text-sm"
              >
                <Option value="">Pilih</Option>
                <Option value="New">New </Option>
                <Option value="OLD">Old</Option>
                <Option value="Done">Done</Option>
              </Select>
            </div>
          </form>

          <div className="rounded mb-5 p-1 mt-12 overflow-x-auto">
            <table
              id="example_data"
              className="rounded-sm table-auto w-full overflow-x-auto"
            >
              <thead className="bg-blue-500 text-white w-full">
                <tr>
                  <th className="text-sm py-2 px-2.5 font-semibold w-[4%]">
                    No
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Tanggal</th>
                  <th className="text-sm py-2 px-2.5 font-semibold">
                    Jumlah Report
                  </th>
                  <th className="text-sm py-2 px-2.5 font-semibold">Aksi</th>
                </tr>
              </thead>
            </table>
          </div>
        </main>
      </div>
    </section>
  );
}

export default DailyRepost;
