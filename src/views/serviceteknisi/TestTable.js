import React, { useEffect, useRef, useState } from "react"
import { API_SERVICE } from "../../utils/BaseUrl";
import axios from "axios";
import $ from "jquery";
import SidebarAdmin from "../../component/SidebarAdmin";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";

// const MyDataTable = ({ services }) => {
//   // Definisikan kolom tabel, sesuai dengan format data di "services"
//   const columns = [
//     {
//       name: "No",
//       selector: (row, index) => index + 1,
//       width: "50px",
//     },
//     {
//       name: "Nama",
//       selector: (row) => row.customer.nama_customer,
//       sortable: true,
//     },
//     {
//       name: "Alamat",
//       selector: (row) => row.customer.alamat,
//       sortable: true,
//     },
//     {
//       name: "Status",
//       selector: (row) => row.statusEnd,
//       sortable: true,
//     },
//   ];

//   return (
//     <>
//       {services.length > 0 ?
//         <DataTable
//           columns={columns}
//           data={services}
//           pagination // Mengaktifkan fitur pagination
//           highlightOnHover
//           striped
//         /> : <DataTable
//           columns={columns}
//           data={services}
//           pagination // Mengaktifkan fitur pagination
//           noDataComponent="Tidak ada data tersedia" // Menampilkan pesan custom ketika data kosong
//         />}
//     </>
//   );
// };

const MyDataTable = ({ services, onEdit, onDetail }) => {
  // State untuk kata kunci pencarian dan data yang sudah difilter
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(services);

  // Definisikan kolom tabel, termasuk kolom aksi
  const columns = [
    {
      name: "No",
      selector: (row, index) => row.idTT,
      width: "50px",
    },
    {
      name: "Nama",
      selector: (row) => row.customer.nama_customer,
      sortable: true,
    },
    {
      name: "Alamat",
      selector: (row) => row.customer.alamat,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.statusEnd,
      sortable: true,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
            onClick={() => onEdit(row)}
          >
            Edit
          </button>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onDetail(row);
            }}
            className="text-blue-500 underline hover:text-blue-700"
          >
            Detail
          </a>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // Gunakan useEffect untuk memperbarui data yang difilter berdasarkan kata kunci pencarian
  useEffect(() => {
    const filtered = services.filter((item) =>
      item.customer.nama_customer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, services]);

  return (
    <div>
      {/* Input untuk pencarian */}
      <input
        type="text"
        placeholder="Cari Nama..."
        className="mb-4 px-4 py-2 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Tabel data */}
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        noDataComponent="Tidak ada data tersedia"
        customStyles={customStyles}
        responsive
      />
    </div>
  );
};

const customStyles = {
  headCells: {
    style: {
      backgroundColor: '#3b82f6', // Warna background header
      color: 'white',
      fontSize: '12px',
      textTransform: 'capitalize',
    },
  },
  cells: {
    style: {
      padding: '6px', // Padding sel tabel
      fontSize: '12px',
      color: '#333',
    },
  },
  rows: {
    style: {
      '&:not(:last-of-type)': {
        borderBottom: '1px solid #e5e7eb', // Border bawah antar baris
      },
    },
  },
};

function TestTableFilter({ pilih, tglAwal, tglAkhir }) {
  const tableRef2 = useRef(null);
  const [services, setservices] = useState([]);

  // const initializeDataTable2 = () => {
  //   console.log(services.length);
  //   console.log($.fn.DataTable.isDataTable(tableRef2.current));

  //   // if ($.fn.DataTable.isDataTable(tableRef2.current)) {
  //   // $('#example_data2').DataTable().destroy(); // Hancurkan instance sebelumnya
  //   // }

  //   if (services.length > 0) {
  //     $(tableRef2.current).DataTable({
  //       paging: true, // Aktifkan pagination jika data ada
  //       searching: false,
  //       info: false,
  //       data: services, // Set data ke DataTable
  //       columns: [
  //         { title: "No", data: null, render: (data, type, row, meta) => meta.row + 1 },
  //         { title: "Nama", data: "customer.nama_customer" },
  //         { title: "Alamat", data: "customer.alamat" },
  //         { title: "Status", data: "statusEnd" },
  //       ],
  //     });
  //   }
  // };

  const initializeDataTable2 = () => {
    if ($.fn.DataTable.isDataTable(tableRef2.current)) {
      $(tableRef2.current).DataTable().destroy();
    }

    // Menambahkan sedikit delay untuk memastikan DOM sudah sepenuhnya di-render oleh React
    setTimeout(() => {
      $(tableRef2.current).DataTable({
        paging: true,
        searching: true,
        info: true,
        destroy: true
      });
    }, 0); // Penundaan 0 ms untuk memaksa penundaan sampai stack eksekusi berikutnya
  };

  // GET ALL SERVICE
  const getAllServiceFilter = async () => {
    try {
      const response = await axios.get(`${API_SERVICE}/tanggal?status=${pilih}&tanggal_akhir=${tglAkhir}&tanggal_awal=${tglAwal}`, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`
        },
      });
      setservices(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllServiceFilter()
  }, [pilih, tglAkhir, tglAwal])

  useEffect(() => {
    if (services.length > 0) {
      initializeDataTable2();
    }
  }, [services]);

  useEffect(() => {
    return () => {
      if ($.fn.DataTable.isDataTable(tableRef2.current)) {
        $(tableRef2.current).DataTable().destroy();
      }
    };
  }, []);


  // useEffect(() => {
  //   const table = $(tableRef2.current);

  //   // Initialize DataTable if it's not already initialized and if services has data
  //   if (services.length > 0 && table.length && !$.fn.DataTable.isDataTable(tableRef2.current)) {
  //     console.log("initialize DataTable");
  //     table.DataTable({
  //       data: services,
  //       columns: [
  //         { title: "No", render: (data, type, row, meta) => meta.row + 1 },
  //         { title: "Nama", data: "customer.nama_customer" },
  //         { title: "Alamat", data: "customer.alamat" },
  //         { title: "Status", data: "statusEnd" },
  //       ],
  //       paging: true,
  //       retrieve: true, // Prevent re-initialization if already initialized
  //     });
  //   }

  //   // Clear DataTable if services is empty
  //   if (services.length === 0 && $.fn.DataTable.isDataTable(tableRef2.current)) {
  //     console.log("clear DataTable");
  //     table.DataTable().clear().draw();  // Clear table data without destroying
  //   }

  //   return () => {
  //     if ($.fn.DataTable.isDataTable(tableRef2.current)) {
  //       console.log("destroy DataTable");
  //       table.DataTable().destroy();
  //     }
  //   };
  // }, [services]);

  return (
    <div className="rounded mt-10 p-2 w-full overflow-x-auto">
      {/* {services.length > 0 ?
        <table
          id="example_data2"
          ref={tableRef2}
          className="rounded-sm table-auto w-full"
        >
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="text-xs py-2 px-3">No</th>
              <th className="text-xs py-2 px-3">Nama</th>
              <th className="text-xs py-2 px-3">Alamat </th>
              <th className="text-xs py-2 px-3">Status </th>
            </tr>
          </thead>
          <tbody>
            {services.map((row, index) => {
              return (
                <tr key={index}>
                  <td className="text-xs w-[4%]">{index + 1}</td>
                  <td className="text-xs py-2 px-3">
                    {row.customer.nama_customer}
                  </td>
                  <td className="text-xs py-2 px-3">
                    {row.customer.alamat}
                  </td>
                  <td className="text-xs py-2 px-3">
                    {row.statusEnd}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table> 
        : <table
          className="rounded-sm table-auto w-full"
        >
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="text-xs py-2 px-3">No</th>
              <th className="text-xs py-2 px-3">Nama</th>
              <th className="text-xs py-2 px-3">Alamat </th>
              <th className="text-xs py-2 px-3">Status </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan="4"
                className="text-xs text-center capitalize py-3 bg-gray-100">
                Tidak ada data
              </td>
            </tr>
          </tbody>
        </table>} */}

      {/* <table
        id="example_data2"
        ref={tableRef2}
        className="rounded-sm table-auto w-full"
      >
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="text-xs py-2 px-3">No</th>
            <th className="text-xs py-2 px-3">Nama</th>
            <th className="text-xs py-2 px-3">Alamat </th>
            <th className="text-xs py-2 px-3">Status </th>
          </tr>
        </thead>
        <tbody>
          {services.map((row, index) => (
            <tr key={index}>
              <td className="text-xs w-[4%]">{index + 1}</td>
              <td className="text-xs py-2 px-3">
                {row.customer.nama_customer}
              </td>
              <td className="text-xs py-2 px-3">
                {row.customer.alamat}
              </td>
              <td className="text-xs py-2 px-3">
                {row.statusEnd}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <MyDataTable services={services} />
    </div>
  )
}

function TestTable() {
  const tableRef = useRef(null);
  const [services, setservices] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pilih, setPilih] = useState("");
  const [validasi, setvalidasi] = useState(false);
  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }
    $(tableRef.current).DataTable();
  };

  const updateTableData = (data) => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      const table = $(tableRef.current).DataTable();
      table.clear().rows.add(data).draw(); // Clear and add new data
    }
  };

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

  useEffect(() => {
    getAllService()
  }, [])

  useEffect(() => {
    if (services.length > 0) {
      initializeDataTable();
    } else {
      updateTableData(services);
    }
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

    setvalidasi(true)
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5 overflow-x-auto">
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
          {validasi ? <TestTableFilter pilih={pilih} tglAkhir={endDate} tglAwal={startDate} /> :
            <div className="rounded mt-10 p-2 w-full overflow-x-auto">
              <table
                id="example_data"
                ref={tableRef}
                className="rounded-sm table-auto w-full"
              >
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="text-xs py-2 px-3">No</th>
                    <th className="text-xs py-2 px-3">Nama</th>
                    <th className="text-xs py-2 px-3">Alamat </th>
                    <th className="text-xs py-2 px-3">Status </th>
                  </tr>
                </thead>
                <tbody>
                  {services.length > 0 ? (
                    services.map((row, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-xs w-[4%]">{index + 1}</td>
                          <td className="text-xs py-2 px-3">
                            {row.customer.nama_customer}
                          </td>
                          <td className="text-xs py-2 px-3">
                            {row.customer.alamat}
                          </td>
                          <td className="text-xs py-2 px-3">
                            {row.statusEnd}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-xs text-center capitalize py-3 bg-gray-100"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>}
        </main>
      </div>
    </section>
  )
}
export default TestTable
