import GoogleLogin from "../../../components/atoms/GoogleLogin";
import PnjLogo from "../../../components/atoms/PnjLogo";

export default function NavbarTest() {
  return (
    <>
      <div className="DemoNavbar">
        <div className="InputContaier">
          <PnjLogo />
        </div>
        <div className="NavGoogleBtn">
          <GoogleLogin />
        </div>
      </div>
    </>
  );
}
