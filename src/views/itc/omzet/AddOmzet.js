import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { API_OMZET, API_SALESMAN } from "../../../utils/BaseUrl";
import { Button, Input, Typography, Breadcrumbs } from "@material-tailwind/react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function AddOmzet() {
  const history = useHistory();
  const [tgl, setTgl] = useState("");
  const [omzet, setOmzet] = useState("");
  const [salesmanId, setSalesmanId] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [responseData, setResponseData] = useState(null);

  const addOmzet = async (e) => {
    e.preventDefault();
    const parsedOmzet = parseFloat(omzet);

    if (isNaN(parsedOmzet)) {
      Swal.fire({
        icon: "error",
        title: "Input Tidak Valid!",
        text: "Jumlah Omzet harus berupa angka.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const request = {
      tgl: tgl,
      omzet: parsedOmzet,
      id_salesman: salesmanId,
      id_customer: customerId,
    };

    try {
      const response = await axios.post(`${API_OMZET}/add`, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/omzet");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 404) {
          Swal.fire({
            icon: "error",
            title: "Gagal Menambahkan Data",
            text: "Periksa kembali URL atau hubungi administrator.",
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (status === 401) {
          localStorage.clear();
          history.push("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Tambah Data Gagal!",
            text: data.message || "Terjadi kesalahan saat menambahkan data.",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log("Error Response:", error.response);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Tambah Data Gagal!",
          text: "Tidak dapat terhubung ke server.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  // Fetch Salesman dan Customer
  const [values, setValues] = useState("");
  const [options, setOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handle = async () => {
    try {
      if (values.trim() !== "") {
        const response = await fetch(
          `${API_SALESMAN}/pagination?limit=10&page=${currentPage}&search=${values}&sort=1`,
          {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          setOptions(data.data);
        } else {
          throw new Error("Failed to fetch data.");
        }
      } else {
        setOptions([]); // Reset options if no search term
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat data salesman.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    handle();
  }, [currentPage, values]);

  const handleChange = (event) => {
    setValues(event.target.value);
    setCurrentPage(1);
  };

  const level = localStorage.getItem("userLevel");
  let dashboard = "";

  if (level === "Superadmin") {
    dashboard = "dashboard";
  } else if (level === "AdminService") {
    dashboard = "dashboard_service";
  }

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Tambah Omzet
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href={`/${dashboard}`} className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/omzet">
              <span>Omzet</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg px-5 py-8 my-5 rounded">
          <div>
            <form onSubmit={addOmzet}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="flex gap-2 items-end">
                  <Input
                    label="Tanggal"
                    variant="static"
                    color="blue"
                    size="lg"
                    type="date"
                    value={tgl}
                    onChange={(e) => setTgl(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Input
                    label="Omzet"
                    size="lg"
                    placeholder="Masukkan Omzet"
                    variant="static"
                    color="blue"
                    value={omzet}
                    onChange={(e) => setOmzet(e.target.value)}
                    required
                  />
                </div>
                <div className="flex gap-2 items-end">
                  <Input
                    label="Salesman"
                    variant="static"
                    color="blue"
                    list="salesman-list"
                    id="salesman"
                    placeholder="Pilih Salesman"
                    required
                    onChange={(event) => {
                      handleChange(event);
                      setSalesmanId(event.target.value);
                    }}
                  />
                  <datalist id="salesman-list">
                    {options.map((option) => (
                      <option value={option.id} key={option.id}>
                        {option.namaSalesman}
                      </option>
                    ))}
                  </datalist>
                  <div className="flex gap-2">
                    <button
                      className="text-sm bg-gray-400 px-1"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}>
                      Prev
                    </button>
                    <button
                      className="text-sm bg-gray-400 px-1"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={!options.length}>
                      Next
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 items-end">
                  <Input
                    label="Customer"
                    variant="static"
                    color="blue"
                    list="customer-list"
                    id="customer"
                    placeholder="Pilih Customer"
                    onChange={(e) => setCustomerId(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button
                      className="text-sm bg-gray-400 px-1"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}>
                      Prev
                    </button>
                    <button
                      className="text-sm bg-gray-400 px-1"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={!options.length}>
                      Next
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-10 flex gap-4">
                <Button
                  variant="gradient"
                  color="blue"
                  type="button"
                  onClick={addOmzet}
                  className="font-poppins font-medium">
                  <span>Simpan</span>
                </Button>
                <a href="/omzet">
                  <Button
                    variant="text"
                    color="gray"
                    className="mr-1 font-poppins font-medium">
                    <span>Kembali</span>
                  </Button>
                </a>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}

export default AddOmzet;
