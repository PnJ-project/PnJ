import GoogleLogout from "../../../components/atoms/GoogleLogout";
import { useEffect } from "react";
import LoadingBtn from "../../../components/atoms/LoadingBtn";

export default function Logout() {
  useEffect(() => {});
  return (
    <>
      <h1>login</h1>
      <GoogleLogout />
      <LoadingBtn />
    </>
  );
}
