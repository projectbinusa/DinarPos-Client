import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  AtSymbolIcon,
  MapPinIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { API_CUSTOMER } from "../../../../utils/BaseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import ReactSelect from "react-select";

function EditCustomer() {
  const [alamat, setalamat] = useState("");
  const [email, setemail] = useState("");
  const [jenis, setjenis] = useState("");
  const [namaCustomer, setnamaCustomer] = useState("");
  const [noTelp, setnoTelp] = useState("");

  const history = useHistory();
  const param = useParams();

  useEffect(() => {
    axios
      .get(`${API_CUSTOMER}/` + param.id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const response = res.data.data;
        setalamat(response.alamat);
        setemail(response.email);
        setnamaCustomer(response.nama_customer);
        setjenis(response.jenis);
        setnoTelp(response.telp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // EDIT DATA CUSTOMER
  const editDataCustomer = async (e) => {
    e.preventDefault();

    const request = {
      alamat: alamat,
      email: email,
      jenis: jenis,
      nama_customer: namaCustomer,
      not_telp: noTelp,
    };

    try {
      await axios.put(`${API_CUSTOMER}/` + param.id, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      Swal.fire({
        icon: "success",
        title: "Data Berhasil Diubah!",
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
        if (error.ressponse && error.response.status === 401) {
          localStorage.clear();
          history.push("/");
        } else {
          console.log(error);
        }
      }
    }
  };

  // EDIT NO TELP CUSTOMER
  const editNoTelpCustomer = async (e) => {
    e.preventDefault();
    const request = {
      alamat: alamat,
      email: email,
      jenis: jenis,
      nama_customer: namaCustomer,
      not_telp: noTelp,
    };
    try {
      await axios.put(`${API_CUSTOMER}/` + param.id, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      Swal.fire({
        icon: "success",
        title: "Data Berhasil Diubah!",
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
        if (error.ressponse && error.response.status === 401) {
          localStorage.clear();
          history.push("/");
        } else {
          console.log(error);
        }
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
            edit Customer
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
            <span className="cursor-default capitalize">edit Customer</span>
          </Breadcrumbs>
        </div>
        <main className="container bg-white shadow-lg px-5 py-8 my-5 rounded">
          <div>
            <Typography variant="paragraph" className="uppercase">
              DATA CUSTOMER
            </Typography>
            <form onSubmit={editDataCustomer}>
              <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="lg:mt-5">
                  <Input
                    label="Nama Customer"
                    variant="static"
                    color="blue"
                    size="lg"
                    icon={<UserCircleIcon />}
                    placeholder="Masukkan Nama Customer"
                    defaultValue={namaCustomer}
                    onChange={(e) => setnamaCustomer(e.target.value)}
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
                    value={{
                      value: jenis,
                      label: jenis,
                    }}
                    options={[
                      { value: "Sekolah", label: "Sekolah" },
                      {
                        value: "Kantor Pemerintah",
                        label: "Kantor Pemerintah",
                      },
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
                      setjenis(selectedOption.value)
                    }
                  />
                  <hr className="mt-1 bg-gray-400 h-[0.1em]" />
                </div>
                <Input
                  label="Alamat Customer"
                  variant="static"
                  color="blue"
                  size="lg"
                  placeholder="Masukkan Alamat Customer"
                  icon={<MapPinIcon />}
                  defaultValue={alamat}
                  onChange={(e) => setalamat(e.target.value)}
                />
                <Input
                  label="Email Customer"
                  variant="static"
                  color="blue"
                  size="lg"
                  type="email"
                  placeholder="Masukkan Email Customer"
                  defaultValue={email}
                  onChange={(e) => setemail(e.target.value)}
                  icon={<AtSymbolIcon />}
                />
              </div>
              <Button
                variant="gradient"
                color="blue"
                type="submit"
                className="mt-5"
              >
                <span>Simpan</span>
              </Button>
            </form>
          </div>
          <br />
          <hr />
          <br />
          <div>
            <Typography variant="paragraph" className="uppercase">
              no telp customer
            </Typography>
            <form onSubmit={editNoTelpCustomer} className="mt-8">
              <div className=" grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Input
                  label="No Telephone"
                  variant="static"
                  color="blue"
                  size="lg"
                  type="number"
                  placeholder="Masukkan No Telephone"
                  defaultValue={noTelp}
                  onChange={(e) => setnoTelp(e.target.value)}
                  icon={<PhoneIcon />}
                />
              </div>
              <div className="mt-10 flex gap-4">
                <Button variant="gradient" color="blue" type="submit">
                  <span>Simpan</span>
                </Button>
                <a href="/data_customer">
                  <Button variant="text" color="gray" className="mr-1">
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

export default EditCustomer;
