"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function AssetIssueForm() {
  const params = useParams();
  const id = params?.id;
  const [formData, setFormData] = useState({
    userName: 'Kritika Jain', // Replace with dynamic data from API
    dept: 'IT',
    location: 'Pune',
    makeModel: 'Lenovo ThinkPad',
    hostName: '',
    serialNo: '',
    accessories: {
      charger: false,
      mouse: false,
      headset: false,
      bag: false,
      dockingStation: false,
    }
  });

  const handleCheckboxChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      accessories: { ...prev.accessories, [name]: !prev.accessories[name as keyof typeof prev.accessories] }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-black shadow-lg border border-gray-200 my-10">
      {/* Header */}
      <div className="flex justify-between mb-8">
        <div>
          <p className="font-bold">To,</p>
          <p>{formData.userName}</p>
          <p>{formData.dept}</p>
          <p>{formData.location}</p>
        </div>
        <p className="font-bold">{new Date().toLocaleDateString()}</p>
      </div>

      <h1 className="text-center font-bold underline mb-6">
        Sub: Issue of Lenovo Laptop and Accessories for Official Use.
      </h1>

      <p className="mb-4">Dear {formData.userName},</p>
      <p className="mb-6">
        This is to inform you that the IT department is issuing the following Lenovo laptop and accessories
        to the <span className="font-bold">{formData.dept}</span> for official use. The responsibility for
        the laptop and its proper use is hereby assigned to you.
      </p>

      {/* Laptop Details Section */}
      <div className="mb-6">
        <h2 className="font-bold underline mb-2">Laptop Details:</h2>
        <div className="grid grid-cols-2 gap-2">
          <p><span className="font-semibold">Make & Model:</span> {formData.makeModel}</p>
          <p><span className="font-semibold">Host Name:</span> {formData.hostName}</p>
          <p><span className="font-semibold">Serial No:</span> {formData.serialNo}</p>
        </div>
      </div>

      {/* Accessories Section */}
      <div className="mb-8">
        <h2 className="font-bold underline mb-3">Accessories:</h2>
        <ul className="space-y-2">
          {Object.entries(formData.accessories).map(([key, value]) => (
             <li key={key} className="flex items-center gap-4">
              <span className="w-64 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
               <input
                type="checkbox"
                checked={value}
                onChange={() => handleCheckboxChange(key)}
                className="w-5 h-5 border-black border-2"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Terms & Conditions (Abbreviated) */}
      <div className="text-sm border-t pt-4 border-gray-300">
        <p className="italic mb-4 text-xs">
          I accept and agree to comply with all policies regarding the use and security of the company-issued laptop.
        </p>
        
        <div className="flex justify-between mt-12 pt-4 border-t border-dotted border-black">
          <div>
            <p className="font-bold">Khizar Shaikh</p>
            <p>IT Department</p>
          </div>
          <div className="text-right">
            <p className="font-bold italic">Assets Accepted By:</p>
            <p>{formData.userName}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4 no-print">
        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Print to PDF
        </button>
        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Save Record
        </button>
      </div>
    </div>
  );
}
