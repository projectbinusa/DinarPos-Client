import React from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Card, Typography } from "@material-tailwind/react";

function Home() {
  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[19rem] pt-20 lg:pt-5 w-full">
        {/* Adjust the grid to have 2 columns on large screens */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 lg:mr-4 mx-5 lg:mx-0">
          <Card className="p-4 order-1 lg:order-2">
            <Typography variant="h4" color="blue-gray" className="font-poppins">
              Report
            </Typography>
            <br />
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold">Nama ITC</th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Last Update
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">Omzet</th>
                  <th className="text-sm py-2 px-3 font-semibold">Persen</th>
                </tr>
              </thead>
            </table>
            {/* Add a border line below the table */}
            <hr className="my-4 border-gray-300" />
          </Card>

          <Card className="p-4 order-1 lg:order-2">
            <Typography variant="h4" color="blue-gray" className="font-poppins">
              Planning
            </Typography>
            <br />
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold">Nama ITC</th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Last Update
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">Omzet</th>
                  <th className="text-sm py-2 px-3 font-semibold">Persen</th>
                </tr>
              </thead>
            </table>
            {/* Add a border line below the table */}
            <hr className="my-4 border-gray-300" />
          </Card>
        </div>
        <br />
      </div>
    </section>
  );
}

export default Home;
