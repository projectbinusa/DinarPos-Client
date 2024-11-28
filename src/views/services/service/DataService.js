import React, { useEffect, useRef, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
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
import { API_PENGGUNA, API_SERVICE } from "../../../utils/BaseUrl";
import $ from "jquery";
import "datatables.net";
import "../../../assets/styles/datatables.css";
import Swal from "sweetalert2";
import Decrypt from "../../../component/Decrypt";
import formatDate from "../../../component/FormatDate";
import DataTable from "react-data-table-component";
import customStylesTables from "../../../assets/styles/stylesreacttables";

function AllBetweenDate({ pilih, tglAwal, tglAkhir }) {
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
            <a href={"/detail_service/" + row.idTT}>
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

function DataService() {
  const [services, setServices] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pilih, setPilih] = useState("");

  const [startDateInput, setStartDateInput] = useState("");
  const [endDateInput, setEndDateInput] = useState("");
  const [pilihInput, setPilihInput] = useState("");

  const [tglKonfirm, setTglKonfirm] = useState([]);
  const [validasi, setValidasi] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(services);

  // GET ALL
  const getAllService = async () => {
    try {
      const response = await axios.get(`${API_SERVICE}/taken/N`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setServices(response.data.data);
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
            <a href={"/detail_service/" + row.idTT}>
              <IconButton size="md" color="green">
                <InformationCircleIcon className="w-6 h-6 white" />
              </IconButton>
            </a>
          </div>
        </div>

      ),
    },
  ];

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

    setEndDateInput(endDate)
    setPilihInput(pilih)
    setStartDateInput(startDate)

    if (startDate !== "" || endDate !== "" || startDate !== endDate || pilih !== "") {
      setValidasi(true);
    }
  };

  useEffect(() => {
    getAllService()
  }, [])

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
          <Typography variant="lead" className="uppercase font-poppins">
            Data Service
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
          </Breadcrumbs>
        </div>
        <main className="bg-white shadow-lg p-5 my-5 rounded">
          <div className="flex justify-between items-center">
            <a href="/data_service_taken" className="mb-5">
              <Button variant="gradient" color="green" className="font-popins font-medium">
                Taken
              </Button>
            </a>
            <a href="/add_service" className="mb-5">
              <Button variant="gradient" color="blue" className="font-popins font-medium">
                Tambah
              </Button>
            </a>
          </div> <br />
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-end mb-4 lg:justify-between">
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
          </div>
          <div className="w-full lg:w-auto flex justify-start items-center">
            <Button
              variant="gradient"
              color="blue"
              onClick={filterTangggal}
              className="font-popins font-medium"
              size="md"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </Button>
          </div>

          {validasi ? <AllBetweenDate pilih={pilihInput} tglAkhir={endDateInput} tglAwal={startDateInput} /> :
            // <div className="rounded mt-10 p-2 w-full overflow-x-auto">
            //   <table
            //     id="example_data"
            //     ref={tableRef}
            //     className="rounded-sm table-auto w-full"
            //   >
            //     <thead className="bg-blue-500 text-white">
            //       <tr>
            //         <th className="text-xs py-2 px-3">No</th>
            //         <th className="text-xs py-2 px-3">Nama</th>
            //         <th className="text-xs py-2 px-3">Alamat </th>
            //         <th className="text-xs py-2 px-3">Produk</th>
            //         <th className="text-xs py-2 px-3">In </th>
            //         <th className="text-xs py-2 px-3">C </th>
            //         <th className="text-xs py-2 px-3">Status </th>
            //         <th className="text-xs py-2 px-3">Aksi</th>
            //       </tr>
            //     </thead>
            //     <tbody>
            //       {services.length > 0 ? (
            //         services.map((row, index) => {
            //           const tglKonfirms = tglKonfirm[index] || [];
            //           return (
            //             <tr key={index}>
            //               <td className="text-xs w-[4%]">{index + 1}</td>
            //               <td className="text-xs py-2 px-3">
            //                 {row.customer.nama_customer}
            //               </td>
            //               <td className="text-xs py-2 px-3">
            //                 {row.customer.alamat}
            //               </td>
            //               <td className="text-xs py-2 px-3">
            //                 {row.produk}
            //                 <span className="block">{row.merk}</span>
            //                 <span className="block">{row.type}</span>
            //               </td>
            //               <td className="text-xs py-2 px-3">
            //                 {formatDate(row.tanggalMasuk)}
            //               </td>
            //               <td className="text-xs py-2 px-3">
            //                 {tglKonfirms.map((down, idx) => (
            //                   <ul key={idx}>
            //                     <li>{formatDate(down.tglKonf)}</li>
            //                   </ul>
            //                 ))}
            //               </td>
            //               <td className="text-xs py-2 px-3">
            //                 {row.statusEnd}
            //               </td>
            //               <td className="text-xs py-2 px-3 flex items-center justify-center">
            //                 <div className="flex flex-row gap-3">
            //                   <a href={"/detail_service/" + row.idTT}>
            //                     <IconButton size="md" color="light-blue">
            //                       <InformationCircleIcon className="w-6 h-6 white" />
            //                     </IconButton>
            //                   </a>
            //                 </div>
            //               </td>
            //             </tr>
            //           );
            //         })
            //       ) : (
            //         <tr>
            //           <td
            //             colSpan="8"
            //             className="text-xs text-center capitalize py-3 bg-gray-100"
            //           >
            //             Tidak ada data
            //           </td>
            //         </tr>
            //       )}
            //     </tbody>
            //   </table>
            // </div>
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

export default DataService;
