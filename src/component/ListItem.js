import "./Home.css";

const ListItem = (props) => {
  const { nama, umur, jenisKelamin } = props.data;
  const { hapusPengunjung } = props;

  return (
    <tbody>
      <tr>
        <td>{nama}</td>
        <td>{umur}</td>
        <td>{jenisKelamin}</td>
        <td className="removeBorder" onClick={hapusPengunjung}>
          <button>Hapus</button>
        </td>
      </tr>
    </tbody>
  );
};

export default ListItem;