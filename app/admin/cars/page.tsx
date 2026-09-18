"use client";

import { useCallback, useEffect, useState } from "react";
import { type Car } from "@/data/cars";
import CarForm from "./CarForm";
import CarList from "./CarList";

type Message = {
  text: string;
  type: "success" | "error";
};

type CarFormData = Omit<Car, "id">;

export default function AdminCarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [message, setMessage] = useState<Message | null>(null);

  const showMessage = useCallback((text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  }, []);

  const fetchCars = useCallback(async () => {
    try {
      const response = await fetch("/api/cars/mine");
      if (!response.ok) throw new Error("Failed to fetch cars");
      const data = (await response.json()) as Car[];
      setCars(data);
    } catch (error) {
      showMessage(
        error instanceof Error ? error.message : "Failed to load cars",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }, [showMessage]);

  useEffect(() => {
    // Fetch-on-mount; setState happens after the fetch resolves, not synchronously.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCars();
  }, [fetchCars]);

  const handleSubmit = async (formData: CarFormData, id?: string) => {
    setSaving(true);
    try {
      const url = id ? `/api/cars/${id}` : "/api/cars";
      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { message?: string };
        throw new Error(errorData.message || `Failed to ${id ? "update" : "create"} car`);
      }

      showMessage(
        id ? "Car updated successfully" : "Car created successfully",
        "success"
      );
      setEditingCar(null);
      await fetchCars();
    } catch (error) {
      showMessage(
        error instanceof Error ? error.message : "Something went wrong",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { message?: string };
        throw new Error(errorData.message || "Failed to delete car");
      }

      showMessage("Car deleted successfully", "success");
      await fetchCars();
    } catch (error) {
      showMessage(
        error instanceof Error ? error.message : "Failed to delete car",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-center text-stone-600">Loading cars...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-2 text-3xl font-bold">Admin — Manage Cars</h1>
      <p className="mb-6 text-sm text-stone-600">
        Showing {cars.length} of your {cars.length === 1 ? "car" : "cars"}. Other
        users&apos; listings are hidden from this panel.
      </p>

      {message && (
        <div
          className={`mb-6 rounded-lg p-4 font-semibold ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <CarForm
        initialCar={editingCar}
        onSubmit={handleSubmit}
        onCancel={() => setEditingCar(null)}
        disabled={saving}
      />

      <CarList
        cars={cars}
        onEdit={setEditingCar}
        onDelete={handleDelete}
        disabled={saving}
      />
    </main>
  );
}
