import React, { useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import $ from "jquery";

function EditData() {
  const [visibleElement, setVisibleElement] = useState(null);

  const toggleElement = (elementId) => {
    if (visibleElement === elementId) {
      $("#" + elementId).hide();
      setVisibleElement(null);
    } else {
      if (visibleElement !== null) {
        $("#" + visibleElement).hide();
      }
      $("#" + elementId).show();
      setVisibleElement(elementId);
    }
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Edit Data
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
            <a href="/edit_data">
              <span>Edit Data </span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="grid grid-cols-1 lg:grid-cols-3 items-start gap-3">
          <div className="bg-white shadow-lg p-3 my-5 rounded">
            <Typography variant="lead" className="capitalize font-medium">
              Edit Data
            </Typography>
            <hr />
            <ol className="mt-5">
              <li className="my-1">
                <button
                  className="text-gray-800 hover:bg-blue-50 flex items-center p-2 rounded-lg dark:text-white group w-full"
                  onClick={() => toggleElement("b_service")}
                >
                  <PencilIcon className="w-6 h-5" />
                  <span className=" ms-3 whitespace-nowrap">
                    Edit Biaya Service
                  </span>
                </button>
              </li>
              <li className="my-1">
                <button
                  className="text-gray-800 hover:bg-blue-50 flex items-center p-2 rounded-lg dark:text-white group w-full"
                  onClick={() => toggleElement("poin")}
                >
                  <PencilIcon className="w-6 h-5" />
                  <span className=" ms-3 whitespace-nowrap">Edit Poin</span>
                </button>
              </li>
              <li className="my-1">
                <button
                  className="text-gray-800 hover:bg-blue-50 flex items-center p-2 rounded-lg dark:text-white group w-full"
                  onClick={() => toggleElement("tanda_terima")}
                >
                  <PencilIcon className="w-6 h-5" />
                  <span className=" ms-3 whitespace-nowrap">
                    Edit Tanda Terima
                  </span>
                </button>
              </li>
              <li className="my-1">
                <button
                  className="text-gray-800 hover:bg-blue-50 flex items-center p-2 rounded-lg dark:text-white group w-full"
                  onClick={() => toggleElement("status_tanda_terima")}
                >
                  <PencilIcon className="w-6 h-5" />
                  <span className=" ms-3 whitespace-nowrap">
                    Edit Status Tanda Terima
                  </span>
                </button>
              </li>
              <li className="my-1">
                <button
                  className="text-gray-800 hover:bg-blue-50 flex items-center p-2 rounded-lg dark:text-white group w-full"
                  onClick={() => toggleElement("hapus_status")}
                >
                  <TrashIcon className="w-6 h-5" />{" "}
                  <span className=" ms-3 whitespace-nowrap">Hapus Status</span>
                </button>
              </li>
            </ol>
          </div>
          <div className="bg-white shadow-lg p-3 my-5 rounded lg:col-span-2">
            <div id="b_service" hidden>
              <Typography variant="lead" className="capitalize font-medium">
                Biaya Service{" "}
              </Typography>
              <hr />
              <div className="flex gap-2 mt-5 items-center">
                <Input
                  label="Tanda Terima"
                  variant="outlined"
                  color="blue"
                  size="lg"
                  placeholder="Cari Tanda Terima"
                  id="id_tt"
                />
                <IconButton color="blue">
                  <MagnifyingGlassIcon className="w-6 h-6" />
                </IconButton>
              </div>
              <br />
              <div id="resultService"></div>
            </div>
            <div id="poin" hidden>
              <Typography variant="lead" className="capitalize font-medium">
                Edit Poin{" "}
              </Typography>
              <hr />
              <div className="flex gap-2 mt-5 items-center">
                <Input
                  label="Tanda Terima"
                  variant="outlined"
                  color="blue"
                  size="lg"
                  placeholder="Cari Tanda Terima"
                  id="id_tt2"
                />
                <IconButton onClick="searchTandaTerimaPoin()" color="blue">
                  <MagnifyingGlassIcon className="w-6 h-6" />
                </IconButton>
              </div>
              <br />
              <div id="resultPoin"></div>
            </div>
            <div id="tanda_terima" hidden>
              <Typography variant="lead" className="capitalize font-medium">
                Edit Tanda Terima{" "}
              </Typography>
              <hr />
              <div className="flex gap-2 mt-5 items-center">
                <Input
                  label="Tanda Terima"
                  variant="outlined"
                  color="blue"
                  size="lg"
                  placeholder="Cari Tanda Terima"
                  id="id_tt3"
                />
                <IconButton onClick="searchTandaTerima()" color="blue">
                  <MagnifyingGlassIcon className="w-6 h-6" />
                </IconButton>
              </div>
              <br />
              <div id="resultTandaTerima"></div>
            </div>
            <div id="status_tanda_terima" hidden>
              <Typography variant="lead" className="capitalize font-medium">
                Edit Status Tanda Terima{" "}
              </Typography>
              <hr />
              <div className="flex gap-2 mt-5 items-center">
                <Input
                  label="Tanda Terima"
                  variant="outlined"
                  color="blue"
                  size="lg"
                  placeholder="Cari Tanda Terima"
                  id="id_tt4"
                />
                <IconButton onClick="searchStatusTandaTerima()" color="blue">
                  <MagnifyingGlassIcon className="w-6 h-6" />
                </IconButton>
              </div>
              <br />
              <div id="resultStatusTandaTerima"></div>
            </div>
            <div id="hapus_status" hidden>
              <Typography variant="lead" className="capitalize font-medium">
                Hapus Tanda Terima{" "}
              </Typography>
              <hr />
              <div className="flex gap-2 mt-5 items-center">
                <Input
                  label="Tanda Terima"
                  variant="outlined"
                  color="blue"
                  size="lg"
                  placeholder="Cari Tanda Terima"
                  id="id_tt5"
                />
                <IconButton onClick="searchHapusTandaTerima()" color="blue">
                  <MagnifyingGlassIcon className="w-6 h-6" />
                </IconButton>
              </div>
              <br />
              <div id="resultHapusTandaTerima"></div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default EditData;
