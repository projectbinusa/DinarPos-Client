import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  CodeBracketIcon,
  InformationCircleIcon,
  MapPinIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { API_SUPLIER } from "../../../../utils/BaseUrl";
import Swal from "sweetalert2";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

function EditSuplier() {
  const [kode, setkode] = useState("");
  const [nama, setnama] = useState("");
  const [noTlp, setnoTlp] = useState("");
  const [alamat, setalamat] = useState("");
  const [keterangan, setketerangan] = useState("");

  const history = useHistory();
  const param = useParams();

  //   EDIT SUPLIER
  const editSuplier = async (e) => {
    e.preventDefault();

    const request = {
      kodeSuplier: kode,
      namaSuplier: nama,
      noTelpSuplier: noTlp,
      alamatSuplier: alamat,
      keterangan: keterangan,
    };

    await axios
      .put(`${API_SUPLIER}/` + param.id, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Data Berhasil Diubah!",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/data_suplier");
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

  //   GET SUPLIER BY ID
  useEffect(() => {
    axios
      .get(`${API_SUPLIER}/` + param.id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const response = res.data.data;
        setnama(response.namaSuplier);
        setkode(response.kodeSuplier);
        setnoTlp(response.noTelpSuplier);
        setalamat(response.alamatSuplier);
        setketerangan(response.keterangan);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full lg:px-7 px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Edit Suplier
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/dashboard_admin" className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/data_suplier">
              <span>Suplier</span>
            </a>
            <span className="cursor-default">Edit Suplier</span>
          </Breadcrumbs>
        </div>
        <main className="container bg-white shadow-lg px-5 py-8 my-5 rounded">
          <form onSubmit={editSuplier}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Input
                label="Kode Suplier"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Kode Suplier"
                type="text"
                defaultValue={kode}
                onChange={(e) => setkode(e.target.value)}
                icon={<CodeBracketIcon />}
              />
              <Input
                label="Nama Suplier"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Nama Suplier"
                defaultValue={nama}
                onChange={(e) => setnama(e.target.value)}
                icon={<UserCircleIcon />}
              />
              <Input
                label="No Telephone"
                variant="static"
                color="blue"
                size="lg"
                type="number"
                placeholder="Masukkan No Telephone"
                defaultValue={noTlp}
                onChange={(e) => setnoTlp(e.target.value)}
                icon={<PhoneIcon />}
              />
              <Input
                label="Alamat"
                variant="static"
                color="blue"
                defaultValue={alamat}
                size="lg"
                placeholder="Masukkan Alamat Suplier"
                onChange={(e) => setalamat(e.target.value)}
                icon={<MapPinIcon />}
              />
              <Input
                defaultValue={keterangan}
                label="Keterangan"
                variant="static"
                color="blue"
                size="lg"
                placeholder="Masukkan Keterangan"
                onChange={(e) => setketerangan(e.target.value)}
                icon={<InformationCircleIcon />}
              />
            </div>
            <div className="mt-10 flex gap-4">
              <Button variant="gradient" color="blue" type="submit">
                <span>Simpan</span>
              </Button>
              <a href="/data_suplier">
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

export default EditSuplier;
