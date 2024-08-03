import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { API_PENGGUNA, API_SERVICE, API_TEKNISI } from "../../../utils/BaseUrl";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Decrypt from "../../../component/Decrypt";

function TakeOver() {
  const [idTT, setidTT] = useState(0);
  const [idTeknisi, setidTeknisi] = useState(0);
  const [data, setdata] = useState(null);
  const [statusEnd, setStatusEnd] = useState("");
  const [taken, setTaken] = useState("");
  const history = useHistory();

  const searchTT = async () => {
    try {
      const response = await axios.get(`${API_SERVICE}/` + idTT, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });

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

  const [teknisi, setteknisi] = useState([]);

  const getAllTeknisi = async (e) => {
    try {
      const response = await axios.get(`${API_TEKNISI}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });

      setteknisi(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllTeknisi();
  }, []);

  const [dataTake, setdataTake] = useState([]);

  const getAllTakeByIdTT = async () => {
    try {
      const response = await axios.get(`${API_SERVICE}/take/` + idTT, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });

      setdataTake(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllTakeByIdTT();
  }, []);

  const takeOver = async (e) => {
    e.preventDefault();

    const request = {
      id_service: idTT,
      id_teknisi: idTeknisi,
    };

    try {
      await axios.post(`${API_SERVICE}/take_over`, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      Swal.fire({
        icon: "success",
        title: "Take Over Berhasil",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        history.push("/");
      } else if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: error.response.data.data,
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      } else {
        Swal.fire({
          icon: "error",
          title: "Take Over Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    }
  };

  const [level, setlevel] = useState("");

  const idPengguna = Decrypt()
  useEffect(() => {
    axios.get(`${API_PENGGUNA}/` + idPengguna, {
      headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
    }).then((res) => {
      const response = res.data.data;
      setlevel(response.levelPengguna)
    }).catch((err) => {
      console.log(err);
    })
  }, [idPengguna])

  let dashboard = "";

  if (level === "Superadmin") {
    dashboard = "dashboard";
  } else if (level === "AdminService") {
    dashboard = "dashboard_service"
  }

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Take Over{" "}
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href={"/" + dashboard} className="opacity-60">
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
            <Button variant="gradient" color="blue" onClick={searchTT} className="font-popins font-medium">
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
          {data && (taken === "Y" || statusEnd.includes("CANCEL") || statusEnd.includes("READY")) && (
            <>
              <div className="border border-gray-400 rounded">
                <div className="bg-gray-300 p-3">
                  <p>TT {data?.idTT}</p>
                </div>
                <div className="bg-gray-50 p-3">
                  <table className="border-collapse rounded-sm w-full">
                    <thead>
                      <tr>
                        <th className="text-sm font-normal text-white text-center border border-blue-700 bg-blue-700 py-2">
                          Teknisi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-sm font-normal border border-gray-400 text-center bg-white py-2">
                          {data?.teknisi?.nama}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="text-center my-4">
                    <h1 className="text-medium text-lg mb-2">TAKE OVER</h1>
                    <i className="text-4xl fas fa-sync"></i>
                  </div>
                  <div className="text-center bg-blue-700 text-white py-2 rounded">
                    {dataTake.length > 0 ? (<>
                      {dataTake.map((row) => (
                        <ol>
                          <li>{row.id_take.nama}</li>
                        </ol>
                      ))}
                    </>) : (<>
                      {data?.teknisi?.nama}
                    </>)}
                  </div>
                </div>
              </div>
            </>
          )}
          {data && statusEnd === "PROSES" && (
            <>
              <form onSubmit={takeOver} className="border border-gray-400 rounded">
                <div className="bg-gray-300 p-3">
                  <p>TT {data?.idTT} </p>
                </div>
                <div className="bg-gray-50 p-3">
                  <table className="border-collapse rounded-sm w-full">
                    <thead>
                      <tr>
                        <th className="text-sm font-normal text-white text-center border border-blue-700 bg-blue-700 py-2">
                          Teknisi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-sm font-normal border border-gray-400 text-center bg-white py-2">
                          {data?.teknisi?.nama}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="text-center my-4">
                    <h1 className="text-medium text-lg mb-2">TAKE OVER</h1>
                    <i className="text-4xl fas fa-sync"></i>
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <select
                      id="teknisi"
                      onChange={(e) => setidTeknisi(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    >
                      {teknisi.map((row) => (
                        <option value={row.id} key={row.id}>{row.nama}</option>
                      ))}
                    </select>
                    <button
                      className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm p-3 text-center rounded"
                      type="submit"
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
