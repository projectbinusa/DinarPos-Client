import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../component/SidebarAdmin";
import {
  Breadcrumbs,
  Typography,
  Button,
  IconButton,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  InformationCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { API_SERVICE } from "../../utils/BaseUrl";
import $ from "jquery";
import "datatables.net";
import "../../assets/styles/datatables.css";
import Swal from "sweetalert2";
import formatDate from "../../component/FormatDate";
import DataTable from "react-data-table-component";
import customStylesTables from "../../assets/styles/stylesreacttables";

function AllByDate({ pilih, tglAwal, tglAkhir }) {
  const [services, setservicesFilter] = useState([]);
  const [tglKonfirm, setTglKonfirm] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(services);

  const getAllServiceFilter = async () => {
    try {
      const response = await axios.get(
        `${API_SERVICE}/tanggal?status=${pilih}&tanggal_akhir=${tglAkhir}&tanggal_awal=${tglAwal}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setservicesFilter(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    const filtered = services.filter((item) => {
      return (
        item.customer?.nama_customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customer?.alamat?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.produk?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.merk?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredData(filtered);
  }, [searchTerm, services]);

  useEffect(() => {
    getAllServiceFilter()
  }, [pilih, tglAwal, tglAkhir])

  const tglKonfirmasi = async (transactionId) => {
    try {
      const response = await axios.get(
        `${API_SERVICE}/tgl_konfirm?id=${transactionId}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      return response.data.data;
    } catch (error) {
      console.log("tglKonfirmasi", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchTglKonfirm = async () => {
      const tglObj = {};
      await Promise.all(
        services.map(async (service) => {
          const tglData = await tglKonfirmasi(service.idTT);
          tglObj[service.idTT] = tglData;
        })
      );
      setTglKonfirm(tglObj);
    };

    fetchTglKonfirm();
  }, [services]);

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      width: "50px",
    },
    {
      name: "Nama",
      selector: (row) => row.customer.nama_customer,
    },
    {
      name: "Alamat",
      selector: (row) => row.customer.alamat,
    },
    {
      name: "Produk",
      selector: (row) => (
        <p className="text-center">
          {row.produk}
          <span className="block">{row.merk}</span>
          <span className="block">{row.type}</span>
        </p>
      ),
    },
    {
      name: "Status",
      selector: (row) => row.statusEnd,
    },
    {
      name: "In",
      selector: (row) => formatDate(row.tanggalMasuk),
    },
    {
      name: "C",
      cell: (row, index) => {
        const tglKonfirms = tglKonfirm[row.idTT] || [];
        return (
          <ul>
            {tglKonfirms.map((down, idx) => (
              <li key={idx}>{formatDate(down.tglKonf)}</li>
            ))}
          </ul>
        );
      },
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="text-xs py-2 px-3 flex items-center justify-center">
          <div className="flex flex-row gap-3">
            <a href={"/detail_service_teknisi/" + row.idTT}>
              <IconButton size="md" color="green">
                <InformationCircleIcon className="w-6 h-6 white" />
              </IconButton>
            </a>
          </div>
        </div>

      ),
    },
  ];

  return (
    <div className="rounded mt-10 p-2 w-full overflow-x-auto">
      <Input
        variant="outlined" color="blue" label="Cari Data"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      /> <br />
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        noDataComponent="Tidak ada data tersedia"
        customStyles={customStylesTables}
        responsive
      />
    </div>
  )
}


function DashboardTeknisi() {
  const [services, setservices] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pilih, setPilih] = useState("");
  const [startDateInput, setStartDateInput] = useState("");
  const [endDateInput, setEndDateInput] = useState("");
  const [pilihInput, setPilihInput] = useState("");

  const [tglKonfirm, setTglKonfirm] = useState([]);
  const [validasi, setvalidasi] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(services);

  // GET ALL SERVICE
  const getAllService = async () => {
    try {
      const response = await axios.get(`${API_SERVICE}/taken/N`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setservices(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  const tglKonfirmasi = async (transactionId) => {
    try {
      const response = await axios.get(
        `${API_SERVICE}/tgl_konfirm?id=${transactionId}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      return response.data.data;
    } catch (error) {
      console.log("tglKonfirmasi", error);
      return [];
    }
  };

  useEffect(() => {
    getAllService()
  }, [])

  useEffect(() => {
    const fetchTglKonfirm = async () => {
      const tglObj = {};
      await Promise.all(
        services.map(async (service) => {
          const tglData = await tglKonfirmasi(service.idTT);
          tglObj[service.idTT] = tglData;
        })
      );
      setTglKonfirm(tglObj);
    };

    fetchTglKonfirm();
  }, [services]);

  const filterTangggal = async () => {
    if (startDate === "" || endDate === "" || startDate === endDate || pilih === "") {
      Swal.fire({
        icon: "warning",
        title: "Isi Form Terlebih Dahulu!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    setEndDateInput(endDate);
    setStartDateInput(startDate);
    setPilihInput(pilih)
    setvalidasi(true);
  };

  useEffect(() => {
    const filtered = services.filter((item) => {
      return (
        item.customer?.nama_customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customer?.alamat?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.produk?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.merk?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredData(filtered);
  }, [searchTerm, services]);

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      width: "50px",
    },
    {
      name: "Nama",
      selector: (row) => row.customer.nama_customer,
    },
    {
      name: "Alamat",
      selector: (row) => row.customer.alamat,
    },
    {
      name: "Produk",
      selector: (row) => (
        <p className="text-center">
          {row.produk}
          <span className="block">{row.merk}</span>
          <span className="block">{row.type}</span>
        </p>
      ),
    },
    {
      name: "Status",
      selector: (row) => row.statusEnd,
    },
    {
      name: "In",
      selector: (row) => formatDate(row.tanggalMasuk),
    },
    {
      name: "C",
      cell: (row, index) => {
        const tglKonfirms = tglKonfirm[row.idTT] || []; // Pastikan `tglKonfirm` ada di setiap `row`
        return (
          <ul>
            {tglKonfirms.map((down, idx) => (
              <li key={idx}>{formatDate(down.tglKonf)}</li>
            ))}
          </ul>
        );
      },
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex items-center justify-center">
          <div className="flex flex-row gap-3">
            <a href={"/detail_service_teknisi/" + row.idTT}>
              <IconButton size="md" color="green">
                <InformationCircleIcon className="w-6 h-6 white" />
              </IconButton>
            </a>
          </div>
        </div>
      ),
    },
  ];
  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
          <Typography variant="lead" className="uppercase font-poppins">
            Dashboard
          </Typography>
          <Breadcrumbs className="bg-transparent">
            <a href="/dashboard_teknisi" className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-end mb-6 lg:justify-between">
            <div className="w-full">
              <Input
                type="date"
                id="startDate"
                label="Tanggal Awal"
                color="blue"
                variant="outlined"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Input
                type="date"
                id="endDate"
                label="Tanggal Akhir"
                color="blue"
                variant="outlined"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Select
                id="pilih"
                label="Status"
                color="blue"
                variant="outlined"
                required
                onChange={(value) => setPilih(value)}
                className="w-full"
              >
                <Option value="">Pilih</Option>
                <Option value="N_A">New Arrival</Option>
                <Option value="PROSES">Proses</Option>
                <Option value="READY">Ready</Option>
              </Select>
            </div>
            <div className="w-full lg:w-auto flex justify-start items-center">
              <Button
                variant="gradient"
                color="blue"
                onClick={filterTangggal}
                size="md"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
          {validasi ? <AllByDate pilih={pilihInput} tglAkhir={endDateInput} tglAwal={startDateInput} /> :
            <div className="rounded mt-10 p-2 w-full overflow-x-auto">
              <Input
                variant="outlined" color="blue" label="Cari Data"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              /> <br />
              <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                striped
                noDataComponent="Tidak ada data tersedia"
                customStyles={customStylesTables}
                responsive
              />
            </div>}
        </main>
      </div>
    </section>
  );
}

export default DashboardTeknisi;
