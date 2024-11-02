import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Dialog,
  Input,
  Typography,
} from "@material-tailwind/react";
import ModalTambahCustomer from "../../admin/modal/ModalTambahCustomer";
import { API_CUSTOMER, API_PENGGUNA, API_SERVICE } from "../../../utils/BaseUrl";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Swal from "sweetalert2";
import Decrypt from "../../../component/Decrypt";

function AddService() {
  const [customerId, setcustomerId] = useState(0);
  const [bmax, setbmax] = useState("");
  const [estimasi, setestimasi] = useState("");
  const [produk, setproduk] = useState("");
  const [keluhan, setkeluhan] = useState("");
  const [ket, setket] = useState("");
  const [merek, setmerek] = useState("");
  const [noseri, setnoseri] = useState("");
  const [penerima, setpenerima] = useState("");
  const [perlengkapan, setperlengkapan] = useState("");
  const [tglMasuk, settglMasuk] = useState("");
  const [type, settype] = useState("");
  const [checker, setchecker] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [values, setvalues] = useState("");
  const [options, setoptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const history = useHistory();

  // ADD SERVICE
  const addTandaTerima = async (e) => {
    e.preventDefault();

    const request = {
      biaya_maximal: bmax,
      checker: checker,
      estimasi_biaya: estimasi,
      id_customer: customerId,
      jenis_produk: produk,
      keluhan: keluhan,
      ket: ket,
      merek: merek,
      no_seri: noseri,
      penerima: penerima,
      perlengkapan: perlengkapan,
      tanggal_masuk: tglMasuk,
      type: type,
    };
    console.log(request);

    try {
      await axios.post(`${API_SERVICE}/add`, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/data_service");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        history.push("/");
      } else if (error.response.status === 400) {
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
  // END ADD SERVICE

  const handle = async () => {
    if (values.trim() !== "") {
      const response = await fetch(
        `${API_CUSTOMER}/pagination?limit=10&page=${currentPage}&search=${values}&sort=1`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setoptions(data.data);
    } else {
      return;
    }
  };

  useEffect(() => {
    handle();
  }, [currentPage, values]);

  const handleChange = (event) => {
    setvalues(event.target.value);
    setCurrentPage(1);
  };

  const [level, setlevel] = useState("");

  const idPengguna = Decrypt()
  useEffect(() => {
    axios.get(`${API_PENGGUNA}/` + idPengguna, {
      headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
    }).then((res) => {
      const response = res.data.data;
      setlevel(response.levelPengguna)
    }).catch((err) => {
      console.log(err);
    })
  }, [idPengguna])

  let dashboard = "";

  if (level === "Superadmin") {
    dashboard = "dashboard";
  } else if (level === "AdminService") {
    dashboard = "dashboard_service"
  }

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Input Service
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href={`/${dashboard}`} className="opacity-60">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/data_service">
              <span>Service</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="my-5 grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          <Card className="bg-blue-50 border border-blue-50 shadow-lg rounded p-1">
            <div className="flex justify-between items-center m-2">
              <Typography
                variant="paragraph"
                className="capitalize font-medium text-blue-900 font-poppins">
                Data Pelanggan
              </Typography>
              <Button onClick={handleOpen} variant="gradient" color="blue" className="font-popins font-medium">
                New
              </Button>
            </div>
            <CardBody className="bg-white rounded p-3">
              <ol className="mt-5">
                <li>
                  <div className="flex gap-2 items-end">
                    <Input
                      label="Customer"
                      variant="static"
                      color="blue"
                      list="customer-list"
                      id="customer"
                      name="customer"
                      onChange={(event) => {
                        handleChange(event);
                        setcustomerId(event.target.value);
                      }}
                      placeholder="Pilih Customer"
                    />
                    <datalist id="customer-list">
                      {options.length > 0 && (
                        <>
                          {options.map((option) => (
                            <option value={option.id} key={option.id}>
                              {option.nama_customer}
                            </option>
                          ))}
                        </>
                      )}
                    </datalist>

                    <div className="flex gap-2">
                      <button
                        className="text-sm bg-gray-400 px-1"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Prev
                      </button>
                      <button
                        className="text-sm bg-gray-400 px-1"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={!options.length}
                      >
                        Next
                      </button>
                    </div>
                  </div>
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
                  />
                </li>
              </ol>
            </CardBody>
          </Card>
          <Card className="bg-yellow-50 border border-yellow-50 shadow-lg rounded p-1">
            <Typography
              variant="paragraph"
              className="capitalize font-medium text-yellow-900 p-3 font-poppins">
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
                    onChange={(e) => setproduk(e.target.value)}
                  />
                </li>
                <br />
                <li>
                  <Input
                    label="Merk"
                    variant="static"
                    color="blue"
                    size="lg"
                    placeholder="Masukkan Merk"
                    onChange={(e) => setmerek(e.target.value)}
                  />
                </li>
                <br />
                <li>
                  <Input
                    label="Type"
                    variant="static"
                    color="blue"
                    size="lg"
                    placeholder="Masukkan Type"
                    onChange={(e) => settype(e.target.value)}
                  />
                </li>
                <br />
                <li>
                  <Input
                    label="No Seri"
                    variant="static"
                    color="blue"
                    size="lg"
                    placeholder="Masukkan No Seri"
                    onChange={(e) => setnoseri(e.target.value)}
                  />
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
                  />
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
                  />
                </li>
              </ol>
            </CardBody>
          </Card>
          <Card className="bg-green-50 border border-green-50 shadow-lg rounded p-1">
            <Typography
              variant="paragraph"
              className="capitalize font-medium text-green-900 p-3 font-poppins">
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
                  />
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
                  />
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
                  />
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
                  />
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
                  />
                </li>
              </ol>
              <br />
              <Button variant="gradient" color="blue" type="button" onClick={addTandaTerima} className="font-popins font-medium">
                Simpan
              </Button>
            </CardBody>
          </Card>
        </main>
        {/* MODAL TAMBAH CUSTOMER */}
        <Dialog open={open} handler={handleOpen} size="lg">
          <ModalTambahCustomer handleOpen={handleOpen} />
        </Dialog>
        {/* END MODAL TAMBAH CUSTOMER */}
      </div>
    </section>
  );
}

export default AddService;
