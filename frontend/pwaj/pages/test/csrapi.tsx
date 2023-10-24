// "use client";
import React, { useEffect, useState } from "react";
import { fetchSample } from "./sampleApi";

interface Sample {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function Csrapi() {
  const [sampleData, setSampleData] = useState<Sample | null>(null);

  useEffect(() => {
    // getSampleData();
  }, []);

  const getSampleData = async () => {
    try {
      const data: Sample = await fetchSample();
      setSampleData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <h1>csrapi</h1>
      <button
        onClick={() => {
          getSampleData();
        }}
      >
        누르면
      </button>
      {sampleData ? (
        <ul>
          <li>
            {sampleData.userId}, {sampleData.id}, {sampleData.title},{" "}
            {sampleData.completed.toString()}
          </li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
