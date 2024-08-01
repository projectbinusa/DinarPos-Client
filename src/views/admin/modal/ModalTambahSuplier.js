import {
  CodeBracketIcon,
  InformationCircleIcon,
  MapPinIcon,
  PhoneIcon,
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
import { API_SUPLIER } from "../../../utils/BaseUrl";

function ModalTambahSuplier({ handleOpen }) {
  // SUPLIER
  const [kodeSuplier, setkodeSuplier] = useState("");
  const [namaSuplier, setnamaSuplier] = useState("");
  const [noTlpSuplier, setnoTlpSuplier] = useState("");
  const [alamatSuplier, setalamatSuplier] = useState("");
  const [keteranganSuplier, setketeranganSuplier] = useState("");

  const history = useHistory();

  // ADD SUPLIER
  const addSuplier = async (e) => {
    e.preventDefault();

    const request = {
      kodeSuplier: kodeSuplier,
      namaSuplier: namaSuplier,
      noTelpSuplier: noTlpSuplier,
      alamatSuplier: alamatSuplier,
      keterangan: keteranganSuplier,
    };

    try {
      await axios.post(`${API_SUPLIER}/add`, request, {
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
          title: "Kode Suplier Sudah Ada!",
          text: "Kode Suplier Tidak Boleh Sama!",
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
    <div>
      <DialogHeader>Tambah Suplier</DialogHeader>
      <form onSubmit={addSuplier}>
        <DialogBody className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Input
            label="Kode Suplier"
            variant="static"
            color="blue"
            size="lg"
            placeholder="Masukkan Kode Suplier"
            onChange={(e) => setkodeSuplier(e.target.value)}
            icon={<CodeBracketIcon />}
          />
          <Input
            label="Nama Suplier"
            variant="static"
            color="blue"
            size="lg"
            placeholder="Masukkan Nama Suplier"
            onChange={(e) => setnamaSuplier(e.target.value)}
            icon={<UserCircleIcon />}
          />
          <Input
            label="No Telephone"
            variant="static"
            color="blue"
            size="lg"
            type="number"
            placeholder="Masukkan No Telephone"
            onChange={(e) => setnoTlpSuplier(e.target.value)}
            icon={<PhoneIcon />}
          />
          <Input
            label="Alamat"
            variant="static"
            color="blue"
            size="lg"
            placeholder="Masukkan Alamat Suplier"
            onChange={(e) => setalamatSuplier(e.target.value)}
            icon={<MapPinIcon />}
          />
          <Input
            label="Keterangan"
            variant="static"
            color="blue"
            size="lg"
            placeholder="Masukkan Keterangan"
            onChange={(e) => setketeranganSuplier(e.target.value)}
            icon={<InformationCircleIcon />}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="gray"
            onClick={handleOpen}
            className="mr-1 font-poppins font-medium"
          >
            <span>Kembali</span>
          </Button>
          <Button
            variant="gradient"
            color="blue"
            onClick={handleOpen}
            type="submit"
            className="font-poppins font-medium"
          >
            <span>Simpan</span>
          </Button>
        </DialogFooter>
      </form>
    </div>
  );
}

export default ModalTambahSuplier;
