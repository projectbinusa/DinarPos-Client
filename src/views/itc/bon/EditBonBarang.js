import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import {
  API_BARANG,
  API_BON_BARANG,
  API_SERVICE,
  API_TEKNISI,
} from "../../../utils/BaseUrl";
import Swal from "sweetalert2";

function EditBonBarang() {
  const param = useParams();
  const [tglAmbil, settglAmbil] = useState("");
  const [teknisiId, setteknisiId] = useState(0);
  const [serviceId, setserviceId] = useState(0);
  const [barangId, setbarangId] = useState(0);

  const history = useHistory();

  // GET BON BARANG BY ID
  const getBonBarangById = async () => {
    try {
      const response = await axios.get(`${API_BON_BARANG}/` + param.id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      const data = response.data.data;
      settglAmbil(data.tgl_ambil);
      setteknisiId(data.teknisi.id);
      setserviceId(data.serviceBarang.idTT);
      setbarangId(data.barang.barcodeBarang);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBonBarangById();
  }, []);

  // EDIT BON BARANG
  const editBonBarang = async (e) => {
    e.preventDefault();
    const request = {
      id_tt: serviceId,
      barcode_brg: barangId,
      id_teknisi: teknisiId,
      tgl_ambil: tglAmbil,
    };

    try {
      await axios.put(`${API_BON_BARANG}/update/` + param.id, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      Swal.fire({
        icon: "success",
        title: "Data Berhasil Diubah",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/data_bon_barang");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        history.push("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Ubah Data Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    }
  };

  // GET ALL BARANG
  const [values, setvalues] = useState("");
  const [options, setoptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handle = async () => {
    if (values.trim() !== "") {
      const response = await fetch(
        `${API_BARANG}/pagination?limit=10&page=${currentPage}&search=${values}&sort=1`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setoptions(data.data);
      console.log(data);
    } else {
      return;
    }
  };

  useEffect(() => {
    handle();
  }, [currentPage, values]);

  const handleChangeBarang = (event) => {
    setvalues(event.target.value);
    setCurrentPage(1);
  };
  // END GET ALL BARANG

  // GET ALL TEKNISI
  const [values2, setvalues2] = useState("");
  const [options2, setoptions2] = useState([]);
  const [currentPage2, setCurrentPage2] = useState(1);

  const handleTeknisi = async () => {
    if (values2.trim() !== "") {
      const response = await fetch(
        `${API_TEKNISI}/pagination?limit=10&page=${currentPage2}&search=${values2}&sort=1`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setoptions2(data.data);
      console.log(data);
    } else {
      return;
    }
  };

  useEffect(() => {
    handleTeknisi();
  }, [currentPage2, values2]);

  const handleChangeTeknisi = (event) => {
    setvalues2(event.target.value);
    setCurrentPage2(1);
  };
  // END GET ALL TEKNISI

  // GET ALL SERVICE
  const [values3, setvalues3] = useState("");
  const [options3, setoptions3] = useState([]);
  const [currentPage3, setCurrentPage3] = useState(1);

  const handleService = async () => {
    if (values3.trim() !== "") {
      const response = await fetch(
        `${API_SERVICE}/pagination/takenN?limit=10&page=${currentPage3}&search=${values3}&sort=1`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setoptions3(data.data);
      console.log(data);
    } else {
      return;
    }
  };

  useEffect(() => {
    handleService();
  }, [currentPage3, values3]);

  const handleChangeService = (event) => {
    setvalues3(event.target.value);
    setCurrentPage3(1);
  };
  // END GET ALL SERVICE

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Edit Bon Barang
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/dashboard" className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011-1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/bon_barang">
              <span>Bon Barang</span>
            </a>
            <span className="cursor-default">Edit Bon Barang</span>
          </Breadcrumbs>
        </div>
        <main className="container bg-white shadow-lg px-5 py-8 my-5 rounded">
          <form onSubmit={editBonBarang}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex gap-2 items-end">
                <Input
                  label="ID Service"
                  variant="static"
                  color="blue"
                  list="service-list"
                  id="service"
                  name="service"
                  value={serviceId}
                  onChange={(event) => {
                    handleChangeService(event);
                    setserviceId(event.target.value);
                  }}
                  placeholder="Pilih Service"
                  required
                />
                <datalist id="service-list">
                  {options3.length > 0 && (
                    <>
                      {options3.map((option) => (
                        <option key={option.idTT} value={option.idTT}>
                          {option.idTT} - {option.nama}
                        </option>
                      ))}
                    </>
                  )}
                </datalist>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="text-sm bg-gray-400 px-1"
                    onClick={() => setCurrentPage3(currentPage3 - 1)}
                    disabled={currentPage3 === 1}
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    className="text-sm bg-gray-400 px-1"
                    onClick={() => setCurrentPage3(currentPage3 + 1)}
                    disabled={!options3.length}
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="flex gap-2 items-end">
                <Input
                  label="Teknisi"
                  variant="static"
                  color="blue"
                  list="teknisi-list"
                  id="teknisi"
                  name="teknisi"
                  value={teknisiId}
                  onChange={(event) => {
                    handleChangeTeknisi(event);
                    setteknisiId(event.target.value);
                  }}
                  placeholder="Pilih Teknisi"
                  required
                />
                <datalist id="teknisi-list">
                  {options2.length > 0 && (
                    <>
                      {options2.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.nama}
                        </option>
                      ))}
                    </>
                  )}
                </datalist>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="text-sm bg-gray-400 px-1"
                    onClick={() => setCurrentPage2(currentPage2 - 1)}
                    disabled={currentPage2 === 1}
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    className="text-sm bg-gray-400 px-1"
                    onClick={() => setCurrentPage2(currentPage2 + 1)}
                    disabled={!options2.length}
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="flex gap-2 items-end">
                <Input
                  label="Barang"
                  variant="static"
                  color="blue"
                  list="barang-list"
                  id="barang"
                  name="barang"
                  value={barangId}
                  onChange={(event) => {
                    handleChangeBarang(event);
                    setbarangId(event.target.value);
                  }}
                  placeholder="Pilih Barang"
                  required
                />
                <datalist id="barang-list">
                  {options.length > 0 && (
                    <>
                      {options.map((option) => (
                        <option key={option.idBarang} value={option.idBarang}>
                          {option.barcodeBarang} - {option.namaBarang}
                        </option>
                      ))}
                    </>
                  )}
                </datalist>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="text-sm bg-gray-400 px-1"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    className="text-sm bg-gray-400 px-1"
                    onClick={() => setCurrentPage2(currentPage + 1)}
                    disabled={!options.length}
                  >
                    Next
                  </button>
                </div>
              </div>
              <Input
                label="Tanggal Ambil"
                variant="static"
                color="blue"
                size="lg"
                type="date"
                value={tglAmbil}
                placeholder="Masukkan Tanggal Ambil"
                onChange={(e) => settglAmbil(e.target.value)}
                required
              />
            </div>
            <div className="mt-10 flex gap-4">
              <Button variant="gradient" color="blue" type="submit">
                <span>Simpan</span>
              </Button>
              <a href="/bon_barang">
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

export default EditBonBarang;
