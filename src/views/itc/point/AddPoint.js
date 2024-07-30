import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useHistory } from "react-router-dom";
import { API_PENGGUNA, API_POIN, API_TEKNISI } from "../../../utils/BaseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import Decrypt from "../../../component/Decrypt";

function AddPoint() {
  const history = useHistory();
  const [tanggal, settanggal] = useState("");
  const [point, setpoint] = useState("");
  const [teknisi, setteknisiId] = useState(0);
  const [keterangan, setketerangan] = useState("");
  const [nominal, setnominal] = useState("");

  const validateInputs = () => {
    if (!tanggal || !point || !teknisi || !keterangan) {
      Swal.fire({
        icon: "warning",
        title: "Semua field harus diisi",
        showConfirmButton: true,
      });
      return false;
    }
    if (isNaN(point)) {
      Swal.fire({
        icon: "warning",
        title: "Point harus berupa angka",
        showConfirmButton: true,
      });
      return false;
    }
    return true;
  };

  const addPoint = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    const request = {
      id_teknisi: teknisi,
      keterangan: keterangan,
      nominal: nominal,
      poin: point,
      tanggal: tanggal,
    };

    try {
      await axios.post(`${API_POIN}/add`, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/data_poin_teknisi");
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
      console.log(error);
    }
  };

  // GET ALL TEKNISI
  const [values2, setvalues2] = useState("");
  const [options2, setoptions2] = useState([]);
  const [currentPage2, setCurrentPage2] = useState(1);

  const handleTeknisi = async () => {
    if (values2.trim() !== "") {
      const response = await fetch(
        `${API_TEKNISI}/pagination?limit=10&page=${currentPage2}&search=${values2}&sort=id`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setoptions2(data.data);
      console.log(data);
    } else {
      return;
    }
  };

  useEffect(() => {
    handleTeknisi();
  }, [currentPage2, values2]);

  const handleChangeTeknisi = (event) => {
    setvalues2(event.target.value);
    setCurrentPage2(1);
  };
  // END GET ALL TEKNISI

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
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            tambah poin
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
            <a href="/data_poin_teknisi">
              <span>Poin</span>
            </a>
            <span className="cursor-default capitalize">tambah Poin</span>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg px-5 py-8 my-5 rounded">
          <form onSubmit={addPoint}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Input
                label="Tanggal"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Tanggal"
                type="date"
                name="tanggal"
                required
                onChange={(e) => settanggal(e.target.value)}
              />
              <div className="flex gap-2 items-end">
                <Input
                  label="Teknisi"
                  variant="static"
                  color="blue"
                  list="teknisi-list"
                  id="teknisi"
                  name="teknisi"
                  onChange={(event) => {
                    handleChangeTeknisi(event);
                    setteknisiId(event.target.value);
                  }}
                  placeholder="Pilih Teknisi"
                  required
                />
                <datalist id="teknisi-list">
                  {options2.length > 0 && (
                    <>
                      {options2.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.nama}
                        </option>
                      ))}
                    </>
                  )}
                </datalist>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="text-sm bg-gray-400 px-1"
                    onClick={() => setCurrentPage2(currentPage2 - 1)}
                    disabled={currentPage2 === 1}
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    className="text-sm bg-gray-400 px-1"
                    onClick={() => setCurrentPage2(currentPage2 + 1)}
                    disabled={!options2.length}
                  >
                    Next
                  </button>
                </div>
              </div>
              <Input
                label="Poin"
                variant="static"
                color="blue"
                size="lg"
                type="number"
                placeholder="Masukkan Poin"
                name="point"
                required
                onChange={(e) => setpoint(e.target.value)}
              />
              <Input
                label="Nominal"
                variant="static"
                color="blue"
                size="lg"
                type="number"
                placeholder="Masukkan Nominal"
                name="nominal"
                required
                onChange={(e) => setnominal(e.target.value)}
              />
              <Input
                label="Keterangan"
                size="lg"
                placeholder="Masukkan Keterangan"
                variant="static"
                color="blue"
                name="keterangan"
                required
                onChange={(e) => setketerangan(e.target.value)}
              />
            </div>
            <div className="mt-10 flex gap-4">
              <Button variant="gradient" color="blue" type="submit">
                <span>Simpan</span>
              </Button>
              <a href="/data_poin_teknisi">
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

export default AddPoint;
