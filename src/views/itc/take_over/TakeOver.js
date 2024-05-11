import React, { useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { API_SERVICE } from "../../../utils/BaseUrl";
import Swal from "sweetalert2";

function TakeOver() {
  const [idTT, setidTT] = useState(0);
  const [data, setdata] = useState(null);

  const searchTT = async () => {
    try {
      const response = await axios.get(`${API_SERVICE}/` + idTT, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setdata(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      if (error.response.data.code === 404) {
        Swal.fire({
          icon: "info",
          title: "Data Tidak Ada!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log("get all", error.response.data.code);
    }
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Take Over{" "}
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
            <a href="/take_over">
              <span>Take Over</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <br />
          <div className="flex gap-2 items-center">
            <Input
              label="Tanda Terima"
              variant="static"
              color="blue"
              size="lg"
              onChange={(e) => setidTT(e.target.value)}
              placeholder="Cari Tanda Terima"
              required
            />
            <Button variant="gradient" color="blue" onClick={searchTT}>
              GO!
            </Button>
          </div>
        </main>
      </div>
    </section>
  );
}

export default TakeOver;
