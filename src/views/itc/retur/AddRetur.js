import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { API_SERVICE, API_SERVICE_RETUR } from "../../../utils/BaseUrl";
import Swal from "sweetalert2";

function AddRetur() {
  const [nama, setnama] = useState("");
  const [alamat, setalamat] = useState("");
  const [cp, setcp] = useState("");
  const [ket, setket] = useState("");
  const [produk, setproduk] = useState("");
  const [merk, setmerk] = useState("");
  const [type, settype] = useState("");
  const [sn, setsn] = useState("");
  const [perlengkapan, setperlengkapan] = useState("");
  const [keluhan, setkeluhan] = useState("");
  const [penerima, setpenerima] = useState("");
  const [tglMasuk, settglMasuk] = useState("");
  const [bmax, setbmax] = useState("");
  const [estimasi, setestimasi] = useState("");
  const [checker, setchecker] = useState("");
  const [idCustomer, setidCustomer] = useState(0);

  const param = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${API_SERVICE}/` + param.id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const ress = res.data.data;
        setnama(ress.nama);
        setalamat(ress.alamat);
        setcp(ress.cp);
        setproduk(ress.produk);
        setmerk(ress.merk);
        settype(ress.type);
        setsn(ress.sn);
        setidCustomer(ress.customer.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addRetur = async (e) => {
    e.preventDefault();

    const request = {
      checker: checker,
      cp: cp,
      alamat: alamat,
      biaya_maximal: bmax,
      estimasi_biaya: estimasi,
      id_customer: idCustomer,
      jenis_produk: produk,
      keluhan: keluhan,
      ket: ket,
      merek: merk,
      nama: nama,
      no_seri: sn,
      penerima: penerima,
      perlengkapan: perlengkapan,
      tanggal_masuk: tglMasuk,
      type: type,
    };

    await axios
      .post(`${API_SERVICE_RETUR}/` + param.id, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Data Berhasil Ditambahkan!",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/detail_service/" + res.data.data.idTT);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Tambah Data Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Data Service
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
            <a href="/data_retur">
              <span>Retur</span>
            </a>
            <span className="cursor-default capitalize">Input</span>
          </Breadcrumbs>
        </div>
        <form onSubmit={addRetur}>
          <main className="my-5 grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
            <Card className="bg-blue-50 border border-blue-50 shadow-lg rounded p-1">
              <div className="flex justify-between items-center m-2">
                <Typography
                  variant="paragraph"
                  className="capitalize font-medium text-blue-900"
                >
                  Data Pelanggan
                </Typography>
              </div>
              <CardBody className="bg-white rounded p-3">
                <ol className="mt-5">
                  <li>
                    <Input
                      label="Nama Customer"
                      variant="static"
                      color="blue"
                      size="lg"
                      placeholder="Masukkan Nama Customer"
                      value={nama}
                      onChange={(e) => setnama(e.target.value)}
                    />{" "}
                  </li>
                  <br />
                  <li>
                    <Input
                      label="Alamat"
                      variant="static"
                      color="blue"
                      size="lg"
                      placeholder="Masukkan Alamat"
                      value={alamat}
                      onChange={(e) => setalamat(e.target.value)}
                    />{" "}
                  </li>
                  <br />
                  <li>
                    <Input
                      label="CP"
                      variant="static"
                      color="blue"
                      size="lg"
                      placeholder="Masukkan CP"
                      type="number"
                      value={cp}
                      onChange={(e) => setcp(e.target.value)}
                    />{" "}
                  </li>
                  <br />
                  <li>
                    <Input
                      label="Keterangan"
                      variant="static"
                      color="blue"
                      size="lg"
                      placeholder="Masukkan Keterangan"
                      onChange={(e) => setket(e.target.value)}
                    />{" "}
                  </li>
                </ol>
              </CardBody>
            </Card>
            <Card className="bg-yellow-50 border border-yellow-50 shadow-lg rounded p-1">
              <Typography
                variant="paragraph"
                className="capitalize font-medium text-yellow-900 p-3"
              >
                Data Barang
              </Typography>
              <CardBody className="bg-white rounded p-3">
                <ol className="mt-5">
                  <li>
                    <Input
                      label="Jenis Produk"
                      variant="static"
                      color="blue"
                      size="lg"
                      placeholder="Masukkan Jenis Produk"
                      value={produk}
                      onChange={(e) => setproduk(e.target.value)}
                    />{" "}
                  </li>
                  <br />
                  <li>
                    <Input
                      label="Merk"
                      variant="static"
                      color="blue"
                      size="lg"
                      placeholder="Masukkan Merk"
                      value={merk}
                      onChange={(e) => setmerk(e.target.value)}
                    />{" "}
                  </li>
                  <br />
                  <li>
                    <Input
                      label="Type"
                      variant="static"
                      color="blue"
                      size="lg"
                      placeholder="Masukkan Type"
                      value={type}
                      onChange={(e) => settype(e.target.value)}
                    />{" "}
                  </li>
                  <br />
                  <li>
                    <Input
                      label="No Seri"
                      variant="static"
                      color="blue"
                      size="lg"
                      placeholder="Masukkan No Seri"
                      value={sn}
                      onChange={(e) => setsn(e.target.value)}
                    />{" "}
                  </li>
                  <br />
                  <li>
                    <Input
                      label="Perlengkapan"
                      variant="static"
                      color="blue"
                      size="lg"
                      placeholder="Masukkan Perlengkapan"
                      onChange={(e) => setperlengkapan(e.target.value)}
                    />{" "}
                  </li>
                  <br />
                  <li>
                    <Input
                      label="Keluhan"
                      variant="static"
                      color="blue"
                      size="lg"
                      placeholder="Masukkan Keluhan"
                      onChange={(e) => setkeluhan(e.target.value)}
                    />{" "}
                  </li>
                </ol>
              </CardBody>
            </Card>
            <Card className="bg-green-50 border border-green-50 shadow-lg rounded p-1">
              <Typography
                variant="paragraph"
                className="capitalize font-medium text-green-900 p-3"
              >
                Data Tanda Terima
              </Typography>
              <CardBody className="bg-white rounded p-3">
                <ol className="mt-5">
                  <li>
                    <Input
                      label="Penerima"
                      variant="static"
                      color="blue"
                      size="lg"
                      placeholder="Masukkan Penerima"
                      onChange={(e) => setpenerima(e.target.value)}
                    />{" "}
                  </li>
                  <br />
                  <li>
                    <Input
                      label="Tgl Masuk"
                      variant="static"
                      color="blue"
                      size="lg"
                      type="date"
                      onChange={(e) => settglMasuk(e.target.value)}
                    />{" "}
                  </li>
                  <br />
                  <li>
                    <Input
                      label="Biaya Maksimal"
                      variant="static"
                      color="blue"
                      size="lg"
                      placeholder="Masukkan Biaya Maksimal"
                      type="number"
                      onChange={(e) => setbmax(e.target.value)}
                    />{" "}
                  </li>
                  <br />
                  <li>
                    <Input
                      label="Estimasi Biaya"
                      variant="static"
                      color="blue"
                      size="lg"
                      placeholder="Masukkan Estimasi Biaya"
                      type="number"
                      onChange={(e) => setestimasi(e.target.value)}
                    />{" "}
                  </li>
                  <br />
                  <li>
                    <Input
                      label="Checker"
                      variant="static"
                      color="blue"
                      size="lg"
                      placeholder="Masukkan Checker"
                      onChange={(e) => setchecker(e.target.value)}
                    />{" "}
                  </li>
                </ol>
                <br />
                <Button variant="gradient" color="blue" type="submit">
                  Simpan{" "}
                </Button>
              </CardBody>
            </Card>
          </main>
        </form>
      </div>
    </section>
  );
}

export default AddRetur;
