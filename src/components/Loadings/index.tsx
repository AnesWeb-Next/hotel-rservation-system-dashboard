import "./style.css";
export default function Loading({ className = "" }) {
  return <span className={"loader" + className}></span>;
}
