import Head from "next/head";
import Image from "next/image";
import Button from "@material-tailwind/react/Button";

export default function Home() {
  return (
    <>
      {/* add head here to add fonts */}
      <div className="bg-red-200">Hello</div>
      <Button  ripple="light" className="bg-orange hover:bg-orange focus:bg-orange active:bg-orange">
        Button
      </Button>
    </>
  );
}
