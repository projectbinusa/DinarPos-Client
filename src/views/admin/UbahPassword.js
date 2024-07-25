import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../component/SidebarAdmin";
import {
  Typography,
  Breadcrumbs,
  Button,
  Input,
} from "@material-tailwind/react";
import { API_PENGGUNA, API_UBAH_PASSWORD } from "../../utils/BaseUrl";
import Swal from "sweetalert2";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Decrypt from "../../component/Decrypt";

function UbahPassword() {
  const [oldPass, setoldPass] = useState("");
  const [newPass, setnewPass] = useState("");
  const [konfirmNewPass, setkonfirmNewPass] = useState("");

  const id = localStorage.getItem("id");

  const history = useHistory();

  const ubahPassword = async (e) => {
    e.preventDefault();

    const request = {
      old_password: oldPass,
      new_password: newPass,
      confirm_new_password: konfirmNewPass,
    };

    await axios
      .put(`${API_UBAH_PASSWORD}/` + id, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Data Berhasil Diubah!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        if (error.ressponse && error.response.data.status === 401) {
          localStorage.clear();
          history.push("/");
        } else if (error.response.data.data === "Password lama tidak sesuai") {
          Swal.fire({
            icon: "error",
            title: "Password Lama Tidak Sesuai!",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else if (error.response.data.data === "Password tidak sesuai") {
          Swal.fire({
            icon: "error",
            title: "Password Tidak Sesuai!",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else if (error.response.data.data === "Password not valid!") {
          Swal.fire({
            icon: "error",
            title: "Password Tidak Sesuai!",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          console.log(error);
        }
      });
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
  } else if (level === "Teknisi") {
    dashboard = "dashboard_teknisi"
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
            ubah password
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
            <a href="/ubah_password">
              <span>Ubah Password</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg px-5 py-8 my-5 rounded">
          <form onSubmit={ubahPassword}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Input
                required
                label="Password Lama"
                variant="static"
                color="blue"
                size="lg"
                onChange={(e) => setoldPass(e.target.value)}
                placeholder="Masukkan Password Lama"
              />
              <Input
                required
                label="Password Baru"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Password Baru"
                onChange={(e) => setnewPass(e.target.value)}
              />
              <Input
                required
                label="Konfirmasi Password Baru"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Konfirmasi Password Baru"
                onChange={(e) => setkonfirmNewPass(e.target.value)}
              />
            </div>
            <div className="mt-10 flex gap-4">
              <Button variant="gradient" color="blue" type="submit">
                <span>Simpan</span>
              </Button>
            </div>
          </form>
        </main>
      </div>
    </section>
  );
}

export default UbahPassword;
