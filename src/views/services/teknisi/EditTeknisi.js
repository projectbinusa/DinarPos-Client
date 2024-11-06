import {
  MapPinIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Breadcrumbs,
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { API_PENGGUNA, API_TEKNISI } from "../../../utils/BaseUrl";
import Swal from "sweetalert2";
import Decrypt from "../../../component/Decrypt";

function EditTeknisi() {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nohp, setNohp] = useState("");
  const [bagian, setBagian] = useState("");

  const history = useHistory();
  const param = useParams();

  useEffect(() => {
    axios
      .get(`${API_TEKNISI}/${param.id}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const response = res.data.data;
        setNama(response.nama);
        setAlamat(response.alamat);
        setNohp(response.nohp);
        setBagian(response.bagian);
      })
      .catch((error) => {
        console.error("Error fetching teknisi data:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Terjadi kesalahan saat mengambil data teknisi.",
          showConfirmButton: true,
        });
      });
  }, [param.id]);

  const editTeknisi = async (e) => {
    e.preventDefault();

    const request = {
      nama,
      alamat,
      nohp,
      bagian,
    };

    try {
      const response = await axios.put(`${API_TEKNISI}/${param.id}`, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });

      Swal.fire({
        icon: "success",
        title: "Data Berhasil Diubah!",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        history.push("/data_teknisi");
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error during update:", error);

      if (error.response) {
        console.error("Server error:", error.response.data);

        if (error.response.status === 404) {
          Swal.fire({
            icon: "error",
            title: "Not Found!",
            text: "Teknisi tidak ditemukan atau URL tidak valid.",
            showConfirmButton: true,
          });
        } else if (error.response.status === 500) {
          Swal.fire({
            icon: "error",
            title: "Server Error!",
            text: "Terjadi kesalahan pada server. Silakan coba lagi nanti.",
            showConfirmButton: true,
          });
        } else if (error.response.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Unauthorized!",
            text: "Anda tidak memiliki izin untuk melakukan aksi ini.",
            showConfirmButton: true,
          });
          localStorage.clear();
          history.push("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Terjadi kesalahan saat mengubah data.",
            showConfirmButton: true,
          });
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Tidak ada respons dari server.",
          showConfirmButton: true,
        });
      } else {
        console.error("Request setup error:", error.message);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Terjadi kesalahan saat menyiapkan permintaan.",
          showConfirmButton: true,
        });
      }
    }
  }; // Pastikan untuk menutup fungsi editTeknisi

  const [level, setLevel] = useState("");

  const idPengguna = Decrypt();
  useEffect(() => {
    axios
      .get(`${API_PENGGUNA}/` + idPengguna, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const response = res.data.data;
        setLevel(response.levelPengguna);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idPengguna]);

  let dashboard = "";

  if (level === "Pimpinan") {
    dashboard = "dashboard_pimpinan";
  } else if (level === "AdminService") {
    dashboard = "dashboard_service";
  } else {
    dashboard = "dashboard";
  }

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase font-poppins">
            edit teknisi
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
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg px-5 py-8 my-5 rounded">
          <form onSubmit={editTeknisi}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Input
                label="Nama Teknisi"
                variant="static"
                color="blue"
                size="lg"
                icon={<UserCircleIcon />}
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Masukkan Nama Teknisi"
              />
              <Input
                label="Alamat"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Alamat"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                icon={<MapPinIcon />}
              />
              <Input
                label="No HP"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan No HP"
                value={nohp}
                onChange={(e) => setNohp(e.target.value)}
                icon={<PhoneIcon />}
              />
              <Select
                variant="static"
                label="Bagian"
                color="blue"
                className="w-full"
                value={bagian}
                onChange={(e) => setBagian(e)}
              >
                <Option value="Elektro">Elektro</Option>
                <Option value="PC">PC</Option>
              </Select>
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

export default EditTeknisi;
