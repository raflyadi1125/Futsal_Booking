import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOCATIONS, TIME_SLOTS } from "../data/homeData";
import Icon from "./ui/Icon";
import SearchField, { FIELD_CLASS } from "./SearchField";
import SelectInput from "./SelectInput";

const INITIAL_VALUES = { location: "", date: "", time: "" };

const buildFieldsUrl = ({ location, date, time }) => {
  const params = new URLSearchParams();

  if (location) params.set("lokasi", location);
  if (date) params.set("tanggal", date);
  if (time) params.set("waktu", time);

  const query = params.toString();
  return query ? `/fields?${query}` : "/fields";
};

export default function SearchForm() {
  const navigate = useNavigate();
  const [values, setValues] = useState(INITIAL_VALUES);

  const handleChange = ({ target }) => {
    setValues((previous) => ({ ...previous, [target.name]: target.value }));
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
      <SearchField icon="pin" label="Lokasi">
        <SelectInput
          name="location"
          value={values.location}
          onChange={handleChange}
          placeholder="Pilih lokasi terdekat"
          options={LOCATIONS}
        />
      </SearchField>

      <SearchField icon="calendar" label="Tanggal">
        <input
          type="date"
          name="date"
          value={values.date}
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
          options={TIME_SLOTS}
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