import React, { useEffect, useState } from "react";
import {
  API_CUSTOMER,
  API_CUSTOMER_CP,
  API_SALESMAN,
} from "../../../utils/BaseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Button,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
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

  // ALL CUSTOMER
  const [valuesCustomerModalCP, setvaluesCustomerModalCP] = useState("");
  const [optionsCustomerModalCP, setoptionsCustomerModalCP] = useState([]);
  const [currentPageCustomerModalCP, setCurrentPageCustomerModalCP] =
    useState(1);

  const handleCustomermodalCP = async () => {
    if (valuesCustomerModalCP.trim() !== "") {
      const response = await fetch(
        `${API_CUSTOMER}/pagination?limit=10&page=${currentPageCustomerModalCP}&search=${valuesCustomerModalCP}&sort=1`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setoptionsCustomerModalCP(data.data);
      console.log(data.data);
    } else {
      return;
    }
  };

  useEffect(() => {
    handleCustomermodalCP();
  }, [currentPageCustomerModalCP, valuesCustomerModalCP]);

  const handleChangeCustomermodalCP = (event) => {
    setvaluesCustomerModalCP(event.target.value);
    setCurrentPageCustomerModalCP(1);
  };
  // END ALL CUSTOMER

  // ALL SALESMAN
  const [valuesSalesmanModalCP, setvaluesSalesmanModalCP] = useState("");
  const [optionsSalesmanModalCP, setoptionsSalesmanModalCP] = useState([]);
  const [currentPageSalesmanModalCP, setCurrentPageSalesmanModalCP] =
    useState(1);

  const handleSalesmanmodalCP = async () => {
    if (valuesSalesmanModalCP.trim() !== "") {
      const response = await fetch(
        `${API_SALESMAN}/pagination?limit=10&page=${currentPageSalesmanModalCP}&search=${valuesSalesmanModalCP}&sort=1`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setoptionsSalesmanModalCP(data.data);
      console.log(data.data);
    } else {
      return;
    }
  };

  useEffect(() => {
    handleSalesmanmodalCP();
  }, [currentPageSalesmanModalCP, valuesSalesmanModalCP]);

  const handleChangeSalesmanmodalCP = (event) => {
    setvaluesSalesmanModalCP(event.target.value);
    setCurrentPageSalesmanModalCP(1);
  };
  // END ALL SALESMAN

  return (
    <div>
      {" "}
      <DialogHeader>Tambah Customer CP</DialogHeader>
      <form onSubmit={addCustomerCp}>
        <DialogBody className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex gap-2 items-end">
            <Input
              label="Salesman"
              variant="static"
              color="blue"
              list="modal-salesman-list"
              id="salesman-modal"
              name="salesman-modal"
              onChange={(event) => {
                handleChangeSalesmanmodalCP(event);
                setsalesmanId(event.target.value);
              }}
              placeholder="Pilih Salesman"
            />
            <datalist id="modal-salesman-list">
              {optionsSalesmanModalCP.length > 0 && (
                <>
                  {optionsSalesmanModalCP.map((option2) => (
                    <option value={option2.id}>
                      {option2.namaSalesman}
                    </option>
                  ))}
                </>
              )}
            </datalist>

            <div className="flex gap-2">
              <button
                className="text-sm bg-gray-400 px-1"
                onClick={() =>
                  setCurrentPageSalesmanModalCP(currentPageSalesmanModalCP - 1)
                }
                disabled={currentPageSalesmanModalCP === 1}
              >
                Prev
              </button>
              <button
                className="text-sm bg-gray-400 px-1"
                onClick={() =>
                  setCurrentPageSalesmanModalCP(currentPageSalesmanModalCP + 1)
                }
                disabled={!optionsSalesmanModalCP.length}
              >
                Next
              </button>
            </div>
          </div>
          <div className="flex gap-2 items-end">
            <Input
              label="Customer"
              variant="static"
              color="blue"
              list="modal-customer-list"
              id="customer-modal"
              name="customer-modal"
              onChange={(event) => {
                handleChangeCustomermodalCP(event);
                setcustomerId(event.target.value);
              }}
              placeholder="Pilih Customer"
            />
            <datalist id="modal-customer-list">
              {optionsCustomerModalCP.length > 0 && (
                <>
                  {optionsCustomerModalCP.map((option2) => (
                    <option value={option2.id}>{option2.nama_customer}</option>
                  ))}
                </>
              )}
            </datalist>

            <div className="flex gap-2">
              <button
                className="text-sm bg-gray-400 px-1"
                onClick={() =>
                  setCurrentPageCustomerModalCP(currentPageCustomerModalCP - 1)
                }
                disabled={currentPageCustomerModalCP === 1}
              >
                Prev
              </button>
              <button
                className="text-sm bg-gray-400 px-1"
                onClick={() =>
                  setCurrentPageCustomerModalCP(currentPageCustomerModalCP + 1)
                }
                disabled={!optionsCustomerModalCP.length}
              >
                Next
              </button>
            </div>
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
