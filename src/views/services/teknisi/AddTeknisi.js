import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import {
  KeyIcon,
  MapPinIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { API_PENGGUNA, API_TEKNISI } from "../../../utils/BaseUrl";
import Swal from "sweetalert2";
import Decrypt from "../../../component/Decrypt";

function AddTeknisi() {
  const [nama, setnama] = useState("");
  const [alamat, setalamat] = useState("");
  const [nohp, setnohp] = useState("");
  const [bagian, setbagian] = useState("");
  const [password, setpassword] = useState("");

  const history = useHistory();

  const addTeknisi = async (e) => {
    e.preventDefault();

    const request = {
      nama: nama,
      alamat: alamat,
      bagian: bagian,
      nohp: nohp,
      password: password,
    };

    try {
      await axios.post(`${API_TEKNISI}/add`, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/data_teknisi");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
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
          title: "Tambah Data Gagal!",
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

  if (level === "Pimpinan") {
    dashboard = "dashboard_pimpinan";
  } else if (level === "AdminService") {
    dashboard = "dashboard_service"
  } else {
    dashboard = "dashboard"
  }

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            tambah teknisi
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
            <a href="/data_teknisi">
              <span>Teknisi</span>
            </a>
            <span className="cursor-default capitalize">tambah Teknisi</span>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg px-5 py-8 my-5 rounded">
          <form onSubmit={addTeknisi}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Input
                label="Nama Teknisi"
                variant="static"
                color="blue"
                size="lg"
                icon={<UserCircleIcon />}
                onChange={(e) => setnama(e.target.value)}
                placeholder="Masukkan Nama Teknisi"
              />
              <Input
                label="Alamat"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Alamat"
                onChange={(e) => setalamat(e.target.value)}
                icon={<MapPinIcon />}
              />
              <Input
                label="No HP"
                variant="static"
                color="blue"
                size="lg"
                type="number"
                placeholder="Masukkan No HP"
                onChange={(e) => setnohp(e.target.value)}
                icon={<PhoneIcon />}
              />
              <Select
                variant="static"
                label="Bagian"
                color="blue"
                className="w-full"
                onChange={(selected) => setbagian(selected)}
              >
                <Option value="Elektro">Elektro</Option>
                <Option value="PC">PC</Option>
              </Select>
              <div>
                <Input
                  label="Password"
                  variant="static"
                  color="blue"
                  size="lg"
                  placeholder="Masukkan Password"
                  onChange={(e) => setpassword(e.target.value)}
                  icon={<KeyIcon />}
                />
                <Typography variant="small" className="text-red-400">
                  * Password minimal 8 karakter dengan kombinasi angka, huruf
                  besar dan kecil
                </Typography>
              </div>
            </div>
            <div className="mt-10 flex gap-4">
              <Button variant="gradient" color="blue" type="submit" className="font-popins font-medium">
                <span>Simpan</span>
              </Button>
              <a href="/data_teknisi">
                <Button variant="text" color="gray" className="mr-1 font-popins font-medium">
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

export default AddTeknisi;
