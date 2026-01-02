import { useSearchParams } from "react-router";

import { Surface } from "@/components/ui/Surface";
import { classroom } from "@/assets/constatns";
import { branch } from "../../assets/constatns";
import { useState, useEffect } from "react";

const OrderDataConsole = ({ setSearchParams }) => {
  const handleSearchParams = (key, value) => {
    setSearchParams((params) => {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      return params;
    });
  };

  return (
    <Surface className="w-full p-5 mb-5 flex justify-start items-center gap-5">
      <select
        className="px-2 py-1 bg-text text-background rounded-xl"
        onChange={(e) => handleSearchParams("class", e.target.value)}
      >
        <option value="">اختر سنة دراسية</option>
        {classroom.map((e, i) => (
          <option value={e.value} key={i}>
            {e.label}
          </option>
        ))}
      </select>
      <select
        className="px-2 py-1 bg-text text-background rounded-xl"
        onChange={(e) => handleSearchParams("branch", e.target.value)}
      >
        <option value="">اختر فئة</option>
        {branch.map((e, i) => (
          <option value={e.value} key={i}>
            {e.label}
          </option>
        ))}
      </select>
      <select
        className="px-2 py-1 bg-text text-background rounded-xl"
        onChange={(e) => handleSearchParams("sort", e.target.value)}
        defaultValue="new"
      >
        <option value="new">جديد</option>
        <option value="asc">السعر التصاعدي</option>
        <option value="dsc">السعر التنازلي</option>
      </select>
    </Surface>
  );
};

export default OrderDataConsole;
