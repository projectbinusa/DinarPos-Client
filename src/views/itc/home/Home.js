import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../../component/SidebarAdmin";
import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import { API_KUNJUNGAN, API_OMZET, API_PLANNING } from "../../../utils/BaseUrl";

function Home() {
  const [planning, setPlanning] = useState([]);
  const [kunjungan, setKunjungan] = useState([]);
  const [ttlOmzet, setTtlOmzet] = useState([]);

  const formatDate = (value) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };

  // GET ALL PLANNING
  const allPlanning = async () => {
    try {
      const response = await axios.get(`${API_PLANNING}/group/salesman`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setPlanning(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // GET ALL KUNJUNGAN
  const allKunjungan = async () => {
    try {
      const response = await axios.get(`${API_KUNJUNGAN}/group/salesman`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setKunjungan(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allPlanning();
    allKunjungan();
  }, []);

  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const totalOmzet = async (idx, itc) => {
    try {
      const response = await axios.get(`${API_OMZET}/bulan_tahun/salesman?bulan=${month}&id_salesman=${itc}&tahun=${year}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      if (response.data.data.length > 0) {
        const res = response.data.data[0].total_omzet || 0;
        setTtlOmzet(prevTotals => {
          const newTotals = [...prevTotals];
          newTotals[idx] = res;
          return newTotals;
        });
      } else {
        setTtlOmzet(prevTotals => {
          const newTotals = [...prevTotals];
          newTotals[idx] = 0;
          return newTotals;
        });
      }

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (planning.length > 0) {
      planning.forEach((row, idx) => {
        totalOmzet(idx, row.salesman.id);
      });
    }
  }, [planning]);

  useEffect(() => {
    if (kunjungan.length > 0) {
      kunjungan.forEach((row, idx) => {
        totalOmzet(idx, row.salesman.id);
      });
    }
  }, [kunjungan]);

  return (
    <section className="lg:flex font-poppins bg-gray-50 min-h-screen">
      <SidebarAdmin />
      <div className="lg:ml-[19rem] pt-20 lg:pt-5 w-full">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 lg:mr-4 mx-5 lg:mx-0">
          {/* Report Card */}
          <Card className="p-5 order-1 lg:order-2">
            <Typography variant="h4" color="blue-gray" className="font-poppins uppercase">
              Report
            </Typography>
            <br />
            <table className="w-full border-collapse">
              <thead className="border-b-2">
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold">Nama ITC</th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Last Update
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">Omzet</th>
                  <th className="text-sm py-2 px-3 font-semibold">Persen</th>
                </tr>
              </thead>
              <tbody>
                {kunjungan.map((item, index) => {
                  const persen = (ttlOmzet[index] / item.salesman.target) * 100;
                  return (
                    <tr key={index} className="border-b-2">
                      <td className="text-sm text-center py-2 px-3">{item.salesman.namaSalesman}</td>
                      <td className="text-sm text-center py-2 px-3">{formatDate(item.updated_date)}</td>
                      <td className="text-sm text-center py-2 px-3">{ttlOmzet[index]}</td>
                      <td className="text-sm text-center py-2 px-3">{persen} %</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Card>

          {/* Planning Card */}
          <Card className="p-5 order-1 lg:order-2">
            <Typography variant="h4" color="blue-gray" className="font-poppins uppercase">
              Planning
            </Typography>
            <br />
            <table className="w-full border-collapse">
              <thead className="border-b-2">
                <tr>
                  <th className="text-sm py-2 px-3 font-semibold">Nama ITC</th>
                  <th className="text-sm py-2 px-3 font-semibold">
                    Last Update
                  </th>
                  <th className="text-sm py-2 px-3 font-semibold">Omzet</th>
                  <th className="text-sm py-2 px-3 font-semibold">Persen</th>
                </tr>
              </thead>
              <tbody>
                {planning.map((item, index) => {
                  const persen = (ttlOmzet[index] / item.salesman.target) * 100;
                  return (
                    <tr key={index} className="border-b-2">
                      <td className="text-sm text-center py-2 px-3">{item.salesman.namaSalesman}</td>
                      <td className="text-sm text-center py-2 px-3">{formatDate(item.updated_date)}</td>
                      <td className="text-sm text-center py-2 px-3">{ttlOmzet[index]}</td>
                      <td className="text-sm text-center py-2 px-3">{persen} %</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Card>
        </div>
        <br />
      </div>
    </section>
  );
}

export default Home;
