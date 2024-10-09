import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
// import { UserCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DEAL_ADD_DEAL_PO } from "../../../utils/BaseUrl";

function AddDealPo() {
  const param = useParams();
  const [fotoPO, setFotoPO] = useState(null);
  const [filePO, setFilePO] = useState(null);
  const [ket, setKet] = useState("");
  const [administrasi, setAdministrasi] = useState("");
  const history = useHistory();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File Terlalu Besar",
          text: "Ukuran file maksimum adalah 2MB.",
        });
        setFilePO(null);
      } else if (
        [
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/msword",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ].includes(selectedFile.type)
      ) {
        setFilePO(selectedFile);
      } else {
        Swal.fire({
          icon: "warning",
          title:
            "File harus berupa format yang diizinkan (doc, docx, xls, xlsx)!",
        });
        setFilePO(null);
      }
    }
  };

  const handleFotoChange = (e) => {
    const selectedFoto = e.target.files[0];
    if (selectedFoto && selectedFoto.type.startsWith("image/")) {
      setFotoPO(selectedFoto);
    } else {
      Swal.fire({
        icon: "warning",
        title: "File harus berupa gambar!",
      });
      setFotoPO(null);
    }
  };

  const AddDealPo = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("foto", fotoPO);
    formData.append("file", filePO);
    formData.append("ket", ket);
    formData.append("administrasi", administrasi);
    formData.append("id_report", param.id);

    try {
      const response = await axios.post(`${API_DEAL_ADD_DEAL_PO}`, formData, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Data Berhasil Ditambahkan",
      });

      history.push("/dealpo");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        history.push("/");
      } else if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Data Sudah Ada!",
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

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Tambah Deal Po
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/dashboard" className="opacity-60"></a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg px-5 py-8 my-5 rounded">
          <form onSubmit={AddDealPo}>
            <div className="space-y-8">
              {/* <Input
                label="Customer"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Customer"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                icon={<UserCircleIcon />}
              /> */}
              <div className="flex flex-col">
                <label className="mb-2">Administrasi</label>
                <Input
                  variant="static"
                  color="blue"
                  size="lg"
                  placeholder="Administrasi"
                  value={administrasi}
                  onChange={(e) => setAdministrasi(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Foto PO</label>
                <input
                  type="file"
                  className="mb-2"
                  accept="image/*"
                  onChange={handleFotoChange}
                />
                <span>Upload Foto PO</span>
              </div>
              <div className="flex flex-col">
                <label className="mb-2">File PO</label>
                <input
                  type="file"
                  className="mb-2"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                  onChange={handleFileChange}
                />
                <span>
                  Upload File PO (PDF, doc, docx, xls, xlsx, txt) *max 2 MB
                </span>
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Keterangan</label>
                <Input
                  variant="static"
                  color="blue"
                  size="lg"
                  placeholder="Keterangan"
                  value={ket}
                  onChange={(e) => setKet(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-10 flex gap-4">
              <Button
                variant="gradient"
                color="blue"
                type="submit"
                className="font-poppins font-medium"
              >
                <span>Simpan</span>
              </Button>
              <a href="/dealpo">
                <Button
                  variant="text"
                  color="gray"
                  className="mr-1 font-poppins font-medium"
                >
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

export default AddDealPo;
