import qr_code from "@/app/qr-code";

export default function Home() {
  // Assuming `qr_code` exports a method or object with the `numberArray`
  const numberArray: number[][] = qr_code(); // Adjust based on how qr_code is implemented

  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-3xl font-bold mb-8">QR Code Generator</h1>
        <div
          style={{
            display: "grid",
            gap: "4px",
            gridTemplateColumns: `repeat(${numberArray[0].length}, 1fr)`,
          }}
        >
          {numberArray.flat().map((value, index) => (
            <div
              key={index}
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: value === 1 ? "black" : "white",
                border: "1px solid gray", // Optional for visibility
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
