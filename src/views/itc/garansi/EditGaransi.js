import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { API_GARANSI } from "../../../utils/BaseUrl";
import Swal from "sweetalert2";

function EditGaransi() {
  const [namaBrg, setnamaBrg] = useState("");
  const [merek, setmerek] = useState("");
  const [masukKe, setmasukKe] = useState("");
  const [kerusakan, setkerusakan] = useState("");
  const [idTT, setidTT] = useState(0);
  const [tglMasuk, settglMasuk] = useState("");

  const param = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${API_GARANSI}/` + param.id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const response = res.data.data;
        setnamaBrg(response.namaBrg);
        setmerek(response.merek);
        setmasukKe(response.masukKe);
        setkerusakan(response.kerusakan);
        setidTT(response.serviceBarang.idTT);
        settglMasuk(response.tanggalMasuk);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // UPDATE GARANSI
  const editGaransi = async (e) => {
    e.preventDefault();

    const request = {
      id_tt: idTT,
      kerusakan: kerusakan,
      masukKe: masukKe,
      merek: merek,
      namaBrg: namaBrg,
      tanggalMasuk: tglMasuk,
    };

    await axios
      .put(`${API_GARANSI}/update/` + param.id, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Data Berhasil Diubah!",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/garansi");
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

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            edit garansi
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
            <span className="cursor-default capitalize">edit Garansi</span>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg px-5 py-8 my-5 rounded">
          <form onSubmit={editGaransi}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Input
                label="Nama Barang"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Nama Barang"
                defaultValue={namaBrg}
                onChange={(e) => setnamaBrg(e.target.value)}
              />
              <Input
                label="Merek"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Merek"
                defaultValue={merek}
                onChange={(e) => setmerek(e.target.value)}
              />
              <Input
                label="TGL Masuk"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan TGL Masuk"
                type="date"
                defaultValue={tglMasuk}
                onChange={(e) => settglMasuk(e.target.value)}
              />
              <Input
                label="Masuk ke"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Masuk ke"
                defaultValue={masukKe}
                onChange={(e) => setmasukKe(e.target.value)}
              />
              <Input
                label="ID TT"
                variant="static"
                color="blue"
                size="lg"
                type="number"
                placeholder="Masukkan ID TT"
                defaultValue={idTT}
                onChange={(e) => setidTT(e.target.value)}
              />
              <div>
                <Textarea
                  label="Kerusakan"
                  size="lg"
                  placeholder="Masukkan Kerusakan"
                  variant="static"
                  color="blue"
                  defaultValue={kerusakan}
                  onChange={(e) => setkerusakan(e.target.value)}
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

export default EditGaransi;
