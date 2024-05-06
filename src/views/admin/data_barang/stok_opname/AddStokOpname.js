import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { InformationCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { API_BARANG, API_STOK_KELUAR } from "../../../../utils/BaseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import ReactSelect from "react-select";

function AddStokOpname() {
  const [barangId, setbarangId] = useState(0);
  const [stok, setstok] = useState("");
  const [keterangan, setketerangan] = useState("");

  const [barang, setbarang] = useState([]);
  const history = useHistory();

  // GET ALL BARANG
  const allBarang = async () => {
    try {
      const response = await axios.get(`${API_BARANG}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setbarang(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allBarang();
  }, []);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "transparent",
      borderBottom: "1px solid #ccc",
      border: "none",
      outline: "none",
      fontSize: "14px",
      "&:hover": {
        outline: "none",
        boxShadow: "none",
      },
      "&:focus": {
        outline: "none",
        boxShadow: "none",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
      "&:hover": {
        outline: "none",
        boxShadow: "none",
      },
      "&:focus": {
        outline: "none",
        boxShadow: "none",
      },
    }),
  };

  // ALL BARANG
  const [values2, setvalues2] = useState("");
  const [options2, setoptions2] = useState([]);
  const [currentPage2, setCurrentPage2] = useState(1);

  const handleBarang = async () => {
    if (values2.trim() !== "") {
      const response = await fetch(
        `${API_BARANG}/pagination?limit=10&page=${currentPage2}&search=${values2}&sort=1`,
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
    handleBarang();
  }, [currentPage2, values2]);

  const handleChangeBarang = (event) => {
    setvalues2(event.target.value);
    setCurrentPage2(1);
  };

  // ADD STOK OPNAME
  const addStokOpname = async (e) => {
    e.preventDefault();

    const request = {
      id_barang: barangId,
      jumlah_stok: stok,
      keterangan: keterangan,
    };

    try {
      await axios.post(`${API_STOK_KELUAR}/add`, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/stok_keluar_barang");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        history.push("/");
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

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Tambah Stok Barang Opname
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
            <a href="/stok_keluar_barang">
              <span>Stok Keluar</span>
            </a>
            <span className="cursor-default">Tambah Barang Opname</span>
          </Breadcrumbs>
        </div>
        <main className="container bg-white shadow-lg px-5 py-8 my-5 rounded">
          <form onSubmit={addStokOpname}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex gap-2 items-end">
                <Input
                  label="Barang"
                  variant="static"
                  color="blue"
                  list="barang-list"
                  id="barang"
                  name="barang"
                  onChange={(event) => {
                    handleChangeBarang(event);
                    setbarangId(event.target.value);
                  }}
                  placeholder="Pilih Barang"
                  required
                />
                <datalist id="barang-list">
                  {options2.length > 0 && (
                    <>
                      {options2.map((option) => (
                        <option value={option.idBarang}>
                          {option.barcodeBarang} - {option.namaBarang}
                        </option>
                      ))}
                    </>
                  )}
                </datalist>

                <div className="flex gap-2">
                  <button
                    className="text-sm bg-gray-400 px-1"
                    onClick={() => setCurrentPage2(currentPage2 - 1)}
                    disabled={currentPage2 === 1}
                  >
                    Prev
                  </button>
                  <button
                    className="text-sm bg-gray-400 px-1"
                    onClick={() => setCurrentPage2(currentPage2 + 1)}
                    disabled={!options2.length}
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="lg:mt-5">
                <Input
                  label="Jumlah Stok Opname"
                  variant="static"
                  color="blue"
                  type="number"
                  size="lg"
                  placeholder="Masukkan Jumlah Stok Opname"
                  icon={<PlusIcon />}
                  onChange={(e) => setstok(e.target.value)}
                />
              </div>
              <Input
                label="Keterangan"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Keterangan"
                onChange={(e) => setketerangan(e.target.value)}
                icon={<InformationCircleIcon />}
              />
            </div>
            <div className="mt-10 flex gap-4">
              <Button variant="gradient" color="blue" type="submit">
                <span>Simpan</span>
              </Button>
              <a href="/stok_masuk_barang">
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

export default AddStokOpname;
