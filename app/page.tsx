import qr_code from "@/app/qr-code";

export default function Home() {
  const numberArray: number[][] = qr_code();

  const squareSize = 10;
  const gridWidth = squareSize * numberArray[0].length;

  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-3xl font-bold mb-8">QR Code Generator</h1>
        <input style={{
          width: `${squareSize * numberArray[0].length}px`,
          height: `${squareSize * 2}px`,
        }}>Enter your Data:</input>
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
                backgroundColor: value === 1 ? "black" : "white",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
