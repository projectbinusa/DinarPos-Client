import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Input,
  Radio,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import {
  AtSymbolIcon,
  CheckIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  MapPinIcon,
  PhoneIcon,
  UserCircleIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { API_CUSTOMER, API_KABKOT, API_PENGGUNA, API_PROV, API_SALESMAN } from "../../../../utils/BaseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import ReactSelect from "react-select";
import Decrypt from "../../../../component/Decrypt";

function AddCustomer() {
  const [alamat, setalamat] = useState("");
  const [email, setemail] = useState("");
  const [jenis, setjenis] = useState("");
  const [namaCustomer, setnamaCustomer] = useState("");
  const [noTelp, setnoTelp] = useState("");
  const [salesmanId, setsalesmanId] = useState(0);
  const [provId, setprovId] = useState(0);
  const [kabkotId, setkabkotId] = useState(0);
  const [kecId, setkecId] = useState(0);
  const [internet, setinternet] = useState("");
  const [jmlPrinter, setjmlPrinter] = useState(0);
  const [proyektor, setproyektor] = useState(0);
  const [web, setweb] = useState("");
  const [pc, setpc] = useState("");
  const [jurusan, setjurusan] = useState("");
  const [unbk, setunbk] = useState("");
  const [kls3, setkls3] = useState(0);
  const [murid, setmurid] = useState(0);
  const [level, setlevel] = useState("");

  const history = useHistory();

  // PENGGUNA
  const id = Decrypt();
  useEffect(() => {
    axios
      .get(`${API_PENGGUNA}/` + id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const response = res.data.data.levelPengguna;
        setlevel(response)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // ADD CUSTOMER
  const addCustomer = async (e) => {
    e.preventDefault();

    var request;

    if (level === "Marketting" || level === "PimpinanItc") {
      request = {
        alamat: alamat,
        email: email,
        id_salesman: salesmanId,
        jenis: jenis,
        nama_customer: namaCustomer,
        not_telp: noTelp,
        id_kabkot: kabkotId,
        id_prov: provId,
        id_kec: kecId,
        internet: internet,
        jml_printer: jmlPrinter,
        jurusan: jurusan,
        kls3: kls3,
        murid: murid,
        pc: pc,
        proyektor: proyektor,
        unbk: unbk,
        web: web
      };
    } else {
      request = {
        alamat: alamat,
        email: email,
        id_salesman: salesmanId,
        jenis: jenis,
        nama_customer: namaCustomer,
        not_telp: noTelp,
        id_kabkot: kabkotId,
        id_prov: provId,
        id_kec: kecId,
      };
    }

    try {
      await axios.post(`${API_CUSTOMER}/itc`, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/data_customer");
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
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "transparent",
      borderBottom: "1px solid #ccc",
      border: "none",
      outline: "none",
      fontSize: "14px",
      "&:hover": {
        outline: "none",
        boxShadow: "none",
      },
      "&:focus": {
        outline: "none",
        boxShadow: "none",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
      "&:hover": {
        outline: "none",
        boxShadow: "none",
      },
      "&:focus": {
        outline: "none",
        boxShadow: "none",
      },
    }),
  };

  // ALL SALESMAN
  const [values, setvalues] = useState("");
  const [options, setoptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handle = async () => {
    if (values.trim() !== "") {
      const response = await fetch(
        `${API_SALESMAN}/pagination?limit=10&page=${currentPage}&search=${values}&sort=1`,
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
  // END ALL SALESMAN

  // ALL PROV
  const [valuesProv, setvaluesProv] = useState("");
  const [optionsProv, setoptionsProv] = useState([]);
  const [currentPageProv, setCurrentPageProv] = useState(1);

  const handleProv = async () => {
    if (valuesProv.trim() !== "") {
      const response = await fetch(
        `${API_PROV}/pagination?limit=10&page=${currentPageProv}&search=${valuesProv}&sort=namaProv`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setoptionsProv(data.data);
    } else {
      return;
    }
  };

  useEffect(() => {
    handleProv();
  }, [currentPageProv, valuesProv]);

  const handleChangeProv = (event) => {
    setvaluesProv(event.target.value);
    setCurrentPageProv(1);
    setprovId(event.target.value);
  };
  // END ALL PROV

  // ALL KABKOT
  const [valuesKab, setvaluesKab] = useState("");
  const [optionsKab, setoptionsKab] = useState([]);
  const [currentPageKab, setCurrentPageKab] = useState(1);

  const handleKab = async () => {
    if (valuesKab.trim() !== "") {
      const response = await fetch(
        `${API_KABKOT}/pagination?limit=10&page=${currentPageKab}&search=${valuesKab}&sort=nama_kabkot`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setoptionsKab(data.data);
    } else {
      return;
    }
  };

  useEffect(() => {
    handleKab();
  }, [currentPageKab, valuesKab]);

  const handleChangeKab = (event) => {
    setvaluesKab(event.target.value);
    setCurrentPageKab(1);
    setkabkotId(event.target.value);
  };
  // END ALL KABKOT

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            tambah Customer
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
            <a href="/data_customer">
              <span>Customer</span>
            </a>
            <span className="cursor-default capitalize">tambah Customer</span>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg px-5 py-8 my-5 rounded">
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex gap-2 items-end">
                <Input
                  label="Salesman"
                  variant="static"
                  color="blue"
                  list="salesman-list"
                  id="salesman"
                  name="salesman"
                  onChange={(event) => {
                    handleChange(event);
                    setsalesmanId(event.target.value);
                  }}
                  placeholder="Pilih Salesman"
                />
                <datalist id="salesman-list">
                  {options.length > 0 && (
                    <>
                      {options.map((option) => (
                        <option value={option.id} key={option.id}>
                          {option.namaSalesman}
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
              <div className="lg:mt-5">
                <Input
                  label="Nama Customer"
                  variant="static"
                  color="blue"
                  size="lg"
                  icon={<UserCircleIcon />}
                  placeholder="Masukkan Nama Customer"
                  onChange={(e) => setnamaCustomer(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="jenis"
                  className="text-[14px] text-blue-gray-400"
                >
                  Jenis
                </label>
                <ReactSelect
                  id="jenis"
                  options={[
                    { value: "Sekolah", label: "Sekolah" },
                    { value: "Kantor Pemerintah", label: "Kantor Pemerintah" },
                    {
                      value: "Instansi / Perusahaan Swasta",
                      label: "Instansi / Perusahaan Swasta",
                    },
                    {
                      value: "Perusahaan Negara / BUMN",
                      label: "Perusahaan Negara / BUMN",
                    },
                    {
                      value: "Puskesmas / Rumah Sakit",
                      label: "Puskesmas / Rumah Sakit",
                    },
                    {
                      value: "Akademi / Universitas",
                      label: "Akademi / Universitas",
                    },
                    { value: "Hotel", label: "Hotel" },
                    { value: "Perbankan", label: "Perbankan" },
                    { value: "Perorangan", label: "Perorangan" },
                    { value: "Toko", label: "Toko" },
                    { value: "Yayasan", label: "Yayasan" },
                    { value: "Lainnnya", label: "Lainnnya" },
                  ]}
                  placeholder="Pilih Jenis"
                  styles={customStyles}
                  onChange={(selectedOption) => setjenis(selectedOption.value)}
                />
                <hr className="mt-1 bg-gray-400 h-[0.1em]" />
              </div>
              <div className="flex gap-2 items-end">
                <Input
                  label="Provinsi"
                  variant="static"
                  color="blue"
                  list="provinsi-list"
                  id="provinsi"
                  name="provinsi"
                  onChange={(event) => {
                    handleChangeProv(event);
                  }}
                  placeholder="Pilih Provinsi"
                />
                <datalist id="provinsi-list">
                  {optionsProv.length > 0 && (
                    <>
                      {optionsProv.map((option) => (
                        <option value={option.idProv} key={option.idProv}>
                          {option.namaProv}
                        </option>
                      ))}
                    </>
                  )}
                </datalist>

                <div className="flex gap-2">
                  <button
                    className="text-sm bg-gray-400 px-1"
                    onClick={() => setCurrentPageProv(currentPageProv - 1)}
                    disabled={currentPageProv === 1}
                  >
                    Prev
                  </button>
                  <button
                    className="text-sm bg-gray-400 px-1"
                    onClick={() => setCurrentPageProv(currentPageProv + 1)}
                    disabled={!optionsProv.length}
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="flex gap-2 items-end">
                <Input
                  label="Kab / Kota"
                  variant="static"
                  color="blue"
                  list="kab-list"
                  id="kab"
                  name="kab"
                  onChange={(event) => {
                    handleChangeKab(event);
                  }}
                  placeholder="Pilih Kab / Kota"
                />
                <datalist id="kab-list">
                  {optionsKab.length > 0 && (
                    <>
                      {optionsKab.map((option) => (
                        <option value={option.id} key={option.id}>
                          {option.nama_kabkot}
                        </option>
                      ))}
                    </>
                  )}
                </datalist>

                <div className="flex gap-2">
                  <button
                    className="text-sm bg-gray-400 px-1"
                    onClick={() => setCurrentPageKab(currentPageKab - 1)}
                    disabled={currentPageKab === 1}
                  >
                    Prev
                  </button>
                  <button
                    className="text-sm bg-gray-400 px-1"
                    onClick={() => setCurrentPageKab(currentPageKab + 1)}
                    disabled={!optionsKab.length}
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="lg:mt-5 ">
                <Input
                  label="Kecamatan"
                  variant="static"
                  color="blue"
                  size="lg"
                  type="number"
                  placeholder="Masukkan Kecamatan"
                  onChange={(e) => setkecId(e.target.value)}
                  icon={<MapPinIcon />}
                />
              </div>
              <div className="lg:mt-5 lg:col-span-2">
                <Input
                  label="Alamat Customer"
                  variant="static"
                  color="blue"
                  size="lg"
                  placeholder="Masukkan Alamat Customer"
                  icon={<MapPinIcon />}
                  onChange={(e) => setalamat(e.target.value)}
                />
              </div>
              <div className="lg:mt-5">
                <Input
                  label="Email Customer"
                  variant="static"
                  color="blue"
                  size="lg"
                  type="email"
                  placeholder="Masukkan Email Customer"
                  onChange={(e) => setemail(e.target.value)}
                  icon={<AtSymbolIcon />}
                />
              </div>
              <div className="lg:mt-5">
                <Input
                  label="No Telephone"
                  variant="static"
                  color="blue"
                  size="lg"
                  type="number"
                  placeholder="Masukkan No Telephone"
                  onChange={(e) => setnoTelp(e.target.value)}
                  icon={<PhoneIcon />}
                />
              </div>
              {level === "Marketting" || level === "PimpinanItc" ? (<>
                <div className="lg:mt-5">
                  <Input
                    label="Provinsi"
                    variant="static"
                    color="blue"
                    size="lg"
                    type="number"
                    placeholder="Masukkan Provinsi"
                    onChange={(e) => setprovId(e.target.value)}
                    icon={<MapPinIcon />}
                  />
                </div>
                <div className="lg:mt-5">
                  <Input
                    label="Kab / Kot"
                    variant="static"
                    color="blue"
                    size="lg"
                    type="number"
                    placeholder="Masukkan Kab / Kot"
                    onChange={(e) => setkabkotId(e.target.value)}
                    icon={<MapPinIcon />}
                  />
                </div>
                <div className="lg:mt-5 lg:col-span-2">
                  <Input
                    label="Kecamatan"
                    variant="static"
                    color="blue"
                    size="lg"
                    type="number"
                    placeholder="Masukkan Kecamatan"
                    onChange={(e) => setkecId(e.target.value)}
                    icon={<MapPinIcon />}
                  />
                </div>
                <div className="lg:mt-5">
                  <Input
                    label="Printer"
                    variant="static"
                    color="blue"
                    size="lg"
                    type="number"
                    placeholder="Masukkan Jumlah Printer"
                    onChange={(e) => setjmlPrinter(e.target.value)}
                    icon={<Cog6ToothIcon />}
                  />
                </div>
                <div className="lg:mt-5">
                  <Input
                    label="Proyektor"
                    variant="static"
                    color="blue"
                    size="lg"
                    type="number"
                    placeholder="Masukkan Jumlah Proyektor"
                    onChange={(e) => setproyektor(e.target.value)}
                    icon={<Cog6ToothIcon />}
                  />
                </div>
                <div>
                  <Typography className="font-poppins font-normal text-gray-600" variant="paragraph">Internet</Typography>
                  <div className="flex gap-8 pt-5">
                    <div className="flex justify-center">
                      <input
                        type="radio"
                        id="yes"
                        value="U"
                        onChange={(e) => setinternet(e.target.value)}
                      />
                      <label htmlFor="yes" className="ml-1"><CheckIcon className="w-6 h-6 black" /></label>
                    </div>
                    <div className="flex justify-center">
                      <input
                        type="radio"
                        id="validasi_I"
                        value="I"
                        onChange={(e) => setinternet(e.target.value)}
                      />
                      <label htmlFor="validasi_I" className="ml-1"><XMarkIcon className="w-6 h-6 black" /></label>
                    </div>
                  </div>
                </div>
                <div>
                  <Typography className="font-poppins font-normal text-gray-600" variant="paragraph">Web</Typography>
                  <div className="flex gap-8 pt-5">
                    <div className="flex justify-center">
                      <input
                        type="radio"
                        id="yes"
                        value="U"
                        onChange={(e) => setweb(e.target.value)}
                      />
                      <label htmlFor="yes" className="ml-1"><CheckIcon className="w-6 h-6 black" /></label>
                    </div>
                    <div className="flex justify-center">
                      <input
                        type="radio"
                        id="validasi_I"
                        value="I"
                        onChange={(e) => setweb(e.target.value)}
                      />
                      <label htmlFor="validasi_I" className="ml-1"><XMarkIcon className="w-6 h-6 black" /></label>
                    </div>
                  </div>
                </div>
                {jenis === "Sekolah" ? (<>
                  <div className="lg:mt-5">
                    <Input
                      label="Jumlah Murid"
                      variant="static"
                      color="blue"
                      size="lg"
                      type="number"
                      placeholder="Masukkan Jumlah Murid"
                      // onChange={(e) => setproyektor(e.target.value)}
                      icon={<UsersIcon />}
                    />
                  </div>
                  <div className="lg:mt-5">
                    <Input
                      label="Jumlah Kelas 3"
                      variant="static"
                      color="blue"
                      size="lg"
                      type="number"
                      placeholder="Masukkan Jumlah Kelas 3"
                      // onChange={(e) => setproyektor(e.target.value)}
                      icon={<UsersIcon />}
                    />
                  </div>
                  <div className="lg:mt-5">
                    <Input
                      label="PC"
                      variant="static"
                      color="blue"
                      size="lg"
                      type="number"
                      placeholder="Masukkan Jumlah PC"
                      onChange={(e) => setproyektor(e.target.value)}
                      icon={<ComputerDesktopIcon />}
                    />
                  </div>
                  <div>
                    <Typography className="font-poppins font-normal text-gray-600" variant="paragraph">UNBK</Typography>
                    <div className="flex gap-8 pt-5">
                      <div className="flex justify-center">
                        <input
                          type="radio"
                          id="yes"
                          value="Sudah"
                          onChange={(e) => setinternet(e.target.value)}
                        />
                        <label htmlFor="yes" className="ml-1">Sudah</label>
                      </div>
                      <div className="flex justify-center">
                        <input
                          type="radio"
                          id="validasi_I"
                          value="I"
                          onChange={(e) => setinternet(e.target.value)}
                        />
                        <label htmlFor="validasi_I" className="ml-1">Belum</label>
                      </div>
                    </div>
                  </div>
                  <div className="lg:mt-5 lg:col-span-2">
                    <Textarea
                      color="blue"
                      variant="static"
                      label="Jurusan"
                      placeholder="List jurusan apa saja"
                      // onChange={(e) => setaction(e.target.value)} 
                      required
                    />
                  </div>
                </>) : (<></>)}
              </>) : (<></>)}
            </div>
            <div className="mt-10 flex gap-4">
              <Button variant="gradient" color="blue" type="button" onClick={addCustomer} className="font-poppins font-medium">
                <span>Simpan</span>
              </Button>
              <a href="/data_customer">
                <Button variant="text" color="gray" className="mr-1 font-poppins font-medium">
                  <span>Kembali</span>
                </Button>
              </a>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default AddCustomer;
