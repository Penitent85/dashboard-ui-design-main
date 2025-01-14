import React from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@/hooks/use-theme";

import { overviewData, recentSalesData, topProducts } from "@/constants";

import { Footer } from "@/layouts/footer";

import { CreditCard, DollarSign, Package, PencilLine, Star, Trash, TrendingUp, Users } from "lucide-react";
 

const TopDoctors = () => {
    const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [doctors, setDoctors] = useState();
  const [isActive, setIsActive] = useState(false);

  console.log(doctors);


//   { id: "doctor_id", label: "ID", Width: 50, align: "left" },
//   { id: "doctor_name", label: "Name", Width: 100, align: "left" },
//   { id: "id_number", label: "ID Number", Width: 100, align: "left" },
//   { id: "specialty", label: "Specialty", Width: 100, align: "left" },
//   { id: "status", label: "Status", Width: 100, align: "left" },
//   { id: "view", label: "View", Width: 100, align: "left" },
//   { id: "edit", label: "Edit", Width: 100, align: "left" },
//   { id: "rating", label: "Rating", Width: 100, align: "left" },
//   { id: "phone", label: "Phone", Width: 100, align: "left" },

  const filteredDoctors = doctors?.filter((doctor) => {
    return `${doctor.ar_full_name} `;
  });

  const doctorPage = filteredDoctors?.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );
  console.log(doctorPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleActive = async (id, isActive) => {
      const data = {
        is_active: !isActive,
      };
       if(doctors)
        await axios.put(`https://f98b-83-244-8-231.ngrok-free.app/api/doctors/${id}`, data);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
      
        const { data } = await axios.get(
          "https://f98b-83-244-8-231.ngrok-free.app/api/doctors",
          {
            headers: {
              "ngrok-skip-browser-warning": "sss",
            },
          }
        );
        if (data) setDoctors(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchDoctors();
  }, []);
  if (doctors) console.log(doctors);
    return (
        <div className="card">
            <div className="card-header">
                <p className="card-title">Top Doctors</p>
            </div>
            <div className="card-body p-0">
                <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
                    <table className="table">
                        <thead className="table-header">
                            <tr className="table-row">
                                <th className="table-head">ID</th>
                                <th className="table-head">Name</th>
                                <th className="table-head">ID Number</th>
                                <th className="table-head">Specialty</th>
                                <th className="table-head">Status</th>
                                <th className="table-head">Rating</th>
                                <th className="table-head">Phone</th>
                               
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {doctors?.map((product) => (
                                <tr
                                    key={product.number}
                                    className="table-row"
                                >
                                    <td className="table-cell">{product.id_number}</td>
                                    <td className="table-cell">
                                        <div className="flex w-max gap-x-4">
                                            <img
                                                src={product.image}
                                                alt={product.ar_full_name}
                                                className="size-14 rounded-lg object-cover"
                                            />
                                            <div className="flex flex-col">
                                                <p>{product.name}</p>
                                                <p className="font-normal text-slate-600 dark:text-slate-400">{product.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="table-cell">${product.price}</td>
                                    <td className="table-cell">{product.status}</td>
                                    <td className="table-cell">
                                        <div className="flex items-center gap-x-2">
                                            <Star
                                                size={18}
                                                className="fill-yellow-600 stroke-yellow-600"
                                            />
                                            {product.rating}
                                        </div>
                                    </td>
                                    <td className="table-cell">
                                        <div className="flex items-center gap-x-4">
                                            <button className="text-blue-500 dark:text-blue-600">
                                                <PencilLine size={20} />
                                            </button>
                                            <button className="text-red-500">
                                                <Trash size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TopDoctors;
