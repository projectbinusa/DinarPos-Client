import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { API_IJIN, API_SALESMAN } from "../../../utils/BaseUrl";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function AddIjin() {
  const history = useHistory();
  const [salesmanId, setSalesmanId] = useState(0);
  const [created_date, setCreatedDate] = useState("");
  const [tgl, setTgl] = useState("");
  const [ket, setKet] = useState("");
  const [foto, setFoto] = useState(null);
  const [jenis, setJenis] = useState("");

  // Fungsi untuk menambahkan Ijin
  const addIjin = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id_salesman", salesmanId); // Menambahkan id_salesman
    formData.append("s_d_tgl", new Date(created_date).toISOString().slice(0, 19).replace('T', ' ')); // Format tanggal awal
    formData.append("tgl", new Date(tgl).toISOString().slice(0, 19).replace('T', ' ')); // Format tanggal akhir
    formData.append("jenis", jenis);
    formData.append("ket", ket);

    if (foto) {
      formData.append("foto", foto); // Menambahkan file foto
    }

    console.log("Data yang dikirim:");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await axios.post(`${API_IJIN}/add`, formData, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Data Berhasil Ditambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/ijin");
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          Swal.fire({
            icon: "error",
            title: "Tambah Data Gagal!",
            text: data.message || "Request tidak valid, periksa kembali data yang dikirim.",
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (status === 404) {
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
        }
        console.log("Error Response:", error.response); // Debugging response error
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

  // Fungsi untuk menangani perubahan input file foto
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFoto(file);
    } else {
      Swal.fire({
        icon: "warning",
        title: "File harus berupa gambar!",
        showConfirmButton: false,
        timer: 1500,
      });
      setFoto(null);
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

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Tambah Ijin
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href={`/${localStorage.getItem("userLevel") === "Superadmin" ? "dashboard" : "dashboard_service"}`} className="opacity-60">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/ijin">
              <span className="opacity-60">Ijin</span>
            </a>
            <span className="cursor-default capitalize">Tambah Ijin</span>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg px-5 py-8 my-5 rounded">
          <form onSubmit={addIjin}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              <div className="mt-2">
                <Input
                  label="Durasi"
                  variant="static"
                  color="blue"
                  size="lg"
                  value={jenis}
                  required
                  onChange={(e) => setJenis(e.target.value)}
                />
              </div>
              <div>
                <Input
                  label="Tanggal Awal"
                  variant="static"
                  color="blue"
                  size="lg"
                  type="datetime-local"
                  name="tanggal_awal"
                  onChange={(e) => setCreatedDate(e.target.value)}
                />
              </div>
              <div>
                <Input
                  label="Tanggal Akhir"
                  variant="static"
                  color="blue"
                  size="lg"
                  type="datetime-local"
                  name="tanggal_akhir"
                  onChange={(e) => setTgl(e.target.value)}
                />
              </div>
              <div>
                <Input
                  label="Foto"
                  variant="static"
                  color="blue"
                  size="lg"
                  type="file"
                  name="foto"
                  onChange={handleFotoChange}
                />
              </div>
              <div>
                <Input
                  label="Keterangan"
                  variant="static"
                  color="blue"
                  size="lg"
                  type="text"
                  name="keterangan"
                  onChange={(e) => setKet(e.target.value)}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Tambah
            </Button>
          </form>
        </main>
      </div>
    </section>
  );
}

export default AddIjin;
