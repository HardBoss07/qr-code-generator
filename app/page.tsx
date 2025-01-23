"use client";

import { useState, useEffect } from "react";
import qr_code from "@/app/qr-code";
import { convert } from '@/app/binary-converter';
import { colorBits } from '@/app/qr-code';

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [binary, setBinary] = useState<number[][]>([]);

  const numberArray: number[][] = qr_code();
  const colorMapping = ["white", "black", "green", "red", "placeholder", "teal", "violet"];

  const squareSize = 10;
  const gridWidth = squareSize * numberArray[0].length;

  useEffect(() => {
    const updatedBinary = convert(inputText);
    setBinary(updatedBinary);

    if (updatedBinary.length > 0) {
      colorBits(updatedBinary[updatedBinary.length - 1]);
    }
  }, [inputText]);

  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-3xl font-bold mb-8">QR Code Generator</h1>

        {/* Input Field */}
        <div className="mb-6">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
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

        {/* Binary field */}
        <div
          style={{
            marginTop: '20px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9',
            maxWidth: '300px',
          }}
        >
          <h2 style={{ margin: 0 }}>Binary Output:</h2>
          <ul style={{ listStyleType: 'none', padding: 0, marginTop: '10px' }}>
            {binary.map((row, index) => (
              <li
                key={index}
                style={{
                  fontFamily: 'monospace',
                  padding: '5px 0',
                  borderBottom: index !== binary.length - 1 ? '1px solid #ddd' : 'none',
                }}
              >
                {row.join(' ')}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
