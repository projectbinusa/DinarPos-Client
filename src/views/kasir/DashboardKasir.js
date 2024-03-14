import React from "react";
import SidebarKasir from "../../component/SidebarKasir";
import { Card, CardHeader, Typography } from "@material-tailwind/react";

function DashboardKasir() {
  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarKasir />
      <div className="lg:ml-[22rem] pt-12 lg:pt-0">
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <Card>
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="flex flex-col gap-4 rounded-none lg:flex-row lg:items-center"
            >
              <div>
                <Typography variant="h6" color="blue-gray">
                  Penjualan
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="max-w-sm font-normal"
                >
                  Total Penjualan :
                </Typography>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default DashboardKasir;
