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

function EditDealPO({ handleOpen, idDeal }) {
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
      <DialogHeader className="font-poppins">Edit Deal PO</DialogHeader>
      <form onSubmit={editDealPo}>
        <DialogBody className="">
          <Input
            color="blue"
            variant="static"
            label="Ket Status"
            placeholder="Masukkan tanggal"
            onChange={(e) => setTanggal(e.target.value)}
          /> <br />
          <Input
            color="blue"
            variant="static"
            label="Status"
            placeholder="Masukkan Status"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </DialogBody>
        <DialogFooter>
          <div className="mt-10 flex gap-4">
            <Button
              variant="text"
              color="gray" onClick={handleOpen}
              className="mr-1 font-popins font-medium">
              <span>Tutup</span>
            </Button>
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

export default EditDealPO;
