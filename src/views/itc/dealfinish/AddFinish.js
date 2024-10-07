import { Breadcrumbs, Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import { API_DEAL } from "../../../utils/BaseUrl";
import axios from "axios";

function AddFinish() {
  const param = useParams();
  const [baut, setbaut] = useState(0);
  const [bast, setbast] = useState(0);
  const [baso, setbaso] = useState(0);
  const [spk, setspk] = useState(0);
  const [fileSpk, setfileSpk] = useState(0);
  const [evDatang, setevDatang] = useState(0);
  const [evProses, setevProses] = useState(0);
  const [evFinish, setevFinish] = useState(0);

  const addKunjungan = async (e) => {
    e.persist();
    e.preventDefault();
    const formData = new FormData();
    // formData.append("pembayaran", pembayaran);
    // formData.append("deal", deal);
    // formData.append("id_salesman", salesmanId);
    // formData.append("waktuPengadaan", waktu);
    // formData.append("id_customer", customerId2);
    // formData.append("peluang", peluang);
    // formData.append("tujuan", tujuan);
    // formData.append("cp", cp);
    // formData.append("infoDpt", infoDpt);
    // formData.append("foto", foto);
    // formData.append("tanggal_deal", formatDateTime(tglDeal));
    // formData.append("lokasiLat", lokasiLat);
    // formData.append("tgl_kunjungan", formatDateTime(date));
    // formData.append("serviceTt", 0);
    // formData.append("action", action);
    // formData.append("visit", visit);
    // formData.append("lokasiLon", lokasiLon);
    // formData.append("nVisit", nVisit);

    axios
      .post(`${API_DEAL}`, formData, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
          "content-type": "multipart/form-data",
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Data Berhasil Ditambahkan!",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Tambah Data Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(err);
      });
  }

  return (
    <section className="lg:flex w-full font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase font-poppins">
            Add Finish
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/home" className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/dealfinish_marketting">
              <span>Deal Finish</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg px-5 py-8 my-5 rounded">
          <Input
            variant="static"
            color="blue"
            size="lg"
            label="Customer" readOnly
          /> <br />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Input
              variant="static"
              color="blue"
              size="lg"
              label="Foto BAST"
              type="file"
              accept="image/*"
              onChange={(e) => setbast(e.target.files[0])}
            />
            <Input
              variant="static"
              color="blue"
              size="lg"
              label="Foto BAUT"
              type="file"
              accept="image/*"
              onChange={(e) => setbaut(e.target.files[0])}
            />
            <Input
              variant="static"
              color="blue"
              size="lg"
              label="Foto BASO"
              type="file"
              accept="image/*"
              onChange={(e) => setbaso(e.target.files[0])}
            />
            <div>
              <Input
                variant="static"
                color="blue"
                size="lg"
                label="File SPK"
                type="file"
                accept=".doc, .docx"
                onChange={(e) => setfileSpk(e.target.files[0])}
              />
              <Typography variant="small" className="font-poppins font-medium">
                Upload File SPK .doc, .docx
              </Typography>
            </div>
            <Input
              variant="static"
              color="blue"
              size="lg"
              label="Foto SPK"
              type="file"
              accept="image/*"
              onChange={(e) => setspk(e.target.files[0])}
            />
            <Input
              variant="static"
              color="blue"
              size="lg"
              label="Foto Envident Datang"
              type="file"
              accept="image/*"
              onChange={(e) => setevDatang(e.target.files[0])}
            />
            <Input
              variant="static"
              color="blue"
              size="lg"
              label="Foto Envident Proses"
              type="file"
              accept="image/*"
              onChange={(e) => setevProses(e.target.files[0])}
            />
            <Input
              variant="static"
              color="blue"
              size="lg"
              label="Foto Envident Finish"
              type="file"
              accept="image/*"
              onChange={(e) => setevFinish(e.target.files[0])}
            />
          </div> <br />
          <Button
            variant="gradient"
            color="blue"
            type="button"
            //   onClick={addKunjungan}
            className="font-popins font-medium">
            Tambah
          </Button>
        </main>
      </div>
    </section>
  )
}

export default AddFinish;