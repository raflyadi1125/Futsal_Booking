
import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Trophy,
  Clock3,
  Users,
  SlidersHorizontal,
} from "lucide-react";

import { formatRupiah } from "../../data/mockData";
import StatusBadge from "../../components/ui/StatusBadge";

const emptyForm = {
  name: "",
  type: "Vinyl",
  price: "",
  capacity: "10",
  openingTime: "08:00",
  closingTime: "23:00",
  facilities: "",
  status: "Aktif",
};

const fieldTypes = ["Vinyl", "Rumput Sintetis", "Parquette", "Semen"];

function FieldModal({ initialData, onClose, onSave }) {
  const [form, setForm] = useState(() =>
    initialData
      ? {
          ...initialData,
          price: String(initialData.price),
          capacity: String(initialData.capacity),
        }
      : { ...emptyForm },
  );

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const price = Number(form.price);
    const capacity = Number(form.capacity);

    if (!form.name.trim()) {
      setError("Nama lapangan wajib diisi.");
      return;
    }

    if (
      form.price === "" ||
      !Number.isFinite(price) ||
      price <= 0
    ) {
      setError("Harga harus lebih besar dari 0.");
      return;
    }

    if (!Number.isInteger(price)) {
      setError("Harga harus berupa bilangan bulat.");
      return;
    }

    if (price % 1000 !== 0) {
      setError("Harga harus dalam kelipatan Rp1.000.");
      return;
    }

    if (
      form.capacity === "" ||
      !Number.isInteger(capacity) ||
      capacity <= 0
    ) {
      setError(
        "Kapasitas harus berupa angka bulat lebih besar dari 0.",
      );
      return;
    }

    if (form.openingTime >= form.closingTime) {
      setError("Jam tutup harus lebih besar dari jam buka.");
      return;
    }

    if (!form.facilities.trim()) {
      setError("Fasilitas lapangan wajib diisi.");
      return;
    }

    onSave({
      ...form,
      name: form.name.trim(),
      price,
      capacity,
      facilities: form.facilities.trim(),
    });
  }

  const inputClass =
    "w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500";

  const labelClass =
    "mb-1.5 block text-sm font-medium text-slate-300";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="my-auto w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-white">
              {initialData ? "Edit Lapangan" : "Tambah Lapangan"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Lengkapi informasi lapangan futsal.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            aria-label="Tutup formulir"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="name">
                Nama Lapangan
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Contoh: Lapangan A"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="type">
                Jenis Lapangan
              </label>

              <select
                id="type"
                name="type"
                value={form.type}
                onChange={handleChange}
                className={inputClass}
              >
                {fieldTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="price">
                Harga per Jam (Rp)
              </label>

              <input
                id="price"
                name="price"
                type="number"
                min="1000"
                step="1000"
                value={form.price}
                onChange={handleChange}
                placeholder="Contoh: 135000"
                className={inputClass}
                required
              />

              <p className="mt-1.5 text-xs text-slate-500">
                Masukkan nominal tanpa titik atau simbol Rp.
                Harga harus kelipatan Rp1.000.
              </p>
            </div>

            <div>
              <label className={labelClass} htmlFor="capacity">
                Kapasitas Pemain
              </label>

              <input
                id="capacity"
                name="capacity"
                type="number"
                min="1"
                step="1"
                value={form.capacity}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="openingTime">
                Jam Buka
              </label>

              <input
                id="openingTime"
                name="openingTime"
                type="time"
                value={form.openingTime}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="closingTime">
                Jam Tutup
              </label>

              <input
                id="closingTime"
                name="closingTime"
                type="time"
                value={form.closingTime}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="facilities">
                Fasilitas
              </label>

              <textarea
                id="facilities"
                name="facilities"
                value={form.facilities}
                onChange={handleChange}
                placeholder="Contoh: Toilet, Parkir, Mushola"
                rows={3}
                className={inputClass}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="status">
                Status Lapangan
              </label>

              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Aktif">Aktif</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300"
            >
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
            >
              Batal
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
            >
              {initialData ? "Simpan Perubahan" : "Tambah Lapangan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Fields({ fields = [], setFields }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingField, setEditingField] = useState(null);

  const activeCount = fields.filter(
    (field) => field.status === "Aktif",
  ).length;

  const inactiveCount = fields.filter(
    (field) => field.status === "Nonaktif",
  ).length;

  const filteredFields = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return fields.filter((field) => {
      const matchesSearch =
        field.name.toLowerCase().includes(keyword) ||
        field.type.toLowerCase().includes(keyword) ||
        field.facilities.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "Semua" ||
        field.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [fields, search, statusFilter]);

  function openAddModal() {
    setEditingField(null);
    setModalOpen(true);
  }

  function openEditModal(field) {
    setEditingField(field);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingField(null);
  }

  function saveField(formData) {
    if (typeof setFields !== "function") {
      setErrorMessage();
      return;
    }

    if (editingField) {
      setFields((previous) =>
        previous.map((field) =>
          field.id === editingField.id
            ? { ...field, ...formData }
            : field,
        ),
      );
    } else {
      const newField = {
        id:
          fields.length > 0
            ? Math.max(...fields.map((field) => field.id)) + 1
            : 1,
        ...formData,
      };

      setFields((previous) => [...previous, newField]);
    }

    closeModal();
  }

  function deleteField(field) {
    const confirmed = window.confirm(
      `Yakin ingin menghapus ${field.name}?`,
    );

    if (!confirmed) return;

    setFields((previous) =>
      previous.filter((item) => item.id !== field.id),
    );
  }

  function toggleStatus(field) {
    const nextStatus =
      field.status === "Aktif" ? "Nonaktif" : "Aktif";

    setFields((previous) =>
      previous.map((item) =>
        item.id === field.id
          ? { ...item, status: nextStatus }
          : item,
      ),
    );
  }

  const summaryCards = [
    {
      label: "Total Lapangan",
      value: fields.length,
      icon: Trophy,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/10",
    },
    {
      label: "Lapangan Aktif",
      value: activeCount,
      icon: SlidersHorizontal,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/10",
    },
    {
      label: "Lapangan Nonaktif",
      value: inactiveCount,
      icon: Clock3,
      iconColor: "text-amber-400",
      iconBg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Manajemen Lapangan
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Kelola informasi, harga, dan status lapangan futsal.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          <Plus size={18} />
          Tambah Lapangan
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-xl border border-slate-800 bg-slate-900/70 p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">
                    {card.label}
                  </p>

                  <p className="mt-2 text-2xl font-bold text-white">
                    {card.value}
                  </p>
                </div>

                <div className={`rounded-xl p-3 ${card.iconBg}`}>
                  <Icon size={22} className={card.iconColor} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70">
        <div className="flex flex-col gap-3 border-b border-slate-800 p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-semibold text-white">
              Daftar Lapangan
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {filteredFields.length} lapangan ditemukan
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari lapangan..."
                className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2.5 pl-9 pr-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 sm:w-56"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-blue-500"
              aria-label="Filter status lapangan"
            >
              <option value="Semua">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Nonaktif">Nonaktif</option>
            </select>
          </div>
        </div>

        {filteredFields.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <Trophy
              size={32}
              className="mx-auto text-slate-600"
            />

            <h3 className="mt-3 font-medium text-white">
              Lapangan tidak ditemukan
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Coba kata kunci lain atau ubah filter status.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-slate-950/70 text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-4 font-medium">
                    Lapangan
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Harga/Jam
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Kapasitas
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Jam Operasional
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Status
                  </th>
                  <th className="px-5 py-4 text-right font-medium">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">
                {filteredFields.map((field) => (
                  <tr
                    key={field.id}
                    className="transition hover:bg-slate-800/30"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                          <Trophy size={19} />
                        </div>

                        <div>
                          <p className="font-medium text-white">
                            {field.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {field.type}
                          </p>

                          <p className="mt-1 max-w-52 truncate text-xs text-slate-500">
                            {field.facilities}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-200">
                      {formatRupiah(field.price)}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      <span className="inline-flex items-center gap-2">
                        <Users
                          size={15}
                          className="text-slate-500"
                        />
                        {field.capacity} pemain
                      </span>
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {field.openingTime}–{field.closingTime}
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => toggleStatus(field)}
                        title="Klik untuk mengubah status"
                        className="rounded-md transition hover:opacity-75"
                      >
                        <StatusBadge status={field.status} />
                      </button>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(field)}
                          title="Edit lapangan"
                          aria-label={`Edit ${field.name}`}
                          className="rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-300"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteField(field)}
                          title="Hapus lapangan"
                          aria-label={`Hapus ${field.name}`}
                          className="rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-300"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <FieldModal
          initialData={editingField}
          onClose={closeModal}
          onSave={saveField}
        />
      )}
    </div>
  );
}
