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
import axios from "axios";
import {
  API_BARANG,
  API_STOK_MASUK,
  API_SUPLIER,
} from "../../../../utils/BaseUrl";
import ReactSelect from "react-select";
import Swal from "sweetalert2";

function AddStokMasuk() {
  const [stok, setstok] = useState("");
  const [keterangan, setketerangan] = useState("");
  const [suplierId, setsuplierId] = useState(0);
  const [barangId, setbarangId] = useState(0);

  const [suplier, setsuplier] = useState([]);
  const [barang, setbarang] = useState([]);

  const history = useHistory();

  // GET ALL BARANG
  const allBarang = async () => {
    try {
      const response = await axios.get(`${API_BARANG}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setbarang(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // GET ALL SUPLIER
  const allSuplier = async () => {
    try {
      const response = await axios.get(`${API_SUPLIER}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setsuplier(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allBarang();
    allSuplier();
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

  // ADD STOK MASUK
  const addStokMasuk = async (e) => {
    e.preventDefault();

    const request = {
      id_barang: barangId,
      id_suplier: suplierId,
      jumlah_stok: stok,
      keterangan: keterangan,
    };

    try {
      await axios.post(`${API_STOK_MASUK}/add`, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/stok_masuk_barang");
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

  // SELECT
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Fetch data when currentPage changes

  const fetchData = async () => {
    const response = await fetch(
      `http://localhost:2000/api/supplier/pagination?limit=${itemsPerPage}&page=${currentPage}&search=S-&sort=id`,
      {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      }
    );
    const data = await response.json();
    setOptions(data.data);
    setTotalPages(Math.ceil(data.pagination.total / itemsPerPage));
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleOptionSelect = (selectedValue) => {
    setValue(selectedValue);
    setOptions([]);
    
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full lg:px-7 px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Tambah Stok Barang
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/dashboard_admin" className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/stok_masuk_barang">
              <span>Stok Masuk</span>
            </a>
            <span className="cursor-default">Tambah Stok Barang</span>
          </Breadcrumbs>
        </div>
        <main className="container bg-white shadow-lg px-5 py-8 my-5 rounded">
          <form onSubmit={addStokMasuk}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative">
                <Input
                  variant="static"
                  label="Suplier"
                  placeholder="Masukkan Kode Suplier"
                  value={value}
                  onChange={handleChange}
                  color="blue"
                />
                {options.length > 0 && (
                  <>
                    <ul style={{ listStyle: "none", padding: 0 }} className="absolute z-30 bg-white w-full">
                      {options.map((option, index) => (
                        <li
                          key={index}
                          onClick={() => handleOptionSelect(option.kodeSuplier)}
                          className="cursor-pointer py-1.5 px-1 hover:bg-blue-50"
                        >
                          {option.kodeSuplier}
                        </li>
                      ))}
                    </ul>
                    {totalPages > 1 && (
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          marginTop: "8px",
                        }}
                      >
                        {Array.from(
                          { length: totalPages },
                          (_, index) => index + 1
                        ).map((pageNumber) => (
                          <li
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            style={{
                              display: "inline-block",
                              margin: "0 4px",
                              padding: "4px 8px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              cursor: "pointer",
                              backgroundColor:
                                pageNumber === currentPage ? "#ccc" : "#fff",
                            }}
                          >
                            {pageNumber}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>
              {/* <div>
                <label
                  htmlFor="suplier"
                  className="text-[14px] text-blue-gray-400"
                >
                  Data Suplier
                </label>
                <ReactSelect
                  id="suplier"
                  options={suplier.map((down) => {
                    return {
                      value: down.idSuplier,
                      label: down.namaSuplier,
                    };
                  })}
                  placeholder="Pilih Suplier"
                  styles={customStyles}
                  onChange={(selectedOption) => setsuplierId(selectedOption.value)}
                />
                <hr className="mt-1 bg-gray-400 h-[0.1em]" />
              </div> */}
              <div>
                <label
                  htmlFor="barang"
                  className="text-[14px] text-blue-gray-400"
                >
                  Data Barang
                </label>
                <ReactSelect
                  id="barang"
                  options={barang.map((down) => {
                    return {
                      value: down.idBarang,
                      label: down.barcodeBarang + " / " + down.namaBarang,
                    };
                  })}
                  placeholder="Pilih Barang"
                  styles={customStyles}
                  onChange={(selectedOption) =>
                    setbarangId(selectedOption.value)
                  }
                />
                <hr className="mt-1 bg-gray-400 h-[0.1em]" />
              </div>
              <Input
                label="Jumlah Stok Masuk"
                variant="static"
                color="blue"
                type="number"
                size="lg"
                placeholder="Masukkan Jumlah Stok Masuk"
                icon={<PlusIcon />}
                onChange={(e) => setstok(e.target.value)}
              />
              <Input
                label="Keterangan"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Keterangan"
                icon={<InformationCircleIcon />}
                onChange={(e) => setketerangan(e.target.value)}
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

export default AddStokMasuk;
