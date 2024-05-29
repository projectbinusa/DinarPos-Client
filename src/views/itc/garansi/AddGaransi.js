import React, { useState, useEffect} from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Breadcrumbs,
   Button,
    Input,
    Textarea,
   Typography,
  } from "@material-tailwind/react";
import { useHistory } from "react-router-dom";
import { API_GARANSI } from "../../../utils/BaseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import { API_CUSTOMER } from "../../../utils/BaseUrl";

function AddGaransi() {
  const history = useHistory();
  const [namaBrg, setNamaBrg] = useState("");
  const [merek, setMerek] = useState("");
  const [tanggalMasuk, setTanggalMasuk] = useState("");
  const [masukKe, setMasukKe] = useState("");
  const [id_tt, setIdTt] = useState("");
  const [kerusakan, setKerusakan] = useState("");

  const [values, setvalues] = useState("");
  const [options, setoptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const validateInputs = () => {
    if (!namaBrg || !merek || !tanggalMasuk || !masukKe || !id_tt || !kerusakan) {
      Swal.fire({
        icon: "warning",
        title: "Semua field harus diisi",
        showConfirmButton: true,
      });
      return false;
    }
    if (isNaN(id_tt)) {
      Swal.fire({
        icon: "warning",
        title: "ID TT harus berupa angka",
        showConfirmButton: true,
      });
      return false;
    }
    return true;
  };

  const addGaransi = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    const request = {
      namaBrg: namaBrg,
      merek: merek,
      tanggalMasuk: tanggalMasuk,
      masukKe: masukKe,
      id_tt: parseInt(id_tt),
      kerusakan: kerusakan,
    };

    console.log("Mengirim data ke server:", request);

    try {
      await axios.post(`${API_GARANSI}/add`, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/garansi");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        history.push("/");
      } else if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Data Sudah Ada!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      } else {
        Swal.fire({
          icon: "error",
          title: "Tambah Data Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    }
  };

  const handle = async () => {
    if (values.trim() !== "") {
      const response = await fetch(
        `${API_CUSTOMER}/pagination?limit=10&page=${currentPage}&search=${values}&sort=1`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setoptions(data.data);
      console.log(data);
    } else {
      return;
    }
  };

  useEffect(() => {
    handle();
  }, [currentPage, values]);

  const handleChange = (event) => {
    setvalues(event.target.value);
    setCurrentPage(1);
  };

  
  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            tambah garansi
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
            <a href="/garansi">
              <span>Garansi</span>
            </a>
            <span className="cursor-default capitalize">tambah Garansi</span>
          </Breadcrumbs>
        </div>
        <main className="container bg-white shadow-lg px-5 py-8 my-5 rounded">
          <form onSubmit={addGaransi}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Input
                label="Nama Barang"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Nama Barang"
                name="namaBrg"
                // value={namaBrg}
                onChange={(e) => setNamaBrg(e.target.value)}
              />
              <Input
                label="Merek"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Merek"
                name="merek"
                // value={merek}
                onChange={(e) => setMerek(e.target.value)}
              />
              <Input
                label="TGL Masuk"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan TGL Masuk"
                type="date"
                name="tanggalMasuk"
                // value={tanggalMasuk}
                onChange={(e) => setTanggalMasuk(e.target.value)}
              />
              <Input
                label="Masuk ke"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Masuk ke"
                name="masukKe"
                // value={masukKe}
                onChange={(e) => setMasukKe(e.target.value)}
              />
              <Input
                label="ID TT"
                variant="static"
                color="blue"
                size="lg"
                type="number"
                placeholder="Masukkan ID TT"
                name="id_tt"
                // value={id_tt}
                onChange={(e) => setIdTt(e.target.value)}
              />
              <div>
                <Textarea
                  label="Kerusakan"
                  size="lg"
                  placeholder="Masukkan Kerusakan"
                  variant="static"
                  color="blue"
                  name="kerusakan"
                  // value={kerusakan}
                  onChange={(e) => setKerusakan(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-10 flex gap-4">
              <Button variant="gradient" color="blue" type="submit">
                <span>Simpan</span>
              </Button>
              <a href="/garansi">
                <Button variant="text" color="gray" className="mr-1">
                  <span>Kembali</span>
                </Button>
              </a>
            </div>
          </form>
        </main>
      </div>
    </section>
  );
}

export default AddGaransi;
