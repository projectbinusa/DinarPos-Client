import React, { useState } from "react";

function CetakStrukExcelcom() {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("URL_API_ANDA");
      setReportData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (!reportData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>LAPORAN PEMBELIAN PER SUPPLIER EXCELCOM</h2>
      <p>Nama Supplier: {reportData.suplier.namaSuplier}</p>
      <p>Periode: {reportData.tanggal}</p>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>No Faktur</th>
            <th>Nama Barang</th>
            {/* Tambahkan kolom-kolom lain sesuai kebutuhan */}
          </tr>
        </thead>
        <tbody>
          {reportData.datafilter.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.noFaktur}</td>
              <td>{item.namaSuplier}</td>
              {/* Tambahkan sel lain sesuai kebutuhan */}
            </tr>
          ))}
        </tbody>
      </table>

      <p>Total Keseluruhan: {reportData.ttlBayarHemat}</p>
    </div>
  );
}

export default CetakStrukExcelcom;
