import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  IconButton,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import {
  InformationCircleIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  API_CUSTOMER,
  API_CUSTOMER_CP,
  API_ITC,
  API_KUNJUNGAN,
  API_PENGGUNA,
  API_PLANNING,
} from "../../../utils/BaseUrl";
import axios from "axios";
import Decrypt from "../../../component/Decrypt";
import $ from "jquery";
import Swal from "sweetalert2";

function InputKunjungan() {
  const [date, setdate] = useState("");
  const [kategori, setkategori] = useState("");
  const [customerId, setcustomerId] = useState(0);
  const [customerId2, setcustomerId2] = useState(0);
  const [salesmanId, setsalesmanId] = useState(0);
  const [kunjungan, setkunjungan] = useState([]);
  const [planning, setplanning] = useState([]);
  const [customer, setcustomer] = useState({
    terakhir_update: "",
    nama: "",
    jenis: "",
    kab: "",
    kec: "",
  });

  // DATA ADD KUNJUNGAN
  const [pembayaran, setpembayaran] = useState(0);
  const [deal, setdeal] = useState(0);
  const [waktu, setwaktu] = useState("");
  const [peluang, setpeluang] = useState(0);
  const [cp, setcp] = useState("");
  const [tujuan, settujuan] = useState("");
  const [infoDpt, setinfoDpt] = useState("");
  const [idPlan, setidPlan] = useState(0);
  const [foto, setfoto] = useState(0);
  const [tglDeal, settglDeal] = useState("");
  const [lokasiLat, setlokasiLat] = useState("");
  const [action, setaction] = useState("");
  const [visit, setvisit] = useState("");
  const [lokasiLon, setlokasiLon] = useState("");
  const [nVisit, setnVisit] = useState(0);

  useEffect(() => {
    let watchId;

    async function requestPermissions() {
      watchId = navigator.geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setlokasiLat(latitude);
          setlokasiLon(longitude);
        },
        (error) => {
          console.error("Error:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 1000,
        }
      );
    }

    requestPermissions();

    return () => {
      // Bersihkan watchPosition saat komponen dilepas.
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  const tableRef = useRef();
  const initializeDataTable = () => {
    if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable({});
    }
  };

  useEffect(() => {
    if (kunjungan && kunjungan.length > 0) {
      initializeDataTable();
    }
  }, [kunjungan]);

  const formatDate = (value) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const formatDateTime = (value) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  };

  const handleDate = () => {
    setdate("");
  };

  // NAMA PENGGUNA
  const id = Decrypt();
  useEffect(() => {
    axios
      .get(`${API_PENGGUNA}/` + id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const response = res.data.data.namaPengguna;
        try {
          axios
            .get(`${API_ITC}/nama?nama=` + response, {
              headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            })
            .then((ress) => {
              setsalesmanId(ress.data.data.id);
            });
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // ALL CUSTOMER
  const [values, setvalues] = useState("");
  const [options, setoptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  const settingCustomer = () => {
    setcustomerId2(customerId);
  };

  // ALL CUSTOMER CP
  const [valuescp, setvaluescp] = useState("");
  const [optionscp, setoptionscp] = useState([]);
  const [currentPageCP, setCurrentPageCP] = useState(1);

  const handleCP = async () => {
    if (valuescp.trim() !== "") {
      const response = await fetch(
        `${API_CUSTOMER_CP}/pagination?id_customer=${customerId}&limit=10&page=${currentPageCP}&search=${valuescp}&sort=1`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setoptionscp(data.data);
    } else {
      return;
    }
  };

  useEffect(() => {
    handleCP();
  }, [currentPageCP, valuescp]);

  const handleChangeCP = (event) => {
    setvaluescp(event.target.value);
    setCurrentPageCP(1);
  };

  // DATA CUSTOMER
  const getCustomer = async (value) => {
    try {
      const response = await axios.get(`${API_CUSTOMER}/${value}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      const res = response.data.data;
      setcustomer({
        terakhir_update: formatDate(res.updated_date),
        jenis: res.jenis,
        kab: res.kabKot.nama_kabkot,
        kec: res.kec.nama_kec,
        nama: res.nama_customer,
      });
    } catch (error) {
      console.log("get all", error);
    }
  };

  const getCustomerByPlan = async (value) => {
    try {
      const response = await axios.get(`${API_PLANNING}/${value}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      const res = response.data.data.customer;
      setcustomerId2(res.id);
      setcustomer({
        terakhir_update: formatDate(res.updated_date),
        jenis: res.jenis,
        kab: res.kabKot.nama_kabkot,
        kec: res.kec.nama_kec,
        nama: res.nama_customer,
      });
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    if (customerId2 !== 0) {
      getCustomer(customerId2);
    } else if (idPlan !== 0) {
      getCustomerByPlan(idPlan);
    }
  }, [customerId2, idPlan]);

  // ALL PLANNING
  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_PLANNING}/notinkunjungan?id_salesman=${salesmanId}&tanggal=${date}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setplanning(response.data.data);
      console.log("data planing: ", response.data.data)
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    if (date !== "" && kategori === "Plan") {
      getAll();
    }
  }, [date, kategori]);

  const getAllKunjungan = async () => {
    try {
      const response = await axios.get(
        `${API_KUNJUNGAN}/date/salesman?id_salesman=${salesmanId}&tanggal=${date}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setkunjungan(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    if (date !== "") {
      getAllKunjungan();
    }
  }, [date]);

  useEffect(() => {
    if (customerId2 !== 0) {
      axios.get(`${API_KUNJUNGAN}/max-visit?idCustomer=${customerId2}&idSalesman=${salesmanId}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      }).then((res) => {
        const data2 = res.data.data || [];
        let jml = 0;
        if (Array.isArray(data2) && data2.length > 0) {
          const validItems = data2.filter((item) => item && Object.keys(item).length > 0);
          jml = validItems.length;
        }

        let n = 0;
        if (jml > 0) {
          const maxVisit = Math.max(...data2.map((item) => item.nVisit));
          console.log(maxVisit);

          if (visit === "V") {
            n = maxVisit + 1;
          }
        } else {
          if (visit === "V") {
            n = 1;
          }
        }

        setnVisit(n);
        console.log(data2);
        console.log(`nVisit: ${n} ${jml}`);
      }).catch((err) => {
        console.log(err);
      })
    }
  })

  // ADD KUNJUNGAN
  const addKunjungan = async (e) => {
    e.persist();
    e.preventDefault();
    const formData = new FormData();
    formData.append("pembayaran", pembayaran);
    formData.append("deal", deal);
    formData.append("id_salesman", salesmanId);
    formData.append("waktuPengadaan", waktu);
    formData.append("id_customer", customerId2);
    formData.append("peluang", peluang);
    formData.append("tujuan", tujuan);
    formData.append("cp", cp);
    formData.append("infoDpt", infoDpt);
    formData.append("foto", foto);
    formData.append("tanggal_deal", formatDateTime(tglDeal));
    formData.append("lokasiLat", lokasiLat);
    formData.append("tgl_kunjungan", formatDateTime(date));
    formData.append("serviceTt", 0);
    formData.append("action", action);
    formData.append("visit", visit);
    formData.append("lokasiLon", lokasiLon);
    formData.append("nVisit", nVisit);

    let url = '';
    if (kategori === 'Plan') {
      formData.append("id_plan", idPlan);
      url = `${API_KUNJUNGAN}/add`
    } else {
      url = `${API_KUNJUNGAN}/add/non_plan`
    }


    Swal.fire({
      title: "Yakin sudah input dengan benar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`${url}`, formData, {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("token")}`,
              "content-type": "multipart/form-data",
            },
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Data Berhasil Ditambahkan!",
              showConfirmButton: false,
              timer: 1500,
            });

            setTimeout(() => {
              window.location.reload();
            }, 1500);
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Tambah Data Gagal!",
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(err);
          });
      }
    });
  };

  // DELETE KUNJUNGAN
  const deleteKunjungan = async (id) => {
    Swal.fire({
      title: "Apakah Anda Ingin Menghapus?",
      text: "Perubahan data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_KUNJUNGAN}/` + id, {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Dihapus!",
              showConfirmButton: false,
              timer: 1500,
            });

            setTimeout(() => {
              window.location.reload();
            }, 1500);
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Hapus Data Gagal!",
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(err);
          });
      }
    });
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Input Report
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/home" className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/daily_report">
              <span>Daily Report</span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <div>
            {date === "" ? (
              <>
                <div className="w-full lg:w-[50%]">
                  <p className="font-medium">Tanggal</p>
                  <Input
                    variant="static"
                    color="blue"
                    size="lg"
                    type="date"
                    onChange={(e) => setdate(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="w-full lg:w-[50%]">
                  <p className="font-medium">Tanggal</p>
                  <div className="flex justify-between items-center mb-2">
                    <p>{date}</p>
                    <IconButton size="md" color="blue" onClick={handleDate}>
                      <XMarkIcon className="w-6 h-6 white" />
                    </IconButton>
                  </div>
                  <hr />
                  <br />
                  <p className="font-medium">Pilih</p>
                  <Select
                    variant="static"
                    color="blue"
                    size="lg"
                    onChange={(selectedOption) => setkategori(selectedOption)}
                    required>
                    <Option value="" disabled>
                      Pilih
                    </Option>
                    <Option value="Plan">Plan</Option>
                    <Option value="Non Plan">Non Plan</Option>
                  </Select>
                  <br />
                </div>

                {kategori === "Non Plan" ? (
                  <>
                    <div>
                      <p className="font-medium">Pilih Customer</p>
                      <div>
                        <div className="flex gap-2 items-end">
                          <Input
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
                              disabled={currentPage === 1}>
                              Prev
                            </button>
                            <button
                              className="text-sm bg-gray-400 px-1"
                              onClick={() => setCurrentPage(currentPage + 1)}
                              disabled={!options.length}>
                              Next
                            </button>
                          </div>
                        </div>
                        <br />
                        <Button
                          variant="gradient"
                          color="blue"
                          type="button"
                          onClick={settingCustomer}
                          className="font-popins font-medium">
                          Pilih
                        </Button>
                      </div>
                    </div>
                  </>
                ) : kategori === "Plan" ? (
                  <>
                    <div className="w-full lg:w-[50%] my-5">
                      <Select
                        label="Plan"
                        variant="static"
                        color="blue"
                        size="lg"
                        onChange={(selectedOption) => setidPlan(selectedOption)}
                        required>
                        <Option value="" disabled>
                          Pilih
                        </Option>
                        {planning.map((res) => (
                          <Option
                            value={res.idPlan.toString()}
                            key={res.idPlan}>
                            {res.customer.nama_customer}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {customerId2 !== 0 || idPlan !== 0 ? (
                  <>
                    <br /> <br />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <Input
                        variant="static"
                        color="blue"
                        size="lg"
                        readOnly
                        label="Nama Customer"
                        value={`${customer.nama} ( terakhir diperbaharui : ${customer.terakhir_update} )`}
                      />
                      <Input
                        variant="static"
                        color="blue"
                        size="lg"
                        readOnly
                        label="Daerah"
                        value={`${customer.kab} / ${customer.kec}`}
                      />
                      <Input
                        variant="static"
                        color="blue"
                        size="lg"
                        readOnly
                        label="Jenis"
                        value={customer.jenis}
                      />
                      <Input
                        variant="static"
                        color="blue"
                        size="lg"
                        label="Tujuan"
                        onChange={(e) => settujuan(e.target.value)}
                      />
                      <Select
                        variant="static"
                        color="blue"
                        size="lg"
                        label="Visit"
                        onChange={(selectedOption) => setvisit(selectedOption)}
                        required>
                        <Option value="" disabled>
                          Pilih
                        </Option>
                        <Option value="V">Visit</Option>
                        <Option value="N">Non Visit</Option>
                        <Option value="F">Feedback</Option>
                      </Select>
                      <div className="flex gap-2 items-end">
                        <Input
                          variant="static"
                          color="blue"
                          list="customer-cp-list"
                          id="customer-cp"
                          name="customer-cp"
                          label="Pihak Dituju"
                          onChange={(event) => {
                            handleChangeCP(event);
                            setcp(event.target.value);
                          }}
                          placeholder="Pilih Customer CP"
                        />
                        <datalist id="customer-cp-list">
                          {optionscp.length > 0 && (
                            <>
                              {optionscp.map((option) => (
                                <option
                                  value={`${option.nama_cp} / ${option.no_hp}`}
                                  key={option.id}>
                                  {option.nama_cp} ( {option.no_hp} )
                                </option>
                              ))}
                            </>
                          )}
                        </datalist>

                        <div className="flex gap-2">
                          <button
                            className="text-sm bg-gray-400 px-1"
                            onClick={() => setCurrentPageCP(currentPageCP - 1)}
                            disabled={currentPageCP === 1}>
                            Prev
                          </button>
                          <button
                            className="text-sm bg-gray-400 px-1"
                            onClick={() => setCurrentPageCP(currentPageCP + 1)}
                            disabled={!optionscp.length}>
                            Next
                          </button>
                        </div>
                      </div>
                      <Input
                        variant="static"
                        color="blue"
                        size="lg"
                        label="Deal"
                        placeholder="Deal (%) / Presentase Proses"
                        onChange={(e) => setdeal(e.target.value)}
                      />
                      <Input
                        variant="static"
                        color="blue"
                        size="lg"
                        label="Pembayaran"
                        placeholder="Pembayaran (%)"
                        onChange={(e) => setpembayaran(e.target.value)}
                      />
                      <div>
                        <Textarea
                          color="blue"
                          variant="static"
                          label="Action"
                          placeholder="Info yang disampaikan"
                          onChange={(e) => setaction(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Textarea
                          color="blue"
                          variant="static"
                          label="Info yang didapat"
                          placeholder="Info yang didapat"
                          onChange={(e) => setinfoDpt(e.target.value)}
                          required
                        />
                      </div>
                      <Select
                        variant="static"
                        color="blue"
                        size="lg"
                        label="Waktu Pengadaan"
                        onChange={(selectedOption) => setwaktu(selectedOption)}
                        required>
                        <Option value="" disabled>
                          Pilih
                        </Option>
                        <Option value="Januari">Januari</Option>
                        <Option value="Februari">Februari</Option>
                        <Option value="Maret">Maret</Option>
                        <Option value="April">April</Option>
                        <Option value="Mei">Mei</Option>
                        <Option value="Juni">Juni</Option>
                        <Option value="Juli">Juli</Option>
                        <Option value="Agustus">Agustus</Option>
                        <Option value="September">September</Option>
                        <Option value="Oktober">Oktober</Option>
                        <Option value="November">November</Option>
                        <Option value="Desember">Desember</Option>
                      </Select>
                      <Input
                        variant="static"
                        color="blue"
                        size="lg"
                        label="Peluang"
                        placeholder="Peluang"
                        onChange={(e) => setpeluang(e.target.value)}
                      />
                      <Input
                        variant="static"
                        color="blue"
                        size="lg"
                        label="Tanggal Deal"
                        type="date"
                        onChange={(e) => settglDeal(e.target.value)}
                      />
                      <Input
                        variant="static"
                        color="blue"
                        size="lg"
                        label="Foto"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setfoto(e.target.files[0])}
                      />
                    </div>
                    <br />
                    <Button
                      variant="gradient"
                      color="blue"
                      type="button"
                      onClick={addKunjungan}
                      className="font-popins font-medium">
                      Tambah
                    </Button>
                  </>
                ) : (
                  <></>
                )}
                {kunjungan.length > 0 ? (
                  <>
                    <br />
                    <div className="rounded my-5 p-2 w-full overflow-auto">
                      <table
                        id="example_data"
                        ref={tableRef}
                        className="rounded-sm table-auto w-full">
                        <thead className="bg-blue-500 text-white">
                          <tr>
                            <th className="text-sm py-2 px-3 font-semibold">
                              No
                            </th>
                            <th className="text-sm py-2 px-3 font-semibold">
                              Nama Customer
                            </th>
                            <th className="text-sm py-2 px-3 font-semibold">
                              Jenis
                            </th>
                            <th className="text-sm py-2 px-3 font-semibold">
                              Daerah
                            </th>
                            <th className="text-sm py-2 px-3 font-semibold">
                              Tujuan
                            </th>
                            <th className="text-sm py-2 px-3 font-semibold">
                              Action
                            </th>
                            <th className="text-sm py-2 px-3 font-semibold">
                              Info didapat
                            </th>
                            <th className="text-sm py-2 px-3 font-semibold">
                              CV
                            </th>
                            <th className="text-sm py-2 px-3 font-semibold">
                              Visit
                            </th>
                            <th className="text-sm py-2 px-3 font-semibold">
                              Tipe
                            </th>
                            <th className="text-sm py-2 px-3 font-semibold">
                              Peluang
                            </th>
                            <th className="text-sm py-2 px-3 font-semibold">
                              Deal
                            </th>
                            <th className="text-sm py-2 px-3 font-semibold">
                              Aksi
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {kunjungan.length > 0 ? (
                            kunjungan.map((res, idx) => (
                              <tr key={idx}>
                                <td className="text-sm w-[4%]">{idx + 1}</td>
                                <td className="text-sm py-2 px-3">
                                  {res.customer.nama_customer}
                                </td>
                                <td className="text-sm py-2 px-3">
                                  {res.customer.jenis}
                                </td>
                                <td className="text-sm py-2 px-3">
                                  {res.customer.kabKot.nama_kabkot} / {res.customer.kec.nama_kec}
                                </td>
                                <td className="text-sm py-2 px-3">
                                  {res.tujuan}
                                </td>
                                <td className="text-sm py-2 px-3">
                                  {res.action}
                                </td>
                                <td className="text-sm py-2 px-3">
                                  {res.infoDpt}
                                </td>
                                <td className="text-sm py-2 px-3">
                                  {res.cp}
                                </td>
                                <td className="text-sm py-2 px-3">
                                  {res.nVisit}
                                </td>
                                <td className="text-sm py-2 px-3">
                                  {res.visit}
                                </td>
                                <td className="text-sm py-2 px-3">
                                  {res.peluang}
                                </td>
                                <td className="text-sm py-2 px-3">
                                  {res.deal}
                                </td>
                                <td className="text-sm py-2 px-3 flex items-center justify-center">
                                  {formatDate(res.timestamp) ===
                                    formattedDate ? (
                                    <>
                                      <div className="flex flex-col lg:flex-row gap-3">
                                        <a href={`/detail_kunjungan/` + res.idReport}>
                                          <IconButton size="md" color="green">
                                            <InformationCircleIcon className="w-6 h-6 white" />
                                          </IconButton>
                                        </a>
                                        <IconButton size="md" color="red" onClick={() => deleteKunjungan(res.idReport)}>
                                          <TrashIcon className="w-6 h-6 white" />
                                        </IconButton>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <>
                              <tr>
                                <td
                                  colSpan="13"
                                  className="text-center capitalize py-3 bg-gray-100">
                                  Tidak ada data
                                </td>
                              </tr>
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </section>
  );
}

export default InputKunjungan;
