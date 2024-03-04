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
import {
  AtSymbolIcon,
  MapPinIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { API_CUSTOMER, API_SALESMAN } from "../../../../utils/BaseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import ReactSelect from "react-select";

function AddCustomer() {
  const [alamat, setalamat] = useState("");
  const [email, setemail] = useState("");
  const [jenis, setjenis] = useState("");
  const [namaCustomer, setnamaCustomer] = useState("");
  const [noTelp, setnoTelp] = useState("");
  const [salesmanId, setsalesmanId] = useState(0);

  const [salesman, setsalesman] = useState([]);
  const history = useHistory();

  // GET ALL SALESMAN
  const allSalesman = async () => {
    try {
      const response = await axios.get(`${API_SALESMAN}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setsalesman(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allSalesman();
  }, []);

  // ADD CUSTOMER
  const addCustomer = async (e) => {
    e.preventDefault();

    const request = {
      alamat: alamat,
      email: email,
      id_salesman: salesmanId,
      jenis: jenis,
      nama_customer: namaCustomer,
      not_telp: noTelp,
    };

    try {
      await axios.post(`${API_CUSTOMER}/add`, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/data_customer");
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

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full lg:px-7 px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            tambah Customer
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
            <a href="/data_customer">
              <span>Customer</span>
            </a>
            <span className="cursor-default capitalize">tambah Customer</span>
          </Breadcrumbs>
        </div>
        <main className="container bg-white shadow-lg px-5 py-8 my-5 rounded">
          <form action="">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <label
                  htmlFor="salesman"
                  className="text-[14px] text-blue-gray-400"
                >
                  Nama Salesman
                </label>
                <ReactSelect
                  id="salesman"
                  options={salesman.map((down) => {
                    return {
                      value: down.idSalesman,
                      label: down.namaSalesman,
                    };
                  })}
                  placeholder="Pilih Salesman"
                  styles={customStyles}
                  onChange={(selectedOption) =>
                    setsalesmanId(selectedOption.value)
                  }
                />
                <hr className="mt-1 bg-gray-400 h-[0.1em]" />
              </div>
              <div className="lg:mt-5">
                <Input
                  label="Nama Customer"
                  variant="static"
                  color="blue"
                  size="lg"
                  icon={<UserCircleIcon />}
                  placeholder="Masukkan Nama Customer"
                />
              </div>
              <div>
                <label
                  htmlFor="jenis"
                  className="text-[14px] text-blue-gray-400"
                >
                  Jenis
                </label>
                <ReactSelect
                  id="jenis"
                  options={[
                    { value: "Sekolah", label: "Sekolah" },
                    { value: "Kantor Pemerintah", label: "Kantor Pemerintah" },
                    {
                      value: "Instansi / Perusahaan Swasta",
                      label: "Instansi / Perusahaan Swasta",
                    },
                    {
                      value: "Perusahaan Negara / BUMN",
                      label: "Perusahaan Negara / BUMN",
                    },
                    {
                      value: "Puskesmas / Rumah Sakit",
                      label: "Puskesmas / Rumah Sakit",
                    },
                    {
                      value: "Akademi / Universitas",
                      label: "Akademi / Universitas",
                    },
                    { value: "Hotel", label: "Hotel" },
                    { value: "Perbankan", label: "Perbankan" },
                    { value: "Perorangan", label: "Perorangan" },
                    { value: "Toko", label: "Toko" },
                    { value: "Yayasan", label: "Yayasan" },
                    { value: "Lainnnya", label: "Lainnnya" },
                  ]}
                  placeholder="Pilih Jenis"
                  styles={customStyles}
                  onChange={(selectedOption) =>
                    setsalesmanId(selectedOption.value)
                  }
                />
                <hr className="mt-1 bg-gray-400 h-[0.1em]" />
              </div>
              <div className="lg:mt-5">
                <Input
                  label="Alamat Customer"
                  variant="static"
                  color="blue"
                  size="lg"
                  placeholder="Masukkan Alamat Customer"
                  icon={<MapPinIcon />}
                />
              </div>
              <Input
                label="Email Customer"
                variant="static"
                color="blue"
                size="lg"
                type="email"
                placeholder="Masukkan Email Customer"
                icon={<AtSymbolIcon />}
              />
              <Input
                label="No Telephone"
                variant="static"
                color="blue"
                size="lg"
                type="number"
                placeholder="Masukkan No Telephone"
                icon={<PhoneIcon />}
              />
            </div>
            <div className="mt-10 flex gap-4">
              <Button variant="gradient" color="blue" type="submit">
                <span>Simpan</span>
              </Button>
              <a href="/data_salesman">
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

export default AddCustomer;
