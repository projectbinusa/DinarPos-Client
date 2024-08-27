import React from "react";

function PrintKunjungan() {
  return (
    <div className="mx-5 my-3">
      <div className=" my-3">
        {/* <h3 className="text-sm">
          Print Kunjungan
          <span className="block">
            Jl. Bulustalan 1 No.27 Semarang 087729244899
          </span>
        </h3> */}
      </div>
      <hr /> <br />
      <h1 className="text-center">BUKTI PEMBELIAN</h1>
      <br />
      <br />
      <table className="table-auto w-full">
        <thead>
          <tr className="border-b py-1">
            <th className="text-sm py-1">No</th>
            <th className="text-sm py-1">Kode Barang</th>
            <th className="text-sm py-1">Nama Barang</th>
            <th className="text-sm py-1">Jumlah</th>
            <th className="text-sm py-1">Harga Satuan</th>
            <th className="text-sm py-1">Diskon</th>
            <th className="text-sm py-1">Total</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default PrintKunjungan;
