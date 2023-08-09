import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div>
      <nav>
        <li>
          <Link to="/popular">인기</Link>
        </li>
        <li>
          <Link to="/recent">최신</Link>
        </li>
      </nav>
    </div>
  );
}
