import Icon from "./ui/Icon";
import { FIELD_CLASS } from "./SearchField";

export default function SelectInput({ name, value, onChange, placeholder, options }) {
  return (
    <>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`${FIELD_CLASS} pr-6`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <Icon
        name="chevron"
        className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
      />
    </>
  );
}