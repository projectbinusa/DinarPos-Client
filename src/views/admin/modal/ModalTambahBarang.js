import {
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import { API_BARANG } from "../../../utils/BaseUrl";

function ModalTambahBarang({ handleOpen2 }) {
  // BARANG
  const [barcodeBarang, setbarcodeBarang] = useState("");
  const [namaBarang, setnamaBarang] = useState("");
  const [unitBarang, setunitBarang] = useState("");
  const [hargaBeliBarang, sethargaBeliBarang] = useState("");
  const [hargaJualBarang, sethargaJualBarang] = useState("");

  const history = useHistory();

  // ADD BARANG BARU
  const addBarang = async (e) => {
    e.preventDefault();

    const request = {
      barcodeBarang: barcodeBarang,
      namaBarang: namaBarang,
      hargaBeli: hargaBeliBarang,
      hargaBarang: hargaJualBarang,
      unit: unitBarang,
    };

    Swal.fire({
      title: "Tambah Barang Baru?",
      text: "Perubahan yang Anda buat mungkin tidak disimpan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.post(`${API_BARANG}/add`, request, {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          });
          Swal.fire({
            icon: "success",
            title: "Data Berhasil DiTambahkan",
            showConfirmButton: false,
            timer: 1500,
          });
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
      }
    });
  };

  return (
    <div>
      <DialogHeader>Tambah Barang Baru</DialogHeader>
      <form onSubmit={addBarang}>
        <DialogBody className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Input
            label="Barcode Barang"
            variant="static"
            color="blue"
            size="lg"
            icon={<ClipboardDocumentListIcon />}
            onChange={(e) => setbarcodeBarang(e.target.value)}
            placeholder="Masukkan Barcode Barang"
          />
          <Input
            label="Nama Barang"
            variant="static"
            color="blue"
            size="lg"
            placeholder="Masukkan Nama Barang"
            onChange={(e) => setnamaBarang(e.target.value)}
            icon={<UserCircleIcon />}
          />
          <Input
            label="Unit Barang"
            variant="static"
            color="blue"
            size="lg"
            placeholder="Masukkan Unit Barang"
            onChange={(e) => setunitBarang(e.target.value)}
            icon={<UserCircleIcon />}
          />
          <Input
            label="Harga Beli"
            variant="static"
            color="blue"
            size="lg"
            type="number"
            placeholder="Masukkan Harga Beli"
            onChange={(e) => sethargaBeliBarang(e.target.value)}
            icon={<CurrencyDollarIcon />}
          />
          <Input
            label="Harga Jual"
            variant="static"
            color="blue"
            size="lg"
            type="number"
            placeholder="Masukkan Harga Jual"
            onChange={(e) => sethargaJualBarang(e.target.value)}
            icon={<CurrencyDollarIcon />}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="gray"
            onClick={handleOpen2}
            className="mr-1"
          >
            <span>Kembali</span>
          </Button>
          <Button
            variant="gradient"
            color="blue"
            onClick={handleOpen2}
            type="submit"
          >
            <span>Simpan</span>
          </Button>
        </DialogFooter>
      </form>
    </div>
  );
}

export default ModalTambahBarang;
