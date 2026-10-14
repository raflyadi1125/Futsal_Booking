import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initialFields } from "../data/mockData";
import Icon from "./ui/Icon";
import SearchField, { FIELD_CLASS } from "./SearchField";
import SelectInput from "./SelectInput";

const INITIAL_VALUES = { field: "", date: "", time: "" };

const buildFieldsUrl = ({ field, date, time }) => {
  const params = new URLSearchParams();

  if (field) params.set("lapangan", field);
  if (date) params.set("tanggal", date);
  if (time) params.set("waktu", time);

  const query = params.toString();
  return query ? `/fields?${query}` : "/fields";
};

const getToday = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now - offset).toISOString().split("T")[0];
};

const toHour = (time) => parseInt(time.split(":")[0], 10);
const pad = (hour) => String(hour).padStart(2, "0");

// Slot per 1 jam, contoh: "19.00–20.00"
const buildTimeSlots = (openHour, closeHour) => {
  const slots = [];
  for (let h = openHour; h < closeHour; h += 1) {
    slots.push(`${pad(h)}.00–${pad(h + 1)}.00`);
  }
  return slots;
};

export default function SearchForm() {
  const navigate = useNavigate();
  const [values, setValues] = useState(INITIAL_VALUES);

  // Hanya lapangan yang aktif
  const availableFields = useMemo(
    () => initialFields.filter((field) => field.status === "Aktif"),
    []
  );

  const fieldOptions = useMemo(
    () => availableFields.map((field) => field.name),
    [availableFields]
  );

  // Slot waktu mengikuti lapangan terpilih; jika belum memilih,
  // pakai rentang terluas dari semua lapangan aktif
  const timeOptions = useMemo(() => {
    const selected = availableFields.find((f) => f.name === values.field);
    const pool = selected ? [selected] : availableFields;

    if (pool.length === 0) return [];

    const open = Math.min(...pool.map((f) => toHour(f.openingTime)));
    const close = Math.max(...pool.map((f) => toHour(f.closingTime)));

    return buildTimeSlots(open, close);
  }, [availableFields, values.field]);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setValues((previous) => {
      const next = { ...previous, [name]: value };

      // Ganti lapangan -> reset waktu agar tidak di luar jam operasional
      if (name === "field") next.time = "";

      return next;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(buildFieldsUrl(values));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 grid gap-4 rounded-xl bg-white p-4 shadow-xl md:grid-cols-2 lg:max-w-4xl lg:grid-cols-[1.2fr_1fr_1fr_auto] lg:items-center lg:gap-6 lg:px-6"
    >
      <SearchField icon="pin" label="Lapangan">
        <SelectInput
          name="field"
          value={values.field}
          onChange={handleChange}
          placeholder="Pilih lapangan"
          options={fieldOptions}
        />
      </SearchField>

      <SearchField icon="calendar" label="Tanggal">
        <input
          type="date"
          name="date"
          value={values.date}
          min={getToday()}
          onChange={handleChange}
          className={FIELD_CLASS}
        />
      </SearchField>

      <SearchField icon="clock" label="Waktu">
        <SelectInput
          name="time"
          value={values.time}
          onChange={handleChange}
          placeholder="Pilih waktu"
          options={timeOptions}
        />
      </SearchField>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 md:col-span-2 lg:col-span-1"
      >
        <Icon name="search" className="h-5 w-5" />
        Cari Lapangan
      </button>
    </form>
  );
}