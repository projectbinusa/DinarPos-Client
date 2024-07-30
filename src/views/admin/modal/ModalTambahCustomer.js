import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { API_CUSTOMER, API_SALESMAN } from "../../../utils/BaseUrl";
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
  AtSymbolIcon,
  MapPinIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

function ModalTambahCustomer({ handleOpen }) {
  const [alamat, setalamat] = useState("");
  const [email, setemail] = useState("");
  const [jenis, setjenis] = useState("");
  const [namaCustomer, setnamaCustomer] = useState("");
  const [noTelp, setnoTelp] = useState("");
  const [salesmanId, setsalesmanId] = useState(0);

  const [salesman, setsalesman] = useState([]);
  const history = useHistory();

  // GET ALL SALESMAN
  const allSalesman = async () => {
    try {
      const response = await axios.get(`${API_SALESMAN}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setsalesman(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allSalesman();
  }, []);

  // ADD CUSTOMER
  const addCustomer = async (e) => {
    e.preventDefault();

    const request = {
      alamat: alamat,
      email: email,
      id_salesman: salesmanId,
      jenis: jenis,
      nama_customer: namaCustomer,
      not_telp: noTelp,
    };

    try {
      await axios.post(`${API_CUSTOMER}/add`, request, {
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
          title: "Email dan No Telepon Sudah Ada!",
          text: "Email dan No Telepon Tidak Boleh Sama!",
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
  const [valuesSalesmanModal, setvaluesSalesmanModal] = useState("");
  const [optionsSalesmanModal, setoptionsSalesmanModal] = useState([]);
  const [currentPageSalesmanModal, setCurrentPageSalesmanModal] = useState(1);

  const handleSalesmanmodal = async () => {
    if (valuesSalesmanModal.trim() !== "") {
      const response = await fetch(
        `${API_SALESMAN}/pagination?limit=10&page=${currentPageSalesmanModal}&search=${valuesSalesmanModal}&sort=1`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setoptionsSalesmanModal(data.data);
      console.log(data.data);
    } else {
      return;
    }
  };

  useEffect(() => {
    handleSalesmanmodal();
  }, [currentPageSalesmanModal, valuesSalesmanModal]);

  const handleChangeSalesmanmodal = (event) => {
    setvaluesSalesmanModal(event.target.value);
    setCurrentPageSalesmanModal(1);
  };
  // END ALL SALESMAN

  return (
    <div>
      <DialogHeader>Tambah Customer</DialogHeader>
      <form onSubmit={addCustomer}>
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
                handleChangeSalesmanmodal(event);
                setsalesmanId(event.target.value);
              }}
              placeholder="Pilih Salesman"
            />
            <datalist id="modal-salesman-list">
              {optionsSalesmanModal.length > 0 && (
                <>
                  {optionsSalesmanModal.map((option2) => (
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
                onClick={() => setCurrentPageSalesmanModal(currentPageSalesmanModal - 1)}
                disabled={currentPageSalesmanModal === 1}
              >
                Prev
              </button>
              <button
                className="text-sm bg-gray-400 px-1"
                onClick={() => setCurrentPageSalesmanModal(currentPageSalesmanModal + 1)}
                disabled={!optionsSalesmanModal.length}
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
            <label htmlFor="jenis" className="text-[14px] text-blue-gray-400">
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
          <div className="lg:mt-5">
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

export default ModalTambahCustomer;
