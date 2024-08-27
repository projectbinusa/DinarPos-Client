import React from "react";
import {
  Breadcrumbs,
  Typography,
  Card,
  CardBody,
} from "@material-tailwind/react";

function EditDealPo() {
  return (
    <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Edit Deal Po
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
          <Card key={index} className="my-5 shadow-md">
            <CardBody className="flex flex-col lg:flex-row justify-between">
              <div>
                <Typography variant="small" className="text-gray-500">
                  No:
                </Typography>
                <Typography variant="h6"></Typography>
              </div>
              <div>
                <Typography variant="small" className="text-gray-500">
                  Tanggal:
                </Typography>
                <Typography variant="h6"></Typography>
              </div>
              <div>
                <Typography variant="small" className="text-gray-500">
                  Nama:
                </Typography>
                <Typography variant="h6"></Typography>
              </div>
              <div>
                <Typography variant="small" className="text-gray-500">
                  Instansi:
                </Typography>
                <Typography variant="h6"></Typography>
              </div>
              <div>
                <Typography variant="small" className="text-gray-500">
                  Jenis:
                </Typography>
                <Typography variant="h6"></Typography>
              </div>
              <div>
                <Typography variant="small" className="text-gray-500">
                  Daerah:
                </Typography>
                <Typography variant="h6"></Typography>
              </div>
              <div>
                <Typography variant="small" className="text-gray-500">
                  Tujuan:
                </Typography>
                <Typography variant="h6"></Typography>
              </div>
              <div>
                <Typography variant="small" className="text-gray-500">
                  Info Didapat:
                </Typography>
                <Typography variant="h6"></Typography>
              </div>
              <div>
                <Typography variant="small" className="text-gray-500">
                  CP:
                </Typography>
                <Typography variant="h6"></Typography>
              </div>
              <div>
                <Typography variant="small" className="text-gray-500">
                  Visit:
                </Typography>
                <Typography variant="h6"></Typography>
              </div>
              <div>
                <Typography variant="small" className="text-gray-500">
                  Tipe:
                </Typography>
                <Typography variant="h6"></Typography>
              </div>
              <div>
                <Typography variant="small" className="text-gray-500">
                  Peluang:
                </Typography>
                <Typography variant="h6"></Typography>
              </div>
              <div>
                <Typography variant="small" className="text-gray-500">
                  Deal:
                </Typography>
                <Typography variant="h6"></Typography>
              </div>
              <div>
                <button className="bg-blue-500 text-white py-1 px-3 rounded">
                  Action
                </button>
              </div>
            </CardBody>
          </Card>
        </main>
      </div>
    </section>
  );
}

export default EditDealPo;
