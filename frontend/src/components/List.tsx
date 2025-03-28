import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import Modal from "./Modal";

const List = () => {
  const items = useSelector((state: RootState) => state.api.list);

  return (
    <ul>
      {items.map((i) => (
        <li key={i.id}>
          <Modal
            name={i.name}
            description={i.description}
            url={"/api/" + i.id.toString()}
          />
        </li>
      ))}
    </ul>
  );
};

export default List;
