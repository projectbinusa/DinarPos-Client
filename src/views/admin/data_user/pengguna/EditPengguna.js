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
import { KeyIcon, UserCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import { API_PENGGUNA, API_UBAH_PASSWORD } from "../../../../utils/BaseUrl";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Swal from "sweetalert2";

function EditPengguna() {
  const [username, setusername] = useState("");
  const [namapengguna, setnamapengguna] = useState("");
  const [level, setlevel] = useState("");
  const [password, setpassword] = useState("");
  const [roleToko, setroleToko] = useState("");

  const [newPass, setnewPass] = useState("");
  const [konfirmPass, setkonfirmPass] = useState("");

  const history = useHistory();
  const param = useParams();

  const editPengguna = async (e) => {
    e.preventDefault();

    const requestPengguna = {
      levelPengguna: level,
      passwordPengguna: password,
      usernamePengguna: username,
      namaPengguna: namapengguna,
      roleToko: roleToko
    };

    await axios
      .put(`${API_PENGGUNA}/` + param.id, requestPengguna, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Data Berhasil Diubah!",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/data_pengguna");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        if (error.ressponse && error.response.status === 401) {
          localStorage.clear();
          history.push("/");
        } else {
          console.log(error);
        }
      });
  };

  const editPassword = async (e) => {
    e.preventDefault();

    const request = {
      new_password: newPass,
      confirm_new_password: konfirmPass,
    };

    await axios
      .put(`${API_UBAH_PASSWORD}/admin/` + param.id, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Ubah Password Pengguna Berhasil!",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/data_pengguna");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        if (error.ressponse && error.response.status === 401) {
          localStorage.clear();
          history.push("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Ubah Password Gagal!",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(error);
        }
      });
  };

  useEffect(() => {
    axios
      .get(`${API_PENGGUNA}/` + param.id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const response = res.data.data;
        setnamapengguna(response.namaPengguna);
        setlevel(response.levelPengguna);
        setpassword(response.passwordPengguna);
        setusername(response.usernamePengguna);
        setroleToko(response.roleToko)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Edit Pengguna
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
            <a href="/data_pengguna">
              <span>Pengguna</span>
            </a>
            <span className="cursor-default">Edit Pengguna</span>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg px-5 py-8 my-5 rounded">
          <form onSubmit={editPengguna}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Input
                label="Username"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                icon={<UserIcon />}
              />
              <Input
                label="Nama Pengguna"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Nama Pengguna"
                value={namapengguna}
                onChange={(e) => setnamapengguna(e.target.value)}
                icon={<UserCircleIcon />}
              />
              <Select
                variant="static"
                label="Level Pengguna"
                color="blue"
                size="lg"
                onChange={(event) => setlevel(event)}
                value={level}
              >
                <Option value="Kasir">Kasir</Option>
                <Option value="Gudang">Gudang</Option>
                <Option value="Accounting">Accounting</Option>
                <Option value="Pimpinan">Pimpinan</Option>
                <Option value="Admin">Admin</Option>
                <Option value="AdminService">AdminService</Option>
              </Select>
              <Select
                variant="static"
                label="Role Toko"
                color="blue"
                size="lg"
                onChange={(selectedOption) => setroleToko(selectedOption)}
                value={roleToko}
              >
                <Option value="excelcom">Excelcom</Option>
                <Option value="dinarpos">Dinarpos</Option>
                <Option value="Pimpinan">Pimpinan</Option>
                <Option value="Admin">Admin</Option>
                <Option value="AdminService">AdminService</Option>
              </Select>
            </div>
            <br />
            <p className="text-sm lg:text-base text-red-500">* Level Pengguna <b>Kasir, Gudang,</b> dan <b>Accounting</b> menggunakan Role <b>Excelcom</b> atau <b>Dinarpos</b> </p>
            <p className="text-sm lg:text-base text-red-500">* Level Pengguna <b>Pimpinan, Admin,</b> dan <b>AdminService</b> menggunakan Role yang sama dengan level</p>
            <div className="mt-10 flex gap-4">
              <Button variant="gradient" color="blue" type="submit" className="font-poppins font-medium">
                <span>Simpan</span>
              </Button>
              <a href="/data_pengguna">
                <Button variant="text" color="gray" className="mr-1 font-poppins font-medium">
                  <span>Kembali</span>
                </Button>
              </a>
            </div>
          </form>
          <br /> <hr /> <br /> <br />
          <form onSubmit={editPassword}>
            <Typography variant="lead" className="uppercase font-medium">
              Ubah Password Pengguna
            </Typography> <br /> <br />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Input
                label="Password Baru"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Password Baru"
                value={newPass}
                onChange={(e) => setnewPass(e.target.value)}
                icon={<KeyIcon />}
              />
              <Input
                label="Konfirmasi Password Baru"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Konfirmasi Password Baru"
                value={konfirmPass}
                onChange={(e) => setkonfirmPass(e.target.value)}
                icon={<KeyIcon />}
              />
            </div>
            <div className="mt-10 flex gap-4">
              <Button variant="gradient" color="blue" type="submit" className="font-poppins font-medium">
                <span>Simpan</span>
              </Button>
              <a href="/data_pengguna">
                <Button variant="text" color="gray" className="mr-1 font-poppins font-medium">
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

export default EditPengguna;
