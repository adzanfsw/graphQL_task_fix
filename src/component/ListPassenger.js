import ListItem from './ListItem';
import { gql, useLazyQuery, useMutation, useQuery, useSubscription } from "@apollo/client";

const GetPenumpang = gql`
    query MyQuery {
        anggota {
            nama
            umur
            jenisKelamin
        }
      }
    `;

const ListPassenger = props => {
    const {data, error} = useQuery(GetPenumpang);
    
    if (error) {
        console.log(error)
        return null
    }

    return (
        <div>
            <table cellPadding="5px" cellSpacing="0" style={{margin: "auto"}}>
                <thead bgcolor="red">
                    <td>Nama</td>
                    <td>Umur</td>
                    <td>Jenis Kelamin</td>
                    <td bgcolor="white" className="removeBorder"></td>
                </thead>
                {data?.anggota.map(item => (
                    <ListItem
                        key={item.id}
                        data={item}
                        hapusPengunjung={props.hapusPengunjung}
                    />
                ))}
            </table>
        </div>
    )
  }

export default ListPassenger;