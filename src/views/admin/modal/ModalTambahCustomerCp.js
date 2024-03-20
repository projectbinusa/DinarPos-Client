import React, { useEffect, useState } from "react";
import {
  API_CUSTOMER,
  API_CUSTOMER_CP,
  API_SALESMAN,
} from "../../../utils/BaseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, DialogBody, DialogFooter, DialogHeader, Input } from "@material-tailwind/react";
import ReactSelect from "react-select";
import {
  AcademicCapIcon,
  AtSymbolIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ModalTambahCustomerCp({ handleOpen }) {
  const [customers, setCustomer] = useState([]);
  const [salesmans, setsalesmans] = useState([]);

  const [salesmanId, setsalesmanId] = useState(0);
  const [customerId, setcustomerId] = useState(0);
  const [namaCp, setnamaCp] = useState("");
  const [jabatan, setjabatan] = useState("");
  const [email, setemail] = useState("");
  const [noTelp, setnoTelp] = useState("");

  const history = useHistory();

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
      }else {
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

  return (
    <div>
      {" "}
      <DialogHeader>Tambah Customer CP</DialogHeader>
      <form onSubmit={addCustomerCp}>
        <DialogBody className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <label
              htmlFor="salesman"
              className="text-[14px] text-blue-gray-400"
            >
              Salesman
            </label>
            <ReactSelect
              id="salesman"
              options={salesmans.map((down) => {
                return {
                  value: down.idSalesman,
                  label: down.namaSalesman,
                };
              })}
              placeholder="Pilih Salesman"
              styles={customStyles}
              onChange={(selectedOption) => setsalesmanId(selectedOption.value)}
            />
            <hr className="mt-1 bg-gray-400 h-[0.1em]" />
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
              onChange={(selectedOption) => setcustomerId(selectedOption.value)}
            />
            <hr className="mt-1 bg-gray-400 h-[0.1em]" />
          </div>
          <Input
            color="blue"
            variant="static"
            label="Nama CP"
            placeholder="Masukkan Nama CP"
            icon={<UserCircleIcon />}
            onChange={(e) => setnamaCp(e.target.value)}
          />
          <Input
            color="blue"
            variant="static"
            label="Jabatan"
            placeholder="Masukkan Jabatan Customer"
            icon={<AcademicCapIcon />}
            onChange={(e) => setjabatan(e.target.value)}
          />
          <Input
            color="blue"
            variant="static"
            label="Email"
            type="email"
            placeholder="Masukkan Email Customer"
            icon={<AtSymbolIcon />}
            onChange={(e) => setemail(e.target.value)}
          />
          <Input
            color="blue"
            variant="static"
            label="No Telp"
            type="number"
            placeholder="Masukkan No Telp Customer"
            icon={<PhoneIcon />}
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
    </div>
  );
}

export default ModalTambahCustomerCp;
