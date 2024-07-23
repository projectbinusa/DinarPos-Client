import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import { API_HUTANG, GET_TRANSAKSI_BELI } from "../../../../utils/BaseUrl";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Swal from "sweetalert2";

function PelunasanHutang() {
  const [noFaktur, setnoFaktur] = useState("");
  const [kekurangan, setkekurangan] = useState("");
  const [pelunasan, setpelunasan] = useState("");
  const param = useParams();
  const history = useHistory();

  const pelunasanHutang = async (e) => {
    e.preventDefault();

    const request = {
      pelunasan: pelunasan,
      id_transaksi: param.id,
    };

    try {
      await axios.post(`${API_HUTANG}/pelunasan`, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      Swal.fire({
        icon: "success",
        title: "Pelunasan Hutang Berhasil!",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/data_hutang");
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
          title: "Pelunasan Hutang Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    }
  };

  useEffect(() => {
    axios
      .get(`${GET_TRANSAKSI_BELI}/` + param.id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const response = res.data.data;
        setnoFaktur(response.noFaktur);
        setkekurangan(response.kekurangan);
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
            Pelunasan Hutang{" "}
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
            <a href="/data_hutang">
              <span>Hutang</span>
            </a>
            <span className="cursor-default capitalize">Pelunasan</span>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg px-5 py-8 my-5 rounded">
          <Typography variant="lead" className="uppercase">
            No Faktur {noFaktur}
          </Typography>
          <br />
          <form onSubmit={pelunasanHutang}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Input
                label="Kekurangan"
                variant="static"
                color="blue"
                size="lg"
                type="number"
                value={kekurangan}
                readOnly
              />
              <Input
                label="Pelunasan"
                variant="static"
                color="blue"
                size="lg"
                type="number"
                placeholder="Masukkan Pelunasan Hutang"
                onChange={(e) => setpelunasan(e.target.value)}
              />
            </div>
            <div className="mt-10 flex gap-4">
              <Button variant="gradient" color="blue" type="submit">
                <span>Simpan</span>
              </Button>
              <a href="/data_hutang">
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

export default PelunasanHutang;
