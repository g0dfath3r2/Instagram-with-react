import { useEffect } from "react";
import Header from "../components/Header";

function NotFound() {
  useEffect(() => {
    document.title = "404 Not Found- instagram";
  });
  return (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auth mx-w-screen-lg">
        <p className="text-center text-2xl">Not Found</p>
      </div>
    </div>
  );
}

export default NotFound;
