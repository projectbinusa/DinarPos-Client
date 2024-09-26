import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Correct hook import
import {
  Button,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import {
  AcademicCapIcon,
  AtSymbolIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import axios from "axios";
import { API_DEAL } from "../../../utils/BaseUrl";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Model() {
  const [tanggal, setTanggal] = useState("");
  const [nama, setNama] = useState("");
  const [instansi, setInstansi] = useState("");
  const [jenis, setJenis] = useState("");
  const [daerah, setDaerah] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [cp, setCP] = useState("");
  const [infodidapat, setInfoDidapat] = useState("");
  const [visit, setVisit] = useState("");
  const [tipe, setTipe] = useState("");
  const [peluang, setPeluang] = useState("");
  const [deal, setDeal] = useState("");
  const [action, setAction] = useState("");

  const history = useHistory();
  const { id } = useParams();
  // EDIT DEAL PO
  const editDealPo = async (e) => {
    e.preventDefault();

    const request = {
      tanggal: tanggal,
      nama: nama,
      jenis: jenis,
      daerah: daerah,
      instansi: instansi,
      cp: cp,
      infodidapat: infodidapat,
      visit: visit,
      tipe: tipe,
      peluang: peluang,
      deal: deal,
      action: action,
    };

    try {
      const response = await axios.put(`${API_DEAL}/${id}`, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      Swal.fire({
        icon: "success",
        title: "Data Berhasil Diubah!",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/dealpo");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        history.push("/");
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <DialogHeader>Edit Deal Po</DialogHeader>
      <form onSubmit={editDealPo}>
        <DialogBody className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Input
            color="blue"
            variant="static"
            label="Tanggal"
            placeholder="Masukkan tanggal"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            icon={<UserCircleIcon />}
          />
          <Input
            color="blue"
            variant="static"
            label="Nama"
            placeholder="Masukkan Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            icon={<AcademicCapIcon />}
          />
          <Input
            color="blue"
            variant="static"
            label="Instansi"
            type="Instansi"
            placeholder="Masukkan Instansi"
            value={instansi}
            onChange={(e) => setInstansi(e.target.value)}
            icon={<AtSymbolIcon />}
          />
          <Input
            color="blue"
            variant="static"
            label="Jenis"
            type="number"
            placeholder="Masukkan Jenis"
            value={jenis}
            onChange={(e) => setJenis(e.target.value)}
            icon={<PhoneIcon />}
          />
          <Input
            color="blue"
            variant="static"
            label="Daerah"
            type="number"
            placeholder="Masukkan Daerah"
            value={daerah}
            onChange={(e) => setDaerah(e.target.value)}
            icon={<PhoneIcon />}
          />
          <Input
            color="blue"
            variant="static"
            label="Tujuan"
            type="number"
            placeholder="Masukkan Tujuan"
            value={tujuan}
            onChange={(e) => setTujuan(e.target.value)}
            icon={<PhoneIcon />}
          />
          <Input
            color="blue"
            variant="static"
            label=" Info Didapat"
            type="number"
            placeholder="Masukkan  Info Didapat"
            value={infodidapat}
            onChange={(e) => setInfoDidapat(e.target.value)}
            icon={<PhoneIcon />}
          />
          <Input
            color="blue"
            variant="static"
            label="CP"
            type="number"
            placeholder="Masukkan CP "
            value={cp}
            onChange={(e) => setCP(e.target.value)}
            icon={<PhoneIcon />}
          />
          <Input
            color="blue"
            variant="static"
            label=" visit"
            type="number"
            placeholder="Masukkan  visit"
            value={visit}
            onChange={(e) => setVisit(e.target.value)}
            icon={<PhoneIcon />}
          />
          <Input
            color="blue"
            variant="static"
            label=" tipe "
            type="number"
            placeholder="Masukkan tipe "
            value={tipe}
            onChange={(e) => setTipe(e.target.value)}
            icon={<PhoneIcon />}
          />
          <Input
            color="blue"
            variant="static"
            label=" peluang"
            type="number"
            placeholder="Masukkan peluang"
            value={peluang}
            onChange={(e) => setPeluang(e.target.value)}
            icon={<PhoneIcon />}
          />
          <Input
            color="blue"
            variant="static"
            label=" deal"
            type="number"
            placeholder="Masukkan deal"
            value={deal}
            onChange={(e) => setDeal(e.target.value)}
            icon={<PhoneIcon />}
          />
          <Input
            color="blue"
            variant="static"
            label=" Action"
            type="number"
            placeholder="Masukkan Action"
            value={action}
            onChange={(e) => setAction(e.target.value)}
            icon={<PhoneIcon />}
          />
        </DialogBody>
        <DialogFooter>
          <div className="mt-10 flex gap-4">
            <a href="/dealpo">
              <Button
                variant="text"
                color="gray"
                className="mr-1 font-popins font-medium"
              >
                <span>Kembali</span>
              </Button>
            </a>
            <Button
              variant="gradient"
              color="blue"
              type="submit"
              className="font-popins font-medium"
            >
              <span>Simpan</span>
            </Button>
          </div>
        </DialogFooter>
      </form>
    </div>
  );
}

export default Model;
