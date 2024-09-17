import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { API_PLANNING } from "../../../utils/BaseUrl";
import {
  Button,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";

function LaporanPlanning() {
  const [created_date, setcreated_date] = useState("");
  const [tgl, settgl] = useState("");
  const [selectedITC, setSelectedITC] = useState("");
  const [planning, setPlanning] = useState([]);

  useEffect(() => {
    const fetchPlanningData = async () => {
      try {
        const response = await fetch(API_PLANNING);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPlanning(data);
      } catch (error) {
        console.error("Error fetching planning data:", error);
      }
    };

    fetchPlanningData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi tanggal
    if (!created_date || !tgl) {
      alert("Tanggal awal dan akhir harus diisi.");
      return;
    }

    if (new Date(created_date) > new Date(tgl)) {
      alert("Tanggal akhir harus setelah tanggal awal.");
      return;
    }

    // Contoh data yang akan dikirim
    const formData = {
      tanggalAwal: created_date,
      tanggalAkhir: tgl,
      itc: selectedITC,
    };

    // Proses formData (misalnya kirim ke server)
    console.log("Form data submitted:", formData);
  };

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen overflow-x-auto">
      <SidebarAdmin />
      <div className="lg:ml-[18rem] ml-0 pt-24 lg:pt-5 w-full px-5">
        <Typography variant="lead" className="uppercase text-gray-700 mb-4">
          Report
        </Typography>

        <div className="bg-white shadow-lg p-6 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="w-full lg:w-[50%]">
                <Input
                  variant="outlined"
                  color="blue"
                  type="date"
                  label="Tanggal Awal"
                  value={created_date}
                  onChange={(e) => setcreated_date(e.target.value)}
                  required
                />
              </div>
              <div className="w-full lg:w-[50%]">
                <Input
                  variant="outlined"
                  color="blue"
                  type="date"
                  label="Tanggal Akhir"
                  value={tgl} 
                  onChange={(e) => settgl(e.target.value)}
                  required
                />
              </div>
              <div className="w-full lg:w-[50%]">
                <Select
                  variant="static"
                  label="ITC"
                  value={selectedITC}
                  onChange={(value) => setSelectedITC(value)}
                  required
                >
                  <Option value="">ALL</Option>
                  <Option value="ITC1">ITC1</Option>
                  <Option value="ITC2">ITC2</Option>
                  <Option value="ITC3">ITC3</Option>
                </Select>
              </div>
              <div className="flex items-end">
                <Button type="submit" color="blue" className="w-full lg:w-auto">
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LaporanPlanning;
