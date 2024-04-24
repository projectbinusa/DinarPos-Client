import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";

import $ from "jquery";
import "datatables.net";
import "./../../../../assets/styles/datatables.css";
import {
  API_CUSTOMER,
  API_CUSTOMER_CP,
  API_SALESMAN,
} from "../../../../utils/BaseUrl";
import axios from "axios";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ReactSelect from "react-select";

function DataCustomer() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const tableRef = useRef(null);

  const [customers, setCustomer] = useState([]);
  const [salesmans, setsalesmans] = useState([]);

  const [salesmanId, setsalesmanId] = useState(0);
  const [customerId, setcustomerId] = useState(0);
  const [namaCp, setnamaCp] = useState("");
  const [jabatan, setjabatan] = useState("");
  const [email, setemail] = useState("");
  const [noTelp, setnoTelp] = useState("");

  const history = useHistory();

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({});
  };

  // GET ALL CUSTOMER
  const getAll = async () => {
    try {
      const response = await axios.get(`${API_CUSTOMER}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setCustomer(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  // GET ALL SALESMAN
  const allSalesman = async () => {
    try {
      const response = await axios.get(`${API_SALESMAN}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setsalesmans(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAll();
    allSalesman();
  }, []);

  useEffect(() => {
    if (customers && customers.length > 0) {
      initializeDataTable();
    }
  }, [customers]);

  // DELETE CUSTOMER
  const deleteCustomer = async (id) => {
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
          .delete(`${API_CUSTOMER}/` + id, {
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
              history.push("/data_customer");
              window.location.reload();
            }, 1500);
          });
      }
    });
  };

  // ADD CUSTOMER CP
  const addCustomerCp = async (e) => {
    e.preventDefault();

    const request = {
      email: email,
      id_salesman: salesmanId,
      id_customer: customerId,
      jabatan: jabatan,
      nama_cp: namaCp,
      no_telp: noTelp,
    };

    try {
      await axios.post(`${API_CUSTOMER_CP}/add`, request, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/data_customer_cp");
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
      console.log(data);
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

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full lg:px-7 px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase">
            Data Customer
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
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded ">
          <div className="flex flex-col lg:flex-row gap-4">
            <a href="/add_customer">
              <Button variant="gradient" color="blue">
                Tambah Customer
              </Button>
            </a>
            <div>
              <Button onClick={handleOpen} variant="gradient" color="blue">
                Tambah customer cp
              </Button>
            </div>
          </div>
          <div className="rounded my-5 p-2 w-full overflow-auto">
            <table
              id="example_data"
              ref={tableRef}
              className="rounded-sm table-auto w-full"
            >
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold">No</th>
                  <th className="text-sm py-2 px-3 font-semibold">ITC</th>
                  <th className="text-sm py-2 px-3 font-semibold">Nama</th>
                  <th className="text-sm py-2 px-3 font-semibold">Jenis</th>
                  <th className="text-sm py-2 px-3 font-semibold">Alamat</th>
                  <th className="text-sm py-2 px-3 font-semibold">Email</th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    No Telepon
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {customers.length > 0 ? (
                  customers.map((customer, index) => (
                    <tr key={index}>
                      <td className="text-sm w-[4%]">{index + 1}</td>
                      <td className="text-sm py-2 px-3">
                        {customer.salesman.namaSalesman}
                      </td>
                      <td className="text-sm py-2 px-3">
                        {customer.nama_customer}
                      </td>
                      <td className="text-sm py-2 px-3">{customer.jenis}</td>
                      <td className="text-sm py-2 px-3">{customer.alamat}</td>
                      <td className="text-sm py-2 px-3">{customer.email}</td>
                      <td className="text-sm py-2 px-3">{customer.telp}</td>
                      <td className="text-sm py-2 px-3 flex items-center justify-center">
                        <div className="flex flex-col lg:flex-row gap-3">
                          <a href={"/edit_customer/" + customer.id}>
                            <IconButton size="md" color="light-blue">
                              <PencilIcon className="w-6 h-6 white" />
                            </IconButton>
                          </a>
                          <IconButton
                            size="md"
                            color="red"
                            type="button"
                            onClick={() => deleteCustomer(customer.id)}
                          >
                            <TrashIcon className="w-6 h-6 white" />
                          </IconButton>{" "}
                        </div>
                      </td>{" "}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-sm text-center capitalize py-3 bg-gray-100"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      {/* MODAL TAMBAH CUSTOMER CP */}
      <Dialog open={open} handler={handleOpen} size="lg">
        <DialogHeader>Tambah Customer CP</DialogHeader>
        <form onSubmit={addCustomerCp}>
          <DialogBody className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                      <option value={option.idSalesman}>
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
            <div>
              <label
                htmlFor="customer"
                className="text-[14px] text-blue-gray-400"
              >
                Customer
              </label>
              <ReactSelect
                id="customer"
                options={customers.map((down) => {
                  return {
                    value: down.id,
                    label: down.nama_customer,
                  };
                })}
                placeholder="Pilih Customer"
                styles={customStyles}
                onChange={(selectedOption) =>
                  setcustomerId(selectedOption.value)
                }
              />
              <hr className="mt-1 bg-gray-400 h-[0.1em]" />
            </div>
            <Input
              color="blue"
              variant="static"
              label="Nama CP"
              placeholder="Masukkan Nama CP"
              onChange={(e) => setnamaCp(e.target.value)}
            />
            <Input
              color="blue"
              variant="static"
              label="Jabatan"
              placeholder="Masukkan Jabatan Customer"
              onChange={(e) => setjabatan(e.target.value)}
            />
            <Input
              color="blue"
              variant="static"
              label="Email"
              type="email"
              placeholder="Masukkan Email Customer"
              onChange={(e) => setemail(e.target.value)}
            />
            <Input
              color="blue"
              variant="static"
              label="No Telp"
              type="number"
              placeholder="Masukkan No Telp Customer"
              onChange={(e) => setnoTelp(e.target.value)}
            />
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="gray"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Kembali</span>
            </Button>
            <Button
              variant="gradient"
              color="blue"
              onClick={handleOpen}
              type="submit"
            >
              <span>Simpan</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
      {/* END MODAL TAMBAH CUSTOMER CP */}
    </section>
  );
}

export default DataCustomer;
