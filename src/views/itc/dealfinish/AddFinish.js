import { Breadcrumbs, Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import { API_DEAL } from "../../../utils/BaseUrl";
import axios from "axios";

function AddFinish() {
  const param = useParams();
  const [baut, setBaut] = useState(null);
  const [bast, setBast] = useState(null);
  const [baso, setBaso] = useState(null);
  const [spk, setSpk] = useState(null);
  const [fileSpk, setFileSpk] = useState(null);
  const [evDatang, setEvDatang] = useState(null);
  const [evProses, setEvProses] = useState(null);
  const [evFinish, setEvFinish] = useState(null);
  const [customer, setCustomer] = useState("");
  const [kunjunganId, setKunjunganId] = useState("");

  const addKunjungan = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("baut", baut);
    formData.append("bast", bast);
    formData.append("baso", baso);
    formData.append("spk", spk);
    formData.append("file_spk", fileSpk);
    formData.append("ev_dtg", evDatang);
    formData.append("ev_pro", evProses);
    formData.append("ev_fin", evFinish);
    formData.append("customer", customer);
    formData.append("id_kunjungan", kunjunganId);

    try {
      const response = await axios.post(`${API_DEAL}/add/deal_finish`, formData, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status === "200 OK") {
        Swal.fire({
          icon: "success",
          title: "Data Berhasil Ditambahkan!",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Tambah Data Gagal!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(err);
    }
  };

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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
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
            label="Kunjungan"
            value={kunjunganId}
            onChange={(e) => setKunjunganId(e.target.value)}
          />
          <br />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Input
              variant="static"
              color="blue"
              size="lg"
              label="Foto BAST"
              type="file"
              accept="image/*"
              onChange={(e) => setBast(e.target.files[0])}
            />
            <Input
              variant="static"
              color="blue"
              size="lg"
              label="Foto BAUT"
              type="file"
              accept="image/*"
              onChange={(e) => setBaut(e.target.files[0])}
            />
            <Input
              variant="static"
              color="blue"
              size="lg"
              label="Foto BASO"
              type="file"
              accept="image/*"
              onChange={(e) => setBaso(e.target.files[0])}
            />
            <div>
              <Input
                variant="static"
                color="blue"
                size="lg"
                label="File SPK"
                type="file"
                accept="image/*"
                onChange={(e) => setFileSpk(e.target.files[0])}
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
              onChange={(e) => setSpk(e.target.files[0])}
            />
            <Input
              variant="static"
              color="blue"
              size="lg"
              label="Foto Envident Datang"
              type="file"
              accept="image/*"
              onChange={(e) => setEvDatang(e.target.files[0])}
            />
            <Input
              variant="static"
              color="blue"
              size="lg"
              label="Foto Envident Proses"
              type="file"
              accept="image/*"
              onChange={(e) => setEvProses(e.target.files[0])}
            />
            <Input
              variant="static"
              color="blue"
              size="lg"
              label="Foto Envident Finish"
              type="file"
              accept="image/*"
              onChange={(e) => setEvFinish(e.target.files[0])}
            />
          </div>
          <br />
          <Button
            variant="gradient"
            color="blue"
            type="button"
            onClick={addKunjungan}
            className="font-popins font-medium"
          >
            Tambah
          </Button>
        </main>
      </div>
    </section>
  );
}

export default AddFinish;
