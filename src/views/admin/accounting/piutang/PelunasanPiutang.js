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
import { API_PIUTANG } from "../../../../utils/BaseUrl";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

function PelunasanPiutang() {
  const [noFaktur, setnoFaktur] = useState("");
  const [kekurangan, setkekurangan] = useState("");
  const [pelunasan, setpelunasan] = useState("");
  const [cashKredit, setcashKredit] = useState("");
  const param = useParams();

  useEffect(() => {
    axios
      .get(`${API_PIUTANG}/` + param.id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const response = res.data.data;
        setnoFaktur(response.transaksi.noFaktur);
        setkekurangan(response.transaksi.kekurangan);
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
            Pelunasan Piutang{" "}
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
            <a href="/data_piutang">
              <span>Piutang</span>
            </a>
            <span className="cursor-default capitalize">Pelunasan</span>
          </Breadcrumbs>
        </div>
        <main className="container bg-white shadow-lg px-5 py-8 my-5 rounded">
          <Typography variant="lead" className="uppercase">
            No Faktur {noFaktur}
          </Typography>
          <br />
          <form>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Input
                label="Kekurangan"
                variant="static"
                color="blue"
                size="lg"
                readOnly
                type="number"
                value={kekurangan}
              />
              <Input
                label="Pelunasan"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Pelunasan Piutang"
              />
              <Select
                variant="static"
                label="Cash / Kredit"
                color="blue"
                className="w-full"
              >
                <Option value="Cash">Cash</Option>
                <Option value="Kredit">Kredit</Option>
              </Select>
            </div>
            <div className="mt-10 flex gap-4">
              <Button variant="gradient" color="blue" type="submit">
                <span>Simpan</span>
              </Button>
              <a href="/data_piutang">
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

export default PelunasanPiutang;
