"use client";

import { useState } from "react";
import qr_code from "@/app/qr-code";

export default function Home() {
  const [inputText, setInputText] = useState(""); // State to store user input
  const numberArray: number[][] = qr_code();
  const colorMapping = ["white", "black", "green", "red"];

  const squareSize = 10;
  const gridWidth = squareSize * numberArray[0].length;

  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-3xl font-bold mb-8">QR Code Generator</h1>

        {/* Input Field */}
        <div className="mb-6">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)} // Update state on input change
            placeholder="Enter text for QR Code"
            className="border p-2 rounded w-full max-w-md"
          />
        </div>

        {/* QR Code Grid */}
        <div
          style={{
            display: "grid",
            gap: "0px",
            gridTemplateColumns: `repeat(${numberArray[0].length}, ${squareSize}px)`,
            width: `${gridWidth}px`,
            margin: "0 auto",
          }}
        >
          {numberArray.flat().map((value, index) => (
            <div
              key={index}
              style={{
                width: `${squareSize}px`,
                height: `${squareSize}px`,
                backgroundColor: colorMapping[value],
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
