import PulseLoader from "react-spinners/PulseLoader";

const override = {
  display: "flex",
  position: "absolute",
  top: "8rem",
  left: "50%",
  transform: "translate(-50%)",
};

export default function Spinner({ loading }) {
  return (
    <PulseLoader
      color={"#e69900"}
      loading={loading}
      size={"30px"}
      cssOverride={override}
    />
  );
}
