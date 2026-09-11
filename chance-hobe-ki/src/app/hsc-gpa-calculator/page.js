"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GPA_OPTIONS = [
  { value: "5.00", grade: "A+" },
  { value: "4.00", grade: "A" },
  { value: "3.50", grade: "A-" },
  { value: "3.00", grade: "B" },
  { value: "2.00", grade: "C" },
  { value: "1.00", grade: "D" },
];

const GRADING_SCALE = [
  { marks: "৮০-১০০", grade: "A+", points: "৫.০০" },
  { marks: "৭০-৭৯", grade: "A", points: "৪.০০" },
  { marks: "৬০-৬৯", grade: "A-", points: "৩.৫০" },
  { marks: "৫০-৫৯", grade: "B", points: "৩.০০" },
  { marks: "৪০-৪৯", grade: "C", points: "২.০০" },
  { marks: "৩৩-৩৯", grade: "D", points: "১.০০" },
  { marks: "০-৩২", grade: "F", points: "০.০০" },
];

function GradingScaleTable() {
  return (
    <table className="grading-table">
      <thead>
        <tr>
          <th>মার্কস</th>
          <th>গ্রেড</th>
          <th>পয়েন্ট</th>
        </tr>
      </thead>
      <tbody>
        {GRADING_SCALE.map((row) => (
          <tr key={row.grade}>
            <td>{row.marks}</td>
            <td>{row.grade}</td>
            <td>{row.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function gpaToGrade(gpa) {
  if (gpa >= 5) return "A+";
  if (gpa >= 4) return "A";
  if (gpa >= 3.5) return "A-";
  if (gpa >= 3) return "B";
  if (gpa >= 2) return "C";
  if (gpa >= 1) return "D";
  return "F";
}

function GpaSelect({ id, label, value, onChange, fullWidth }) {
  return (
    <div className={`field${fullWidth ? " field-span-full" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled>
          GPA সিলেক্ট করো
        </option>
        {GPA_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.value} ({opt.grade})
          </option>
        ))}
      </select>
    </div>
  );
}

export default function HscGpaCalculatorPage() {
  const [values, setValues] = useState({});
  const [optionalSubject, setOptionalSubject] = useState(null); // "hm" | "bio"
  const [result, setResult] = useState(null);

  function setField(id, val) {
    setValues((v) => ({ ...v, [id]: val }));
  }

  function handleCheck() {
    if (!optionalSubject) {
      setResult({
        type: "warning",
        msg: "⚠️ GPA বের করার আগে উচ্চতর গণিত বা জীববিজ্ঞান — যেকোনো একটা সিলেক্ট করো।",
      });
      return;
    }
    const v = (id) => parseFloat(values[id]) || 0;
    const optionalVal = optionalSubject === "bio" ? v("bio") : v("hm");
    const requiredVal = optionalSubject === "bio" ? v("hm") : v("bio");
    const bonus = Math.max(0, optionalVal - 2);
    const mainTotal = v("bn") + v("en") + v("ict") + v("phy") + v("chem") + requiredVal;
    const netGpa = Math.min(5, (mainTotal + bonus) / 6);
    setResult({ type: "info", gpa: netGpa.toFixed(2), grade: gpaToGrade(netGpa) });
  }

  return (
    <>
      <Navbar />
      <section className="general-page hsc-calc-page open">
        <div className="general-page-inner hsc-page-inner">
          <Link className="general-back-btn" href="/">
            <svg
