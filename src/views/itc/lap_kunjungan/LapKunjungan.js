import React from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import "datatables.net";
import {
  Breadcrumbs,
  Button,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";

function LapKunjungan() {
  return (
    <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase font-poppins">
            Lap Kunjungan
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
        <main className="bg-white shadow-lg p-5 my-5 rounded ">
          <form>
            {/* Wrap the Input fields and Select in a div with the same width */}
            <div className="w-72 lg:w-[50%]">
              <div className="mt-8">
                <Input
                  variant="static"
                  color="blue"
                  type="date"
                  label="Tanggal Awal"
                  required
                />
              </div>
              <div className="mt-8">
                <Input
                  variant="static"
                  color="blue"
                  type="date"
                  label="Tanggal Akhir"
                  required
                />
              </div>
              <div className="mt-8">
                <Select
                  id="pilih"
                  label="Status"
                  color="blue"
                  variant="outlined"
                  required
                  className="text-sm"
                >
                  <Option value="">Pilih</Option>
                  <Option value="New">New</Option>
                  <Option value="OLD">Old</Option>
                  <Option value="Done">Done</Option>
                </Select>
              </div>
            </div>
            <Button
              className="mt-5 font-poppins font-medium"
              color="blue"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </main>
      </div>
    </section>
  );
}

export default LapKunjungan;
