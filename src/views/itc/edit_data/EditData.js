import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  BookmarkIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import $ from "jquery";
import { API_EDIT_DATA, API_POIN, API_SERVICE } from "../../../utils/BaseUrl";
import Swal from "sweetalert2";
import axios from "axios";

function EditData() {
  const [visibleElement, setVisibleElement] = useState(null);

  const toggleElement = (elementId) => {
    if (visibleElement === elementId) {
      $("#" + elementId).hide();
      setVisibleElement(null);
    } else {
      if (visibleElement !== null) {
        $("#" + visibleElement).hide();
      }
      $("#" + elementId).show();
      setVisibleElement(elementId);
    }
  };

  const formatDate = (value) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  // UPDATE BIAYA SERVICE
  const [idTT, setidTT] = useState(0);
  const [data, setdata] = useState(null);

  const searchTT = async () => {
    try {
      const response = await axios.get(`${API_SERVICE}/` + idTT, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });

      setdata(response.data.data);
    } catch (error) {
      if (error.response.data.code === 404) {
        Swal.fire({
          icon: "info",
          title: "Data Tidak Ada!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log("get all", error.response.data.code);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  const [biayaService, setbiayaService] = useState(0);
  const [biayaSparepart, setbiayaSparepart] = useState(0);
  const [total, settotal] = useState("");

  const updateTotal = () => {
    const sparepartValue = parseFloat(biayaSparepart) || 0;
    const serviceValue = parseFloat(biayaService) || 0;
    settotal(sparepartValue + serviceValue);
  };

  useEffect(() => {
    updateTotal();
  }, [biayaService, biayaSparepart]);

  const updateBiayaService = async (e) => {
    e.preventDefault();

    const request = {
      biaya_service: biayaService,
      biaya_sparepart: biayaSparepart,
      total: total,
    };

    try {
      await axios.put(
        `${API_EDIT_DATA}/update_biaya_service/` + idTT,
        request,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Update Biaya Service Berhasil",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      if (err.response.data.code === 400) {
        Swal.fire({
          icon: "error",
          title: "Update Biaya Service Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log("update biaya service", err.response.data.code);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  // UPDATE POIN
  const [idTT2, setidTT2] = useState("");
  const [poins, setpoins] = useState([]);
  const [poin, setpoin] = useState(0);

  const searchPoinsService = async () => {
    try {
      const response = await axios.get(
        `${API_POIN}/keterangan?keterangan=` + idTT2,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );

      setpoins(response.data.data);
      console.log(response);
    } catch (error) {
      if (error.response.code === 404) {
        Swal.fire({
          icon: "info",
          title: "Data Tidak Ada!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log("get all", error);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  useEffect(() => {
    searchPoinsService();
  }, []);

  const updatePoin = async (id) => {
    const data = {
      poin: poin,
    };

    await axios
      .put(`${API_EDIT_DATA}/update_poin_history/` + id, data, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Poin Berhasil Diubah!",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }).catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Poin Gagal Diubah!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
  };

  // UPDATE ID TT
  const [idTT3, setidTT3] = useState(0);
  const [data3, setdata3] = useState(null);

  const searchTT3 = async () => {
    try {
      const response = await axios.get(`${API_SERVICE}/` + idTT3, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });

      setdata3(response.data.data);
    } catch (error) {
      if (error.response.data.code === 404) {
        Swal.fire({
          icon: "info",
          title: "Data Tidak Ada!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log("get all", error.response.data.code);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  const [idTandaTerima, setidTandaTerima] = useState(0);

  const updateTandaTerima = async (e) => {
    e.preventDefault();

    const request = {
      id_tt: idTandaTerima,
    };

    try {
      await axios.put(`${API_EDIT_DATA}/update_tt_service/` + idTT3, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      Swal.fire({
        icon: "success",
        title: "Update Tanda Terima Berhasil",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      if (err.response.data.code === 400) {
        Swal.fire({
          icon: "error",
          title: "Update Tanda Terima Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log("update tanda terima", err.response.data.code);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  // UPDATE STATUS TANDA TERIMA SERVICE
  const [idTT4, setidTT4] = useState(0);
  const [data4, setdata4] = useState(null);

  const searchTT4 = async () => {
    try {
      const response = await axios.get(`${API_SERVICE}/` + idTT4, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });

      setdata4(response.data.data);
    } catch (error) {
      if (error.response.data.code === 404) {
        Swal.fire({
          icon: "info",
          title: "Data Tidak Ada!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log("get all", error.response.data.code);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  const [status, setstatus] = useState("");

  const updateStatus = async (e) => {
    e.preventDefault();

    const request = {
      statusEnd: status,
    };

    try {
      await axios.put(
        `${API_EDIT_DATA}/update_status_tt_service/` + idTT,
        request,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Update Status Service Berhasil",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      if (err.response.data.code === 400) {
        Swal.fire({
          icon: "error",
          title: "Update Status Service Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log("Update Status Service", err.response.data.code);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  // HAPUS STATUS
  const [idTT5, setidTT5] = useState(0);
  const [dataStatus, setdataStatus] = useState([]);

  const searchStatusService = async () => {
    try {
      const response = await axios.get(`${API_SERVICE}/status/` + idTT5, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });

      setdataStatus(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      if (error.response.data.code === 404) {
        Swal.fire({
          icon: "info",
          title: "Data Tidak Ada!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log("get all", error.response.data);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  useEffect(() => {
    searchStatusService();
  }, []);

  // HAPUS STATUS
  const hapusStatus = async (id) => {
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
          .delete(`${API_EDIT_DATA}/delete/` + id, {
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
          }).catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Poin Gagal Diubah!",
              showConfirmButton: false,
              timer: 1500,
            });
          })
      }
    });
  };

  const handleInputChange = (e) => {
    setpoin(e.target.value); // Update state when input value changes
  };

  const level = localStorage.getItem("level");
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
            Edit Data
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href={"/" + dashboard} className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
            <a href="/edit_data">
              <span>Edit Data </span>
            </a>
          </Breadcrumbs>
        </div>
        <main className="grid grid-cols-1 lg:grid-cols-3 items-start gap-3">
          <div className="bg-white shadow-lg p-3 my-5 rounded">
            <Typography variant="lead" className="capitalize font-medium">
              Edit Data
            </Typography>
            <hr />
            <ol className="mt-5">
              <li className="my-1">
                <button
                  className="text-gray-800 hover:bg-blue-50 flex items-center p-2 rounded-lg dark:text-white group w-full"
                  onClick={() => toggleElement("b_service")}
                >
                  <PencilIcon className="w-6 h-5" />
                  <span className=" ms-3 whitespace-nowrap">
                    Edit Biaya Service
                  </span>
                </button>
              </li>
              <li className="my-1">
                <button
                  className="text-gray-800 hover:bg-blue-50 flex items-center p-2 rounded-lg dark:text-white group w-full"
                  onClick={() => toggleElement("poin")}
                >
                  <PencilIcon className="w-6 h-5" />
                  <span className=" ms-3 whitespace-nowrap">Edit Poin</span>
                </button>
              </li>
              <li className="my-1">
                <button
                  className="text-gray-800 hover:bg-blue-50 flex items-center p-2 rounded-lg dark:text-white group w-full"
                  onClick={() => toggleElement("tanda_terima")}
                >
                  <PencilIcon className="w-6 h-5" />
                  <span className=" ms-3 whitespace-nowrap">
                    Edit Tanda Terima
                  </span>
                </button>
              </li>
              <li className="my-1">
                <button
                  className="text-gray-800 hover:bg-blue-50 flex items-center p-2 rounded-lg dark:text-white group w-full"
                  onClick={() => toggleElement("status_tanda_terima")}
                >
                  <PencilIcon className="w-6 h-5" />
                  <span className=" ms-3 whitespace-nowrap">
                    Edit Status Tanda Terima
                  </span>
                </button>
              </li>
              <li className="my-1">
                <button
                  className="text-gray-800 hover:bg-blue-50 flex items-center p-2 rounded-lg dark:text-white group w-full"
                  onClick={() => toggleElement("hapus_status")}
                >
                  <TrashIcon className="w-6 h-5" />{" "}
                  <span className=" ms-3 whitespace-nowrap">Hapus Status</span>
                </button>
              </li>
            </ol>
          </div>
          <div className="bg-white shadow-lg p-3 my-5 rounded lg:col-span-2">
            <div id="b_service" hidden>
              <Typography variant="lead" className="capitalize font-medium">
                Biaya Service{" "}
              </Typography>
              <hr />
              <div className="flex gap-2 mt-5 items-center">
                <Input
                  label="Tanda Terima"
                  variant="outlined"
                  color="blue"
                  size="lg"
                  placeholder="Cari Tanda Terima"
                  id="id_tt"
                  onChange={(e) => setidTT(e.target.value)}
                />
                <IconButton color="blue" onClick={searchTT}>
                  <MagnifyingGlassIcon className="w-6 h-6" />
                </IconButton>
              </div>
              <br />
              <div id="resultService">
                {data ? (
                  <>
                    <div className="border border-gray-300 py-4 px-3 rounded">
                      <ol>
                        <li className="mb-2">
                          <div className="flex items-center gap-3">
                            <label
                              htmlFor=""
                              className="w-32 text-center text-sm"
                            >
                              Tanda Terima
                            </label>
                            <p className="w-full">{data?.idTT}</p>
                          </div>
                        </li>
                        <li className="mb-2">
                          <div className="flex items-center gap-3">
                            <label
                              htmlFor=""
                              className="w-32 text-center text-sm"
                            >
                              Nama
                            </label>
                            <p className="w-full">{data?.nama}</p>
                          </div>
                        </li>
                        <li className="mb-2">
                          <div className="flex items-center gap-3">
                            <label
                              htmlFor=""
                              className="w-32 text-center text-sm"
                            >
                              Biaya Sparepart
                            </label>
                            <div className="block w-full">
                              <Input
                                type="number"
                                variant="outlined"
                                defaultValue={0}
                                color="blue"
                                onChange={(e) =>
                                  setbiayaSparepart(e.target.value)
                                }
                                required
                              />
                              <i className="text-sm mt-2">
                                * isi 0 jika kosong
                              </i>
                            </div>{" "}
                          </div>
                        </li>
                        <li className="mb-2">
                          <div className="flex items-center gap-3">
                            <label
                              htmlFor=""
                              className="w-32 text-center text-sm"
                            >
                              Biaya Service
                            </label>
                            <div className="block w-full">
                              <Input
                                type="number"
                                variant="outlined"
                                defaultValue={0}
                                color="blue"
                                onChange={(e) =>
                                  setbiayaService(e.target.value)
                                }
                                required
                              />
                              <i className="text-sm mt-2">
                                * isi 0 jika kosong
                              </i>
                            </div>{" "}
                          </div>
                        </li>
                      </ol>
                      <div className="flex justify-end">
                        <Button
                          color="blue"
                          variant="gradient"
                          size="md"
                          onClick={updateBiayaService}
                        >
                          Simpan
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="border border-gray-300 py-4 px-3 rounded">
                      <h1 className="font-semibold text-lg">Data Tidak Ada!</h1>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div id="poin" hidden>
              <Typography variant="lead" className="capitalize font-medium">
                Edit Poin{" "}
              </Typography>
              <hr />
              <div className="flex gap-2 mt-5 items-center">
                <Input
                  label="Tanda Terima"
                  variant="outlined"
                  color="blue"
                  size="lg"
                  placeholder="Cari Tanda Terima"
                  onChange={(e) => setidTT2(e.target.value)}
                />
                <IconButton onClick={searchPoinsService} color="blue">
                  <MagnifyingGlassIcon className="w-6 h-6" />
                </IconButton>
              </div>
              <br />
              <div id="resultPoin">
                {poins.length > 0 ? (
                  <>
                    <div className="border border-gray-300 py-4 px-3 rounded">
                      <table className="border border-collapse w-full">
                        <thead>
                          <tr>
                            <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2 px-2">
                              Nama
                            </th>
                            <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2 px-2">
                              Poin
                            </th>
                            <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2 px-2">
                              Ket
                            </th>
                            <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2 px-2">
                              Aksi
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {poins.map((row, index) => (
                            <tr key={index}>
                              <td className="text-sm text-center py-2 px-2 border-gray-300 border">
                                {row.teknisi.nama}
                              </td>
                              <td className="text-sm text-center py-2 px-2 border-gray-300 border">
                                <Input
                                  variant="outlined"
                                  size="md"
                                  color="blue"
                                  defaultValue={row.poin}
                                  onChange={(e) => setpoin(e.target.value)}
                                />
                              </td>
                              <td className="text-sm text-center py-2 px-2 border-gray-300 border">
                                {row.keterangan}
                              </td>
                              <td className="text-sm text-center py-2 px-2 border-gray-300 border">
                                <IconButton
                                  color="blue"
                                  onClick={() => updatePoin(row.id)}
                                >
                                  <BookmarkIcon className="w-6 h-6" />
                                </IconButton>{" "}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="border border-gray-300 py-4 px-3 rounded">
                      <h1 className="font-semibold text-lg">Data Tidak Ada!</h1>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div id="tanda_terima" hidden>
              <Typography variant="lead" className="capitalize font-medium">
                Edit Tanda Terima
              </Typography>
              <hr />
              <div className="flex gap-2 mt-5 items-center">
                <Input
                  label="Tanda Terima"
                  variant="outlined"
                  color="blue"
                  size="lg"
                  placeholder="Cari Tanda Terima"
                  onChange={(e) => setidTT3(e.target.value)}
                />
                <IconButton onClick={searchTT3} color="blue">
                  <MagnifyingGlassIcon className="w-6 h-6" />
                </IconButton>
              </div>
              <br />
              <div id="resultTandaTerima">
                {data3 ? (
                  <>
                    <div className="border border-gray-300 py-4 px-3 rounded">
                      <ol>
                        <li className="mb-2">
                          <div className="flex items-center gap-3">
                            <label
                              htmlFor=""
                              className="w-32 text-center text-sm"
                            >
                              TT Lama
                            </label>
                            <p className="w-full">{data3?.idTT}</p>
                          </div>
                        </li>
                        <li className="mb-2">
                          <div className="flex items-center gap-3">
                            <label
                              htmlFor=""
                              className="w-32 text-center text-sm"
                            >
                              Nama
                            </label>
                            <p className="w-full">{data3?.nama}</p>
                          </div>
                        </li>
                        <li className="mb-2">
                          <div className="flex items-center gap-3">
                            <label
                              htmlFor=""
                              className="w-32 text-center text-sm"
                            >
                              TT Baru
                            </label>
                            <Input
                              type="number"
                              variant="outlined"
                              color="blue"
                              required
                              onChange={(e) => setidTandaTerima(e.target.value)}
                            />
                          </div>
                        </li>
                      </ol>
                      <div className="flex justify-end mt-4">
                        <Button
                          variant="gradient"
                          color="blue"
                          size="md"
                          onClick={updateTandaTerima}
                        >
                          Simpan
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="border border-gray-300 py-4 px-3 rounded">
                      <h1 className="font-semibold text-lg">Data Tidak Ada!</h1>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div id="status_tanda_terima" hidden>
              <Typography variant="lead" className="capitalize font-medium">
                Edit Status Tanda Terima{" "}
              </Typography>
              <hr />
              <div className="flex gap-2 mt-5 items-center">
                <Input
                  label="Tanda Terima"
                  variant="outlined"
                  color="blue"
                  size="lg"
                  placeholder="Cari Tanda Terima"
                  onChange={(e) => setidTT4(e.target.value)}
                />
                <IconButton onClick={searchTT4} color="blue">
                  <MagnifyingGlassIcon className="w-6 h-6" />
                </IconButton>
              </div>
              <br />
              <div id="resultStatusTandaTerima">
                {data4 ? (
                  <>
                    <div className="border border-gray-300 py-4 px-3 rounded">
                      <ol>
                        <li className="mb-2">
                          <div className="flex items-center gap-3">
                            <label
                              htmlFor=""
                              className="w-32 text-center text-sm"
                            >
                              TT Lama
                            </label>
                            <p className="w-full"> {data4?.idTT}</p>
                          </div>
                        </li>
                        <li className="mb-2">
                          <div className="flex items-center gap-3">
                            <label
                              htmlFor=""
                              className="w-32 text-center text-sm"
                            >
                              Status
                            </label>
                            <p className="w-full">{data4?.statusEnd}</p>
                          </div>
                        </li>
                        <li className="mb-2">
                          <div className="flex items-center gap-3">
                            <label
                              htmlFor=""
                              className="w-32 text-center text-sm"
                            >
                              Edit Status
                            </label>
                            <select
                              id="status"
                              onChange={(e) => setstatus(e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              required
                            >
                              <option value="READY_S">Ready (Sparepart)</option>
                              <option value="READY_T">Ready (Teknisi)</option>
                              <option value="CANCEL_S">
                                Cancel (Sparepart)
                              </option>
                              <option value="CANCEL_T">Cancel (Teknisi)</option>
                            </select>
                          </div>
                        </li>
                      </ol>
                      <div className="flex justify-end">
                        <Button
                          variant="gradient"
                          size="md"
                          color="blue"
                          onClick={updateStatus}
                        >
                          Simpan
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="border border-gray-300 py-4 px-3 rounded">
                      <h1 className="font-semibold text-lg">Data Tidak Ada!</h1>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div id="hapus_status" hidden>
              <Typography variant="lead" className="capitalize font-medium">
                Hapus Tanda Terima{" "}
              </Typography>
              <hr />
              <div className="flex gap-2 mt-5 items-center">
                <Input
                  label="Tanda Terima"
                  variant="outlined"
                  color="blue"
                  size="lg"
                  placeholder="Cari Tanda Terima"
                  onChange={(e) => setidTT5(e.target.value)}
                />
                <IconButton onClick={searchStatusService} color="blue">
                  <MagnifyingGlassIcon className="w-6 h-6" />
                </IconButton>
              </div>
              <br />
              <div id="resultHapusTandaTerima">
                {dataStatus.length > 0 ? (
                  <>
                    <div className="border border-gray-300 py-4 px-3 rounded">
                      <div className="overflow-x-auto">
                        <table className="border border-collapse w-full">
                          <thead>
                            <tr>
                              <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">
                                No
                              </th>
                              <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">
                                Tanggal
                              </th>
                              <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">
                                Teknisi
                              </th>
                              <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">
                                Status
                              </th>
                              <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">
                                Solusi
                              </th>
                              <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">
                                Ket
                              </th>
                              <th className="border-gray-300 border bg-gray-200 font-normal text-sm py-2">
                                Aksi
                              </th>
                            </tr>
                          </thead>
                          <tbody id="tabless">
                            {dataStatus.map((row, index) => (
                              <tr key={index}>
                                <td className="text-sm text-center py-2 px-2 border-gray-300 border">
                                  {index + 1}
                                </td>
                                <td className="text-sm text-center py-2 px-2 border-gray-300 border">
                                  {formatDate(row.tanggal)}
                                </td>
                                <td className="text-sm text-center py-2 px-2 border-gray-300 border">
                                  {row.service.teknisi.nama}
                                </td>
                                <td className="text-sm text-center py-2 px-2 border-gray-300 border">
                                  {row.status}
                                </td>
                                <td className="text-sm text-center py-2 px-2 border-gray-300 border">
                                  {row.solusi}
                                </td>
                                <td className="text-sm text-center py-2 px-2 border-gray-300 border">
                                  {row.ket}
                                </td>
                                <td className="text-sm text-center py-2 px-2 border-gray-300 border">
                                  <IconButton
                                    color="red"
                                    onClick={() => hapusStatus(row.id)}
                                  >
                                    <TrashIcon className="w-6 h-6" />
                                  </IconButton>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="border border-gray-300 py-4 px-3 rounded">
                      <h1 className="font-semibold text-lg">Data Tidak Ada!</h1>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default EditData;
