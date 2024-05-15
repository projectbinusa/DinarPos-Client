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
  // Define state variables using useState
  const [idTT, setidTT] = useState(0);
  const [data, setdata] = useState(null);
  const [statusEnd, setStatusEnd] = useState("");
  const [taken, setTaken] = useState("");

  // Function to search for TT
  const searchTT = async () => {
    try {
      const response = await axios.get(`${API_SERVICE}/` + idTT, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      // Update state variables using setters
      setdata(response.data.data);
      setStatusEnd(response.data.data.statusEnd);
      setTaken(response.data.data.taken);
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

  console.log(taken);
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
          <br />
          {data && statusEnd === "N_A" && (
            <div className="border border-gray-400 rounded">
              <div className="bg-gray-300 p-3">
                <p>TT {data?.idTT}</p>
              </div>
              <div className="bg-gray-50 p-3">
                <p>Status N_A</p>
              </div>
            </div>
          )}
          {data && taken === "Y" && (
            <>
              <div class="border border-gray-400 rounded">
                <div class="bg-gray-300 p-3">
                  <p>TT {data?.idTT}</p>
                </div>
                <div class="bg-gray-50 p-3">
                  <table class="border-collapse rounded-sm w-full">
                    <thead>
                      <tr>
                        <th class="text-sm font-normal text-white text-center border border-blue-700 bg-blue-700 py-2">
                          Teknisi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="text-sm font-normal border border-gray-400 text-center bg-white py-2">
                          {data?.teknisi?.nama}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="text-center my-4">
                    <h1 class="text-medium text-lg mb-2">TAKE OVER</h1>
                    <i class="text-4xl fas fa-sync"></i>
                  </div>
                  <div class="text-center bg-blue-700 text-white py-2 rounded">
                    {data?.teknisi?.nama}
                  </div>
                </div>
              </div>
            </>
          )}

          {data && statusEnd === "PROSES" && (
            <>
              <form action="" class="border border-gray-400 rounded">
                <input type="text" hidden id="id_tt2" value={data?.idTT} />
                <input
                  type="text"
                  hidden
                  id="id_teknisi"
                  value={data?.teknisi?.id}
                />
                <div class="bg-gray-300 p-3">
                  <p>TT {data?.idTT} </p>
                </div>
                <div class="bg-gray-50 p-3">
                  <table class="border-collapse rounded-sm w-full">
                    <thead>
                      <tr>
                        <th class="text-sm font-normal text-white text-center border border-blue-700 bg-blue-700 py-2">
                          Teknisi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="text-sm font-normal border border-gray-400 text-center bg-white py-2">
                          {data?.teknisi?.nama}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="text-center my-4">
                    <h1 class="text-medium text-lg mb-2">TAKE OVER</h1>
                    <i class="text-4xl fas fa-sync"></i>
                  </div>
                  <div class="flex items-center gap-2 w-full">
                    <select
                      id="teknisi"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    >
                      {/* <?php foreach ($teknisi as $row) : ?>
                                          <option value="<?php echo $row->id_teknisi ?>"><?php echo $row->nama ?></option>
                                          <?php endforeach ?> */}
                    </select>
                    <button
                      class="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm p-3 text-center rounded"
                    >
                      TakeOver
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}
        </main>
      </div>
    </section>
  );
}

export default TakeOver;
